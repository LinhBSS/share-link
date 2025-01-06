const conditions = {
    name: "default",
    default: true,
    node: false,
    browser: false,
    bun: false,
    deno: false,
    workerd: false,
    reactNative: false,
};

const DEFAULT_FETCH_INIT = {
    cache: "no-store",
};

async function fetch(input, init,) {
    init = { ...DEFAULT_FETCH_INIT, ...init };
    let headers = {
        Authorization: 'params.apiKey',
        "Content-Type": "application/json",
    };
    if (DEFAULT_FETCH_INIT?.headers)
        headers = { ...headers, ...DEFAULT_FETCH_INIT.headers };
    if (init?.headers) headers = { ...headers, ...init.headers };

    if (this.userAgent) {
        (headers)["User-Agent"] = this.userAgent;
        if (conditions.browser || conditions.default) {
            // chromium browsers have a bug where the user agent can't be modified
            if (typeof window !== "undefined" && "chrome" in window) {
                (headers)["AssemblyAI-Agent"] =
                    this.userAgent;
            }
        }
    }
    init.headers = headers;

    if (!input.startsWith("http")) input = this.params.baseUrl + input;

    const response = await fetch(input, init);

    if (response.status >= 400) {
        let json;
        const text = await response.text();
        if (text) {
            try {
                json = JSON.parse(text);
            } catch {
                /* empty */
            }
            if (json?.error) throw new Error(json.error);
            throw new Error(text);
        }
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return response;
}

async function fetchJson(input, init) {
    const response = await fetch(input, init);
    return response.json();
}

// path: string
export function getPath(path) {
    if (path.startsWith("http")) return null;
    if (path.startsWith("https")) return null;
    if (path.startsWith("data:")) return null;
    if (path.startsWith("file://")) return path.substring(7);
    if (path.startsWith("file:")) return path.substring(5);
    return path;
}

async function transcribe(params, options,) {
    const transcript = await submit(params);
    return await waitUntilReady(transcript.id, options);
}

async function submit(params) {
    let audioUrl;
    let transcriptParams = undefined;
    if ("audio" in params) {
        const { audio, ...audioTranscriptParams } = params;
        if (typeof audio === "string") {
            const path = getPath(audio);
            if (path !== null) {
                // audio is local path, upload local file
                audioUrl = await files.upload(path);
            } else {
                if (audio.startsWith("data:")) {
                    audioUrl = await files.upload(audio);
                } else {
                    // audio is not a local path, and not a data-URI, assume it's a normal URL
                    audioUrl = audio;
                }
            }
        } else {
            // audio is of uploadable type
            audioUrl = await this.files.upload(audio);
        }
        transcriptParams = { ...audioTranscriptParams, audio_url: audioUrl };
    } else {
        transcriptParams = params;
    }

    const data = await this.fetchJson("/v2/transcript", {
        method: "POST",
        body: JSON.stringify(transcriptParams),
    });
    return data;
}

// id: string
function get(id) {
    return fetchJson(`/v2/transcript/${id}`);
}


async function waitUntilReady(transcriptId, options) {
    const pollingInterval = options?.pollingInterval ?? 3_000;
    const pollingTimeout = options?.pollingTimeout ?? -1;
    const startTime = Date.now();
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const transcript = await get(transcriptId);
        if (transcript.status === "completed" || transcript.status === "error") {
            return transcript;
        } else if (
            pollingTimeout > 0 &&
            Date.now() - startTime > pollingTimeout
        ) {
            throw new Error("Polling timeout");
        } else {
            await new Promise((resolve) => setTimeout(resolve, pollingInterval));
        }
    }
}

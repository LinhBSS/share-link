import { AssemblyAI } from 'assemblyai'
import { useState } from 'react';

const client = new AssemblyAI({
    apiKey: "8c30430d0ecb4ea8aaa53f492e564f27"
})


export default function SpeechToText() {
    const audioUrl = 'https://assembly.ai/sports_injuries.mp3';
    const [loading, setLoading] = useState(false);
    const [transcription, setTranscription] = useState('');

    const config = { audio_url: audioUrl }

    const run = async () => {
        setLoading(true);
        const transcript = await client.transcripts.transcribe(config)
        // console.log(transcript.text)
        setTranscription(transcript.text);
        setLoading(false);
    }

    return (
        <div>
            <button onClick={run}>Speech To Text</button>
            {loading ? <span>Loading...</span> : <span>{transcription}</span>}
        </div>
    )
} 
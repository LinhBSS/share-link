// npm install assemblyai

import { AssemblyAI } from 'assemblyai'
import { useEffect } from 'react'

const client = new AssemblyAI({
    apiKey: "8c30430d0ecb4ea8aaa53f492e564f27"
})


export default function SpeechToText() {
    const audioUrl = 'https://assembly.ai/sports_injuries.mp3'

    const config = { audio_url: audioUrl }

    const run = async () => {
        const transcript = await client.transcripts.transcribe(config)
        console.log(transcript.text)
    }
    useEffect(() => {
        // run();
    }, []);

    return (
        <div>

        </div>
    )
} 
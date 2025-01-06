import React, { useState } from 'react';
import { transcribeAudio, getTranscriptionResult } from '../helpeer/speechToText';

function SpeechToTextTwo() {
    const [transcription, setTranscription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async () => {
        const filePath = 'https://assembly.ai/sports_injuries.mp3';

        setLoading(true);

        const transcriptId = await transcribeAudio(filePath);
        if (transcriptId) {
            const result = await getTranscriptionResult(transcriptId);
            if (result !== null) {
                setTranscription(result.text);
            }
        }

        setLoading(false);
    };

    return (
        <div>
            <button title="Upload and Transcribe Audio" onClick={handleFileUpload}>Start</button>
            {loading ? <span>Loading...</span> : <span>{transcription}</span>}
        </div>
    );
}

export default SpeechToTextTwo;
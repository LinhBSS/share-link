import axios from 'axios';

const API_KEY = '8c30430d0ecb4ea8aaa53f492e564f27';

const client = axios.create({
  baseURL: 'https://api.assemblyai.com/v2',
  headers: {
    authorization: API_KEY,
    'content-type': 'application/json',
  },
});


const uploadAudio = async (uri) => {
  const file = {
    uri,
    type: 'audio/m4a', // Kiểu MIME, có thể cần điều chỉnh tùy thuộc vào định dạng âm thanh
    name: 'recording.m4a', // Tên file
  };

  // Gửi file âm thanh lên AssemblyAI
  try {
    const response = await axios.post('https://api.assemblyai.com/v2/upload', file, {
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    const audioUrl = response.data.upload_url;
    const transcriptionResponse = await transcribeAudio(audioUrl);
  } catch (error) {
    console.error('Error uploading audio:', error);
  }
};

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// hàm này lấy id của cuộc phân tích
export async function transcribeAudio(audioUrl) {
  try {
    const response = await client.post('/transcript', { audio_url: audioUrl });
    return response.data.id;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return null;
  }
}

// hàm này lấy ra text từ speech
export async function getTranscriptionResult(transcriptionId) {
  const maxCount = 20;
  let currentCount = 0;

  try {
    while (true) {
      currentCount++;
      const response = await client.get(`/transcript/${transcriptionId}`);
      const transcript = response.data;
      if (transcript.status === "completed" || transcript.status === "error") {
        return transcript;
      } else if (currentCount >= maxCount) {
        return null;
      } else {
        await delay(3_000);
      }
    }
  } catch (error) {
    console.error('Error fetching transcription result:', error);
    return null;
  }
}
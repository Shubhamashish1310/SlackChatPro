// frontend/src/hooks/useGeminiAI.js
export const useGeminiAI = () => {
  const analyzeMessage = async (messageContent) => {
    const response = await fetch('/api/ai/analyze-message', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ messageContent })
    });
    return response.json();
  };
};
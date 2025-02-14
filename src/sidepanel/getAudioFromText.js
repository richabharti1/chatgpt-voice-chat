const openaiKey = process.env.OPEN_API_KEY;

const getAudioFromText = async (text) => {
    // console.log('text',text);
    try {
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`,
            },
            body: JSON.stringify({
                model: 'tts-1',
                voice: 'alloy',
                input: text,
            }),
        });

        const audioData = await response.blob();
        const audioUrl = URL.createObjectURL(audioData);
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play()
                .then(() => {
                    console.log('Audio is playing');
                })
                .catch((error) => {
                    console.error('Error playing audio:', error);
                });
        }

    } catch (error) {
        console.error('Error generating speech:', error);
    }

};

export default getAudioFromText;

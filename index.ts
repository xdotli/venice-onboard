async function getCompletionDirectly() {
    const url = "https://api.openai.com/v1/chat/completions";
    const params = {
        model: "gpt-3.5-turbo",
        max_tokens: 1000,
        messages: [{ role: 'user', content: 'What is OpenAPI' }],
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify(params)
        });
        const data = await response.json();
        console.log(data.choices[0].message);
    } catch (error) {
        console.error("Error in fetching completion: ", error);
    }
}

getCompletionDirectly();

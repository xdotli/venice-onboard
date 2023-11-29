
class OpenAIClient {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.openai.com/v1';
    }

    async chatCompletion(model: string, messages: Array<{ role: string; content: string }>, maxTokens: number) {
        const url = `${this.baseUrl}/chat/completions`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };
        const body = JSON.stringify({
            model: model,
            messages: messages,
            max_tokens: maxTokens
        });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            });
            const data = await response.json();
            return data.choices[0].message;
        } catch (error) {
            console.error('Error in OpenAI API request:', error);
            throw error;
        }
    }
}

export default OpenAIClient;

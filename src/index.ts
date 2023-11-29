import createClient from "openapi-fetch";
import {createClient as createClientWithVenice} from "@usevenice/openapi-client";;
import OpenAIClient from '@/lib/OpenAIClient';
import { paths } from "@/openaiapi";

const apiKey = process.env.OPENAI_API_KEY!;
const client = new OpenAIClient(apiKey);
const { GET, POST } = createClient<paths>({ baseUrl: "https://api.openai.com/v1/" });
const clientWithVenice = createClientWithVenice<paths>({ baseUrl: "https://api.openai.com/v1/" });

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
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(params)
        });
        const data = await response.json();
        console.log(data.choices[0].message);
    } catch (error) {
        console.error("Error in fetching completion: ", error);
    }
}

async function getCompletionWithClient() {
    try {
        const response = await client.chatCompletion('gpt-3.5-turbo', [{ role: 'user', content: 'What is OpenAPI' }], 1000);
        console.log(response);
    } catch (error) {
        console.error('Error getting completion:', error);
    }
}

async function getCompletinoWithGeneratedClient() {
    const { data, error } = await POST("/chat/completions", {
        body: {
            model: "gpt-3.5-turbo",
            max_tokens: 1000,
            messages: [{ role: 'user', content: 'What is OpenAPI' }],
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    });
    console.log(data!.choices[0].message);
}

async function getCompletionWithVenic() {
    clientWithVenice
        .POST(
            "/chat/completions",
            {
                body: {
                    model: "gpt-3.5-turbo",
                    max_tokens: 1000,
                    messages: [{ role: 'user', content: 'What is OpenAPI' }],
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            }
        )
        .then((r) => {
            console.log(r.data!.choices[0].message);
        });
}

getCompletionDirectly();
getCompletionWithClient();
getCompletinoWithGeneratedClient();
getCompletionWithVenic();
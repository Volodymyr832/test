import fetch from 'node-fetch';

async function fetchWithFallback(primaryUrl, fallbackUrl) {
    try {
        console.log(`Trying to fetch data from: ${primaryUrl}`);
        const response = await fetch(primaryUrl);

        if (!response.ok) {
            throw new Error(`Primary request failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Primary request succeeded:", data);
        return data;
    } catch (error) {
        console.warn("Primary request failed, trying fallback...", error);

        try {
            console.log(`Trying fallback URL: ${fallbackUrl}`);
            const fallbackResponse = await fetch(fallbackUrl);

            if (!fallbackResponse.ok) {
                throw new Error(`Fallback request failed with status: ${fallbackResponse.status}`);
            }

            const fallbackData = await fallbackResponse.json();
            console.log("Fallback request succeeded:", fallbackData);
            return fallbackData;
        } catch (fallbackError) {
            console.error("Both primary and fallback requests failed.");
            throw new Error("Critical error: Unable to fetch data from both sources.");
        }
    }
}

fetchWithFallback("https://example.com/nonexistent", "https://jsonplaceholder.typicode.com/posts");

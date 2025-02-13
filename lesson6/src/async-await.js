import fetch from 'node-fetch';


async function fetchDataAsync(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received:", data);
        processData(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


function processData(data) {
    console.log("Processing data:", data.slice(0, 3)); 
}


fetchDataAsync("https://jsonplaceholder.typicode.com/posts");

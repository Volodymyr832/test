import fetch from 'node-fetch';

function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received:", data);
            processData(data);
            return data;
        })
        .catch(error => console.error("Error fetching data:", error));
}

function processData(data) {
    console.log("Processing data:", data.slice(0, 3));
}

fetchData("https://jsonplaceholder.typicode.com/posts");

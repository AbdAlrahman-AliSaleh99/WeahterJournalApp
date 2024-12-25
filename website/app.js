const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '5d8a2adf0bae3660c662482330a9fcc1&units=imperial';

let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

document.getElementById('generate').addEventListener('click', async () => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    const weatherData = await getWeather(zip);
    if (weatherData) {
        await postData('/add', {
            temperature: weatherData.main.temp,
            date: newDate,
            userResponse: feelings,
        });
        updateUI();
    }
});

const getWeather = async (zip) => {
    const response = await fetch(`${baseUrl}${zip}&appid=${apiKey}`);
    try {
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

const updateUI = async () => {
    const response = await fetch('/all');
    try {
        const data = await response.json();
        document.getElementById('temp').innerHTML = `Temperature: ${data.temperature} degrees`;
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('content').innerHTML = `Feelings: ${data.userResponse}`;
    } catch (error) {
        console.log(error);
    }
};


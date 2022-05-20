
let temperatureData = []
let timeData = []
let humidityData = []

let currentTime= new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });


document.getElementById("currentTime").innerHTML=currentTime



let currentTemp
let currentHumidity

// async function currentData(){

// }

async function getCurrentData(){

    const apiUrl ="https://spring1weather-app.herokuapp.com/currentReadings"
    const res = await fetch(apiUrl)

    const currentData = await res.json()

    const temperature = currentData.temperature
    const humidity = currentData.humidity
    

    currentTemp = temperature;
    currentHumidity=humidity;

    document.getElementById("currentTemp").innerHTML=currentTemp+"&#8451;"
    document.getElementById("currentHumidity").innerHTML=currentHumidity+"&#37;"
    
}





// function refresh() {    
//     setTimeout(function () {
//         location.reload()
//     }, 20000);
// }

async function createChart(){
await getData()

let ctx = document.getElementById('lineChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels:timeData,
        datasets: [{
            label: 'Temperature',
            data: temperatureData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },
        {
            label: 'Humidity',
            data: humidityData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }
    ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
    }

async function getData(){
    const apiUrl ="https://spring1weather-app.herokuapp.com/getReadings"
    const res = await fetch(apiUrl)

    const chartData = await res.json()

    const temperature = chartData.map((x)=> x.temperature)
    const humidity = chartData.map((x)=> x.humidity)
    const time = chartData.map((x)=> x.time)
    // console.log(temperature,humidity,time)

    temperatureData = temperature;
 timeData = time;
humidityData=humidity;
}

getData()

createChart()

getCurrentData()

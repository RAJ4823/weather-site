// const search = document.getElementById('input');
// const btn = document.getElementById('btn');

// btn.addEventListener('click', () => {
//     console.log(search.value);
//     const city = search.value;
//     fetch('/weather', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({ city: city })
//     }).then(res => res.json()).then(data => {
//         setWeatherData(data, city);
//     })
// })

// function setWeatherData(data, city) {
//     console.log(data, city);
// }
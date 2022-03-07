let light = true
/* date calendar */

let morning = document.querySelector('.morning')
let night = document.querySelector('.fa-moon')
let container = document.querySelector('.container')

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let d = new Date()
let numData = d.getDate()
let month = monthNames[d.getMonth()]
let day = dayNames[d.getDay()]
let year = d.getFullYear()
let calendar = document.querySelector('#calendar').innerHTML = `${day}, ${numData} ${month} ${year}`

morning.addEventListener('click', ()=>{
    morning.classList.add('toggle_active')
    night.classList.remove('toggle_active')
    light = false
    container.classList.add('bg-dark')
    
})

night.addEventListener('click', ()=>{
    morning.classList.remove('toggle_active')
    night.classList.add('toggle_active')
    light = true
    container.classList.remove('bg-dark')
    
})

/* interval  */
setInterval(()=>{
    navigator.getBattery().then(function (battery) {
        let level = battery.level;        
        document.querySelector('#battery').innerHTML = (level*100) + '%';
        let batteryIcon = document.querySelector('.battery-icon');
        if(level <0.10){
            batteryIcon.classList.add('fas', 'fa-battery-empty','tc-red')
        } else if(level <= 0.25){
            batteryIcon.classList.add('fas', 'fa-battery-quarter')
        } else if(level <=0.50){
            batteryIcon.classList.add('fas', 'fa-battery-half')
        }else if(level <=0.75){
            batteryIcon.classList.add('fas', 'fa-battery-three-quarters')
        } else{
            batteryIcon.classList.add('fas', 'fa-battery-full')
        }        
    });

    const date = new Date();
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const hour = 30*hours + minutes/2
    const minute = 6 * minutes
    const second = 6 * seconds
    


    if(hours >= 12){
        var period = 'pm'
    }else{
        var period = 'am'
    }
    document.querySelector('.med').innerHTML = period;
    document.querySelector('.hr').style.transform = `rotate(${hour}deg)`;
    document.querySelector('.min').style.transform = `rotate(${minute}deg)`;
    document.querySelector('.sec').style.transform = `rotate(${second}deg)`;


},900);

/* location */
let cityDom = document.querySelector('#city')

const findMyState = () =>{
    const status =  document.querySelector('.status');


    const success = (position) => {
        console.log(position);
        const latitude = /* 48.8620923 */ position.coords.latitude;
        const longitude = /* 2.3486797 */ position.coords.longitude;

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=it`

        fetch(geoApiUrl)
        .then(res => res.json())
        .then(data => {
            cityDom.innerHTML = `${data.localityInfo.administrative[3].name}`;
            console.log(data);
            console.log(`${data.localityInfo.administrative[3].name}`);
        }) 

        console.log(latitude); 

        var token = config.OPEN_WEATHER_TOKEN;

        const meteoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${token}&lang=it`

        fetch(meteoApi)
        .then(res => res.json())
        .then(data =>{
            let temp = data.main.temp;
            let celsius = Math.floor(temp - 273.15)
            let degree = document.querySelector('#degree').innerHTML = `${celsius}°`
            //cityDom.innerHTML = `${data.name}`
            console.log(data);
            
            var iconCode = data.weather[0].icon;            
            document.querySelector("#wicon").src =`http://openweathermap.org/img/w/${iconCode}.png`;
            
        })
        
    }

    const error = () =>{
        status.textContent = `Unable to retrieve your location`
    }
    navigator.geolocation.getCurrentPosition(success,error);
}
document.addEventListener('DOMContentLoaded', findMyState);


/* meteo */


let light = true
let morning = document.querySelector('.morning')
let night = document.querySelector('.night')
let container = document.querySelector('.container')
let toggleMode = document.querySelector('#toggle_mode')
let modalContent = document.querySelector('.modal-content')

function toggle() {
    
    morning.classList.toggle('toggle_active')
    night.classList.toggle('toggle_active')
    light = false
    container.classList.toggle('bg-dark')
    modalContent.classList.toggle('bg-dark')
    modalContent.classList.toggle('tc-gray')
}

morning.addEventListener('click', ()=>{
    toggle()
    toggleMode.innerHTML = 'DARK ON'    
})

night.addEventListener('click', ()=>{
    toggle()
    toggleMode.innerHTML = 'DARK OFF' 
    
})

navigator.getBattery().then(function (battery) {
    let level = battery.level;   
    /* console.log(battery.charging);      */
    document.querySelector('#battery').innerHTML = (Math.floor(level *  100)) + '%';
    let batteryIcon = document.querySelector('.battery-icon');
    if(battery.charging){
        batteryIcon.classList.add('fas', 'fa-solid', 'fa-bolt','tc-green')
    }
    if(level <=0.10){
        batteryIcon.classList.add('fas', 'fa-battery-empty','tc-red')
    } else if(level <= 0.25){
        batteryIcon.classList.add('fas', 'fa-battery-quarter')
    } else if(level <=0.50){
        batteryIcon.classList.add('fas', 'fa-battery-half')
    }else if(level <=0.80){
        batteryIcon.classList.add('fas', 'fa-battery-three-quarters')
    } else{
        batteryIcon.classList.add('fas', 'fa-battery-full')
    }        
});

const findMyState = () =>{
    
    let cityDom = document.querySelector('#city')
    const status =  document.querySelector('.status');
    const success = (position) => {
        /* console.log(position); */
        const latitude = /* 37.9908372 */ position.coords.latitude;
        const longitude = /* 23.7383394 */ position.coords.longitude;
        
        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=it`
        
        fetch(geoApiUrl)
        .then(res => res.json())
        .then(data => {
            
            function truncateCityName(cityName) {
                return cityName.length <= 21 ? cityName : cityName.substr(0,20) + '...'
            }
            
            cityDom.innerHTML = `${truncateCityName(data.localityInfo.administrative[3].name)}`;
            /* console.log(data); */
            /*  console.log(`${data.localityInfo.administrative[3].name}`); */
        })             
        
        const meteoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f99157b48e819831ffd36608e93d6d3b&units=metric&lang=it`
        
        fetch(meteoApi)
        .then(res => res.json())
        .then(meteo =>{
            /* actual temp */
            let temp = meteo.main.temp;
            let celsius = Math.floor(temp)
            let degree = document.querySelector('#degree').innerHTML = `${celsius}°`

            var iconCode = meteo.weather[0].icon;            
            document.querySelector("#wicon").src =`http://openweathermap.org/img/w/${iconCode}.png`;
            /* max temp */
            let maxTemp = meteo.main.temp_max;
            let maxC = Math.floor(maxTemp)            
            let max = document.querySelector('#max').innerHTML = ` ${maxC}°`;

            /* min temp */
            let minTemp = meteo.main.temp_min;
            let minC = Math.floor(minTemp)    
            let min = document.querySelector('#min').innerHTML = ` ${minC}°`;           
            
            /* sun  */
            function Time (timestamp){
                var date = new Date(timestamp * 1000);
              var hours = date.getHours();
              var minutes = "0" + date.getMinutes();
              var formattedTime = `${hours}:${minutes.substr(-2)}`;  
                return formattedTime
              }
            let sunrise = document.querySelector('#sunrise').innerHTML = ` ${Time(meteo.sys.sunrise)}`;
            let sunset = document.querySelector('#sunset').innerHTML = ` ${Time(meteo.sys.sunset)}`; 
            
            /* press */
            /* console.log(meteo); */
            let press = document.querySelector('#press').innerHTML = ` ${meteo.main.pressure} hPa`; 
            let windSpeed = (meteo.wind.speed).toFixed(1)
            let wind = document.querySelector('#wind').innerHTML = ` ${windSpeed} m/s `; 
            let hum = document.querySelector('#hum').innerHTML = ` ${meteo.main. humidity} %`; 

            let windIcon = document.querySelector('.fa-angles-down')
            /* console.log(meteo.wind.deg); */
            windIcon.style.transform = `rotate(${meteo.wind.deg}deg)`
            
           
                  
            
           
        
            
        })
        
        
        const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
        const dayNames = ["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"]
        
        setInterval(()=>{
            var d = new Date()
            var numData = d.getDate()
            var month = monthNames[d.getMonth()]
            var day = dayNames[d.getDay()]
            var year = d.getFullYear()
            var hours = d.getHours()
            var minutes = d.getMinutes()
            var seconds = d.getSeconds()
            
            const hour = 30*hours + minutes/2
            const minute = 6 * minutes
            const second = 6 * seconds 
            /* var gmtHours = -d.getTimezoneOffset()/60; */  
            
            let calendar = document.querySelector('#calendar')
            calendar.innerHTML = `${day}, ${numData} ${month} ${year}`
            
            /* interval  */
            
            
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
        
        
        
    }
    const error = () =>{
        alert(`Error`)
    }
    
    navigator.geolocation.getCurrentPosition(success,error);
}

document.addEventListener('DOMContentLoaded', findMyState);

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}







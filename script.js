let light = true
let morning = document.querySelector('.morning')
let night = document.querySelector('.night')
let container = document.querySelector('.container')
let toggleMode = document.querySelector('#toggle_mode')

function toggle() {
        
    morning.classList.toggle('toggle_active')
    night.classList.toggle('toggle_active')
    light = false
    container.classList.toggle('bg-dark')
}

morning.addEventListener('click', ()=>{
    toggle()
    toggleMode.innerHTML = 'DARK ON'    
})

night.addEventListener('click', ()=>{
    toggle()
    toggleMode.innerHTML = 'DARK OFF' 
             
})

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
            cityDom.innerHTML = `${data.localityInfo.administrative[3].name}`;
            /* console.log(data); */
           /*  console.log(`${data.localityInfo.administrative[3].name}`); */
        })             
        
        const meteoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f99157b48e819831ffd36608e93d6d3b&lang=it`
        
        fetch(meteoApi)
        .then(res => res.json())
        .then(data =>{
            let temp = data.main.temp;
            let celsius = Math.floor(temp - 273.15)
            let degree = document.querySelector('#degree').innerHTML = `${celsius}°`
            //cityDom.innerHTML = `${data.name}`
            /* console.log(data); */
            
            var iconCode = data.weather[0].icon;            
            document.querySelector("#wicon").src =`http://openweathermap.org/img/w/${iconCode}.png`;
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
        navigator.getBattery().then(function (battery) {
            let level = battery.level;   
            /* console.log;    */  
            document.querySelector('#battery').innerHTML = (Math.floor(level *  100)) + '%';
            let batteryIcon = document.querySelector('.battery-icon');
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
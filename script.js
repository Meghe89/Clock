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
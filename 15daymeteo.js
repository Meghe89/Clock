// napoli : lat -> 40.8517746 long: 14.2681244
//bologna : lat -> 44.494887 long: 11.3426163
fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=40.8517746&lon=14.2681244&appid=f99157b48e819831ffd36608e93d6d3b&units=metric&lang=it`)
.then(response=>response.json())
.then(data=>{
    let weatherDays = data.list;
    const city = data.city.name;
    const locationTitleSpan = document.querySelector('#location-title');
    locationTitleSpan.innerText = city;
    
    weatherDays.forEach(day => {
        const timestamp = day.dt;
        const weatherIcon = day.weather[0].icon;
        const weatherDescription = day.weather[0].description;
        const realTemp = day.main.temp;

        const monthNames = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
        const dayNames = ["Dom","Lun","Mar","Mer","Gio","Ven","Sab"];
        
        let date = new Date(timestamp * 1000);
        let dates = date.getDate();
        let days = dayNames[date.getDay()];
        let month = monthNames[date.getMonth()];
        let hours = date.getHours();

        let formattedTime = `${days} ${dates} ${month} ${hours}:00`



        const wrapper = document.querySelector('.card-wrapper');
        //wrapper.innerHTML = '';
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = 
        `
        <div class="title-container">
            <h4 class="card-title">${formattedTime}</h4>
        </div>
        <div class="img-container">
            <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="">
            <p class="meteo-description">${weatherDescription}</p>
            <h2 class="degrees">${realTemp.toFixed(1)}°</h3>
        </div>
        <div class="info-container">

        </div>
        `
        wrapper.appendChild(card);
    });
})

/* <div class="card">
            
        </div> */
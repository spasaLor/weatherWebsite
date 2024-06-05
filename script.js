let selectedUnit='c';

async function getWeatherData(){
    let weatherData={};
    let key='f58b33c8c9af4504a9b133344240406';
    let urlForecast='http://api.weatherapi.com/v1/forecast.json?'
    let location=input.value;

    res=await fetch(urlForecast+'key='+key+'&days=3&q='+location+'&aqi=no', {mode: 'cors'});
    weatherData= await res.json();
    console.log(weatherData);
    return weatherData;
}
async function buildDataInfo(){
    const out = await getWeatherData();
    let usefulInfo = {};
    usefulInfo.current = out.current;
    usefulInfo.today = out.forecast.forecastday[0].day;
    usefulInfo.astro= out.forecast.forecastday[0].astro;
    usefulInfo.tomorrow= [out.forecast.forecastday[1].date,out.forecast.forecastday[1].day];
    usefulInfo.dayAfter= [out.forecast.forecastday[2].date,out.forecast.forecastday[2].day];
    usefulInfo.forecast = {};
    usefulInfo.forecast.six = [out.forecast.forecastday[0].hour[6].condition.icon, out.forecast.forecastday[0].hour[6].temp_c, out.forecast.forecastday[0].hour[6].temp_f];
    usefulInfo.forecast.nine = [out.forecast.forecastday[0].hour[9].condition.icon, out.forecast.forecastday[0].hour[9].temp_c, out.forecast.forecastday[0].hour[9].temp_f];
    usefulInfo.forecast.twelve = [out.forecast.forecastday[0].hour[12].condition.icon, out.forecast.forecastday[0].hour[12].temp_c, out.forecast.forecastday[0].hour[12].temp_f];
    usefulInfo.forecast.fifteen = [out.forecast.forecastday[0].hour[15].condition.icon, out.forecast.forecastday[0].hour[15].temp_c, out.forecast.forecastday[0].hour[15].temp_f];
    usefulInfo.forecast.eighteen = [out.forecast.forecastday[0].hour[18].condition.icon, out.forecast.forecastday[0].hour[18].temp_c, out.forecast.forecastday[0].hour[18].temp_f];
    usefulInfo.forecast.twentyone = [out.forecast.forecastday[0].hour[21].condition.icon, out.forecast.forecastday[0].hour[21].temp_c, out.forecast.forecastday[0].hour[21].temp_f];
    usefulInfo.cityName = out.location.name;
    return usefulInfo;
    
}

function buildUI(){
    const rain=document.querySelector('.city-info p');
    const img=document.querySelector('.first-row img');
    const temperature=document.querySelector('.temperature');
    const city=document.querySelector('.city-name');
    const weatherItems=document.querySelectorAll('.weather-item');
    const cond=document.querySelectorAll('.condition-item');
    const sideItems=document.querySelectorAll('.side-item');
    const astroItems=document.querySelectorAll('.astro-item');

    buildDataInfo().then((dataInfo)=>{        
        const temps=[dataInfo.current.temp_c,dataInfo.current.temp_f];
        selectedUnit==='c' ? temperature.innerText=temps[0]+'°C' : temperature.innerText=temps[1]+'°F';
        rain.innerText='Chance of rain: '+dataInfo.today.daily_chance_of_rain+"%";
        city.innerText=dataInfo.cityName;
        img.src=dataInfo.today.condition.icon;

        weatherItems[0].querySelector('.time').innerText='6:00 AM';
        weatherItems[0].querySelector('img').src=dataInfo.forecast.six[0];
        if(selectedUnit==='c'){
            weatherItems[0].querySelector('.temp').innerText=Math.round(dataInfo.forecast.six[1]);
            weatherItems[1].querySelector('.temp').innerText=Math.round(dataInfo.forecast.nine[1]);
            weatherItems[2].querySelector('.temp').innerText=Math.round(dataInfo.forecast.twelve[1]);
            weatherItems[3].querySelector('.temp').innerText=Math.round(dataInfo.forecast.fifteen[1]);
            weatherItems[4].querySelector('.temp').innerText=Math.round(dataInfo.forecast.eighteen[1]);
            weatherItems[5].querySelector('.temp').innerText=Math.round(dataInfo.forecast.twentyone[1]);

            sideItems[0].querySelector('.temps').textContent=Math.round(dataInfo.today.maxtemp_c)+"/"+Math.round(dataInfo.today.mintemp_c);
            sideItems[1].querySelector('.temps').textContent=Math.round(dataInfo.tomorrow[1].maxtemp_c)+"/"+Math.round(dataInfo.today.mintemp_c);
            sideItems[2].querySelector('.temps').textContent=Math.round(dataInfo.dayAfter[1].maxtemp_c)+"/"+Math.round(dataInfo.today.mintemp_c);
        }else{
            weatherItems[0].querySelector('.temp').innerText=Math.round(dataInfo.forecast.six[2]);
            weatherItems[1].querySelector('.temp').innerText=Math.round(dataInfo.forecast.nine[2]);
            weatherItems[2].querySelector('.temp').innerText=Math.round(dataInfo.forecast.twelve[2]);
            weatherItems[3].querySelector('.temp').innerText=Math.round(dataInfo.forecast.fifteen[2]);
            weatherItems[4].querySelector('.temp').innerText=Math.round(dataInfo.forecast.eighteen[2]);
            weatherItems[5].querySelector('.temp').innerText=Math.round(dataInfo.forecast.twentyone[2]);

            sideItems[0].querySelector('.temps').textContent=Math.round(dataInfo.today.maxtemp_f)+"/"+Math.round(dataInfo.today.mintemp_f);
            sideItems[1].querySelector('.temps').textContent=Math.round(dataInfo.tomorrow[1].maxtemp_f)+"/"+Math.round(dataInfo.today.mintemp_f);
            sideItems[2].querySelector('.temps').textContent=Math.round(dataInfo.dayAfter[1].maxtemp_f)+"/"+Math.round(dataInfo.today.mintemp_f);
        }
        weatherItems[1].querySelector('.time').innerText='9:00 AM';
        weatherItems[1].querySelector('img').src=dataInfo.forecast.nine[0];
        weatherItems[2].querySelector('.time').innerText='12:00 AM';
        weatherItems[2].querySelector('img').src=dataInfo.forecast.twelve[0];
        weatherItems[3].querySelector('.time').innerText='3:00 PM';
        weatherItems[3].querySelector('img').src=dataInfo.forecast.fifteen[0];
        weatherItems[4].querySelector('.time').innerText='6:00 PM';
        weatherItems[4].querySelector('img').src=dataInfo.forecast.eighteen[0];
        weatherItems[5].querySelector('.time').innerText='9:00 PM';
        weatherItems[5].querySelector('img').src=dataInfo.forecast.twentyone[0];

        cond[0].querySelector('.data').innerText=dataInfo.current.feelslike_c;
        cond[1].querySelector('.data').innerText=dataInfo.current.wind_kph+" Km/h";
        cond[2].querySelector('.data').innerText=dataInfo.current.humidity+'%';
        cond[3].querySelector('.data').innerText=dataInfo.current.uv; 

        sideItems[0].querySelector('.day').textContent='Today';
        sideItems[0].querySelector('img').src=dataInfo.today.condition.icon;
        sideItems[0].querySelector('.weather').textContent=dataInfo.today.condition.text;
        let date = new Date(dataInfo.tomorrow[0]);
        sideItems[1].querySelector('.day').textContent=date.getDate()+"/"+("0" + (date.getMonth() + 1)).slice(-2);
        sideItems[1].querySelector('img').src=dataInfo.tomorrow[1].condition.icon;
        sideItems[1].querySelector('.weather').textContent=dataInfo.tomorrow[1].condition.text;
        date = new Date(dataInfo.dayAfter[0]);
        sideItems[2].querySelector('.day').textContent=date.getDate()+"/"+ ("0" + (date.getMonth() + 1)).slice(-2);
        sideItems[2].querySelector('img').src=dataInfo.dayAfter[1].condition.icon;
        sideItems[2].querySelector('.weather').textContent=dataInfo.dayAfter[1].condition.text;

        astroItems[0].querySelector('#time').textContent=dataInfo.astro.sunrise;
        astroItems[1].querySelector('#time').textContent=dataInfo.astro.sunset;
    });   
}

let input=document.querySelector('input');
let radios=document.getElementsByName('unit');

function setSelectedUnit(){
    for(let radio of radios){
        if(radio.checked){
            selectedUnit=radio.value;
            break;
        }
   }
   buildUI();
}
radios.forEach((elem) =>{
    elem.addEventListener('click',setSelectedUnit);
});
console.log(selectedUnit);
input.addEventListener('change', buildUI);


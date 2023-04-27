const limit="5"
const apiKey="bf6289b2f34b23ad53f7ce96e5a7955d";

let cityEle = document.getElementById("city");
let stateEle = document.getElementById("state");
let countryEle = document.getElementById("country");
let formEle = document.getElementById("submit");
let tempele=document.getElementById("temp");
let weatherele=document.getElementById("weather");

async function getCityWeather(cityName,stateName,countryName){

    const oneCallUrl=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName},${countryName}&limit=${limit}&appid=${apiKey}`

    let res= await fetch(oneCallUrl)
    let data= await res.json();
    let dataObj=data[0];
    
    console.log(dataObj);
    let lat=dataObj.lat;
    let lon=dataObj.lon;
    let city = dataObj.name;
    let state = dataObj.state;
    let country = dataObj.country;
    
    let cityEl=document.getElementById("cityName");
    let stateEl=document.getElementById("stateName");
    let countryEl=document.getElementById("CountryName");
    cityEl.textContent=city;
    stateEl.textContent=state;
    countryEl.textContent=country;
    
    updateWeather(lat,lon);
    
}
//getCityWeather();
async function updateWeather(lat,lon){ 
    const currentUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    let res= await fetch(currentUrl);
    let data= await res.json();
    let dataObj=data;
   // console.log(dataObj);
    let temp=dataObj.main.temp;
    tempele.textContent=temp;
    let weather=dataObj.weather[0].description;
    weatherele.textContent=weather;
    let iconId=dataObj.weather[0].icon;
    let iconUrl=` https://openweathermap.org/img/wn/${iconId}@4x.png`;
    let imgId=document.getElementById("Icon");
    imgId.src=iconUrl;
}
let savedLocation=[];
function savedLocal(city,state,country){
    let location={
        city:city,
        state:state,
        country:country,
        time:new Date().toLocaleTimeString()
    }
    savedLocation.push(location)
    //console.log(location);
    console.log(savedLocation);
}

formEle.addEventListener("click",(event)=>{
    event.preventDefault();
    let checkbox = document.getElementById("checkbox");
    getCityWeather(cityEle.value,stateEle.value,countryEle.value);
    //console.log(checkbox.checked)
    if (checkbox.checked){
        savedLocal(cityEle.value,stateEle.value,countryEle.value)}

    listedAreas();
  });
  function listedAreas(){
    let ul = document.getElementById("saved")
    let locationClass=document.getElementsByClassName("location")
    Array.from(locationClass).forEach(e=>e.remove())
    savedLocation.forEach((location) => {
      let li = document.createElement("li")
      li.classList.add("location");
      li.textContent = `${location.city}, ${location.state},${location.country} ${location.time}`
      
      li.addEventListener("click", () => {getCityWeather(location.city,location.state,location.time)})
      ul.appendChild(li)
    })
    //console.log(ul);
  }
 
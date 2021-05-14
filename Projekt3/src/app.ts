export class App {
    opwApiKey = '6c1a04409b8b3c406d3c24d219370557';
    btn: HTMLButtonElement;
    city: string;
    cardsContainer: HTMLDivElement;
    pictures: Map<string,string>;
    constructor() {
        this.getInput();
        this.addListener();
        this.getCityInfo();
        this.pictures = new Map<string,string>();
        this.pictures.set("clear sky",'./assets/sun.jpg');
        this.pictures.set("few clouds",'./assets/cloud.png');
        this.pictures.set("scattered clouds",'./assets/cloud.png');
        this.pictures.set("shower rain",'./assets/rain.png');
        this.pictures.set("thunderstorm",'./assets/rain.png');
        this.pictures.set("snow",'./assets/snow.jpg');
        this.pictures.set("mist",'./assets/cloud.png');
        this.pictures.set("overcast clouds",'./assets/cloud.png');
        this.pictures.set("broken clouds",'./assets/cloud.png');
    }
     getInput = () =>{
    this.btn = document.querySelector('button');
    this.cardsContainer = document.querySelector('#ShowCity');
    }
    addListener = () =>{
        this.btn.addEventListener('click', () => this.getCityInfo());
        }
    async getCityInfo() {
        this.city = document.querySelector('input').value;
        document.querySelector('input').value = '';
        const weather = await this.getWeather();
        this.saveData(weather);
    }
    Celcius(val: number){
        return val - 273.15;
    }  
    async getWeather() {
        let getElem = document.querySelector("#ShowCity");
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this.opwApiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        let icon = weatherData.weather[0]['description'];
        let imgsrc = this.pictures.get(icon);
        if(imgsrc == null)
        {
            imgsrc = "./assets/sad.jpg";
        }
        console.log(imgsrc);
        console.log(weatherData);
        let WeatherDiv= `<div class="weatherInfo"><h2>`+this.city+`</h2> 
        <h4>{`+weatherData.coord.lon+`,`+weatherData.coord.lat+`}</h4>
        <img src=`+imgsrc+`>
        <br/>Weather:
        <br/>Temp{`+this.Celcius(weatherData.main.temp).toString().substr(0,5)+`C ,`+weatherData.main.temp+`K }
        <br/>Clouds: `+weatherData.clouds.all+`%`+`
        <br/>Wind{speed: `+weatherData.wind.speed+`, degree:`+weatherData.wind.deg+`}
        <br/>Visibility: `+weatherData.visibility.toString().substr(0,3)+`%`+` 
        <br/>Pressure: `+weatherData.main.pressure+` hPa
        `;
        getElem.innerHTML += WeatherDiv;
    }
    saveData(data: any) {
        localStorage.setItem('weatherData', JSON.stringify(data));
    }
    getData() {
        const data = localStorage.getItem('weatherData');
        if (data) {
            return JSON.parse(data);
        } else {
            return {};
        }
    }
  
}
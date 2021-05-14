export class App {
    opwApiKey = '6c1a04409b8b3c406d3c24d219370557';
    btn: HTMLButtonElement;
    city: string;
    cardsContainer: HTMLDivElement;
    constructor() {
        this.getInput();
        this.addListener();
        this.getCityInfo();
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
        console.log(weatherData);
        let WeatherDiv= `<div class="weatherInfo"><h2>`+this.city+`</h2> 
        <h4>{`+weatherData.coord.lon+`,`+weatherData.coord.lat+`}</h4>
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
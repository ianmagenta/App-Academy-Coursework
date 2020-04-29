import React from "react";

class Weather extends React.Component {
    constructor() {
        super();

        this.state = {
            weather: { main: {} },
        };
    }

    componentDidMount() {
        const success = (res) => {
            const lat = Math.round(res.coords.latitude);
            const long = Math.round(res.coords.longitude);
            this.pollWeather(lat, long);
        }
        navigator.geolocation.getCurrentPosition(success);
    }

    pollWeather(lat, lon) {
        const api = "eaf7e0b8fa2c7897e30625c03c6f7b0e"
        fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${api}&units=imerpial`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ weather: data })
            });
    }

    render() {
        return (
            <div className="weather">
                <h1 className="weather__title">Weather</h1>
                <div>Current City: {this.state.weather.name}</div>
                <div>Temperature: {this.state.weather.main.temp} °F</div>
            </div>
        );
    }
}


export default Weather;

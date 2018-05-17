import React from 'react';
import Titles from "./Components/Titles";
import Form from './Components/Form';
import Weather from './Components/Weather';

const API_KEY = 'd17366fea27a7cbde7b79888b5daf863';

class App extends React.Component {
	state = {
		temperature: undefined, 
		city: undefined,
		country: undefined, 
		humidity: undefined,
		description: undefined, 
		error: undefined 
	}
	getWeather = async (event) => {
		event.preventDefault();
		const city = event.target.elements.city.value;
		const country = event.target.elements.country.value;
		const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
		const data = await api_call.json();
		if (city && country) {
			this.setState({
			temperature: data.main.temp,
			city: data.name,
			country: data.sys.country,
			humidity: data.main.humidity,
			description: data.weather[0].description,
			error: ""
		});
		} else {
			this.setState({
			temperature: undefined, 
			city: undefined,
			country: undefined, 
			humidity: undefined,
			description: undefined, 
			error: "Please enter Values" 
			});
			}
	} //end getWeather func

  render () {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}; //end class App 

          


export default App;
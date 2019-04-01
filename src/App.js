import React from 'react'; 
 
import Title from './components/Title'; 
import Form from './components/Form'; 
import Weather from './components/Weather'; 


const API_KEY = "df5e505d294be3058dc0eccc363822b7"; 


class App extends React.Component {



  state = {
    temperature: undefined, 
    city: undefined, 
    country: undefined, 
    humidity: undefined, 
    description: undefined, 
    error: undefined
  }

getWeather =  async (event) => {
  event.preventDefault(); 
  const city = event.target.elements.city.value; 
  const country = event.target.elements.country.value; 
  const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`); 
  const data = await api.json();

  console.log(data); 

  if (city && country ) {

  this.setState({
    temperature: data.main.temp, 
    city: data.name, 
    country: data.sys.country, 
    humidity: data.main.humidity, 
    description: data.weather[0].description, 
    error: ''
  }); 
  } else {
    this.setState({
    temperature: undefined, 
    city: undefined, 
    country: undefined, 
    humidity: undefined, 
    description: undefined, 
    error: "Mate, you gotta chose something"


    })
  }
}

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Title />
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
}

export default App; 
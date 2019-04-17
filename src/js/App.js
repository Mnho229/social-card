import React, { Component } from 'react';
import '../sass/App.sass';
import example from '../images/example.jpg'
import { API_KEY } from './API_KEY.js';

class SocialCard extends React.PureComponent {
	render() {
		return (
			<div className="sc-contain">
				<img className="sc-img" alt="example" src={this.props.image} />
				<div className="sc-desc">
					<h4 className="sc-desc-h">{this.props.descH}</h4>
					<p className="sc-desc-p">{this.props.descP}</p>
				</div>
			</div>
		);
	}
}

class WeatherCard extends React.PureComponent {
	
	handleHoverCard(event) {
		event.currentTarget.querySelector('.wc-temp').classList.toggle('hoverTemp');
	}

	render() {
		return (
				<div className="wc-contain" onMouseEnter={this.handleHoverCard} onMouseLeave={this.handleHoverCard}>
					<p className="wc-day">{this.props.day}</p>
					<p className="">{this.props.time}</p>
					<img className="wc-img" src={this.props.img} />
					<p className="wc-temp">
						<span className="wc-temp-high">{this.props.temp.high.toFixed(0)}</span>
						<span className="wc-temp-low">{this.props.temp.low.toFixed(0)}</span>
					</p>
				</div>
		);
	}
}

class WeatherRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			day: [],
			time: [],
			imgURL: [],
			temp: [],
			data: {}
		}
	}
	componentDidMount() {
		this._fetchWeatherByZip().then(data => 
			this.setState({
				data: data.list,
				temp: data.list.map((value, index) => {
					const dataContain = value.main;
					return {
						high: dataContain.temp_max,
						low: dataContain.temp_min
					}
				}),
				day: data.list.map((value, index) => {
					return this._weatherDay(value.dt);
				}),
				time: data.list.map((value, index) => {
					return this._weatherTime(value.dt);
				}),
				imgURL: data.list.map((value, index) => {
					return this._weatherImg(value.weather['0'].icon);
				})
			})
		);
	}

	async _fetchWeatherByZip() {
		let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=10001,us&cnt=28&units=imperial&APPID=${API_KEY}`);
		return res.json();
	}

	_weatherDay(timestamp) {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const date = new Date(timestamp*1000);
		return days[date.getDay()];
	}

	_weatherTime(timestamp) {
		const date = new Date(timestamp*1000);
		return date.getHours() + ":00"; 
	}

	_weatherImg(imgID) {
		return "http://openweathermap.org/img/w/" + imgID + ".png";
	}

	render() {
		console.log(this.state.data);
		let cards = this.state.temp.map((value, index) => {
			return (
				<WeatherCard 
					key={index} 
					day={this.state.day[index]} 
					time={this.state.time[index]} 
					img={this.state.imgURL[index]} 
					temp={this.state.temp[index]} 
				/>
			);
		});

		return (
			<section className="w-row">{cards}</section>
		);
	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			img1: example,
			descH1: "The Example of the Decades",
			descP1: "Bear witness to the growing century of the new world!  Come check it out today!"
		}
	}
	render() {
		return (
			<div className="App">
				<h1>Regular Social Card</h1>
				<SocialCard image={this.state.img1} descH={this.state.descH1} descP={this.state.descP1} />
				<h1>Weather Cards</h1>
				<p className="w-intro">Please hover over the cards to see the maximum and minimum temperatures.</p>
				<WeatherRow />
			</div>
		);
	}
}

export default App;

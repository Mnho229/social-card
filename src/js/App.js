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
	
	render() {
		return (
				<div className="wc-contain">
					<p className="wc-day">{this.props.day}</p>
					{/* <img className="wc-img" src="" /> */}
					<div className="wc-example-img"></div>
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
			temp: [],
			data: {}
		}
	}
	componentDidMount() {
		this.loadWeatherByZip().then(data => 
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
				})
			})
		);
	}

	async loadWeatherByZip() {
		let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=40509,us&cnt=30&units=imperial&APPID=${API_KEY}`);
		return res.json();
	}

	_weatherDay(timestamp) {
		const days = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat'];
		const date = new Date(timestamp*1000);
		console.log(timestamp, date);
		return days[date.getDay()];
	}

	render() {
		console.log(this.state.data);
		console.log(this.state.temp);

		let cards = this.state.temp.map((value, index) => {
			return (
				<WeatherCard key={index} day={this.state.day[index]} temp={this.state.temp[index]} />
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
				<WeatherRow />
			</div>
		);
	}
}

export default App;

import React, { Component } from 'react';
import '../sass/App.sass';
import example from '../images/example.jpg'

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
						<span className="wc-temp-high">{this.props.temp.high}</span>
						<span className="wc-temp-low">{this.props.temp.low}</span>
					</p>
				</div>
		);
	}
}

class WeatherRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			day: ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun'],
			temp: [
				{high: 80, low: 67},
				{high: 81, low: 65},
				{high: 78, low: 63},
			]
		}
	}
	componentDidMount() {

	}

	render() {
		return (
			<section className="w-row">
				<WeatherCard day={this.state.day[0]} temp={this.state.temp[0]} />
				<WeatherCard day={this.state.day[1]} temp={this.state.temp[1]} />
				<WeatherCard day={this.state.day[2]} temp={this.state.temp[2]} />
			</section>
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

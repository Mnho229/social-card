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
			</div>
		);
	}
}

export default App;

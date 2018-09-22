const React = require('react');
const ReactDOM = require('react-dom');
require('./index.css')

function WatchList(props) {
	const streamers = ['relaxbeats', 'freecodecamp', 'funfunfunction', 'anathug_', '24_7_chill_piano'];
	return (
		streamers.map((streamer) =>
			<li key={streamer} onClick={() => props.onWatch(streamer)}>{streamer}</li>
		)
	)
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			streamers: [],
		}

		this.handleWatchList = this.handleWatchList.bind(this);
	}

	handleWatchList(streamer) {
		console.log(streamer)
		this.setState({
			streamers: streamer,
		})
	}

	render() {
		return (
			<div>
				<WatchList onWatch={this.handleWatchList}/>
			</div>
		)
	}
}

ReactDOM.render( <App />, document.getElementById('app') )
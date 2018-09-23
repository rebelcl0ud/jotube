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

function StreamerDeets(props) {
	// display stream deets
	return (
		<div>
			<ul>
				{props.streams.map(({display_name, login, description, view_count, profile_image_url}) => (
					<ul key={display_name}>
						<img src={profile_image_url}/>
						<li><a href=''>{display_name}</a></li>
						<li>{description}</li>
						<li>{view_count}</li>
					</ul>
				))}
			</ul>
		</div>

	)
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			streamers: ['relaxbeats'],
			streams:[],
		}

		this.handleWatchList = this.handleWatchList.bind(this);
		this.fetchStreamerData = this.fetchStreamerData.bind(this);
	}

	componentDidUpdate(prevProp, prevState) {
		if(this.state.streamers !== prevState.streamers) {
			this.fetchStreamerData(this.state.streamers)
		}
	}

	componentDidMount() {
		this.fetchStreamerData(this.state.streamers);
	}

	fetchStreamerData(streamer) {
		// calls API
		const clientID = 'aoduqmn77opdqjxy9aqirf976btdpk'; // can be public
	
		fetch(`https://api.twitch.tv/helix/users?login=${streamer}`, { headers: {'Client-ID': clientID}})
			.then((data) => data.json())
			.then((streams) => {
				// console.log(streams)
					this.setState({
						streams: streams.data,
					})
			})
	}

	handleWatchList(streamer) {
		// console.log(streamer)
		this.setState({
			streamers: streamer,
		})
	}

	render() {
		return (
			<div>
				<WatchList onWatch={this.handleWatchList}/>
				<StreamerDeets streams={this.state.streams}/>
			</div>
		)
	}
}

ReactDOM.render( <App />, document.getElementById('app') )
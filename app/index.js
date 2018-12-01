const React = require('react');
const ReactDOM = require('react-dom');
require('./index.css')

/**

**/

// function WatchList(props) {
// 	const streamers = ['relaxbeats', 'freecodecamp', 'funfunfunction', 'anathug_', '24_7_chill_piano'];
	
// 	return (
// 		streamers.map((streamer) => 
// 			<li key={streamer} onClick={() => props.onWatch(streamer)}>{streamer}</li>	
// 		)
// 	)
// }

const Navbar = () => {
	return (
		<nav class="navbar navbar-dark mb-5">
			<span className='navbar-brand mb-0 h1'>joTube</span>
		</nav>
	)
}

function StreamerDeets(props) {
	// display stream deets
	return (
		<div className='row'>
			<div className='col-md-8'>
				<div className='card-mb-4 shadow-sm'>
					<div className='card-body'>
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
				</div>
			</div>
		</div>
	)
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			streamers: ['relaxbeats'],
			streams:[],
			onlineID: [],
		}

		// this.handleWatchList = this.handleWatchList.bind(this);
		this.fetchStreamerData = this.fetchStreamerData.bind(this);
	}

	componentDidCatch(error, info) {
		console.error(error);
		console.warn(info);
	}

	componentDidUpdate(prevProp, prevState) {
		console.log('componentDidUpdate called')
		if(this.state.streamers !== prevState.streamers) {
			this.fetchStreamerData(this.state.streamers)
		}
	}

	componentDidMount() {
		console.log('componentDidMount called')
		this.fetchStreamerData(this.state.streamers);
	}

	fetchStreamerData(streamer) {
		// calls API [user]
		const clientID = 'aoduqmn77opdqjxy9aqirf976btdpk'; // can be public
		fetch(`https://api.twitch.tv/helix/users?login=${streamer}`, { headers: {'Client-ID': clientID}})
			.then((res) => res.json())
			.then((streams) => {
				console.log(streams.data)
					this.setState({
						streams: streams.data,
					})

					return fetch(`https://api.twitch.tv/helix/streams?user_login=${streamer}`, { headers: {'Client-ID': clientID}})
			})
			.then((res) => res.json())
			.then((streaming) => {
				console.log(streaming.data)
			// 	streaming.data.map(({type, user_id}) => {
			// 		if(type == 'live') {
			// 			this.setState({
			// 				onlineID: user_id
			// 			})
			// 		}
			// 	})
			})
			.catch((err) => {
				console.error(err);
			})
			
	}


	// handleWatchList(streamer) {
	// 	// console.log(streamer)
	// 	this.setState({
	// 		streamers: streamer,
	// 	})
	// }

	// removed below: <WatchList onWatch={this.handleWatchList}/>

	render() {
		return (
			
			<div className='container'>
				<StreamerDeets streams={this.state.streams}/>
			</div>
		)
	}
}

ReactDOM.render( <Navbar />, document.getElementById('nav') )
ReactDOM.render( <App />, document.getElementById('app') )
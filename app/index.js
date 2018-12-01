const React = require('react');
const ReactDOM = require('react-dom');
require('./index.css')

/**
	<img src={profile_image_url}/>
	<li><a href=''>{display_name}</a></li>
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
		<nav className="navbar navbar-dark mb-5">
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
						<ul className='list-group list-group-flush'>
							{props.streams.map(({language, started_at, title, type, user_name, viewer_count}) => (
								<ul key={user_name}>
									<h5 className='card-header'>{user_name} | <span className='card-subtitle text-muted'>{title}</span></h5>
									<li className='list-group-item'>Language: {language}</li>
									{type === 'live' ? <li className='list-group-item'>Status: LIVE 📺</li> : <li className='list-group-item'>Status: seems to be offline ¯|_(ツ)_/¯</li>}
									<li className='list-group-item'>Viewer Count: {viewer_count}</li>
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
			user: [],
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
		fetch(`https://api.twitch.tv/helix/streams?user_login=${streamer}`, { headers: {'Client-ID': clientID}})
			.then((res) => res.json())
			.then((streams) => {
				// console.log(streams.data)
					this.setState({
						streams: streams.data,
					})

					return fetch(`https://api.twitch.tv/helix/users?login=${streamer}`, { headers: {'Client-ID': clientID}})
			})
			.then((res) => res.json())
			.then((user) => {
				console.log(user.data)
					// user.data.map(({description, id, profile_image_url}) => {
						// if(type == 'live') {
							this.setState({
								user: user.data
							})
						// }
					// })
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
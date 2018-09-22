const React = require('react');
const ReactDOM = require('react-dom');
require('./index.css')

function WatchList() {
	const streamers = ['relaxbeats', 'freecodecamp', 'funfunfunction', 'anathug_', '24_7_chill_piano'];
	return (
		streamers.map((streamer) =>
			<li key={streamer}>{streamer}</li>
		)
	)
}

class App extends React.Component {
	render() {
		return (
			<div>
				<WatchList />
			</div>
		)
	}
}

ReactDOM.render( <App />, document.getElementById('app') )
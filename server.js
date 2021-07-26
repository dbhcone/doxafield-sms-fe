const express = require("express");
const path = require("path");

const app = express();

// serve only the static files from the dist directory
app.use(express.static('./dist/fe'));

app.get('/*', (req, res) => {
	res.sendFile('index.html', {root: 'dist/fe/'});
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
app.on('listening', () => {
	console.log('App has started');
})
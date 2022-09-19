const app = require('./app');
const ws = require('./app-ws');
const http = require('http').createServer(app);
const io = ws(http);

app.set('io', io);

http.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening to ${process.env.PORT}`);
});



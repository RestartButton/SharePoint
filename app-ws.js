module.exports = (server) => {
    const { Server } = require('socket.io');
    const io = new Server(server);
    const clients = new Map();

    io.on('connection', (ws) => {
        const id = uuidv4();
        const color = Math.floor(Math.random() * 360);
        const metadata = { id, color };

        clients.set(ws, metadata);
    
        ws.on('message', data => {
            const message = JSON.parse(data);
            const metadata = clients.get(ws);

            message.sender = metadata.id;
            message.color = metadata.color;

            const outbound = JSON.stringify(message);

            io.emit('message', outbound);
        });

        ws.on('disconnect', () => {
            var message = {};
            const metadata = clients.get(ws);
            message.sender = metadata.id;
            message.color = metadata.color;

            const outbound = JSON.stringify(message);

            io.emit('close', outbound);
            clients.delete(ws);
            console.log(`onClose: client disconnected!`);
        });
    });

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    console.log(`App Web Socket Server is runnig!`);
    return io;
}
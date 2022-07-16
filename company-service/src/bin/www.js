import 'core-js/stable';
import 'regenerator-runtime/runtime';
import http from 'http';
import debugLib from 'debug';
import {app} from '../app';

const debug = debugLib('ecma6-express:server');

const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }

    return false;
};

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const address = server.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
    console.log(`Listening on ${bind} 🚀`);
};

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

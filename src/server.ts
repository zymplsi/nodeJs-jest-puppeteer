import http from 'http';
import mysql from 'mysql';
import socket from 'socket.io';
import config from './config.json';

import { app } from './app';
import { socketIO } from './socket-io';

/** my sql connection */
const connection = mysql.createConnection({
  host: config.mysql.host,
  password: config.mysql.password,
  user: config.mysql.user
});

/** connect db and and start server and socketIO */
connection.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  const server = http.createServer(app).listen(config.port);
  const io = socket(server);
  socketIO(io);

  console.log(`server is running at port ${config.port} `);
  console.log('db connected as id ' + connection.threadId);
});

export const db = connection;

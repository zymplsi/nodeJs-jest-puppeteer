import { Server } from 'socket.io';
import config from './config.json';

import { db } from './server';

export const socketIO = (io: Server) => {
  /** store for connections */
  const connections = new Map();
  /** set max connections allowed for user */
  const maxConnections = process.env.MAX_CONNECTION || config['max-connection'];

  io.on('connection', socket => {
    /** use socketId as the room name and connection reference */
    socket.join(socket.id, () => {

      /** store the connection */
      connections.set(socket.id, null);
      console.info('max-connections', maxConnections);
      console.info('current-connections', connections.size);

      /** disconnect this connection is max connection exceeded */
      if (connections.size > maxConnections) {
        io.to(socket.id).emit(
          'user-limit-reached',
          'max user limit has been reached!'
        );
        socket.disconnect();
      }
    });

    /** process the SQL query send from the browser */
    socket.on('query-send', message => {

      /** process sql query */
      db.query(message, (err, results, fields) => {
        if (err) {
          io.to(socket.id).emit('query-error', err);
        }
        io.to(socket.id).emit('query-result', results);
      });
    });

    /** browser closes, disconnect and update store */
    socket.on('disconnect', () => {
      connections.delete(socket.id);
    });
  });
};

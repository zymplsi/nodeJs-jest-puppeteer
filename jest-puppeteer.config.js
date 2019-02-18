module.exports = {
  launch: {
    headless: true
  },
  server: {
    command: 'MAX_CONNECTION=2 ts-node src/server.ts',
    protocol: 'http',
    port: 3100,
    launchTimeout: 30000,
    debug: true
  }
};

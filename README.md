#NODE JS Assessment

## Background

A browser with a form for user to send a SQL query to a NodeJS Server for processing;

#### Install

```sh
$ git clone https://github.com/zymplsi/nodeJs-jest-puppeteer.git
$ cd nodeJs-jest-puppeteer
$ npm install
$ npm run start:dev
```

Launch the browser to http://localhost:3100

#### Local DB setup (MacOS)

1. install MySQL
   https://dev.mysql.com/downloads/mysql/
2. Set the MySQL connection to the app. The json file for the database connection configuration can be found at src/config.json

```json
{
  "host": "localhost",
  "user": "root",
  "password": "password"
}
```

4.  Start the MySQL server before starting the NodeJS server.


#### Integration Test

Run the integration test with command below

```sh
$ npm run test
```

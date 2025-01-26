import __colors from 'colors';
import configEnv from '@config';

const username = encodeURIComponent(configEnv.nosql.username);
const password = encodeURIComponent(configEnv.nosql.password);
const database = configEnv.nosql.database;

const uri = `mongodb+srv://${username}:${password}@cluster0.z1rlzqm.mongodb.net/${database}?retryWrites=true&w=majority`;
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

module.exports = { uri, clientOptions };

require('colors');
import configEnv from '@config';

const username = encodeURIComponent(configEnv.nosql.username);
const password = encodeURIComponent(configEnv.nosql.password);

const uri = `mongodb+srv://${username}:${password}@cluster0.z1rlzqm.mongodb.net/chat_app?retryWrites=true&w=majority`;
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

module.exports = { uri, clientOptions };

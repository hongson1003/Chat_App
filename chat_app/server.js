import config from '@config';
import { appKeys } from '@constants';
import app from './app';
import setupSocket from './socket';

app.set(appKeys.PORT, config.port || 8096);

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`.rainbow);
});

setupSocket(server);

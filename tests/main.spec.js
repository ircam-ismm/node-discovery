import { assert } from 'chai';

import { DiscoveryClient, DiscoveryServer, BROADCAST_PORT } from '../src/index.js';

const VERBOSE = false;

const clientConfig = {
  verbose: VERBOSE,
  port: BROADCAST_PORT + 1, // do not use same port as server locally
  payload: { hostname: `coucou.local` },
};

const serverConfig = {
  verbose: VERBOSE,
}

describe('@ircam/node-discovery', () => {
  describe('#start/stop', () => {
    it(`client.stop should stop properly (do not block process)`, async () => {
      const client = new DiscoveryClient(clientConfig);
      client.start();

      await new Promise(resolve => setTimeout(resolve, 100));

      // client.stop();
    });

    it(`server.stop should stop properly (do not block process)`, async () => {
      const server = new DiscoveryServer(serverConfig);
      server.start();

      await new Promise(resolve => setTimeout(resolve, 100));

      // server.stop();
    });
  });

  it.only('client connect after server', async function() {
    this.timeout(20 * 1000);
    const server = new DiscoveryServer(serverConfig);

    let connectionCalled = false;
    let closeCalled = false;

    server.on('connection', (client, clientsMap) => {
      console.log('+ server "connection" event');
      assert.equal(client.payload.hostname, 'coucou.local');

      connectionCalled += 1;
    });

    // for monitoring close event counter
    let counterId = null;

    server.on('close', (client, clientsMap) => {
      console.log('+ server "close" event');
      assert.equal(client.payload.hostname, 'coucou.local');

      clearInterval(counterId);

      closeCalled += 1;
    });

    console.log('+ start server');
    server.start();

    await new Promise(resolve => setTimeout(resolve, 1000));

    // run client, check rinfo is received
    // stop after 1 second
    let clientReceivedRinfo = false;

    const client = new DiscoveryClient({
      ...clientConfig,
      port: BROADCAST_PORT + 1,
    });

    console.log('> start client');
    client.start();

    client.on('connection', (rinfo, linfo) => {
      console.log(rinfo);
      console.log(linfo);
      clientReceivedRinfo = true;
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    assert.equal(clientReceivedRinfo, true);

    console.log('> stop client (server disconnect timeout is 10sec)');
    client.stop();

    let sec = 1;

    counterId = setInterval(() => console.log(sec++), 1000);

    // disconnect timeout is 10sec
    await new Promise(resolve => setTimeout(resolve, 12 * 1000));

    assert.equal(connectionCalled, true);
    assert.equal(closeCalled, true);

    server.stop();
  });

  it('server connect after client', async function() {
    this.timeout(20 * 1000);

    let counterId;

    const client = new DiscoveryClient({
      ...clientConfig,
      port: BROADCAST_PORT + 1,
    });

    console.log('> client start');
    client.start();

    let connectionCalled = false;
    let closeCalled = false;

    client.on('connection', rinfo => {
      console.log('> client "connection" event');
      connectionCalled = true;
    });

    client.on('close', () => {
      console.log('> client "close" event');
      closeCalled = true;

      clearTimeout(counterId);
    });


    await new Promise(resolve => setTimeout(resolve, 1000));

    const server = new DiscoveryServer(serverConfig);

    console.log('+ server start')
    server.start();

    // client discover interval is 2 sec
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('+ server stop (client disconnect timeout is 10s)');
    server.stop();

    let sec = 1;
    counterId = setInterval(() => console.log(sec++), 1000);


    // disconnect timeout is 10sec
    await new Promise(resolve => setTimeout(resolve, 12 * 1000));

    assert.equal(connectionCalled, true);
    assert.equal(closeCalled, true);

    client.stop();
  });
});

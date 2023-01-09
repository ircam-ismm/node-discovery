# `@ircam/node-discovery`

Simple Node.js utility to discover devices on a network

## API

<!-- api -->

### Classes

<dl>
<dt><a href="#DiscoveryServer">DiscoveryServer</a></dt>
<dd><p>Create a server that waits for new connection from DiscoveryClient.</p>
</dd>
<dt><a href="#DiscoveryClient">DiscoveryClient</a></dt>
<dd><p>Create a client that tries to connect to a DiscoveryServer.</p>
</dd>
</dl>

<a name="DiscoveryServer"></a>

### DiscoveryServer
Create a server that waits for new connection from DiscoveryClient.

**Kind**: global class  

* [DiscoveryServer](#DiscoveryServer)
    * [.start()](#DiscoveryServer+start)
    * [.stop()](#DiscoveryServer+stop)

<a name="DiscoveryServer+start"></a>

#### discoveryServer.start()
Start the server.

**Kind**: instance method of [<code>DiscoveryServer</code>](#DiscoveryServer)  
<a name="DiscoveryServer+stop"></a>

#### discoveryServer.stop()
Stop the server

**Kind**: instance method of [<code>DiscoveryServer</code>](#DiscoveryServer)  
<a name="DiscoveryClient"></a>

### DiscoveryClient
Create a client that tries to connect to a DiscoveryServer.

**Kind**: global class  

* [DiscoveryClient](#DiscoveryClient)
    * [.start()](#DiscoveryClient+start)
    * [.stop()](#DiscoveryClient+stop)

<a name="DiscoveryClient+start"></a>

#### discoveryClient.start()
Start the client.

**Kind**: instance method of [<code>DiscoveryClient</code>](#DiscoveryClient)  
<a name="DiscoveryClient+stop"></a>

#### discoveryClient.stop()
Stop the client.

**Kind**: instance method of [<code>DiscoveryClient</code>](#DiscoveryClient)  

<!-- apistop -->

## License

[BSD-3-Clause](./LICENSE)

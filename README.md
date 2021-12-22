# @ln-markets/bitcoind-rpc

<p align="center">
  <a href="https://www.npmjs.com/package/@ln-markets/bitcoind-rpc" alt="npm version">
    <img src="https://img.shields.io/npm/v/@ln-markets/bitcoind-rpc" />
  </a>
  <a href="https://www.npmjs.com/package/@ln-markets/bitcoind-rpc" alt="npm downloads">
    <img src="https://img.shields.io/npm/dw/@ln-markets/bitcoind-rpc" />
  </a>
  <a href="https://twitter.com/LNMarkets">
    <img src="https://img.shields.io/twitter/follow/LNMarkets?style=social"
        alt="Follow us on Twitter">
  </a>
</p>

[@ln-markets/bitcoind-rpc](https://www.npmjs.com/package/@ln-markets/bitcoind-rpc) is a simple and small connector to speak with your bitcoin daemon

> :warning: **This module is written in native ECMAScript it will not work with Common JS**

## Install

You can install this package with npm, pnpm or yarn:

```shell
  $> npm install @ln-markets/bitcoind-rpc
```

```shell
  $> pnpm install @ln-markets/bitcoind-rpc
```

```shell
  $> yarn add @ln-markets/bitcoind-rpc
```

## Usage

```JS
  import BitcoindRpcClient from '@ln-markets/bitcoind-rpc'

  const bitcoind = new BitcoindRpcClient({
    host: '127.0.0.1',
    port: 18443,
    user: 'lnmarkets',
    password: 'lnmarkets',
  })
```

Or you can can pass the configuration with env variable `BITCOIND_HOST` `BITCOIND_PORT` `BITCOIND_USER` `BITCOIND_PASSWORD`

There is no method yet for each [bitcoind rpc](https://developer.bitcoin.org/reference/rpc/) call.

You need to pass the method name as the first argument and the positional or named parameters as the second

```JS
// With positional parameter
const address1 = await bitcoind.request('getnewaddress', ['', 'legacy'])

// With named parameter
const address2 = await bitcoind.request('getnewaddress', {
  label: ' ',
  address_type: 'bech32',
})
```

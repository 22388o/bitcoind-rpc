import BitcoindRpcClient from '../src/index.js'

const bitcoind = new BitcoindRpcClient({
  port: 18_443,
  user: 'lnmarkets',
  password: 'lnmarkets',
})

// With positional parameter
const address1 = await bitcoind.request('getnewaddress', ['', 'legacy'])
console.log(address1)

// With named parameter
const address2 = await bitcoind.request('getnewaddress', {
  label: ' ',
  address_type: 'bech32',
})
console.log(address2)

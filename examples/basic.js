import BitcoindRpcClient from '../src/index.js'

const bitcoind = new BitcoindRpcClient({
  port: 18_443,
  user: 'lnmarkets',
  password: 'lnmarkets',
})

const address1 = await bitcoind.request('getnewaddress')
console.log(address1)

// With positional parameter
const address2 = await bitcoind.request('getnewaddress', ['', 'legacy'])
console.log(address2)

// With named parameter
const address3 = await bitcoind.request('getnewaddress', {
  label: ' ',
  address_type: 'bech32',
})
console.log(address3)


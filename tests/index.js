import test from 'ava'
import BitcoindRpcClient from '../src/index.js'

// Useless test, will add more usefull later
test('New instance', (t) => {
  const temporary = new BitcoindRpcClient()
  t.is(temporary.constructor.name, 'BitcoindRpcClient')
})

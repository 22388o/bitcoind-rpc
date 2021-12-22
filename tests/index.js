import test from 'ava'
import BitcoindRpcClient from '../src/index.js'

test('New instance', (t) => {
  const instance = new BitcoindRpcClient()
  t.is(instance.constructor.name, 'BitcoindRpcClient')
})

test('Method is not a string - Number', (t) => {
  const bitcoind = new BitcoindRpcClient()
  const error = t.throws(
    () => {
      bitcoind.request(1337)
    },
    { instanceOf: TypeError }
  )

  t.is(error.message, 'Method should be a string')
})

test('Method is not a string - Object', (t) => {
  const bitcoind = new BitcoindRpcClient()
  const error = t.throws(
    () => {
      bitcoind.request({ satoshi: true })
    },
    { instanceOf: TypeError }
  )

  t.is(error.message, 'Method should be a string')
})

test('Method is an empty string', (t) => {
  const bitcoind = new BitcoindRpcClient()
  const error = t.throws(
    () => {
      bitcoind.request('')
    },
    { instanceOf: Error }
  )

  t.is(error.message, 'Method should not be empty')
})

test('Parameters is not an object or array', (t) => {
  const bitcoind = new BitcoindRpcClient()
  const error = t.throws(
    () => {
      bitcoind.request('getblockcount', 'parameters')
    },
    { instanceOf: TypeError }
  )

  t.is(error.message, 'Parameters should be an object or an array')
})

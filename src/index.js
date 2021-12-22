import { Buffer } from 'node:buffer'
import { request } from 'node:http'
import { env } from 'node:process'
import { randomUUID } from 'node:crypto'
import JSONBigInt from 'json-bigint'

export default class BitcoindRpcClient {
  constructor(opt = {}) {
    this.host = opt.host || env.BITCOIND_HOST || '127.0.0.1'
    this.port = opt.port || env.BITCOIND_PORT || 8332
    this.user = opt.user || env.BITCOIND_USER || 'user'
    this.password = opt.password || env.BITCOIND_PASSWORD || 'password'
  }

  request(method, parameters = []) {
    if (typeof method === 'string') {
      throw new TypeError('Method should be a string')
    }

    this.beforeRequest(method, parameters)

    const data = JSON.stringify({
      method,
      params: parameters,
      jsonrpc: '2.0',
      id: randomUUID(),
    })

    const auth = Buffer.from(`${this.user}:${this.password}`).toString('base64')

    const options = {
      host: this.host,
      port: this.port,
      method: 'POST',
      path: '/',
    }

    return new Promise((resolve, reject) => {
      const request_ = request(options, (response) => {
        let buffer = ''

        response.on('data', (data) => {
          buffer += data
        })

        response.on('end', () => {
          switch (response.statusCode) {
            case 401: {
              reject(new Error('401 : Unauthorized'))
              break
            }

            case 403: {
              reject(new Error('403: Forbidden'))
              break
            }

            case 500: {
              let parsed

              try {
                parsed = JSONBigInt.parse(buffer)
                if (parsed.error && parsed.error.message) {
                  reject(parsed.error.message)
                } else {
                  reject(new Error(JSON.stringify(parsed, null, 2)))
                }
              } catch {
                reject(new Error(`500 : ${buffer}`))
              }

              break
            }

            default: {
              let parsed

              try {
                parsed = JSONBigInt.parse(buffer)
                resolve(this.afterRequest(parsed))
              } catch {
                reject(new Error(buffer))
              }
            }
          }
        })
      })

      request_.on('error', (error) => {
        reject(error)
      })

      request_.setHeader('Content-Length', data.length)
      request_.setHeader('Content-Type', 'application/json')
      request_.setHeader('Authorization', `Basic ${auth}`)
      request_.write(data)
      request_.end()
    })
  }

  beforeRequest(_method, _parameters) {}

  afterRequest(parsed) {
    return parsed.result
  }
}

import { expect } from 'chai'
import pact from 'pact'
const { eachLike, somethingLike: like } = pact.Matchers

import Coffee from './Coffee'

describe('Coffee service (orders)', () => {
  const port = 1234
  const client = Coffee(`http://localhost:${port}`)

  let provider = pact({
    consumer: 'Coffee Web Consumer',
    provider: 'Coffee Ordering Provider',
    port: 1234,
    done: (error) => {
      expect(error).to.be.null
    }
  })

  const mimeAppJson = 'application/json'
  const requestHeaders = { 'Accept': mimeAppJson }
  const responseHeaders = { 'Content-Type': mimeAppJson }

  describe('orders', () => {
    describe('lists no orders', () => {
      // given:
      beforeAll((done) => {
        provider.setup()
          .then(() => {
            provider.addInteraction({
              state: 'no orders',
              uponReceiving: 'request to list orders',
              withRequest: {
                method: 'GET',
                path: '/order',
                headers: requestHeaders
              },
              willRespondWith: {
                status: 200,
                headers: responseHeaders,
                body: {
                  orders: []
                }
              }
            })
          })
          .then(done)
      })

      // when:
      let result
      it('', () => {
        result = client.listOrders()
        return result
      })

      // then:
      afterAll(() => {
        result.then((body) => {
          expect(body.orders).to.deep.eql([])
        })
      })
    })

    describe('lists many orders', () => {
      // given:
      beforeAll((done) => {
        provider.setup()
          .then(() => {
            provider.addInteraction({
              state: 'many orders',
              uponReceiving: 'request to list many orders',
              withRequest: {
                method: 'GET',
                path: '/order',
                headers: requestHeaders
              },
              willRespondWith: {
                status: 200,
                headers: responseHeaders,
                body: {
                  orders: eachLike({
                    id: like(29),
                    path: like('/order/29')
                  }, {
                    min: 3, max: 7
                  })
                }
              }
            })
          })
          .then(done)
      })

      // when:
      let result
      it('', () => {
        result = client.listOrders()
        return result
      })

      // then:
      afterAll(() => {
        result.then((body) => {
          body.orders.forEach((it) => {
            expect(it.path).to.eql(`/order/${it.id}`)
          })
        })
      })
    })
  })

  afterAll(() => {
    return provider.verify()
      .then(provider.finalize)
  })
})

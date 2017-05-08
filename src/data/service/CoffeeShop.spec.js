import { expect } from 'chai'
import pact from 'pact'
const { eachLike, somethingLike: like } = pact.Matchers

import CoffeeShop from './CoffeeShop'

const mockServerStartupTimeout = 15000 // Slow in docker.
const port = 1234

const mimeAppJson = 'application/json'
const requestHeaders = { 'Accept': mimeAppJson }
const responseHeaders = { 'Content-Type': mimeAppJson }

describe('CoffeeShop service (orders)', () => {
  const client = CoffeeShop(`http://localhost:${port}`)

  let provider = pact({
    consumer: 'Coffee Web Consumer',
    provider: 'Coffee Ordering Provider',
    port: port,
    done: (error) => {
      expect(error).to.be.null
    }
  })

  beforeAll(() => provider.setup(), mockServerStartupTimeout)
  afterAll(() => provider.finalize())

  describe('orders', () => {
    beforeEach(() => provider.removeInteractions())
    afterEach(() => provider.verify())

    describe('lists no orders', () => {
      // given:
      beforeEach(() =>
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
      )

      // when:
      it('', () => client.listOrders()
      // then:
        .then((body) => {
          expect(body.orders).to.eql([])
        })
        .catch(fail)
      )
    })

    describe('lists many orders', () => {
      // given:
      beforeEach(() =>
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
                path: like('/order/29'),
                name: like('Jeff'),
                coffeeSummaries: eachLike(like('Large Magic'), { min: 2 })
              }, {
                min: 3, max: 7
              })
            }
          }
        })
      )

      // when:
      it('', () => client.listOrders()
      // then:
        .then((body) => {
          expect(body.orders.length).to.eql(3)

          body.orders.forEach((it) => {
            expect(it.path).to.eql(`/order/${it.id}`)
            expect(it.name).to.eql('Jeff')
            expect(it.coffeeSummaries.length).to.eql(2)
            expect(it.coffeeSummaries).to.contain('Large Magic')
          })
        })
        .catch(fail)
      )
    })

    describe('gets one order', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'order 23',
          uponReceiving: 'request to get a specific order',
          withRequest: {
            method: 'GET',
            path: '/order/23',
            headers: requestHeaders
          },
          willRespondWith: {
            status: 200,
            headers: responseHeaders,
            body: {
              id: 23,
              coffees: eachLike({
                id: like(66),
                summary: like('Flat White'),
                path: like('/order/23/coffee/66')
              }, {
                min: 2
              }),
              name: like('Jimothy'),
              path: '/order/23'
            }
          }
        })
      )

      // when:
      it('', () => client.getOrder(23)
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 23,
            name: 'Jimothy',
            coffees: [
              { id: 66, summary: 'Flat White', path: '/order/23/coffee/66' },
              { id: 66, summary: 'Flat White', path: '/order/23/coffee/66' }
            ],
            path: '/order/23'
          })
        })
        .catch(fail)
      )
    })

    describe('fails to get one order', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'no orders',
          uponReceiving: 'request to get a specific order',
          withRequest: {
            method: 'GET',
            path: '/order/999',
            headers: requestHeaders
          },
          willRespondWith: {
            status: 404,
            headers: responseHeaders,
            body: {
              message: 'Order with id 999 not found',
              path: '/order/999'
            }
          }
        })
      )

      // when:
      it('', () => client.getOrder(999)
      // then:
        .then(fail)
        .catch(({ message }) => {
          expect(message).to.eql('Order with id 999 not found')
        })
      )
    })
  })
})

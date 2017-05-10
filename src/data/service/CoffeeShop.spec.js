import { expect } from 'chai'
import pact from 'pact'
const { eachLike, somethingLike: like } = pact.Matchers

import CoffeeShop from './CoffeeShop'

const mockServerStartupTimeout = 15000 // Slow in docker.
const port = 1234

const mimeAppJson = 'application/json'
const requestHeaders = { 'Accept': mimeAppJson }
const responseHeaders = { 'Content-Type': mimeAppJson }

describe('CoffeeShop service', () => {
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

  describe('Order', () => {
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

    describe('names an order', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'empty order 19',
          uponReceiving: 'request to change order name',
          withRequest: {
            method: 'PATCH',
            path: '/order/19',
            headers: requestHeaders,
            body: {
              name: 'Jimbo'
            }
          },
          willRespondWith: {
            status: 200,
            headers: responseHeaders,
            body: {
              id: 19,
              path: '/order/19'
            }
          }
        })
      )

      // when:
      it('', () => client.nameOrder(19, 'Jimbo')
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 19,
            path: '/order/19'
          })
        })
        .catch(fail)
      )
    })

    describe('fails to name an order', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'no orders',
          uponReceiving: 'request to change order name',
          withRequest: {
            method: 'PATCH',
            path: '/order/777',
            headers: requestHeaders,
            body: {
              name: 'No Face'
            }
          },
          willRespondWith: {
            status: 404,
            headers: responseHeaders,
            body: {
              message: 'Order with id 777 not found',
              path: '/order/777'
            }
          }
        })
      )

      // when:
      it('', () => client.nameOrder(777, 'No Face')
      // then:
        .then(fail)
        .catch(({ message }) => {
          expect(message).to.eql('Order with id 777 not found')
        })
      )
    })

    describe('cancels an order', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'empty order 19',
          uponReceiving: 'request to cancel the order',
          withRequest: {
            method: 'DELETE',
            path: '/order/19',
            headers: requestHeaders
          },
          willRespondWith: {
            status: 200,
            headers: responseHeaders,
            body: {
              id: 19,
              path: '/order/19'
            }
          }
        })
      )

      // when:
      it('', () => client.cancelOrder(19)
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 19,
            path: '/order/19'
          })
        })
        .catch(fail)
      )
    })
  })

  describe('Coffee', () => {
    beforeEach(() => provider.removeInteractions())
    afterEach(() => provider.verify())

    describe('gets a coffee', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'order 43 with coffee 59',
          uponReceiving: 'request to fetch a coffee',
          withRequest: {
            method: 'GET',
            path: '/order/43/coffee/59',
            headers: requestHeaders
          },
          willRespondWith: {
            status: 200,
            headers: responseHeaders,
            body: {
              id: 59,
              style: like('Magic'),
              size: like('Regular'),
              path: '/order/43/coffee/59'
            }
          }
        })
      )

      // when:
      it('', () => client.getCoffee(43, 59)
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 59,
            style: 'Magic',
            size: 'Regular',
            path: '/order/43/coffee/59'
          })
        })
        .catch(fail)
      )
    })

    describe('adds a coffee', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'empty order 19',
          uponReceiving: 'request to add a coffee',
          withRequest: {
            method: 'POST',
            path: '/order/19/coffee',
            headers: requestHeaders
          },
          willRespondWith: {
            status: 201,
            headers: responseHeaders,
            body: {
              id: like(37),
              path: like('/order/19/coffee/37')
            }
          }
        })
      )

      // when:
      it('', () => client.addCoffee(19)
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 37,
            path: '/order/19/coffee/37'
          })
        })
        .catch(fail)
      )
    })

    describe("updates a coffee's style", () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'order 43 with coffee 59',
          uponReceiving: 'request to change coffee style',
          withRequest: {
            method: 'PATCH',
            path: '/order/43/coffee/59',
            headers: requestHeaders,
            body: {
              style: 'Latte'
            }
          },
          willRespondWith: {
            status: 200,
            headers: responseHeaders,
            body: {
              id: 59,
              path: '/order/43/coffee/59'
            }
          }
        })
      )

      // when:
      it('', () => client.updateCoffee(43, 59, { style: 'Latte' })
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 59,
            path: '/order/43/coffee/59'
          })
        })
        .catch(fail)
      )
    })

    describe("updates a coffee's size", () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'order 43 with coffee 59',
          uponReceiving: 'request to change coffee size',
          withRequest: {
            method: 'PATCH',
            path: '/order/43/coffee/59',
            headers: requestHeaders,
            body: {
              size: 'Piccolo'
            }
          },
          willRespondWith: {
            status: 200,
            headers: responseHeaders,
            body: {
              id: 59,
              path: '/order/43/coffee/59'
            }
          }
        })
      )

      // when:
      it('', () => client.updateCoffee(43, 59, { size: 'Piccolo' })
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 59,
            path: '/order/43/coffee/59'
          })
        })
        .catch(fail)
      )
    })

    describe('cancels a coffee', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'order 43 with coffee 59',
          uponReceiving: 'request to cancel coffee',
          withRequest: {
            method: 'DELETE',
            path: '/order/43/coffee/59',
            headers: requestHeaders
          },
          willRespondWith: {
            status: 200,
            headers: responseHeaders,
            body: {
              id: 59,
              path: '/order/43/coffee/59'
            }
          }
        })
      )

      // when:
      it('', () => client.cancelCoffee(43, 59)
      // then:
        .then((body) => {
          expect(body).to.eql({
            id: 59,
            path: '/order/43/coffee/59'
          })
        })
        .catch(fail)
      )
    })
  })

  describe('Menu', () => {
    beforeEach(() => provider.removeInteractions())
    afterEach(() => provider.verify())

    describe('gets the base menu', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'no orders',
          uponReceiving: 'request to fetch the menu',
          withRequest: {
            method: 'GET',
            path: '/menu',
            headers: requestHeaders
          },
          willRespondWith: {
            status: 200,
            headers: responseHeaders,
            body: {
              coffee: '/menu/coffee',
              path: '/menu'
            }
          }
        })
      )

      // when:
      it('', () => client.getMenu()
      // then:
        .then((body) => {
          expect(body).to.eql({
            coffee: '/menu/coffee',
            path: '/menu'
          })
        })
        .catch(fail)
      )
    })

    describe('gets the coffee menu', () => {
      // given:
      beforeEach(() =>
        provider.addInteraction({
          state: 'no orders',
          uponReceiving: 'request to fetch the coffee menu',
          withRequest: {
            method: 'GET',
            path: '/menu/coffee',
            headers: requestHeaders
          },
          willRespondWith: {
            status: 200,
            headers: responseHeaders,
            body: {
              style: eachLike(like('Latte'), { min: 3 }),
              size: eachLike(like('Regular'), { min: 1 })
            }
          }
        })
      )

      // when:
      it('', () => client.getCoffeeMenu()
      // then:
        .then((body) => {
          expect(body).to.eql({
            style: [ 'Latte', 'Latte', 'Latte' ],
            size: [ 'Regular' ]
          })
        })
        .catch(fail)
      )
    })
  })
})

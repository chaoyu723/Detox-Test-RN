const { default: prices } = require("../data/pizzaPrices");
const { default: customized } = require("../data/buildYourOwnPrices");
const { default: pizzaToppings } = require("../data/pizzaToppings");

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await expect(element(by.id('menu-screen'))).toExist();
  });

  it('Orders page can be opened by tapping orders', async () => {
    await expect(element(by.id('orders-tab'))).toExist();
    await element(by.id('orders-tab')).tap();
    await expect(element(by.id('orders-list'))).toBeVisible();
  });

  it('Orders made previously should remain in the orders page', async () => {
    await element(by.text('Order').withAncestor(by.id('supreme'))).tap();
    await element(by.text('large')).tap();
    await expect(element(by.id('total'))).toHaveText(`\$${prices.supreme.large}`);
    await element(by.id('order-button')).tap();

    await element(by.id('menu-tab')).tap();
    await element(by.id('menu-tab')).tap();
    await expect(element(by.id('menu-screen'))).toExist();

    await element(by.text('Order').withAncestor(by.id('margherita'))).tap();
    await element(by.text('small')).tap();
    await expect(element(by.id('total'))).toHaveText(`\$${prices.margherita.small}`);
    await element(by.id('order-button')).tap();

    await element(by.id('menu-tab')).tap()

    await element(by.id('orders-tab')).tap();

    await expect(
      element(by.id('order-item').withDescendant(by.text('Supreme'), by.text(pizzaToppings.supreme), by.text(prices.supreme.large)), by.text('large')
    )).toExist();
    await expect(
      element(by.id('order-item').withDescendant(by.text('Margherita'), by.text(pizzaToppings.margherita), by.text(prices.margherita.small)), by.text('small')
    )).toExist();
  });
});

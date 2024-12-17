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

  it('After order made should be redirected to the Orders page and the order is displayed correctly', async () => {
    await element(by.text('Order').withAncestor(by.id('supreme'))).tap();
    await element(by.text('large')).tap();
    await expect(element(by.id('total'))).toHaveText(`\$${prices.supreme.large}`);
    await element(by.id('order-button')).tap();
    await expect(
      element(by.id('order-item').withDescendant(by.text('Supreme'), by.text(pizzaToppings.supreme), by.text(prices.supreme.large)), by.text('large')
    )).toExist();
  });

  it('build your own screen can change toppings', async () => {
    await element(by.text('Build Your Own')).tap();
    await element(by.text('PEPPERONI')).tap();
    await element(by.text('BASIL')).tap();
    await element(by.text('BACON')).tap();
    await expect(
      element(by.text('PEPPERONI').withAncestor(by.id('selected-toppings'))),
    ).toExist();
    await expect(
      element(by.text('BASIL').withAncestor(by.id('selected-toppings'))),
    ).toExist();
    await expect(
      element(by.text('BACON').withAncestor(by.id('selected-toppings'))),
    ).toExist();
    await element(by.text('BACON')).tap();
    await expect(
      element(by.id('selected-toppings').withDescendant(by.text('BACON')))
    ).not.toExist
    await element(by.text('BASIL')).tap();
    await expect(
      element(by.id('selected-toppings').withDescendant(by.text('BASIL')))
    ).not.toExist
  });

  it('build screen can select toppings, pick a size, and submit order', async () => {
    await element(by.text('Build Your Own')).tap();
    await element(by.text('BASIL')).tap();
    await element(by.text('BACON')).tap();
    await element(by.text('small')).tap();
    const price = customized.sizes.small+customized.toppings*2
    await expect(element(by.id('total'))).toHaveText(`\$${price}`);
    await element(by.id('submit-order')).tap();
    await expect(
      element(by.id('order-item').withDescendant(
        by.text('Custom'), by.text('basil, bacon'), by.text(`/$${price}`)
      ),
    )
  ).toExist();
  });
});

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

  it('Menu and Orders tabs should be displayed', async () => {
    await expect(element(by.id('orders-tab'))).toExist();
    await expect(element(by.id('menu-tab'))).toExist();
  });

  it('Can navigate back to Menu screen from Orders page', async () => {
    await expect(element(by.id('orders-tab'))).toExist();
    await element(by.id('orders-tab')).tap();
    await expect(element(by.id('orders-list'))).toBeVisible();

    await expect(element(by.id('menu-tab'))).toExist();
    await element(by.id('menu-tab')).tap();
    await expect(element(by.id('menu-screen'))).toExist();
  });

})
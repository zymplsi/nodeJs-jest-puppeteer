describe('When index page is loaded', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3100');
  });

  test('should display instruction ', async () => {
    const test = await page.$eval(
      '.query-input-block>label',
      el => el.innerHTML
    );

    expect(test).toEqual('Type In Your SQL Query');
  });

  test('should have input wuth placeholder ', async () => {
    const test = await page.$eval('.query-input-block>input', el =>
      el.getAttribute('placeholder')
    );

    expect(test).toEqual('E.g. SELECT 1');
  });

  test('should have button to send query ', async () => {
    const test = await page.$eval(
      '.query-input-block>button',
      el => el.innerHTML
    );

    expect(test).toEqual('Send the query');
  });
});

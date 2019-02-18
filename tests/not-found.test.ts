describe('When url is invalid', () => {
  test('should show page not found, 404 ', async () => {
    await page.goto('http://localhost:3100/abcd');
    const test = await page.$eval('.not-found>h1', el => el.innerHTML);
    expect(test).toEqual('404');
  });
});

describe('When sql query is send', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3100');
  });

  test('should prompt wait', async () => {
    await page.$eval('#query-input', (el: HTMLInputElement) => {
      return (el.value = '');
    });

    await page.click('#query-send');
    await page.waitForSelector('#query-wait');
    const text = await page.$eval('#query-wait', (el: HTMLElement) => {
      return el.innerHTML;
    });
    expect(text).toEqual('...Please Wait');
  });

  test('should prompt error when query is empty', async () => {
    const beforeError = await page.$eval('#query-error', (el: HTMLElement) => {
      return el.innerHTML;
    });
    await page.$eval('#query-input', (el: HTMLInputElement) => {
      return (el.value = '');
    });

    await page.click('#query-send');
    await page.waitForFunction(
      'document.querySelector("#query-error").innerHTML.length > 0'
    );

    const afterError = await page.$eval('#query-error', (el: HTMLElement) => {
      return el.innerHTML;
    });
    expect(beforeError.length).toEqual(0);
    expect(afterError.length).toBeGreaterThan(0);
  });

  test('should return result on correct query', async () => {
    await page.$eval('#query-result', (el: HTMLInputElement) => {
      return (el.value = '');
    });
    await page.$eval('#query-input', (el: HTMLInputElement) => {
      return (el.value = 'SELECT 1');
    });

    await page.click('#query-send');
    await page.waitForFunction(
      'document.querySelector("#query-result").innerHTML.length > 0'
    );

    const queryResult = await page.$eval('#query-result', (el: HTMLElement) => {
      return el.innerHTML;
    });

    expect(queryResult).toEqual('[{"1":1}]');
  });

  test('should allow more connections below max limit ', async () => {
    const connection2Page = await browser.newPage();
    await connection2Page.goto('http://localhost:3100');
    const test = await connection2Page.$eval(
      '.query-input-block>label',
      el => el.innerHTML
    );

    expect(test).toEqual('Type In Your SQL Query');
  });

  test('should not allow more connections than max limit, 403 ', async () => {
    const connection2Page = await browser.newPage();
    await connection2Page.goto('http://localhost:3100');

    const maxConnectionPage = await browser.newPage();
    await maxConnectionPage.goto('http://localhost:3100');
    await maxConnectionPage.waitForNavigation( { waitUntil : 'networkidle0' } );
    const test = await maxConnectionPage.$eval(
      '.not-found>h1',
      el => el.innerHTML
    );
    expect(test).toEqual('403');
  });

  test('should not allow more connections than max limit, 403 ', async () => {
    const connection2Page = await browser.newPage();
    await connection2Page.goto('http://localhost:3100');

    const maxConnectionPage = await browser.newPage();
    await maxConnectionPage.goto('http://localhost:3100');
    await maxConnectionPage.waitForNavigation( { waitUntil : 'networkidle0' } );
    const test = await maxConnectionPage.$eval(
      '.not-found>h1',
      el => el.innerHTML
    );
    expect(test).toEqual('403');
  });
});

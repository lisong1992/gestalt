import assert from 'assert';

describe('Masonry > ScrollFetch onload', () => {
  it.each([
    ['Masonry', 'http://localhost:3001/Masonry?manualFetch=1'],
    ['MasonryInfinite', 'http://localhost:3001/MasonryInfinite?manualFetch=1'],
  ])('Limits scrollFetch count - %s', async (name, url) => {
    await page.setViewport({
      width: 400,
      height: 400,
    });
    await page.goto(url);

    const initialFetchCount = await page.evaluate(
      () => window.TEST_FETCH_COUNTS
    );
    assert.equal(initialFetchCount, null);

    // Fetches 1 time if the viewport is big enough
    await page.setViewport({
      width: 2000,
      height: 1000,
    });
    await page.goto('http://localhost:3001/Masonry');
    const largerFetchCount = await page.evaluate(
      () => window.TEST_FETCH_COUNTS
    );
    assert.ok(largerFetchCount >= 1);
  });
});

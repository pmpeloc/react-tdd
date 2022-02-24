describe('setup and teardown examples', () => {
  beforeAll(() => {
    // antes de todo
    console.log('beforeAll');
  });
  beforeEach(() => {
    // antes de cada test
    console.log('beforeEach');
  });
  afterAll(() => {
    // después de todo
    console.log('afterAll');
  });
  afterEach(() => {
    // después de cada test
    console.log('afterEach');
  });
  test('example 1', () => {
    expect(true).toBe(true);
  });
  test('example 2', () => {
    expect(true).toBe(true);
  });
});

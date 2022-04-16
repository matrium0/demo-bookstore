const sortUtility = require('./sort-utility');

describe('test sort-utility', () => {
  it('test booleanCompare', () => {
    expect(sortUtility.booleanCompare(true, false, true)).toBe(-1);
    expect(sortUtility.booleanCompare(false, true, true)).toBe(1);
    expect(sortUtility.booleanCompare(true, false, false)).toBe(1);
    expect(sortUtility.booleanCompare(false, true, false)).toBe(-1);
  });
});

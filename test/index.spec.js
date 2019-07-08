// @flow
import warning from '../src';

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  // $ExpectError - mocked
  console.warn.mockRestore();
});

it('should not log a warning if the condition is truthy', () => {
  const truthy: mixed[] = [1, -1, true, {}, [], Symbol(), 'hi'];
  truthy.forEach((value: mixed) => {
    warning(value, 'message');
    expect(console.warn).not.toHaveBeenCalled();
  });
});

it('should log a warning if the condition is falsy', () => {
  // https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch4.md#falsy-values
  const falsy: mixed[] = [undefined, null, false, +0, -0, NaN, ''];
  falsy.forEach((value: mixed) => {
    const message: string = `hey ${String(value)}`;
    warning(value, message);

    expect(console.warn).toHaveBeenCalledWith('Warning: ' + message);
    // $ExpectError - mocking console.warn
    console.warn.mockClear();
  });
});

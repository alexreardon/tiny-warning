// @flow
import warning from '../src/tiny-warning';

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  jest.mocked(console.warn).mockRestore();
});

it('should not log a warning if the condition is truthy', () => {
  const truthy: unknown[] = [1, -1, true, {}, [], Symbol(), 'hi'];
  truthy.forEach((value: unknown) => {
    warning(value, 'message');
    expect(console.warn).not.toHaveBeenCalled();
  });
});

it('should log a warning if the condition is falsy', () => {
  // https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch4.md#falsy-values
  const falsy: unknown[] = [undefined, null, false, +0, -0, NaN, ''];
  falsy.forEach((value: unknown) => {
    const message: string = `hey ${String(value)}`;
    warning(value, message);
    expect(console.warn).toHaveBeenCalledWith('Warning: ' + message);
    jest.mocked(console.warn).mockClear();
  });
});

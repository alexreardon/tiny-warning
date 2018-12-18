// @flow
const isProduction: boolean = process.env.NODE_ENV === 'production';

export default function warning(condition: mixed, message: string) {
  // don't do anything in production
  // wrapping in production check for better dead code elimination
  if (!isProduction) {
    // condition passed: do not log
    if (condition) {
      return;
    }

    // Condition not passed

    // check console for IE9 support which provides console
    // only with open devtools
    if (typeof console !== 'undefined') {
      console.warn('Warning: ' + message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the call site that caused this warning to fire.
      throw Error(message);
    } catch (x) {}
  }
}

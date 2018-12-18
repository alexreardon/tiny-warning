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

    // check console existance for IE support which provides console
    // only with open devtools
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
  }
}

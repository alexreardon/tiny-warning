const isProduction: boolean = process.env.NODE_ENV === 'production';

// Throw an error if the condition fails
// Strip out error messages for production
// > Not providing an inline default argument for message as the result is smaller
export default function warning(condition: any, message: string): void {
  // don't do anything in production
  // wrapping in production check for better dead code elimination
  if (!isProduction) {
    if (condition) {
      return;
    }

    // Condition not passed
    const text: string = 'Warning: ' + message;

    // check console for IE9 support which provides console
    // only with open devtools
    if (typeof console !== 'undefined') {
      console.warn(text);
    }

    // Throwing an error and catching it immediately
    // to improve debugging
    // A consumer can use 'pause on caught exceptions'
    // https://github.com/facebook/react/issues/4216
    try {
      throw Error(text);
    } catch (x) {}
  }
}

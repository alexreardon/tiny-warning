// @flow
const isProduction: boolean = process.env.NODE_ENV === 'production';

export default (condition: mixed, message: string) => {
  // don't do anything in production
  // wrapping in production check for better dead code elimination
  if (!isProduction) {
    // condition passed: do not log
    if (condition) {
      return;
    }
    // Condition not passed
    console.warn(message);
  }
};

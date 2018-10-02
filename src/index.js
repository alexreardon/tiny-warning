// @flow
const isProduction: boolean = process.env.NODE_ENV === 'production';

export default (condition: mixed, message: string) => {
  // in production: don't do anything
  if (isProduction) {
    return;
  }
  // condition passed: do not log
  if (condition) {
    return;
  }
  // Condition not passed
  console.warn(message);
};

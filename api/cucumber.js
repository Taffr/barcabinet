const config = [
  'test/acceptance/features/**/*.feature', //  Feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require test/acceptance/step-definitions/**/*.ts', // Load TypeScript module
  '--require test/acceptance/support/**/*.ts', // Load TypeScript module
  '--require test/acceptance/hooks/**/*.ts', // Load TypeScript module
  '--publish-quiet', // Hush
].join(' ');

module.exports = { default: config };

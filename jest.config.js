module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
      jest: {
        tsconfig: 'tsconfig.json',
      },
    },
    roots: ['<rootDir>/tests'],
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/tests/**/*.spec.js'],
    testTimeout: 30000,
    verbose: true,
    transform: {
      '^.+\\.ts$': 'ts-jest',
      '^.+\\.js$': 'babel-jest',
    },
  };
  
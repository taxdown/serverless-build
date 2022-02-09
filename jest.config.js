module.exports = {
  collectCoverageFrom: ['src/**/*.ts'],
  testMatch: ['<rootDir>/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'esbuild-runner/jest',
  },
};

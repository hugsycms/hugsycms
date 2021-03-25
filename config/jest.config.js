module.exports = {
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^.+\\.[tj]s?$': 'babel-jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
    '\\.worker.entry.js': '<rootDir>/__jest__/workerMock.js',
  },
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
  collectCoverage: process.env.TEST_COVERAGE ? true : false,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!**/node_modules/**'],
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
  ],
  testURL: 'http://localhost',
  clearMocks: true,
};

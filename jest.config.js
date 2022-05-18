module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*.(test|spec)).(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageDirectory: '<rootDir>/coverage/',
  coveragePathIgnorePatterns: ['(tests/.*.mock).(jsx?|tsx?)$', '(.*).d.ts$', '<rootDir>/src/mocks'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$':
      'identity-obj-proxy',
  },
  testTimeout: 30000,
  moduleDirectories: ['node_modules', '<rootDir>/src'],
};
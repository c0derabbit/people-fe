module.exports = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|.next)[/\\\\]',
    'testUtils.ts',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|.next)[/\\\\]',
    'testUtils.ts',
  ],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$':
      '<rootDir>/src/__tests__/__mocks__/fileMock.js',
  },
}

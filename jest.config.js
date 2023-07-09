module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '^@src/(.*)': '<rootDir>/src/$1',
    '^@components/(.*)': '<rootDir>/src/components/$1',
    '^@views/(.*)': '<rootDir>/src/views/$1',
    '^@lib/(.*)': '<rootDir>/src/lib/$1',
    '^@css/(.*)': '<rootDir>/src/css/$1',
    '^@api/(.*)': '<rootDir>/src/api/$1',
    '^@assets/(.*)': '<rootDir>/src/assets/$1',
    '^@constants/(.*)': '<rootDir>/src/constants/$1',
  },
  testEnvironment: 'jsdom',
};

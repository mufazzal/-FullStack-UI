const config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  verbose: false,
  roots: ['<rootDir>/src/'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@modals(.*)$': '<rootDir>/src/interfaces$1',
    '^@modules(.*)$': '<rootDir>/src/modules$1',
    '^@comp(.*)$': '<rootDir>/src/commonComponent$1',
    '^@utils(.*)$': '<rootDir>/utils$1',
    '^@_test(.*)$': '<rootDir>/src/test$1',
    '^@srcRoot(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/test/setupTests.ts'
  ],
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'lcov', 'text', 'clover', 'cobertura'],
  coverageDirectory: 'reports/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.tsx',
    '<rootDir>/src/**/*.ts'
    // '<rootDir>/src/**/*.ts',
    // '<rootDir>/src/**/*.tsx',
    // '!<rootDir>/node_modules/**',
    // '!<rootDir>/lib/**'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 80,
      statements: -10
    }
  },
  './src/components/': {
    branches: 40,
    statements: 40
  },
  reporters: [
    'default',
    ['jest-html-reporters', {
      pageTitle: 'My report',
      openReport: true,
      publicPath: 'reports/test-result',
      filename: 'jest_test_report.html'
    }]
  ]
}

module.exports = config

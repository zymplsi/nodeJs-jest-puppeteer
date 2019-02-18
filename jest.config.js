module.exports = {
  
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  preset: "jest-puppeteer",
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupTestFrameworkScriptFile: './setupTestFrameworkScriptFile.js',
};

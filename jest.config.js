module.exports = {
  collectCoverage: true,
  // collectCoverageFrom: ['./client/src/**/*.jsx'],
  collectCoverageFrom: [
    // './client/src/components/questions_answers_module/**/*.jsx',
    './client/src/components/reviews_module/**/*.jsx',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
};

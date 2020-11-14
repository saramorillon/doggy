module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  modulePathIgnorePatterns: ['<rootDir>/build/'],
}

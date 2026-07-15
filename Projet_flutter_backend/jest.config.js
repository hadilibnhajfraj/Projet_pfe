module.exports = {
  testEnvironment: "node",
  rootDir: ".",
  setupFiles: ["<rootDir>/setupTests.js"],
  testMatch: ["**/src/**/*.test.js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/migrations/**",
    "!src/seeders/**",
    "!src/scripts/**",
    "!src/**/*.test.js",
  ],
  coverageDirectory: "coverage",
  clearMocks: true,
  restoreMocks: true,
  // Guards against any lingering handle (DB pool, cron timer, open socket)
  // from a module we didn't anticipate — the structural fix is that app.js
  // no longer starts any of those, this is just a safety net.
  forceExit: true,
};

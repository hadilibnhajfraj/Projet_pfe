// Runs once per test file, before Jest's test framework and before any
// `require("../src/app")` in the test itself. Its job is to make requiring
// the app 100% side-effect-free in the test environment.

process.env.NODE_ENV = "test";

// src/db.js throws at require-time if these are missing — Sequelize only
// opens a real connection on the first query/authenticate() call, so dummy
// values are enough to let app.js (and everything it requires) load without
// ever touching a real PostgreSQL instance.
process.env.DB_HOST = process.env.DB_HOST || "localhost";
process.env.DB_PORT = process.env.DB_PORT || "5432";
process.env.DB_USER = process.env.DB_USER || "test_user";
// eslint-disable-next-line sonarjs/no-hardcoded-passwords -- test-only fallback, never a real credential
process.env.DB_PASSWORD = process.env.DB_PASSWORD || "test_password";
process.env.DB_NAME = process.env.DB_NAME || "test_db";

// src/utils/tokens.js throws if these are missing, but only when a token is
// actually signed/verified (e.g. an auth-route test) — set regardless so
// such tests aren't blocked by missing secrets in CI.
process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "test_access_secret";
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "test_refresh_secret";

// Safety net: app.js itself no longer requires any cron/scheduler module,
// but if a future test imports one directly (or indirectly through a
// controller/service), this stops it from registering a *real* timer that
// could fire after Jest tears the environment down — which is exactly what
// caused "You are trying to require a file after the Jest environment has
// been torn down" before this refactor.
jest.mock("node-cron", () => ({
  schedule: jest.fn(() => ({ start: jest.fn(), stop: jest.fn() })),
}));

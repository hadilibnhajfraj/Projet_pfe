"use strict";

require("dotenv").config();

const http = require("http");

const app = require("./app");
const { sequelize } = require("./db");
const { initSocket } = require("./socket");
const { syncCompaniesFromProjects } = require("./services/companySync.service");
const { syncPeopleFromProjects } = require("./services/personSync.service");

const PORT = Number(process.env.PORT || 4000);

// Cron/scheduler modules call cron.schedule(...) as a side effect of being
// required, so they must only ever be loaded for the real running server —
// never as a side effect of requiring app.js (that's what broke Jest: the
// scheduled jobs kept firing after the test run tore down the environment).
function loadBackgroundJobs() {
  require("./services/scheduler");
  require("./cron/checkProjects");
  require("./cron/projectCron");
  require("./cron/followup.job");
}

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    // Schema is managed by migrations only — never auto-sync in production.
    // To apply pending migrations: node src/scripts/run-pipeline-migration.js
    await syncCompaniesFromProjects();
    await syncPeopleFromProjects();

    loadBackgroundJobs();

    const httpServer = http.createServer(app);
    initSocket(httpServer);

    httpServer.listen(PORT, () => {
      console.log(`✅ API running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("❌ START_ERROR:", e);
    process.exit(1);
  }
}

// Only boot the real server when this file is executed directly
// (`node src/server.js`), never when it's merely required — e.g. by tests.
if (require.main === module) {
  startServer();
}

module.exports = { startServer };

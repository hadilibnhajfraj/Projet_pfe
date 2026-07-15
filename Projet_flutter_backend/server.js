// Legacy entry point kept for anything still invoking the backend as
// `node server.js` from the repo root. The real bootstrap lives in
// src/server.js (DB connect, cron jobs, Socket.IO, http listen). Called
// explicitly here since src/server.js's own `require.main === module`
// guard only fires when it is the process entry point directly.
const { startServer } = require("./src/server");

startServer();

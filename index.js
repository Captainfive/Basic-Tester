// Require Third-party Dependencies
const { yellow } = require("kleur");

// Require Internal Dependencies
const server = require("./src/httpServer.js");

// CONSTANTS
const PORT = 1337;

/**
 * @async
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
    server.listen(PORT, () => {
        console.log(`HTTP Server is listening (running) on port ${yellow(PORT)}`);
    });
}
main().catch(console.error);




const packageJson = require('../package.json');
const packageLockJson = require('../package-lock.json');

const errorMessage = `Package versions do not match.

package.json (${packageJson.version}) - package-lock.json (${packageLockJson.version}). 

Run \`npm install\` to solve.
`;

if (packageJson.version !== packageLockJson.version) {
  console.error(errorMessage);
  process.exit(1);
}

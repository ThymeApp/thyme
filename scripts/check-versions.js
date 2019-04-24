const https = require('https');
const semver = require('semver');

const packageJson = require('../package.json');
const packageLockJson = require('../package-lock.json');

const githubPackageJsonLocation = 'https://raw.githubusercontent.com/ThymeApp/thyme/master/package.json';

const errorMessage = `Package versions do not match.

package.json (${packageJson.version}) - package-lock.json (${packageLockJson.version}). 

Run \`npm install\` to solve.
`;

if (packageJson.version !== packageLockJson.version) {
  console.error(errorMessage);
  process.exit(1);
}

https.get(githubPackageJsonLocation, (res) => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    const data = JSON.parse(rawData);

    if (!semver.lt(data.version, packageJson.version)) {
      console.error(`Published version ${data.version} is greater or equal to ${packageJson.version}.

Increase version in package.json

Checked against: ${githubPackageJsonLocation}
`);
      process.exit(1);
    }
  });
}).on('error', (e) => {
  console.error(e);
});

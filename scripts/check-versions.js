const https = require('https');
const semver = require('semver');

const packageJson = require('../package.json');
const packageLockJson = require('../package-lock.json');

// skip checking remote version if travis is checking master
const checkRemoteVersion = process.env.TRAVIS_PULL_REQUEST !== 'false'
  || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined';

const githubPackageJsonLocation = 'https://raw.githubusercontent.com/ThymeApp/thyme/master/package.json';

const errorMessage = `Package versions do not match.

package.json (${packageJson.version}) - package-lock.json (${packageLockJson.version}). 

Run \`npm install\` to solve.
`;

if (packageJson.version !== packageLockJson.version) {
  // eslint-disable-next-line no-console
  console.error(errorMessage);
  process.exit(1);
}

// eslint-disable-next-line no-console
console.error('package.json and package-lock.json versions match');

if (checkRemoteVersion) {
  https.get(githubPackageJsonLocation, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      const data = JSON.parse(rawData);

      if (!semver.lt(data.version, packageJson.version)) {
        // eslint-disable-next-line no-console
        console.error(`Published version ${data.version} is greater or equal to ${packageJson.version}.
  
  Increase version in package.json
  
  Checked against: ${githubPackageJsonLocation}
  `);
        process.exit(1);
      }

      // eslint-disable-next-line no-console
      console.error('package.json version is newer than current origin/master');
    });
  }).on('error', (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
  });
}

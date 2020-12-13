const fs = require('fs');
const format = require('format-package');

function minor(versionArray, packageData) {
  versionArray[versionArray.length - 1] = versionArray[versionArray.length - 1] + 1;
  packageData.version = versionArray.join('.');
}

function major(versionArray, packageData) {
  versionArray[versionArray.length - 2] = versionArray[versionArray.length - 2] + 1;
  packageData.version = versionArray.join('.');
}

async function bump(type) {
  const packageData = JSON.parse(fs.readFileSync('./package.json').toString());
  const versionArray = packageData.version.split('.').map((e) => parseInt(e, 10));
  type(versionArray, packageData);
  const cleanData = await format(packageData);
  fs.writeFileSync('./package.json', cleanData);
}

const main = async () => {
  const flag = process.argv[2];
  switch (flag) {
    case '--minor':
      await bump(minor);
      break;
    case '--major':
      await bump(major);
      break;
    default:
      console.log('wrong arguments!');
  }
};

main().catch(console.error);

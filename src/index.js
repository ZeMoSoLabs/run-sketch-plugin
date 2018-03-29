const { exec } = require('child_process');
const coscript = require('coscript');

const makeCommand = ({ bundleURL, identifier }) => {
  const delegate = 'COScript.app("Sketch").delegate()';
  const url = `NSURL.fileURLWithPath("${bundleURL}")`;
  return `${delegate}.runPluginCommandWithIdentifier_fromBundleAtURL("${identifier}", ${url})`;
};

const runPluginCommand = options =>
  new Promise((resolve, reject) => {
    console.log('promise');
    exec(`"${coscript}" -e '${makeCommand(options)}'`, (err, stdout, stderr) => {
      if (err) {
        console.log('error');
        reject(err);
      }
      console.log('no error');
      resolve({ stdout, stderr });
    });
  });

module.exports = runPluginCommand;

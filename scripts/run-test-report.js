const { spawnSync } = require('child_process');

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: true });
  return result.status;
}

const testArgs = process.argv.slice(2);
const testStatus = run('npm', ['run', 'test', '--', ...testArgs]);
run('npm', ['run', 'report']);
process.exit(testStatus === null ? 1 : testStatus);

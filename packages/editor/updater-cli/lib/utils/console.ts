import * as readline from 'readline';
import chalk from 'chalk';

export function prompt(message: string) {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(chalk.yellow(`– ${message}`), answer => {
      rl.close();

      if (answer === 'y' || answer === 'yes') {
        return resolve(true);
      }

      return resolve(false);
    });
  });
}

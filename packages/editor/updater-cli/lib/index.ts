import * as meow from 'meow';
import { updateCommand } from './commands/update';

const HELP_MSG = `Commands:
  – Update
    $ akup update @atlaskit/editor-core

  – Changelog
    $ akup changelog @atlaskit/editor-core 70.0.0
`;

export function run() {
  const cli = meow(HELP_MSG);

  if (cli.input[0] === 'update') {
    return updateCommand(cli.input[1]);
  }

  return Promise.resolve(console.log(cli.help));
}

import { cli } from 'cleye';
import { version } from '../package.json';
import config from './commands/config';
import update from './commands/update';
import chat from './commands/chat';

cli(
  {
    name: 'ai',
    version: version,
    flags: {
      system: {
        type: String,
        description: 'The system prompt',
        alias: 's',
      },
    },
    commands: [config, chat, update],
  },
  async (argv) => {
    chat.callback?.(argv);
  }
);

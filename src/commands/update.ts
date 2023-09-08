import { command } from 'cleye';
import { execaCommand } from 'execa';
import { dim } from 'kolorist';
import i18n from '../helpers/i18n';

export default command(
  {
    name: 'update',
    help: {
      description: 'Update AI Shell to the latest version',
    },
    flags: {
      sudo: {
        type: Boolean,
        description: 'Apply sudo',
        alias: 's',
      },
    },
  },
  async (argv) => {
    console.log('');
    const command = argv.flags.sudo
      ? `sudo npm update -g ai-chat`
      : `npm update -g ai-chat`;
    console.log(dim(`${i18n.t('Running')}: ${command}`));
    console.log('');
    await execaCommand(command, {
      stdio: 'inherit',
      shell: process.env.SHELL || true,
    }).catch(() => {
      // No need to handle, will go to stderr
    });
    console.log('');
  }
);

import { command } from 'cleye';
import { spinner, intro, outro, text, isCancel } from '@clack/prompts';
import { cyan } from 'kolorist';
import { generateCompletion, readData } from '../helpers/completion';
import { ChatCompletionRequestMessage } from 'openai';
import i18n from '../helpers/i18n';
import { getConfig } from '../helpers/config';
import config from './config';

export default command(
  {
    name: 'chat',
    help: {
      description:
        'Start a new chat session to send and receive messages, continue replying until the user chooses to exit.',
    },
    flags: {
      system: {
        type: String,
        description: 'The system prompt',
        alias: 's',
      },
    },
  },
  async (argv) => {
    const {
      AZURE_OPENAI_DEPLOYMENT: deployment,
      OPENAI_API_ENDPOINT: apiEndpoint,
      OPENAI_KEY: key,
    } = await getConfig();
    if (!deployment || !apiEndpoint || !key) {
      console.log('');
      console.log('Please set config and restart command.');
      await config.callback?.(argv);
    } else {
      const chatHistory: ChatCompletionRequestMessage[] = [];
      const systemPrompt = argv.flags.system || 'You are a helpful assistant.';
      console.log('');
      intro(i18n.t('Starting new conversation'));
      const prompt = async () => {
        const msgYou = `${i18n.t('You')}:`;
        const userPrompt = (await text({
          message: `${cyan(msgYou)}`,
          placeholder: i18n.t(`send a message ('exit' to quit)`),
          validate: (value) => {
            if (!value) return i18n.t('Please enter a prompt.');
          },
        })) as string;

        if (isCancel(userPrompt) || userPrompt === 'exit') {
          outro(i18n.t('Goodbye!'));
          process.exit(0);
        }

        const infoSpin = spinner();
        infoSpin.start(i18n.t(`THINKING...`));

        let replying = false;
        chatHistory.push({
          role: 'user',
          content: userPrompt,
        });
        const { readResponse } = await getResponse({
          prompt: chatHistory,
          system: systemPrompt,
        });

        const fullResponse = await readResponse((msg) => {
          if (!replying) {
            infoSpin.stop(i18n.t(`AI Chat:`));
            replying = true;
            console.log('');
          }
          process.stdout.write(msg);
        });

        chatHistory.push({
          role: 'assistant',
          content: fullResponse,
        });
        if (!fullResponse.endsWith('\n')) {
          console.log('');
        }
        console.log('');
        prompt();
      };

      prompt();
    }
  },
);

async function getResponse({
  prompt,
  system,
}: {
  prompt: string | ChatCompletionRequestMessage[];
  system: string;
}) {
  const stream = await generateCompletion({
    prompt,
    system,
  });

  return { readResponse: readData(stream) };
}

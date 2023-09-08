import type { ChatCompletionRequestMessage } from 'openai';
import { getConfig } from './config';

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

export async function generateCompletion({
  prompt,
  system,
}: {
  prompt: string | ChatCompletionRequestMessage[];
  system: string
}) {
  const { AZURE_OPENAI_DEPLOYMENT: deployment, OPENAI_API_ENDPOINT: apiEndpoint, OPENAI_KEY: key} = await getConfig();
  const messages =  Array.isArray(prompt)
  ? prompt
  : [ {role: 'user', content: prompt } ];

  const client = new OpenAIClient(apiEndpoint, new AzureKeyCredential(key));
  const deploymentId = deployment;
  const events = client.listChatCompletions(deploymentId, [{role: 'system', content: system}, ...messages], { maxTokens: 1024 });
  return events;
}

export const readData =
(
  iterableStream: AsyncIterable<any>
) =>
(writer: (data: string) => void): Promise<string> =>
  new Promise(async (resolve) => {
    let data = '';

    for await (const chunk of iterableStream) {
      const delta = chunk.choices?.[0]?.delta?.content;
      if (delta !== undefined) {
        data += delta;
        writer(delta);
      }
    }

    resolve(data);
  });

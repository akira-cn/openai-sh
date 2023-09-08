# OPENAI-SH

Fast ChatGPT CLI powered by Azure OpenAI.

## Setup

> The minimum supported version of Node.js is v14

1. Install _openai-sh_:

```sh
npm install -g openai-sh
```

2. Follow the config steps when first run:

```sh
ai
```

<img src="https://aircode-yvo.b-cdn.net/resource/1694168754127-vqofp0gwey.jpg" width="300"/>

## Usage

```bash
ai <system prompt>?
```

With this command, you can engage in a conversation with the AI and receive helpful responses in a natural, conversational manner directly through the CLI:

```sh
┌  Starting new conversation
│
◇  You:
│  how do I serve a redirect in express
│
◇  AI Shell:

In Express, you can use the `redirect()` method to serve a redirect. The `redirect()` method takes one argument, which is the URL that you want to redirect to.

Here's an example:

\`\`\`js
app.get('/oldurl', (req, res) => {
  res.redirect('/newurl');
});
\`\`\`
```

### Set Language

The AI Shell's default language is English, but you can easily switch to your preferred language by using the corresponding language keys, as shown below:

| Language            | Key     |
| ------------------- | ------- |
| English             | en      |
| Simplified Chinese  | zh-Hans |
| Traditional Chinese | zh-Hant |
| Spanish             | es      |
| Japanese            | jp      |
| Korean              | ko      |
| French              | fr      |
| German              | de      |
| Russian             | ru      |
| Ukrainian           | uk      |
| Vietnamese          | vi      |
| Arabic              | ar      |
| Portuguese          | pt      |
| Turkish             | tr      |

For instance, if you want to switch to Simplified Chinese, you can do so by setting the LANGUAGE value to zh-Hans:

```sh
ai config set LANGUAGE=zh-Hans
```

This will set your language to Simplified Chinese.

## Credit

- Thanks to [@builder.io/ai-shell](https://github.com/BuilderIO/ai-shell). This project is based on its excellent work results. 

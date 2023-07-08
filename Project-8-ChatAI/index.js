//How to Create a CLI Chat AI App With Node.js
import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const confiuration = new Configuration({
  organization: "org-gNGh2t2WYIC9ERDLsocPHEI3",
  apiKey: "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",
});

const openai = new OpenAIApi(confiuration);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();F=

userInterface.on("line", async (input) => {
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    })
    .then((result) => {
      console.log(result.data.choices[0].message.content);
      userInterface.prompt();
    })
    .catch((error) => console.log(error));
});

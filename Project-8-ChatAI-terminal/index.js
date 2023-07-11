//How to Create a CLI Chat AI App With Node.js
import { Configuration, OpenAIApi } from "openai";
//help interacting with terminal
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

//prompt the user to input
userInterface.prompt();

//when the user enter the enter button
userInterface.on("line", async (input) => {
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    })
    .then((result) => {
      //output of the assesstaint
      console.log(result.data.choices[0].message.content);
      //prompt the user to enter another input
      userInterface.prompt();
    })
    .catch((error) => console.log(error));
});

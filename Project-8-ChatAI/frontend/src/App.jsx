//How to Create a Chat Application Using React
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

const configuration = new Configuration({
  organization: "",
  apiKey: "",
});

const openai = new OpenAIApi(configuration);

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    window.scrollTo(0, 1e10);

    let msgs = chats ? [...chats] : [];
    msgs.push({ role: "user", content: message });
    setChats(msgs);
    setMessage("");

    try {
      const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are Munib GPT, You help with Email writing",
          },
          ...msgs,
        ],
      });

      msgs.push(result.data.choices[0].message);
      setChats(msgs);
      setIsTyping(false);
      window.scrollTo(0, 1e10);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Munib GPT App🤖</h1>
      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p
                key={index}
                className={chat.role === "user" ? "user_msg" : ""}
              >
                <span>{chat.role.toUpperCase()}</span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message and hit Enter"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}

//to run this project you have to write on terminal "npm run dev"


export default App;

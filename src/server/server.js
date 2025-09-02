import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import 'dotenv/config'; // load .env variables
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const token = process.env.OPENAI_API_KEY; // safe
const endpoint = process.env.OPENAI_ENDPOINT; // safe
const model = "openai/gpt-4.1";

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  try {

    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    );

    // make request
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role:"user", content: prompt }
        ],
        temperature: 1,
        top_p: 1,
        model: model
      }
    });

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache");

    const text = response.body.choices[0].message.content;
    //const text = "This is a placeholder response from the server.";    
    
    if (text) {
      const responseObj = {
        data: text
      };
      console.log("open ai api output: " + text);
      res.write(JSON.stringify(responseObj));
    }

    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));

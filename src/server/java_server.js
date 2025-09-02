
// import 'dotenv/config'; // load .env variables
// import express from "express";
// import OpenAI from "openai";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // safe
// });

// app.post("/api/chat", async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     // streaming response
//     const completion = await client.chat.completions.create({
//       model: "openai/gpt-4.1",
//       messages: [{ role: "user", content: prompt }],
//       stream: true,
//     });

//     res.setHeader("Content-Type", "text/event-stream");
//     res.setHeader("Cache-Control", "no-cache");

//     for await (const chunk of completion) {
//       const text = chunk.choices[0]?.delta?.content;
//       if (text) {
//         res.write(`data: ${JSON.stringify({ text })}\n\n`);
//       }
//     }

//     res.write("data: [DONE]\n\n");
//     res.end();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "OpenAI request failed" });
//   }
// });

// app.listen(4000, () => console.log("Server running on port 4000"));
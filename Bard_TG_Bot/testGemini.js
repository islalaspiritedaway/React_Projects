const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.BARD_API_KEY);

async function run(s) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = s;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  // writeContent(text);
  return text;
}

function writeContent(text) {
  fs.writeFile("output.txt", text, (err) => {
    if (err) {
      console.error("there was an error writing the file!", err);
    } else {
      console.log("successfully wrote to output.txt");
    }
  });
}

module.exports = run;

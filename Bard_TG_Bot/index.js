const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const chatBard = require("./testGemini");

require("dotenv").config();

const bot = new Telegraf(process.env.TG_BOT_TOKEN);
const user_id = process.env.TG_USER_ID;

bot.start((ctx) => ctx.reply("Welcome"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

let isListening = false;
bot.command("bard", (ctx) => {
  ctx.reply("let's get started");
  isListening = true;
});

bot.on("text", async (ctx) => {
  if (isListening) {
    const userInput = ctx.message.text;
    const bardReply = await chatBard(userInput);
    ctx.reply(`${bardReply}`);
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

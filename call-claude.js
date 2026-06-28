import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("请设置环境变量 ANTHROPIC_API_KEY");
  console.error("PowerShell: $env:ANTHROPIC_API_KEY = \"your-key-here\"");
  process.exit(1);
}

const prompt = process.argv.slice(2).join(" ") || "你好，请用一句话介绍你自己。";

const client = new Anthropic({ apiKey });

const message = await client.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [{ role: "user", content: prompt }],
});

const text = message.content
  .filter((block) => block.type === "text")
  .map((block) => block.text)
  .join("\n");

console.log(text);

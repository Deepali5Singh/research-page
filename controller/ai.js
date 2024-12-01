const { GoogleGenerativeAI } = require("@google/generative-ai");

const handerAIchat = async (req, res) => {
  const { chat } = req.body; // Assuming the frontend sends the message as "chat"

  console.log(req.user); // Log the request body for debugging
  // Validate API key
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is not set in environment variables");
    process.exit(1);
  }
  if (!chat) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    // Initialize GoogleGenerativeAI with the API key
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate AI response based on user input
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${chat} `,
            },
          ],
        },
      ],
    });

    const response = result.response.text();
    console.log("AI Response:", response);

    res.json({ response: response });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
};

module.exports = handerAIchat;

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Setup Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy-key");

const generateRoadmap = async (req, res) => {
  try {
    const { goal } = req.body;
    
    if (!goal) {
      return res.status(400).json({ message: "Career goal is required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "GEMINI_API_KEY is not configured in the server." });
    }

    // Prepare the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Construct the prompt
    const prompt = `
    You are an expert tech career advisor. A student wants to learn to become a "${goal}".
    Create a highly structured, 5-step learning roadmap for them.
    
    You MUST respond with ONLY a valid JSON array. No markdown blocks, no text before or after.
    Each item in the JSON array must be an object with the following properties:
    - "title": A short, punchy title for the step (e.g. "Internet & HTML/CSS")
    - "description": A concise, inspiring 1-sentence description of what they will learn (max 120 characters).
    - "completed": false
    - "locked": false (for the first step) and true (for the remaining 4 steps).
    
    Example format:
    [
      {
        "title": "Step 1 Title",
        "description": "Step 1 description.",
        "completed": false,
        "locked": false
      },
      {
        "title": "Step 2 Title",
        "description": "Step 2 description.",
        "completed": false,
        "locked": true
      }
    ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Clean up markdown syntax if Gemini ignores the instruction
    if (text.startsWith("\`\`\`json")) {
      text = text.substring(7);
    }
    if (text.startsWith("\`\`\`")) {
      text = text.substring(3);
    }
    if (text.endsWith("\`\`\`")) {
      text = text.substring(0, text.length - 3);
    }
    text = text.trim();

    try {
      const parsedRoadmap = JSON.parse(text);
      if (!Array.isArray(parsedRoadmap) || parsedRoadmap.length !== 5) {
        throw new Error("Invalid roadmap format generated.");
      }
      return res.json(parsedRoadmap);
    } catch (parseErr) {
      console.error("Failed to parse Gemini output:", text);
      return res.status(500).json({ message: "AI returned an invalid format. Please try again." });
    }
  } catch (error) {
    console.error("Error generating roadmap:", error);
    res.status(500).json({ message: "Failed to generate roadmap via AI.", error: error.message });
  }
};

module.exports = {
  generateRoadmap
};

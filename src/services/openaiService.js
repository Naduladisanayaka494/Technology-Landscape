export const getAIResponse = async (prompt, context = "") => {
  try {
    const apiKey = process.env.apiKey
     

    if (!apiKey) {
      throw new Error("OpenAI API key not configured");
    }

    const systemPrompt = `You are an expert tech news analyst and discussion partner. You help users understand and discuss technology news articles. You can:

1. Summarize articles clearly and concisely
2. Provide context and background on tech topics
3. Analyze implications and trends
4. Compare related stories or developments
5. Answer specific questions about news stories

Keep responses informative but conversational. Use the provided article content as your primary source of information.

${context ? `Current article context: ${context}` : ""}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to get AI response");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Response Error:", error);
    throw error;
  }
};


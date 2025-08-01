export const getAIResponse = async (prompt) => {
  const apiKey = import.meta.env.apiKey;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`, 
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error?.message || "Failed to fetch response from OpenAI API"
    );
  }

  return data.choices[0].message.content;
};

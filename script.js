
const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your key

async function getFakeNews() {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a fake news journalist. Generate a fake, absurd, humorous 3–7 line news story based on current trends (real or fiction). Return the result in this format:

Title: [Fake Headline]

Body: [Fake News Content]"
        },
        {
          role: "user",
          content: "Generate one fake news article."
        }
      ],
      temperature: 1
    })
  });

  const data = await res.json();
  const response = data.choices[0].message.content;

  const [titleMatch, bodyMatch] = [
    response.match(/Title:\s*(.*)/i),
    response.match(/Body:\s*([\s\S]*)/i)
  ];

  const headline = titleMatch ? titleMatch[1].trim() : "📰 Fake News Flash!";
  const article = bodyMatch ? bodyMatch[1].trim() : response.trim();

  document.getElementById("headline").innerText = headline;
  document.getElementById("article").innerText = article;
}

getFakeNews();

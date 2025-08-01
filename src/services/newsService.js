const RSS_FEEDS = [
  "https://techcrunch.com/feed/",
  "https://www.theverge.com/rss/index.xml",
  "https://feeds.feedburner.com/oreilly/radar",
  "https://www.wired.com/feed/rss",
];

export const fetchTechNews = async () => {
  try {
    const allArticles = [];

    for (const feed of RSS_FEEDS) {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
            feed
          )}`
        );

        if (!response.ok) {
          console.warn(`Failed to fetch from ${feed}`);
          continue;
        }

        const data = await response.json();

        if (data.status === "ok" && data.items) {
          const processedArticles = data.items.map((article) => ({
            ...article,
            source: data.feed?.title || "Tech News",
            categories: extractCategories(article),
            sentiment: analyzeSentiment(
              article.title + " " + article.description
            ),
            readTime: estimateReadTime(article.content || article.description),
          }));

          allArticles.push(...processedArticles);
        }
      } catch (error) {
        console.warn(`Error fetching from ${feed}:`, error);
      }
    }

    // Remove duplicates and sort by date
    const uniqueArticles = allArticles.filter(
      (article, index, self) =>
        index === self.findIndex((a) => a.title === article.title)
    );

    return uniqueArticles.sort(
      (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
    );
  } catch (error) {
    console.error("Error fetching tech news:", error);
    throw error;
  }
};

// --- Utility Functions ---

const extractCategories = (article) => {
  const categories = [];
  const text = (
    article.title +
    " " +
    article.description +
    " " +
    (article.content || "")
  ).toLowerCase();

  const categoryKeywords = {
    AI: [
      "artificial intelligence",
      "ai",
      "machine learning",
      "ml",
      "neural",
      "chatgpt",
      "openai",
    ],
    Startups: ["startup", "funding", "venture", "series a", "series b", "ipo"],
    Mobile: ["iphone", "android", "mobile", "smartphone", "app store"],
    Cybersecurity: [
      "security",
      "hack",
      "breach",
      "privacy",
      "encryption",
      "vulnerability",
    ],
    Web3: ["blockchain", "crypto", "bitcoin", "ethereum", "nft", "web3"],
    Gaming: ["gaming", "game", "xbox", "playstation", "nintendo", "steam"],
    Apple: ["apple", "iphone", "ipad", "mac", "ios", "macos"],
    Google: ["google", "android", "chrome", "pixel", "youtube"],
    Meta: ["meta", "facebook", "instagram", "whatsapp", "oculus"],
    Tesla: ["tesla", "elon musk", "electric vehicle", "ev"],
  };

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      categories.push(category);
    }
  }

  return categories.length > 0 ? categories : ["Tech"];
};

const analyzeSentiment = (text) => {
  const positiveWords = [
    "breakthrough",
    "innovation",
    "success",
    "growth",
    "launch",
    "amazing",
    "excellent",
  ];
  const negativeWords = [
    "breach",
    "hack",
    "problem",
    "issue",
    "concern",
    "controversy",
    "failure",
  ];

  const words = text.toLowerCase().split(/\s+/);
  let score = 0;

  words.forEach((word) => {
    if (positiveWords.includes(word)) score++;
    if (negativeWords.includes(word)) score--;
  });

  if (score > 0) return "positive";
  if (score < 0) return "negative";
  return "neutral";
};

const estimateReadTime = (content) => {
  if (!content) return 1;
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

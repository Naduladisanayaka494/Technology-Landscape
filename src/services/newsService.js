export const fetchTechNews = async () => {
  const res = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/index.xml"
  );
  const data = await res.json();
  return data.items;
};

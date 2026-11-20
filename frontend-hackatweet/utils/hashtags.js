const HASHTAG_REGEX = /#[\p{L}\p{N}_]+/gu;

export function extractHashtags(text) {
  const matches = text.match(HASHTAG_REGEX) || [];
  return matches.map((hashtag) => hashtag.toLowerCase());
}

export function splitHashtags(text) {
  return text.split(/(#[\p{L}\p{N}_]+)/u);
}

export function getTrends(tweets) {
  const counts = {};

  for (const tweet of tweets) {
    const hashtags = new Set(extractHashtags(tweet.content));
    for (const hashtag of hashtags) {
      counts[hashtag] = (counts[hashtag] || 0) + 1;
    }
  }

  return Object.entries(counts)
    .map(([hashtag, count]) => ({ hashtag, count }))
    .sort((a, b) => b.count - a.count);
}

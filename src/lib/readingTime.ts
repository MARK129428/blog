export function estimateReadingTime(
  text: string,
  charsPerMinute = 250,
  wordsPerMinute = 200,
): number {
  let chineseChars = 0;
  let englishWords = 0;

  for (const char of text) {
    if (/[一-鿿㐀-䶿]/.test(char)) {
      chineseChars++;
    }
  }

  const englishText = text.replace(/[一-鿿㐀-䶿]/g, ' ');
  englishWords = englishText
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  const chineseTime = chineseChars / charsPerMinute;
  const englishTime = englishWords / wordsPerMinute;

  return Math.max(1, Math.ceil(chineseTime + englishTime));
}

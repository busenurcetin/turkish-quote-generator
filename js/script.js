const originalQuoteElement = document.getElementById("original-quote");
const translatedQuoteElement = document.getElementById("translated-quote");
const newQuoteButton = document.getElementById("new-quote-btn");

//Quotable API
async function fetchRandomQuote() {
  const response = await fetch("http://api.quotable.io/random");
  const data = await response.json();
  return data.content;
}

// Google Translate
async function translateToTurkish(text) {
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=tr&dt=t&q=${encodeURIComponent(
        text
      )}`
    );
    if (!response.ok) {
      throw new Error(`Translation failed: ${response.status}`);
    }

    const data = await response.json();
    return data[0][0][0];
  } catch (error) {
    console.error("Error translating quote:", error);
    return "Translation error.";
  }
}

async function displayRandomTurkishQuote() {
  try {
    const originalQuote = await fetchRandomQuote();
    originalQuoteElement.textContent = originalQuote;

    const translatedQuote = await translateToTurkish(originalQuote);
    translatedQuoteElement.textContent = translatedQuote;
  } catch (error) {
    console.error("Error fetching or translating the quote:", error);
    originalQuoteElement.textContent =
      "An error occurred while fetching the quote.";
    translatedQuoteElement.textContent = "";
  }
}

newQuoteButton.addEventListener("click", displayRandomTurkishQuote);

displayRandomTurkishQuote();

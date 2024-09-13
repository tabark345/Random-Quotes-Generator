const quote = document.querySelector("#quote");
const name = document.querySelector("#name");
const newQuote = document.querySelector("#new-quote");
const copyQuote = document.querySelector("#copy-quote");
const translateButton = document.querySelector("#translate-quote");

function fetchNewQuote() {
    fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data => {
        quote.textContent = data.content;
        name.textContent = data.author;
        translateButton.textContent = "Translate to Arabic";
    })
    .catch(error => console.log(error));
}

// Call fetchNewQuote when the page loads
document.addEventListener("DOMContentLoaded", fetchNewQuote);

newQuote.addEventListener("click", fetchNewQuote);

function copyQuoteText(){
    navigator.clipboard.writeText(quote.textContent);
}
copyQuote.addEventListener("click", copyQuoteText);

function translateQuote() {
    const textToTranslate = `${quote.textContent} - ${name.textContent}`;
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|ar`;
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.responseStatus === 200) {
            const [translatedQuote, translatedName] = data.responseData.translatedText.split(' - ');
            quote.textContent = translatedQuote;
            name.textContent = translatedName;
            translateButton.textContent = "Show Original";
        } else {
            console.log('Translation error:', data.responseStatus);
        }
    })
    .catch(error => console.log('Translation error:', error));
}

translateButton.addEventListener("click", function() {
    if (translateButton.textContent === "Translate to Arabic") {
        translateQuote();
    } else {
        fetchNewQuote();
    }
});

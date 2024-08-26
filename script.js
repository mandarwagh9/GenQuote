// Elements
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetQuoteBtn = document.getElementById('tweet-quote');
const saveQuoteBtn = document.getElementById('save-quote');
const favoritesList = document.getElementById('favorites-list');

// Fetch a random quote from the API
async function getRandomQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        quoteText.innerText = `"${data.content}"`;
        authorText.innerText = `- ${data.author}`;
    } catch (error) {
        quoteText.innerText = "An error occurred. Please try again later.";
        authorText.innerText = "";
    }
}

// Tweet the current quote
// Tweet the current quote with a watermark
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const watermark = " GenQuotes";  // Your promotional text
    const tweetContent = `${quote} ${author} ${watermark}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`;
    window.open(tweetUrl, '_blank');
}

// Save the current quote to local storage
function saveFavorite() {
    const quote = quoteText.innerText + " " + authorText.innerText;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(quote)) {
        favorites.push(quote);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
    }
}

// Display saved favorite quotes
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesList.innerHTML = '';
    favorites.forEach((quote, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${quote} <span class="trash-icon" data-index="${index}">&#128465;</span>`;
        favoritesList.appendChild(li);
    });

    // Add event listeners to all trash icons
    document.querySelectorAll('.trash-icon').forEach(icon => {
        icon.addEventListener('click', removeFavorite);
    });
}

// Remove a favorite quote
function removeFavorite(event) {
    const index = event.target.getAttribute('data-index');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

// Event Listeners
newQuoteBtn.addEventListener('click', getRandomQuote);
tweetQuoteBtn.addEventListener('click', tweetQuote);
saveQuoteBtn.addEventListener('click', saveFavorite);

// Initial Load
getRandomQuote();
displayFavorites();
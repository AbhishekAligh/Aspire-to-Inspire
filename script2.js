const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector(".quote-text");
const authorText = document.querySelector("#author");
const newQuoteButton = document.querySelector("#new-quote");
const twitterButton = document.querySelector("#twitter");
const loaderAnimation = document.querySelector(".loader");

// Loader Animation

function loadingAnimation() {
  loaderAnimation.hidden = false;
  quoteContainer.hidden = true;
}
// Hide Loading Animation

function loadComplete() {
  if (!loaderAnimation.hidden) {
    quoteContainer.hidden = false;
    loaderAnimation.hidden = true;
  }
}
//  Fetch Quotes
let responseArray = [];
// use an Asynchronous function
function pickRandomQuote() {
  let quote = responseArray[Math.floor(Math.random() * responseArray.length)];
  console.log(quote);
  if(quote.text.length>120){
      quoteText.classList.add('long-quote');
  }
  else{
    quoteText.classList.remove('long-quote');
  }
  quoteText.innerText = quote.text;
  if (quote.author === "" || quote.author===null) {
    authorText.innerText = "Unknown";
  } else {
    authorText.innerText = quote.author;
  }
  loadComplete();
}
async function getQuotes() {
    loadingAnimation();
  const url = "https://type.fit/api/quotes";
  try {
    const response = await fetch(url);
    responseArray = await response.json();
    pickRandomQuote();
    newQuoteButton.addEventListener('click',pickRandomQuote);
    loadComplete();
  } catch (error) {
    console.log("Whoops! Try Again ", error);
  }
}


// Funtion to integrate with twitter
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}"-${author}`;
    window.open(twitterUrl, "_blank");
  }
  
  //Managing click event on the twitter button
  twitterButton.addEventListener("click", tweetQuote);
  
  // On Load
  getQuotes();
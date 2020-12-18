// Loader Animation

function loadingAnimation(){
document.getElementById('loader').hidden= false;
document.querySelector('.quote-container').hidden=true;
}
// Hide Loading Animation

function loadComplete(){
  if(!document.getElementById('loader').hidden){
    document.querySelector('.quote-container').hidden=false;
    document.getElementById('loader').hidden= true;

  }
}

//  Fetching Quotes from API

async function getQuote() {
  //   const proxyUrl = "https://cors-anywhere.heroku-app.com/";
  loadingAnimation();
  const url =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.quoteText.length > 50) {
      document.querySelector(".quote-text").classList.add("long-quote");
    } else {
      document.querySelector(".quote-text").classList.remove("long-quote");
    }
    document.querySelector(".quote-text").innerHTML = data.quoteText;
    if (data.quoteAuthor === "") {
      document.querySelector("#author").innerText = "Unknown";
    } else {
      document.querySelector("#author").innerText = data.quoteAuthor;
    }
    document.querySelector("#new-quote").addEventListener("click", getQuote);
    loadComplete();
  } catch (error) {
    console.log("Whoops, no quote!", error.message);
  }
}

// Funtion to integrate with twitter
function tweetQuote() {
  const quote = document.querySelector(".quote-text").innerText;
  const author = document.querySelector("#author").innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}"-${author}`;
  window.open(twitterUrl, "_blank");
}

//Managing click event on the twitter button
document.querySelector("#twitter").addEventListener("click", tweetQuote);

// On Load
getQuote();
const quoteContainer = document.getElementById('quote-container')
const quote = document.getElementById('quote')
const author = document.getElementById('author')
const twitterBtn = document.getElementById('twitterbtn')
const loadBtn = document.getElementById('loadBtn')
const loader = document.getElementById('loader')

function showQuoteLoader(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideQuoteLoader(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function tweetThis(){
    const quote = quote.innerText;
    const author = author.innerTest;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(twitterUrl,'_blank');

}

async function getQuote(){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const quoteApiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

    


    try{
        showQuoteLoader()
        const response = await fetch(proxyUrl + quoteApiUrl);
        const data = await response.json()

        quote.innerText = data.quoteText
        data.quoteAuthor ? author.innerText = data.quoteAuthor : author.innerText = 'Unknown'
        hideQuoteLoader()
        
        
    }catch(err){

        getQuote()
    }
   
}

loadBtn.addEventListener('click',getQuote)
twitterBtn.addEventListener('click',tweetThis)
getQuote()


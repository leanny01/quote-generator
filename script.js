const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
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
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');

}

async function getQuote(){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const quoteApiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

    


    try{
        showQuoteLoader()
        const response = await fetch(proxyUrl + quoteApiUrl);
        const data = await response.json()

        quoteText.innerText = data.quoteText
        data.quoteAuthor ? authorText.innerText = data.quoteAuthor : authorText.innerText = 'Unknown'
        hideQuoteLoader()
        
        
    }catch(err){

        getQuote()
    }
   
}

loadBtn.addEventListener('click',getQuote)
twitterBtn.addEventListener('click',tweetThis)
getQuote()


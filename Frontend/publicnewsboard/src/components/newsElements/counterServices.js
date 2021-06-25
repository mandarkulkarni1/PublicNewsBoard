export function fakeNewsSelector(news) {
    let { newsId, category, readerId } = news;
    
    //This line to be removed after making use of session storage
    readerId = readerId || 1;

    fetch('http://localhost:8080/reporters/reportnews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newsId: newsId,
            category: category,
            readerId: readerId
        })
    })
        .then(res => res.json())
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
        return;
}
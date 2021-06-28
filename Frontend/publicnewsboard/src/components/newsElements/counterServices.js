export function fakeNewsSelector(news) {
    let { newsId, category } = news;
    const readerId = JSON.parse(sessionStorage.getItem("reader"))
    fetch('http://localhost:8080/readers/reportnews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newsId: newsId,
            category: category,
            readerId: readerId[0].readerId  
        })
    })
        .then(res => res.json())
        .catch(error => {
            console.log(error)
        })
    return;
}

export function setViews(newsId) {
    fetch('http://localhost:8080/readers/views', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newsId: newsId,
        })
    })
        .then(res => res.json())
        .catch(error => {
            console.log(error)
        })
    return;
}
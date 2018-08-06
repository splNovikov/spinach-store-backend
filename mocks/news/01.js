const newsItem =
    {
        "id": "1",
        "title": "Новость 1",
        // - 5minutes from current Time
        'dateCreated': new Date(new Date().getTime() - 5 * 60 * 1000),
        'dateModified': new Date(new Date().getTime() - 5 * 60 * 1000),
        "content": "",
        "image": "https://pp.userapi.com/c840734/v840734868/41465/0Fk3puwuEg0.jpg"
    };

module.exports = newsItem;

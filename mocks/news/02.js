const newsItem =
    {
        "id": "2",
        "title": "Новость 2 с очень длинным названием. Sectum Sempra. Per aspera at astra",
        // - 1day from current Time
        'dateCreated': new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        'dateModified': new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "image": "https://pp.userapi.com/c831308/v831308892/13fb9/ryVEl93Lq30.jpg"
    };

module.exports = newsItem;

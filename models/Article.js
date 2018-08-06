function Article(id, title, dateCreated, dateModified, content, image, tags) {
    this.id = id;
    this.title = title;
    this.dateCreated = dateCreated;
    this.dateModified = dateModified;
    this.content = content;
    this.image = image;
    // todo mapping tags by id from the specific "TABLE"
    this.tags = tags;

}

module.exports = Article;
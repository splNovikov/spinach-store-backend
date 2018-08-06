function Product(id, title, image, price, manufacturer, weight, measure, composition, tags) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.price = price;
    // todo mapping manufacturer by id from the specific "TABLE"
    this.manufacturer = manufacturer;
    this.weight = weight;
    // todo mapping measure by id from the specific "TABLE"
    this.measure = measure;
    this.composition = composition;
    // todo mapping tags by id from the specific "TABLE"
    this.tags = tags;

}

module.exports = Product;
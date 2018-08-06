// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
const express = require('express');
const recipesList = require('./mocks/recipes');
const productsList = require('./mocks/products');
const newsList = require('./mocks/news');
const articlesList = require('./mocks/articles');
const _ = require('lodash');
const bodyParser = require('body-parser');

const RecipeBase = require('./models/RecipeBase');
const RecipeDetailed = require('./models/RecipeDetailed');
const Product = require('./models/Product');
const NewsItem = require('./models/NewsItem');
const Article = require('./models/Article');
const app = express();

app.set('port', (process.env.PORT || 3333));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.get('origin'));
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});


const router = express.Router();
app.use('/api', router);

router.route('/recipes')
    .get(function (req, res) {
        const { search, pageNum = 1, pageSize = 10, sortBy = 'title', sortDirection = 'asc' } = req.query;
        const offset = (pageNum - 1) * pageSize;
        const searchValue = _.trim(search).toLowerCase();

        const filteredRecipes = searchValue
            ? _.filter(recipesList, p => {
                return _.includes(p.title.toLowerCase(), searchValue);
            })
            : recipesList;

        const recipes = _.chain(filteredRecipes)
            .orderBy(sortBy, sortDirection.toLowerCase())
            .drop(offset)
            .take(pageSize)
            .map(recipe => {
                return new RecipeBase(
                    recipe.id,
                    recipe.title,
                    recipe.image,
                    recipe.content);
            })
            .value();

        // emulate slow connection:
        setTimeout(function () {
            res.status(200).json({
                recipes,
                total: filteredRecipes.length
            });
        }, 1000);
    });

router.route('/recipes/:id')
    .get(function (req, res) {
        const id = req.params.id;
        const foundRecipe = _.find(recipesList, i => i.id === id);

        if (foundRecipe) {
            const recipe = new RecipeDetailed(
                foundRecipe.id,
                foundRecipe.title,
                foundRecipe.image,
                foundRecipe.content,
                foundRecipe.ingredients,
                foundRecipe.directions);

            // emulate slow connection:
            setTimeout(function () {
                res.status(200).json(recipe);
            }, 1000);
        } else {
            res.sendStatus(404);
        }
    });

router.route('/products')
    .get(function (req, res) {
        const { search, pageNum = 1, pageSize = 10, sortBy = 'title', sortDirection = 'asc' } = req.query;
        const offset = (pageNum - 1) * pageSize;
        const searchValue = _.trim(search).toLowerCase();

        const filteredProducts = searchValue
            ? _.filter(productsList, p => {
                return _.includes(p.title.toLowerCase(), searchValue) ||
                    (p.manufacturer && _.includes(p.manufacturer.toLowerCase(), searchValue))
            })
            : productsList;

        const products = _.chain(filteredProducts)
            .orderBy(sortBy, sortDirection.toLowerCase())
            .drop(offset)
            .take(pageSize)
            .map(product => {
                return new Product(
                    product.id,
                    product.title,
                    product.image,
                    product.price,
                    product.manufacturer,
                    product.weight,
                    product.measure,
                    product.composition,
                    product.tags);
            })
            .value();

        // emulate slow connection:
        setTimeout(function () {
            res.status(200).json({
                products,
                total: filteredProducts.length
            });
        }, 1000);
    });

router.route('/products/:id')
    .get(function (req, res) {
        const id = req.params.id;
        const foundProduct = _.find(productsList, i => i.id === id);

        if (foundProduct) {
            const product = new Product(
                foundProduct.id,
                foundProduct.title,
                foundProduct.image,
                foundProduct.price,
                foundProduct.manufacturer,
                foundProduct.weight,
                foundProduct.measure,
                foundProduct.composition,
                foundProduct.tags);

            // emulate slow connection:
            setTimeout(function () {
                res.status(200).json(product);
            }, 1000);
        } else {
            res.sendStatus(404);
        }
    });

const orderedNewsList = _.orderBy(newsList, 'dateModified', 'desc');

router.route('/news')
    .get(function (req, res) {
        const { search, pageNum = 1, pageSize = 10 } = req.query;
        const offset = (pageNum - 1) * pageSize;
        const searchValue = _.trim(search).toLowerCase();

        const filteredNews = searchValue
            ? _.filter(orderedNewsList, item => {
                return _.includes(item.title.toLowerCase(), searchValue)
            })
            : orderedNewsList;

        const news = _.chain(filteredNews)
            .drop(offset)
            .take(pageSize)
            .map(item => {
                return new NewsItem(
                    item.id,
                    item.title,
                    item.dateCreated,
                    item.dateModified,
                    item.content,
                    item.image,
                    item.tags);
            })
            .value();

        // emulate slow connection:
        setTimeout(function () {
            res.status(200).json({
                news,
                total: filteredNews.length
            });
        }, 1000);
    });

router.route('/news/:id')
    .get(function (req, res) {
        const id = req.params.id;
        const foundNewsItem = _.find(newsList, i => i.id === id);

        if (foundNewsItem) {
            const newsItem = new NewsItem(
                foundNewsItem.id,
                foundNewsItem.title,
                foundNewsItem.dateCreated,
                foundNewsItem.dateModified,
                foundNewsItem.content,
                foundNewsItem.image,
                foundNewsItem.tags);

            // emulate slow connection:
            setTimeout(function () {
                res.status(200).json(newsItem);
            }, 1000);
        } else {
            res.sendStatus(404);
        }
    });

const orderedArticlesList = _.orderBy(articlesList, 'dateModified', 'desc');

router.route('/articles')
    .get(function (req, res) {
        const { search, pageNum = 1, pageSize = 10 } = req.query;
        const offset = (pageNum - 1) * pageSize;
        const searchValue = _.trim(search).toLowerCase();

        const filteredArticles = searchValue
            ? _.filter(orderedArticlesList, item => {
                return _.includes(item.title.toLowerCase(), searchValue)
            })
            : orderedArticlesList;

        const articles = _.chain(filteredArticles)
            .drop(offset)
            .take(pageSize)
            .map(item => {
                return new Article(
                    item.id,
                    item.title,
                    item.dateCreated,
                    item.dateModified,
                    item.content,
                    item.image,
                    item.tags);
            })
            .value();

        // emulate slow connection:
        setTimeout(function () {
            res.status(200).json({
                articles,
                total: filteredArticles.length
            });
        }, 1000);
    });

router.route('/articles/:id')
    .get(function (req, res) {
        const id = req.params.id;
        const foundArticle = _.find(articlesList, i => i.id === id);

        if (foundArticle) {
            const article = new Article(
                foundArticle.id,
                foundArticle.title,
                foundArticle.dateCreated,
                foundArticle.dateModified,
                foundArticle.content,
                foundArticle.image,
                foundArticle.tags);

            // emulate slow connection:
            setTimeout(function () {
                res.status(200).json(article);
            }, 1000);
        } else {
            res.sendStatus(404);
        }
    });

router.route('/feedback')
    .post(function (req, res) {
        // emulate slow connection:
        setTimeout(function () {
            res.sendStatus(200);
        }, 1000);

    });

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'));
});


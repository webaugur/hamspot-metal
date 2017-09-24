const metalsmith = require('metalsmith');
const drafts = require('metalsmith-drafts');
const markdown = require('metalsmith-markdown');
const collections = require('metalsmith-collections');
const aliases = require('metalsmith-aliases');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const sitemap = require('metalsmith-sitemap');
const Handlebars = require('handlebars');
const moment = require('moment');

Handlebars.registerHelper('is', function (value, test, options) {
    if (value === test) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('date', function (date) {
    return moment(date, "MM-DD-YYYY").format('Do MMM \'YY');
});

metalsmith(__dirname)
    .metadata({
        site: {
            name: 'Ham Spot Inc',
            description: "Ham Radio and Maker Products and Projects",
            generatorname: "Metalsmith",
            generatorurl: "http://metalsmith.io/",
            generatortitle: "Check out Metalsmith!",
            hostname: "Netlify",
            hosturl: "https://netlify.com/",
            hosttitle: "Learn more about Netlify"
        }
    })
    .source('./src')
    .destination('./dist')
    .clean(true)
    .use(drafts())
    .use(collections({
        products: {
            pattern: 'products/*.md',
            sortBy: 'date',
            reverse: true
        },
        bits: {
            pattern: 'bits/*.md',
            sortBy: 'date',
            reverse: true
        },
        homebrew: {
            pattern: 'homebrew/*.md',
            sortBy: 'date',
            reverse: true
        },
        presents: {
            pattern: 'presents/*.md',
            sortBy: 'date',
            reverse: true
        },
        salvage: {
            pattern: 'salvage/*.md',
            sortBy: 'date',
            reverse: true
        },
        'shack-talk': {
            pattern: 'shack-talk/*.md',
            sortBy: 'date',
            reverse: true
        },
        pages: {
            pattern: '*.md',
            sortBy: 'menu-order'
        }
    }))
    .use(markdown())
    .use(permalinks())
    .use(aliases())
    .use(layouts({
        engine: 'handlebars',
        directory: 'layouts',
        default: 'default.hbs',
        partials: 'layouts/partials'
    }))
    .use(sitemap({
        hostname: "https://metal.hamspot.com"
    }))
    .build(function (err) {
        if (err) throw err;
    });

/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var q = require('q');
var chalk = require('chalk');

var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};

var getCurrentProductData = function () {
    return q.ninvoke(Product, 'find', {});
};

var seedUsers = function () {

    var users = [
    {
        email: 'test@test.com',
        password: 'test',
        userType: 'user'
    },
    {
        email: 'admin@test.com',
        password: 'admin',
        userType: 'admin'
    }
    ];

    return q.invoke(User, 'create', users);

};

var seedProducts = function () {

    var products = [
    {
        title: 'Anna Wintour',
        description: 'Editor-in-chief of Vogue magazine.',
        price: 10000,
        quantity: 1,
        category: 'designers',
    },
    {
        title: 'Elon Musk',
        description: 'The greatest human in the world.',
        price: 9001,
        quantity: 42,
        category: 'entrepreneurs',
    },
    {
        title: 'Jay Z',
        description: 'I got 99 problems but a glitch ain\'t one.',
        price: 99,
        quantity: 30,
        category: 'musicians',
    },
    {
        title: 'Joe',
        description: 'I have no last name.',
        price: 500,
        quantity: 30,
        category: 'teachers',
    },
    {
        title: 'J. K. Rowling',
        description: 'Give me your childhoods.',
        price: 9.75,
        quantity: 1000000000,
        category: 'writers',
    },
    {
        title: 'Gordon Ramsay',
        description: 'Hello there, I\'m Gordon Ramsay! :-) It\'s an absolute pleasure to meet you.',
        price: 10,
        quantity: 10,
        category: 'chefs',
    },
    {
        title: 'Kevin Hart',
        description: 'My name is Kevin Hart, I like to make you laugh.',
        price: 300,
        category: 'comedians',
    }
    ];

    return q.invoke(Product, 'create', products);

};

connectToDb.then(function () {
    getCurrentUserData().then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        return getCurrentProductData()
    }).then(function (products) {
        if (products.length === 0) {
            return seedProducts();
        } else {
            console.log(chalk.magenta('Seems to already be product data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
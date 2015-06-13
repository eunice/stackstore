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
        displayName: 'Test User',
        userType: 'User'
    },
    {
        email: 'admin@test.com',
        displayName: 'Admin User',
        password: 'admin',
        userType: 'Admin'
    },
    {
        email: 'elon@test.com',
        password: 'elon',
        userType: 'Hero',
        displayName: 'Elon Musk',
        description: 'Elon Musk was born in South Africa and became a multimillionaire in his late twenties when he sold his start-up company, Zip2, to a division of Compaq Computers. He went on to more early success launching PayPal via a 2000 merger, Space Exploration Technologies Corp. (SpaceX) in 2002, and Tesla Motors in 2003. Musk made headlines in May 2012 when SpaceX launched a rocket that would send the first commercial vehicle to the International Space Station. He currently holds the occupation of greatest man in the world.',
        photo: 'http://www.themotorreport.com.au/content/image/e/l/elon_musk-0114-mc:819x819.jpg'
    },
    {
        email: 'jamie@test.com',
        password: 'jamie',
        userType: 'Hero',
        displayName: 'Jamie Shen',
        description: 'Yo yo yo I\'m Jamie Shen, I like to pick up all the hens.',
        photo: 'https://lh3.googleusercontent.com/6MZqccmjwZV9OhfFUsR5t9nIYF4PTTPyP2-dNk5qhIE=w466-h828-no'
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
        img: "https://nyppagesix.files.wordpress.com/2014/08/wintour2.jpg"
    },
    {
        title: 'Elon Musk',
        description: 'The greatest human in the world.',
        price: 9001,
        quantity: 42,
        category: 'entrepreneurs'
    },
    {
        title: 'Jay Z',
        description: 'I got 99 problems but a glitch ain\'t one.',
        price: 99,
        quantity: 30,
        category: 'musicians',
        img: "http://upload.wikimedia.org/wikipedia/commons/9/9c/Jay-Z_@_Shawn_'Jay-Z'_Carter_Foundation_Carnival_(crop_2).jpg"
    },
    {
        title: 'Joe',
        description: 'I have no last name.',
        price: 500,
        quantity: 30,
        category: 'teachers',
        img: 'http://www.fullstackacademy.com/img/team/joe_alves.jpg'
    },
    {
        title: 'J. K. Rowling',
        description: 'Give me your childhoods.',
        price: 9.75,
        quantity: 1000000000,
        category: 'writers',
        img: 'http://ilarge.lisimg.com/image/7955742/1118full-j.k.-rowling.jpg'
    },
    {
        title: 'Gordon Ramsay',
        description: 'Hello there, I\'m Gordon Ramsay! :-) It\'s an absolute pleasure to meet you.',
        price: 10,
        quantity: 10,
        category: 'chefs',
        img: 'http://i.forbesimg.com/media/lists/people/gordon-ramsay_416x416.jpg'
    },
    {
        title: 'Kevin Hart',
        description: 'My name is Kevin Hart, I like to make you laugh.',
        price: 300,
        category: 'comedians',
        img: 'http://upload.wikimedia.org/wikipedia/commons/b/ba/Kevin_Hart_2014.jpg'
    },
    {
        title: 'Scarlett Johansson',
        description: 'i am beautiful.',
        price: 999999,
        category: 'actors',
        img: 'http://si.wsj.net/public/resources/images/BN-BY925_mag041_OZ_20140318165119.jpg'
    },
    {
        title: 'Andy Murray',
        description: 'Getting closer...',
        price: 1000,
        category: 'athletes',
        img: 'http://www.independent.co.uk/incoming/article8439386.ece/alternates/w620/andy-murray-GETTY.jpg'
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
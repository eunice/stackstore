module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "VpL62JXrJnfB0jJZ2hZjk6b5Z",
    "consumerSecret": "daIzJSWf6K48ka08eJeMElFI7asbCKSmGXP1s5nIuGjTmoNGmE",
    "callbackUrl": "http://localhost:1337/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "122196114778457",
    "clientSecret": "b207e61f3274181e7d108fd82b9fb6dd",
    "callbackURL": "http://localhost:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "229095526324-i5iiecg7ham8512mlsgh37qvao1pplsf.apps.googleusercontent.com",
    "clientSecret": "tl7xEQ5viC4pHndcF3TNrz8U",
    "callbackURL": "http://localhost:1337/auth/google/callback"
  }
};
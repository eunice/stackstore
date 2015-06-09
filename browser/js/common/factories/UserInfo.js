'use strict';
app.factory('UserInfo', function ($http) {


    return {
        signUpInfo: function(signupinfo){
            return $http.post('/signup', signupinfo).then(function(response){
                return response.data;
            });
        } 
    };

});

//REMB TO SET UP /SIGNUP ROUTER
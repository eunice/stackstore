'use strict';
app.factory('UserInfo', function ($http) {


    return {
        signUpInfo: function(signupinfo){
        	console.log('hit factory'+signupinfo)
            return $http.post('/api/signup', signupinfo).then(function(response){
                return response.data;
            });
        } 

        checkSignUp: function(email){
        	console.log('hit checkSignUp')
        	var queryParams = {email: email};
        	return $http.get('/api/signup/findBeforeCreate', queryParams).then(function(response){
        		return response.data;
        	})
        	
        }
    };

});

//REMB TO SET UP /SIGNUP ROUTER
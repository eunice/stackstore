'use strict';
app.factory('UserInfo', function ($http) {


    return {
        signUpInfo: function(signupinfo){
        	console.log('hit factory'+signupinfo);
            return $http.post('/api/signup', signupinfo).then(function(response){
                return response.data;
            });
        },

        checkSignUp: function(email){
        	console.log('hit checkSignUp', email);
        	var queryParams= {};
          queryParams.email = email;
          //queryParams = req.query
        	return $http.get('/api/signup/findBeforeCreate', {params: queryParams}).then(function(response){
        		return response.data;
        	});

        },

        updatePw: function(pw) {
          console.log('update pw', pw);
          return $http.post('/api/updatepw', pw).then(function(response) {
            return response.data;
          })
        }
    };

});

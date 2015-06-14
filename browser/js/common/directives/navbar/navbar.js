'use strict';
app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, SearchFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {
            // scope.users;
            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Discover', state: 'discover' },
                { label: 'Become a hero', state: 'becomehero' },
                { label: 'Admin Only', state: 'adminOnly', adminauth: true },
                { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.user = null;
            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            scope.search = function (searchWord) {
                $state.go('search', {params: searchWord});
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});

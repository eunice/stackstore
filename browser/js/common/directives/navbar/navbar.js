'use strict';
app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, SearchFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {
            // scope.users;
            scope.items = [
                { label: 'Home', state: 'home', icon: 'home' },
                { label: 'Discover', state: 'discover', icon: 'star' },
                { label: 'Become a hero', state: 'becomehero', icon: 'university' },
                { label: 'Admin Only', state: 'adminOnly', adminauth: true, icon: 'user-secret' },
                { label: 'View Account', state: 'userOnly', auth: true, icon: 'user'}
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
                    if (user.userType !== 'User')
                        scope.items[2].label = 'Manage Store';
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            scope.search = function (searchWord) {
                $state.go('search', {params: searchWord});
            };

            scope.profile = function (id) {
                $state.go('Profile', {id: id})
            }

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});

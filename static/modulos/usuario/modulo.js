
var dependencias = ['textAngular', 'ngSanitize'];
angular
    .module('blogjs.usuario', dependencias)
    .config(function($routeProvider, $locationProvider){

  $routeProvider

    .when('/usuario/cadastro', {
      controller: 'CadastroUsuarioController',
      templateUrl: 'modulos/usuario/cadastro/view.html'
    })

    .when('/usuario/:id', {
      controller: 'CadastroUsuarioController',
      templateUrl: 'modulos/usuario/cadastro/dados.html'
    })

    .when('/login', {
      controller: 'LoginController',
      templateUrl: 'modulos/usuario/login/view.html'
    });

    $locationProvider.hashPrefix('');

});

angular.module('blogjs').controller('MenuController', function($scope, $location, usuarios){

  var carregarUsuario = function(){
    return usuarios.getUsuarioLogado();
  }

  $scope.usuarioLogado = carregarUsuario();

  $scope.sair = function(){
    sair($scope.usuarioLogado);
  }

  var sair = function(usuario){
    //localStorage.removeItem('usuarioLogado');
    localStorage.clear();
    $scope.usuarioLogado = null;
    $location.path('/');
  }

  $scope.$on('usuario.entrou', function(evento, usuario){
    $scope.usuarioLogado = usuario;
    $location.path('usuarios/'+usuario._id+'/posts');
  });

  $scope.$on('usuario.saiu', function(evento, usuario){
    sair(usuario);
  });

});

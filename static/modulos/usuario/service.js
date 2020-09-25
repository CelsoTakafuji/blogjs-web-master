
angular.module('blogjs.usuario').factory('usuarios', function($rootScope, $http, urlApi){

  var cadastrar = function(usuario){
    return $http.post(urlApi + '/v1/usuarios', usuario);
  };

  var remover = function(id){
    return $http.post(urlApi + '/v1/usuarios/'+id);
  };

  var atualizar = function(usuario, id){
    return $http.put(urlApi + '/v1/usuarios/'+id, usuario);
  };

  var autenticar = function(login, senha){
    var auth = {login:login, senha:senha};
    return $http.post(urlApi + '/v1/usuarios/auth', auth);
  };

  var getUsuarioLogado = function(){
    return JSON.parse(localStorage.getItem('usuarioLogado'));
  };

  var buscar = function(id){
    return $http.get(urlApi + '/v1/usuarios/'+id);
  }

  var sair = function(){
    $rootScope.$broadcast('usuario.saiu', null);
  };

  var setId = function(id){
    localStorage.setItem('currentId', id);
  }

  var getId = function(){
    var dados = localStorage.getItem('currentId');
    if(dados){
      return parseInt(dados);
    } else {
      return 0;
    }
  }

  var getUsuarios = function(){
    var dados = localStorage.getItem('usuarios');
    if(dados){
      return JSON.parse(dados);
    } else {
      return [];
    }
  }

  var setUsuarios = function(usuarios){
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  return {
    cadastrar:cadastrar,
    atualizar:atualizar,
    remover:remover,
    autenticar:autenticar,
    buscar:buscar,
    getUsuarioLogado:getUsuarioLogado,
    sair:sair
  }

});

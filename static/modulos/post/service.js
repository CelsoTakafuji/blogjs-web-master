
angular.module('blogjs.post').factory('posts', function($http, urlApi){

  var remover = function(postId, usuarioId){
    return $http.post(urlApi + '/v1/usuarios/'+usuarioId+'/posts/'+postId);
  };

  var registrar = function(post, usuarioId){
    return $http.post(urlApi + '/v1/usuarios/'+usuarioId+'/posts/', post);
  };

  var atualizar = function(post, postId, usuarioId){
    return $http.put(urlApi + '/v1/usuarios/'+usuarioId+'/posts/'+postId, post);
  };

  var buscarPorUsuario = function(usuarioId, postId){
    return $http.get(urlApi + '/v1/usuarios/'+usuarioId+'/posts/'+postId);
  };

  var buscarPorId = function(postId){
    return $http.get(urlApi + '/v1/posts/'+postId);
  }

  var listarPorUsuario = function(usuarioId){
    return $http.get(urlApi + '/v1/usuarios/'+usuarioId+'/posts');
  };

  var comentar = function(postId, comentario){
      return $http.post(urlApi + '/v1/posts/'+postId+'/comentarios', comentario);
  }

  var removerComentario = function(postId, comentarioId){
      return $http.post(urlApi + '/v1/posts/'+postId+'/comentarios/remover/'+comentarioId);
  }

  var alterarComentario = function(postId, comentarioId, comentario){
      return $http.post(urlApi + '/v1/posts/'+postId+'/comentarios/alterar/'+comentarioId, comentario);
  }

  var listarUltimos = function(qtd){
      return $http.get(urlApi + '/v1/posts/qtd/' + qtd);
  };

  var listarTodos = function(titulo, pagina){
    var pagina = pagina || 1;
    var url

    if(titulo){
        url = urlApi + '/v1/posts?pagina='+pagina+'&titulo='+titulo
    } else {
        url = urlApi + '/v1/posts?pagina='+pagina
    }
    return $http.get(url);
  };

  var setId = function(id){
    localStorage.setItem('currentPostId', id);
  }

  var getId = function(){
    var dados = localStorage.getItem('currentPostId');
    if(dados){
      return parseInt(dados);
    } else {
      return 0;
    }
  }

  var getPosts = function(){
    var dados = localStorage.getItem('posts');
    if(dados){
      return JSON.parse(dados);
    } else {
      return [];
    }
  }

  var setPosts = function(usuarios){
    localStorage.setItem('posts', JSON.stringify(usuarios));
  }

  return {
    registrar:registrar,
    remover:remover,
    atualizar:atualizar,
    comentar:comentar,
    removerComentario:removerComentario,
    alterarComentario:alterarComentario,
    listarUltimos:listarUltimos,
    listarTodos:listarTodos,
    listarPorUsuario:listarPorUsuario,
    buscarPorUsuario:buscarPorUsuario,
    buscarPorId:buscarPorId
  }

});

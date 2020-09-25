angular.module('blogjs.post')
  .controller('VisualizacaoUsuarioPostController', function($scope, $location, $routeParams, posts, usuarios){

  var carregarPost = function(){
      var usuarioId = $routeParams.id;
      var postId = $routeParams.postId;
      posts.buscarPorUsuario(usuarioId, postId)
          .then(function(resultado){
              $scope.post = resultado.data;
          })
          .catch(function(erro){
             alert(erro);
          });
  }

  var removerPost = function(){
      var usuarioId = $routeParams.id;
      var postId = $routeParams.postId;
      posts.remover(postId, usuarioId)
          .then(function(resultado){
              cancelarEdicao();
              $location.path('usuarios/'+usuarioId+'/posts');
          })
          .catch(function(erro){
             alert(erro);
          });
  }

  var salvarEdicao = function(post){
      var usuarioId = $routeParams.id;
      var postId = $routeParams.postId;
      posts.atualizar(post, postId, usuarioId)
          .then(function(resultado){
              $scope.post = resultado.data;
              cancelarEdicao();
          })
          .catch(function(erro){
             alert(erro);
          });
  }

  var habilitarEdicao = function(){
      $scope.estaSendoEditado = true;
      $scope.postEditado = angular.copy($scope.post);
  }

  var cancelarEdicao = function(){
      $scope.estaSendoEditado = false;
  }

  var carregarUsuario = function(){
    return usuarios.buscar($routeParams.id);
  }

  var removerComentario = function(postId, comentarioId){
      posts.removerComentario(postId, comentarioId)
      .then(function(resultado){
          $scope.comentario = null;
          $scope.post = resultado.data;
      })
      .catch(function(erro){
           alert(erro);
      });
  }

  var alterarComentario = function(postId, comentarioId, comentario){
      posts.alterarComentario(postId, comentarioId, comentario)
      .then(function(resultado){
          alert('Comentário alterado!');
          $scope.post = resultado.data;
      })
      .catch(function(erro){
           alert(erro);
      });
  }

  $scope.cancelarEdicao = cancelarEdicao;
  $scope.habilitarEdicao = habilitarEdicao;
  $scope.removerPost = removerPost;
  $scope.salvarEdicao = salvarEdicao;
  $scope.postEditado = {};
  $scope.removerComentario = removerComentario;
  $scope.alterarComentario = alterarComentario;

  $scope.init = function(){
      carregarPost();
  }

});

angular.module('blogjs.post')
  .controller('VisualizacaoPostController', function($scope, $routeParams, posts, usuarios){

  var carregarPost = function(){
      var postId = $routeParams.postId;
      posts.buscarPorId(postId)
        .then(function(resultado){
            $scope.post = resultado.data;
        })
        .catch(function(erro){
            alert(erro);
        });
  }

  var carregarUsuarioLogado = function(){
      $scope.usuarioLogado = usuarios.getUsuarioLogado();
  }

  var comentar = function(comentario){
      var postId = $routeParams.postId;
      posts.comentar(postId, comentario)
        .then(function(resultado){
            $scope.comentario = null;
            $scope.post = resultado.data;
        })
        .catch(function(erro){
             alert(erro);
        });
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

  $scope.comentar = comentar;
  $scope.removerComentario = removerComentario;
  $scope.alterarComentario = alterarComentario;

  $scope.init = function(){
      carregarPost();
      carregarUsuarioLogado();
  }

});

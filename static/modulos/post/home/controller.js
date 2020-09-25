angular.module('blogjs.post').controller('HomeController', function($scope, posts, $routeParams, $location){


    var carregarPosts = function(){
      posts.listarUltimos(5)
          .then(function(resultado){
              $scope.posts = resultado.data;
          })
          .catch(function(err){
              alert(err);
          });
    }

    $scope.init = function(){
        carregarPosts();
    }


});

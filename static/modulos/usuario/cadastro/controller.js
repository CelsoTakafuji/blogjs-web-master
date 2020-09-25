
angular.module('blogjs.usuario').controller('CadastroUsuarioController', function($scope, $http, $location, $routeParams, usuarios){

  var cadastrar = function(usuario){
    var file = document.getElementById('avatar').files[0];

    if(file){
        //Upload do novo avatar
        var uploadUrl = "/uploadAvatar";
        var fd = new FormData();

        var ext = file.name.substr(file.name.lastIndexOf('.')+1);
        if(ext != "jpg" && ext != "gif" && ext != "png"){
          alert("Extensão inválida: "+ext+"! Só é permido: jpg, gif e png.");
          return;
        }
        var nomeImg = 'avatar-'+usuario.nome + '-' + Date.now() + '.' + ext;

        fd.append('file', file, nomeImg);

        $http.post(uploadUrl, fd, {
           transformRequest: angular.identity,
           headers: {'Content-Type': undefined}
        });

        usuario.avatar = 'uploads/'+nomeImg;
    }

    $scope.usuario = {};

    if (valido(usuario)) {
      usuarios.cadastrar(usuario)
        .then(function(resultado){
            $location.path('login');
        })
        .catch(function(err){
            alert('Nao foi possível registrar!');
        });
    } else {
      alert('Dados invalidos!');
    }
  };

  var valido = function(usuario){
    return usuario.nome && usuario.login && usuario.senha;
  };

  var carregarUsuario = function(){
      var id = $routeParams.id;

      usuarios.buscar(id)
          .then(function(resultado){
              $scope.usuario = resultado.data;
          })
          .catch(function(erro){
             alert(erro);
          });
  }

  var salvar = function(usuario){
      var file = document.getElementById('avatar').files[0];

      if(file){
          //Upload do novo avatar
          var uploadUrl = "/uploadAvatar";
          var fd = new FormData();

          var ext = file.name.substr(file.name.lastIndexOf('.')+1);
          if(ext != "jpg" && ext != "gif" && ext != "png"){
            alert("Extensão inválida: "+ext+"! Só é permido: jpg, gif e png.");
            return;
          }
          var nomeImg = 'avatar-'+usuario.nome + '-' + Date.now() + '.' + ext;

          fd.append('file', file, nomeImg);

          $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined}
          });

          //Remover avatar antigo (MÉTODO ANTIGO - Sem usar body-parser)
          //if(usuario.avatar){
          //    var removeUrl = "/removerAvatar/" + usuario.avatar.substr(usuario.avatar.lastIndexOf('/')+1);
          //    $http.put(removeUrl);
          //}

          //Remover avatar antigo
          if(usuario.avatar){
              usuario.avatarOriginal = usuario.avatar;
              var removeUrl = "/removerAvatar";
              $http.put(removeUrl, usuario);
          }

          usuario.avatar = 'uploads/'+nomeImg;
      }

      var id = $routeParams.id;

      usuarios.atualizar(usuario, id)
          .then(function(resultado){
              $scope.usuario = resultado.data;
              window.location.reload();
          })
          .catch(function(erro){
             alert('Erro: '+erro);
          });
  }

  var remover = function(){
      var r = confirm("Ao remover o cadastro. "+
                      "Todos os seus posts publicados serão excluídos! "+
                      "Tem certeza que deseja continuar a operação?");

      if (r == false) {
          return;
      }

      var id = $routeParams.id;

      var usuario = $scope.usuario;

      //Remover avatar antigo
      if(usuario.avatar){
          usuario.avatarOriginal = usuario.avatar;
          var removeUrl = "/removerAvatar";
          $http.put(removeUrl, usuario);
      }

      //Remover usuário do banco
      usuarios.remover(id)
          .then(function(resultado){
             usuarios.sair();
             $location.path('/');
          })
          .catch(function(erro){
             alert('Erro: '+erro);
          });
  }

  $scope.cadastrar = cadastrar;
  $scope.salvar = salvar;
  $scope.remover = remover;

  $scope.init = function(){
      carregarUsuario();
  }

});

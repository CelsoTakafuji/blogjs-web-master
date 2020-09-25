var dependencias = ['ngRoute', 'ui.bootstrap', 'blogjs.usuario', 'blogjs.post'];

angular
    .module('blogjs', dependencias)
    //https://blognapaapi.herokuapp.com
    .constant('urlApi', 'http://localhost:9000');

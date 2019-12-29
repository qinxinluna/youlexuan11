//登陆服务层
app.service('loginService',function($http){
    //读取登录人名称
    this.getName = function(){
        return $http.get('../login/getName.do');
    }
});
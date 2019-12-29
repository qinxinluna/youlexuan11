app.controller('loginController' ,function($scope, loginService){
    //读取当前登录人  
    $scope.getName =function(){
        loginService.getName().success(
            function(response){
                //正则表达式
                $scope.loginName=response.replace(/\"/g,"");
            }
        );
    }
});	
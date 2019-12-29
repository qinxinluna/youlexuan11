//定义控制层
//第一个参数 ,控制层的名字
//第二个参数 ,控制层干的事情
app.controller('brandController',function ($scope, $controller, brandService) {
    //继承
    $controller('baseController',{
        $scope: $scope
    });

    //查询所有
    $scope.findAll = function(){
        brandService.findAll().success(function (response) {
            $scope.list = response;
        })
    }

    //分页查询
    $scope.findPage=function(page,size){
        brandService.findPage(page,size).success(
            function(response){
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }
    //新建添加并保存
    /*$scope.save=function(){
        $http.post('../brand/add.do',$scope.entity ).success(
                function(response){
                    if(response.success){
                        //重新查询
                        $scope.reloadList();
                    }else{
                        alert(response.message);
                    }
                }
        );
    }*/
    //点击修改时  回显查询单个品牌
    $scope.findOne=function(id){
        brandService.findOne(id).success(
            function(response){
                if (response){
                    $scope.entity = response;
                }
            }
        );
    }
    //新建后保存与修改后保存
    $scope.save = function(){
        brandService.save($scope.entity ).success(
            function(response){
                if(response.success){
                    //重新查询
                    $scope.reloadList();
                }else{
                    alert(response.message);
                }
            }
        );
    }

    //批量删除
    $scope.dele = function () {
        if ($scope.selectIds.length >0){
            //获取选中的复选框
            brandService.dele($scope.selectIds).success(function (response) {
                if (response.success) {
                    //刷新列表
                    $scope.reloadList();
                    //清空选中的id
                    $scope.selectIds = [];
                }else{
                    alert(response.message)
                }
            })
        }else {
            alert("请选中要删除的记录")
        }
    }
    $scope.searchEntity = {};//刚进页面时,查询条件为空,就不提交空值
    //查询
    $scope.search = function (page,size) {
        brandService.search(page,size,$scope.searchEntity).success(function (response) {
            $scope.list = response.rows;
            $scope.paginationConf.totalItems = response.total;//更新总记录数
        })
    }


})
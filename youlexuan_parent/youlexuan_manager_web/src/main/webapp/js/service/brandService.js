//定义服务层
//第一个参数 ,服务层的名字
//第二个参数 ,服务层干的事情
app.service('brandService',function ($http) {
    this.findAll = function () {
        return $http.get('../brand/findAll.do');
    }

    this.findPage = function (page,size) {
        return $http.get('../brand/findPage.do?page=' + page + '&size=' + size);
    }
    this.findOne = function (id) {
        return $http.get('../brand/findOne.do?id=' + id);
    }
    this.save = function (entity) {
        var methodName = 'add';//方法名称
        if(entity.id != null){//如果有ID
            methodName='update';//则执行修改方法
        }
        return $http.post('../brand/' + methodName +'.do',entity )
    }
    this.dele = function (ids) {
        return $http.get('../brand/delete.do?ids=' + ids );
    }
    this.search = function (page,size,searchEntity) {
        return $http.post('../brand/search.do?page='+ page + '&size='+ size,searchEntity);
    }
    this.findBrandOptionList = function () {
        return $http.get('../brand/findBrandOptionList.do');
    }
})
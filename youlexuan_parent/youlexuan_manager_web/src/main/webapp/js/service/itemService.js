//item服务层
app.service('itemService', function($http){
	// 保存、修改
	this.save = function(entity) {
		var methodName = 'add'; 	// 方法名称
		if (entity.id != null) { 	// 如果有ID
			methodName = 'update'; 	// 则执行修改方法
		}
		return $http.post('../item/' + methodName + '.do', entity);
	}

	// 查询单个实体
	this.findOne = function(id) {
		return $http.get('../item/findOne.do?id=' + id);
	}

	// 批量删除
	this.dele = function(ids) {
		// 获取选中的复选框
		return $http.get('../item/delete.do?ids=' + ids);
	}

	// 查询
	this.search = function(page, size, searchEntity) {
		// post提交，page、size属性和之前相同，将searchEntity提交至后台@RequestBody对应的属性
		return $http.post('../item/search.do?page=' + page + '&size=' + size,
				searchEntity);
	}

});
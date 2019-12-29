//item_cat控制层 
app.controller('itemCatController' ,function($scope, $controller, itemCatService, typeTemplateService){
	
	// 继承
	$controller("baseController", {
		$scope : $scope
	});
	
	// 保存
	$scope.save = function() {
		$scope.entity.parentId = $scope.pId;
		itemCatService.save($scope.entity).success(function(response) {
			if (response.success) {
				// 重新加载
				$scope.findParentById($scope.pId);
			} else {
				alert(response.message);
			}
		});
	}
	
	//查询实体 
	$scope.findOne = function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//批量删除 
	$scope.dele = function(){			
		//获取选中的复选框			
		itemCatService.dele($scope.selectIds).success(
			function(response){
				if(response.success){
					$scope.findParentById($scope.pId);
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	// 定义搜索对象 
	$scope.searchEntity = {};
	// 搜索
	$scope.search = function(page,size){			
		itemCatService.search(page,size,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;
			}			
		);
	}

	$scope.findParentById = function (parentId) {
		//记录当前的父ID
		$scope.pId = parentId;
		itemCatService.findParentById(parentId).success(function (response) {
			if (response){
				$scope.list = response;
			}
		})
	}

	//默认级别

	$scope.grade = 1;
	$scope.setGrade = function (val) {
		$scope.grade = val;
	}

	//更改上一级分类
	$scope.changeParent = function (p_entity) {
		if ($scope.grade == 1){
			$scope.entity1 =null;
			$scope.entity2 =null;
		}
		if ($scope.grade == 2) {
			$scope.entity1 = p_entity;
			$scope.entity2 = null;
		}
		if ($scope.grade == 3) {
			$scope.entity2 = p_entity;
		}
		$scope.findParentById( p_entity.id);
	}

	//读取模板列表
	$scope.findtypeTemplateList=function(){
		typeTemplateService.selectOptionList().success(
			function(response){
				$scope.typeTemplateList={data:response};
			}
		);
	}
});	

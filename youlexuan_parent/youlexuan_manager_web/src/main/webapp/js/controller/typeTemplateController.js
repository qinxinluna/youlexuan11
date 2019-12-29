//type_template控制层 
app.controller('typeTemplateController' ,function($scope, $controller, typeTemplateService, brandService, specificationService){
	
	// 继承
	$controller("baseController", {
		$scope : $scope
	});
	
	// 保存
	$scope.save = function() {
		typeTemplateService.save($scope.entity).success(function(response) {
			if (response.success) {
				// 重新加载
				$scope.reloadList();
			} else {
				alert(response.message);
			}
		});
	}
	
	//查询实体 
	$scope.findOne = function(id){				
		typeTemplateService.findOne(id).success(
			function(response){
				$scope.entity= response;
				$scope.entity.brandIds = JSON.parse($scope.entity.brandIds);
				$scope.entity.specIds = JSON.parse($scope.entity.specIds);
				$scope.entity.customAttributeItems = JSON.parse($scope.entity.customAttributeItems);

			}
		);				
	}
	
	//批量删除 
	$scope.dele = function(){			
		//获取选中的复选框			
		typeTemplateService.dele($scope.selectIds).success(
			function(response){
				if(response.success){
					$scope.reloadList();
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	// 定义搜索对象 
	$scope.searchEntity = {};
	// 搜索
	$scope.search = function(page,size){			
		typeTemplateService.search(page,size,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;
			}			
		);
	}

	//品牌下拉列表
	//$scope.brandList = {data:[{}]};
	$scope.findBrandOptionList = function () {
		brandService.findBrandOptionList().success(function (response) {
			if (response){
				$scope.brandList = {data:response};
			}
		})
	}

	//规格下拉列表
	//$scope.specList = {data:[{}]};
	$scope.findSpecOptionList = function () {
		specificationService.findSpecOptionList().success(function (response) {
			if (response){
				$scope.specList = {data:response};
			}
		})
	}

	//增加自定义属性表格行
	$scope.addTableRow = function () {
		$scope.entity.customAttributeItems.push({});
	}

	//删除自定义属性表格行
	$scope.delTableRow = function (idx) {
		$scope.entity.customAttributeItems.splice(idx,1);
	}

	//下拉列表数据
	this.selectOptionList=function(){
		return $http.get('../typeTemplate/selectOptionList.do');
	}
});	

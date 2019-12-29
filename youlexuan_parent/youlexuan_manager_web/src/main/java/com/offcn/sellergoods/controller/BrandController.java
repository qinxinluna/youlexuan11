package com.offcn.sellergoods.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.offcn.entity.PageResult;
import com.offcn.entity.Result;
import com.offcn.pojo.TbBrand;
import com.offcn.service.BrandService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/brand")
public class BrandController {

    @Reference
    private BrandService brandService;

    @RequestMapping("/findAll")
    public List<TbBrand> findAll(){
        return brandService.findAll();
    }
    /*返回指定页码、行数 品牌列表*/
    @RequestMapping("/findPage")
    @ResponseBody
    public PageResult findPage(int page, int size){
        return brandService.findPage(page, size);
    }

    @RequestMapping("/search")
    @ResponseBody
    public PageResult search(@RequestBody TbBrand brand, int page, int size){
        return brandService.findPage(brand, page, size);
    }

    /*增加*/
    @RequestMapping("/add")
    @ResponseBody
    public Result add(@RequestBody TbBrand brand){
        try {
            brandService.add(brand);
            return new Result(true, "增加成品牌功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "增加品牌失败");
        }
    }
    /*修改*/
    @RequestMapping("/update")
    @ResponseBody
    public Result update(@RequestBody TbBrand brand){
        try {
            brandService.update(brand);
            return new Result(true, "修改品牌成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "修改品牌失败");
        }
    }
    /*获取实体*/
    @RequestMapping("/findOne")
    @ResponseBody
    public TbBrand findOne(Long id){
        return brandService.findOne(id);
    }
    //批量删除
    @RequestMapping("/delete")
    @ResponseBody
    public Result delete( Long [] ids){
        try {
            brandService.delete(ids);
            return new Result(true,"删除品牌成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"删除品牌失败");
        }
    }

    @RequestMapping("/findBrandOptionList")
    @ResponseBody
    public List<Map> findBrandOptionList(){

        return brandService.findBrandOptionList();
    }

}

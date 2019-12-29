package com.offcn.sellergoods.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.offcn.entity.PageResult;
import com.offcn.entity.Result;
import com.offcn.group.Goods;

import com.offcn.pojo.TbGoods;
import com.offcn.pojo.TbItem;
import com.offcn.service.GoodsService;
import org.apache.activemq.command.ActiveMQQueue;
import org.apache.activemq.command.ActiveMQTopic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * goodscontroller
 * @author senqi
 *
 */
@RestController
@RequestMapping("/goods")
public class GoodsController {

	@Reference
	private GoodsService goodsService;





	@Autowired
	private JmsTemplate jmsTemplate;

	@Autowired
	private ActiveMQQueue importSolrQueue;

	@Autowired
	private ActiveMQTopic createPageTopic;

	/**
	 * 测试方法,最终要整合到商品审核通过时使用
	 * @param goodsId
	 */
	@RequestMapping("/createPage")
	public void createPage(Long goodsId){
		//pageService.genItemHtml(goodsId);

		System.out.println("生成页面成功!!");
	}
	
	/**
	 * 返回全部列表
	 * @return
	 */
	@RequestMapping("/findAll")
	public List<TbGoods> findAll(){			
		return goodsService.findAll();
	}
	
	
	/**
	 * 返回全部列表
	 * @return
	 */
	@RequestMapping("/findPage")
	public PageResult findPage(int page,int rows){			
		return goodsService.findPage(page, rows);
	}
	
	/**
	 * 增加
	 * @param goods
	 * @return
	 */
	@RequestMapping("/add")
	public Result add(@RequestBody Goods goods){
		try {
			//goodsService.add(goods);
			return new Result(true, "增加成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "增加失败");
		}
	}
	
	/**
	 * 修改
	 * @param goods
	 * @return
	 */
	@RequestMapping("/update")
	public Result update(@RequestBody Goods goods){
		try {
			//goodsService.update(goods);
			return new Result(true, "修改成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "修改失败");
		}
	}
		//审核
	@RequestMapping("/updateStatus")
	public Result updateStatus(Long[]ids,String status){
		try {
			goodsService.updateStatus(ids,status);
			//审核通过,向Solr中导入数据
			if ("1".equals(status)){
				//向Solr中导入数据
				List<TbItem> list = goodsService.findItemByGoodsId(ids);

				//itemSearchService.importData(list);

				//开始进行解耦处理:
				//为了确保发送端与接收端的消息类型是一致的
				//当遇到较复杂类型,需要发送时,建议先处理成字符串,以文本形式发送

				String listStr = JSON.toJSONString(list);
				jmsTemplate.convertAndSend(importSolrQueue,listStr);


				//生成静态详情页模板
				/*for (Long id : ids) {
					//pageService.genItemHtml(id);
				}*/
				//发送生成页面的消息
				jmsTemplate.convertAndSend(createPageTopic,ids);

			}
			return new Result(true, "审核成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "审核失败");
		}
	}

	/**
	 * 获取实体
	 * @param id
	 * @return
	 */
	@RequestMapping("/findOne")
	public Goods findOne(Long id){

		return goodsService.findOne(id);
	}
	
	/**
	 * 批量删除
	 * @param ids
	 * @return
	 */
	@RequestMapping("/delete")
	public Result delete(Long [] ids){
		try {
			goodsService.delete(ids);


			return new Result(true, "删除成功"); 
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "删除失败");
		}
	}
	
	/**
	 * 查询+分页
	 * @param goods
	 * @param page
	 * @param size
	 * @return
	 */
	@RequestMapping("/search")
	public PageResult search(@RequestBody TbGoods goods, int page, int size){
		return goodsService.findPage(goods, page, size);		
	}
	
}

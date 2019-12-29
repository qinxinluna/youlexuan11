package com.offcn.content.controller;

import com.offcn.entity.Result;
import com.offcn.util.FastDFSClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UploadController {

    @Value("${fastdfs_url}")
    private String fastdfs_url;

    @RequestMapping("/upload")
    public Result upload(MultipartFile file){



        //1、取文件的扩展名
        String originalFilename = file.getOriginalFilename();

        //获取文件的后缀
        String extName = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

        try {
            //2、创建一个 FastDFS客户端
            FastDFSClient fastDFSClient = new FastDFSClient("classpath:fdfs_client.conf");

            //3、执行上传处理
            String path = fastDFSClient.uploadFile(file.getBytes(), extName);

            //4、拼接返回的图片路径 和 ip 地址成完整的 url
            String url = fastdfs_url + path;

            return new Result(true, url);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "上传失败");
        }
    }



}
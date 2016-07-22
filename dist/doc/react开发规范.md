react架构及规范

> by 封传梼 2016/06/22

### 技术选型: 

1. 样式: less
2. 前端显示: react
3. 数据架构方式: redux
4. 路由: react-route(单页SPA模式)
5. 中间层node
6. 自动化构建webpack+fis3(待定)
7. js书写方式 ECM6

### 项目必须项

1. 代码必须打包加密
2. 静态资源必须上传cdn
3. js书写严格按照ECM6标准书写
4. 图片需压缩上传
5. 静止重写base文件基础样式
6. 所有图片严格按照惰性加载加载禁止同步加载

### 项目架构目录规范

app                 #开发目录
|   |   
|   ├──actions          #action的文件
|   |   
|   ├──components     #所有组件
|   |   
|   ├──containers       #容器组件(页面组装)
|   |   
|   ├──reducers         #reducer文件
|   |   
|   ├──stores           #store配置文件
|   |
|   └──index.js         #入口文件
|      
├── dist                #发布目录
├── node_modules        #包文件夹
├── webpack.config.js   #webpack配置文件
└── package.json

### 组件书写规范


```
/**
 * 头部组件 by 代小星 
 */

/**
 * 引入业务基本模板包
 */
import React from "react";
var Link = require('react-router').Link;

/**
 * 引入对用css
 */
import Stylesheets from "./re-topbar.css";

/**
 * 引入业务相关文件包
 */
import xxx from "xxx"
```

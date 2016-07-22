@(node)
## 最近学了一下NodeJS,把其中的收获分享给大家
安装及教程请狠狠地戳这里[nodejs菜鸟教程](http://www.runoob.com/nodejs/nodejs-tutorial.html)和[Node.js API中文版](http://nodeapi.ucdok.com/#/api/)，入门请狠狠地戳这里[node入门](http://www.nodebeginner.org/index-zh-cn.html)，请把[CNode](http://cnodejs.org/)好好的收藏起来，书籍推荐<font color='red'>深入浅出nodejs</font>（别急,先把node入门给看了）。框架推荐[express API](http://expressjs.jser.us/api.html)和[express 框架](http://javascript.ruanyifeng.com/nodejs/express.html)（别急，先把node入门看了）。学习步骤[nodejs的6个步骤](https://cnodejs.org/topic/535376501969a7b22aca6d24)

***
## NodeJS思想
***
> 
1. 它是一个Javascript运行环境
2. 依赖于Chrome V8引擎进行代码解释
3. 事件驱动（戳这里[理解Node.js事件驱动编程](http://www.cnblogs.com/lua5/archive/2011/02/01/1948760.html)）
4. 非阻塞I/O（戳这里[理解Node.js的异步非阻塞I/O模型](http://cnodejs.org/topic/4f50dd9798766f5a610b808a)）
5. 轻量、可伸缩，适于实时数据交互应用
6. 单进程，单线程

### 优势
1. 高并发（最重要的优点）
2. 采用事件驱动、异步编程，为网络服务而设计

 在学习nodejs过程中，你会用到大量js的匿名函数和闭包特性，并且到处都是callback。
3. Node.js非阻塞模式的IO处理给Node.js带来在相对低系统资源耗用下的高性能与出众的负载能力，非常适合用作依赖其它IO资源的中间层服务。
### 劣势
1. 可靠性低
2. 单进程，单线程，只支持单核CPU，不能充分的利用多核CPU服务器。一旦这个进程崩掉，那么整个web服务就崩掉了。

`解决方案：
（1）Nnigx反向代理，负载均衡，开多个进程，绑定多个端口；` 

`(2)想达到多核或者多进程也不是很难（现在已经有大量的第三方module来实现这个功	 能）`



### 应用场景
#### 适合
1. 单页面、多Ajax请求应用——如Gmail，前端有大量的异步请求，需要服务后端有极高的响应速度
2. RESTful API（想要理解restful架构请狠狠地戳这里[理解RESTful架构](http://www.ruanyifeng.com/blog/2011/09/restful)）

 这是NodeJS最理想的应用场景，可以处理数万条连接，本身没有太多的逻辑，只需要请求API，组织数据进行返回即可。`它本质上只是从某个数据库中查找一些值并将它们组成一个响应。`由于响应是少量文本，入站请求也是少量的文本，因此流量不高，一台机器甚至也可以处理最繁忙的公司的API需求。
 
3. 统一Web应用的UI

 目前MVC的架构，在某种意义上来说，Web开发有两个UI层，一个是在浏览器里面我们最终看到的，另一个在server端，负责生成和拼接页面。

 不讨论这种架构是好是坏，但是有另外一种实践，面向服务的架构，更好的做前后端的依赖分离。如果所有的关键业务逻辑都封装成REST调用，就意味着在上层只需要考虑如何用这些REST接口构建具体的应用。那些后端程序员们根本不操心具体数据是如何从一个页面传递到另一个页面的，他们也不用管用户数据更新是通过Ajax异步获取的还是通过刷新页面。
 
#### 不适合
1. CPU密集型应用
CPU密集型应用给Node带来的挑战主要是：由于JavaScript单线程的原因，如果有长时间运行的计算（比如大循环），将会导致CPU时间片不能释放，使得后续I/O无法发起；

`解决方案：分解大型运算任务为多个小任务，使得运算能够适时释放，不阻塞I/O调用的发起`

2. 简单Web应用——此类应用的特点是，流量低、物理架构简单，Node.js无法提供像Ruby的Rails或者Python的Django这样强大的框架

简而言之，NodeJS适合运用在高并发、I/O密集、少量业务逻辑的场景。


### 做为NodeJS最显著特性（高并发），它是怎么做到的呢？？
一句话：异步、事件驱动模型

举个例子，想象一个场景，我们在银行排队办理业务，我们看看下面两个模型。

#### 系统线程模型
银行只有一个业务员（一个线程），并发请求（客户）到达只能处理一个，其余的要先排队，这就是阻塞，正在享受服务的请求阻塞后面的请求了。
#### 多线程、线程池模型：
这个模型已经比上一个有所进步，它调节服务端线程的数量来提高对并发请求的接收和响应。银行有多个业务员（多个线程），然而并发量高（客户多）的时候
，请求仍需等待。

但是也会产生问题：服务端与客户端每建立一个连接，都要为这个连接分配一套配套的资源，这就是为什么一般并发量一大，就需要多开服务器。

#### 异步、事件驱动模型
想象一下，我们去餐馆点餐。

进入餐馆，一个服务员前来招待（单线程），我们点完餐（发起一次请求）开始等待，因为服务员人手不足，她又去招待其他客户（没有阻塞下一个用户的订单请求）。服务员告诉厨师做什么菜（将事件放入队列中执行）。等饭菜做好了，服务员喊号，我们拿到了自己的饭菜，进行后续的处理（吃饭）。

<font color='red'>这个喊号码的动作在NodeJS中叫做回调（Callback），能在事件（烧菜，I/O）处理完成后继续执行后面的逻辑（吃饭），这体现了NodeJS的显著特点，异步机制、事件驱动整个过程没有阻塞新用户的连接（点餐），也不需要维护已经点餐的用户与厨师的连接。</font>

#### 说了这么多，给一个完整的流程
1. 你用浏览器访问nodejs服务器上的"/about.html"
2. nodejs服务器接收到你的请求，调用一个函数从磁盘上读取这个文件。
3. 这段时间，nodejs webserver在服务后续的web请求。
4. 当文件读取完毕，有一个回调函数被插入到nodejs的服务队列中。
5. nodejs webserver运行这个函数，实际上就是渲染（render）了about.html页面返回给你的浏览器。

参考文献：
[NodeJS优缺点及适用场景讨论](http://blog.csdn.net/xiaemperor/article/details/38234979)
[理解NodeJS事件驱动编程](http://www.cnblogs.com/lua5/archive/2011/02/01/1948760.html)

***
## NodeJS异步
***
> 异步编程是指由于异步I/O等因素，无法同步获得执行结果时，
在回调函数中进行下一步操作的代码编写风格,常见的如setTimeout函数、ajax请求等等。


示例：

```
for (var i = 1; i <= 3; i++) {
		setTimeout(function(){
			console.log(i);
		}, 0);
	};
```

这里大部分人会认为输出123，或者333。其实它会输出 444

这里就是我们要说的异步编程了。

#### 高级函数的定义

这里为什么会说到高级函数，因为高级函数是异步编程的基础。

那什么是高级函数呢？
其实高级函数就是把函数作为参数或者是作为返回值。

示例：	
```
function test(v){
	  return function(){
		return v;
	  }
	}
```
如上就是把一个函数作为一个返回值。

### 异步编程优势

基于事件驱动的非阻塞I/O模型

### 异步编程难点
1. 异常处理 ，通常try/catch不一定适用，因为callback并不是在当前Tick中执行。Node在异常处理中约定将异常作为回调函数的第一个实参传回。
2. 函数嵌套过深
3. 代码阻塞 ：没有sleep函数，通过setInterval()和setTimeout()模拟
4. 多线程编程
5. 异步转同步

### 我要获取回调函数中的返回值！
一开始我想到的是return

```
function work(){
var val;
var timer = setTimeout(function(){
	val = 10;
},1000)
return val;
}
var result = work();
alert(result)
```
结果是`undefined`  而不是`10`  

因为是先执行的return才执行的回调函数。

#### 怎么解决呢？
改变思维模式。将函数work也改成回调式的。

```
function work(callback){
	var val;
	var timer = setTimeout(function(){
		val = 10;
		callback(10)
	},1000)
}
work(function(result){
	alert(result)
})
```
结果是`10`

参考文献：
[深入理解node.js异步编程：基础篇](https://cnodejs.org/topic/533d6edbc2621e680800e0ea)
[nodejs之async异步编程](https://cnodejs.org/topic/54acfbb5ce87bace2444cbfb)
***
## 模块化编程
***
### exports、require、module.exports
> NodeJS遵循CommonJS规范，也就有了模块化(module)编程的思想。模块是NodeJS基本的组成部分。一个node.js文件就相当于一个模块。

>Node.js提供了exports和require两个对象,其中exports是模块公开的接口,用于导出当前模块的变量和方法。require用于从外部获取一个模块接口,即所获取模块的exports对象.

app.js

```
exports.say = function(){
	console.log('I am a function');
}
```
index.js（与app.js同目录下）

```
var app = require('./app');
 app.say();	
```
结果
```
I am a function
```
### exports还是module.exports
> module.exports是真实存在的东西。exports只是module.exports的辅助方法。
#### 例一：
```
exports.say = function(){
	console.log('I am a exports function');
}

module.exports.say = function(){
	console.log('I am a module.exports function');
}
```

```
 var app = require('./app');
 app.say();	
```
结果：

```
I am a module.exports function
```
这是什么原因？看了下面的代码就清楚了
#### 例二：
```
console.log(this);
console.log(exports);
console.log(module.exports);
console.log(this === exports);
console.log(this === module.exports);
console.log(exports === module.exports);
```
结果：
```
{}
{}
{}
true
true
```
exports默认和module.exports指向同一个空对象。

所以结合两个例子可知：

1. module.exports才是真正的接口，exports只不过是它的一个辅助工具。

2. 如果运行时让exports、this和module.exports指向不同的对象，只有module.exports指向的对象才会被导出。

3. 最终返回给调用的是module.exports而不是exports。 `所有的exports收集到的属性和方法，都赋值给了module.exports。当然，这有个前提，就是module.exports本身不具备任何属性和方法。`如果，module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略。

>  如果你想要你的模块成为一个特别的对象类型，那么使用module.exports；如果你希望你的模块成为一个传统的模块实例（module instance），使用exports。

#### 把属性赋予module.exports的`结果`与把属性赋予给exports是一样的。
如下两个实例：

```
module.exports.name = function() {
    console.log('My name is shumei');
};
```

```
exports.name = function() {
    console.log('My name is shumei');
};
```







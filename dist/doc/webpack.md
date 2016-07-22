##webpack
前端模块管理和打包工具

react-hot-loader

CommonJS和AMD是用于JavaScript模块管理的两大规范，前者定义的是模块的同步加载，主要用于NodeJS；而后者则是异步加载，通过requirejs等工具适用于前端。

Webpack其实有点类似browserify，出自Facebook的Instagram团队，但功能比browserify更为强大。其主要特性如下：

同时支持CommonJS和AMD模块（对于新项目，推荐直接使用CommonJS）；
串联式模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如提供对CoffeeScript、ES6的支持；
可以基于配置或者智能分析打包成多个文件，实现公共模块或者按需加载；
支持对CSS，图片等资源进行打包，从而无需借助Grunt或Gulp；
开发时在内存中完成打包，性能更快，完全可以支持开发过程的实时打包需求；
对sourcemap有很好的支持，易于调试。

Webpack将项目中用到的一切静态资源都视之为模块，模块之间可以互相依赖。Webpack对它们进行统一的管理以及打包发布，其官方主页用下面这张图来说明Webpack的作用：

一个最简单的Webpack配置文件webpack.config.js如下所示：

module.exports = {
  entry:[
    './app/main.js'
  ],
  output: {
    path: __dirname + '/assets/',
    publicPath: "/assets/",
    filename: 'bundle.js'
  }
};
其中entry参数定义了打包后的入口文件，数组中的所有文件会按顺序打包。每个文件进行依赖的递归查找，直到所有相关模块都被打包。output参数定义了输出文件的位置，其中常用的参数包括：

path: 打包文件存放的绝对路径
publicPath: 网站运行时的访问路径
filename: 打包后的文件名

### 加载器

	module: {
  	loaders: [
    	{ test: /\.jsx?$/, loaders: ['jsx?harmony']}
  	]
	}
	
将JSX编译成JavaScript并加载为Webpack模块

### Webpack开发服务器

除了提供模块打包功能，Webpack还提供了一个基于Node.js Express框架的开发服务器，它是一个静态资源Web服务器，对于简单静态页面或者仅依赖于独立服务的前端页面，都可以直接使用这个开发服务器进行开发。在开发过程中，开发服务器会监听每一个文件的变化，进行实时打包，并且可以推送通知前端页面代码发生了变化，从而可以实现页面的自动刷新。

###Webpack模块加载器（Loaders）

Webpack将所有静态资源都认为是模块，比如JavaScript，CSS，LESS，TypeScript，JSX，CoffeeScript，图片等等，从而可以对其进行统一管理。为此Webpack引入了加载器的概念，除了纯JavaScript之外，每一种资源都可以通过对应的加载器处理成模块。和大多数包管理器不一样的是，Webpack的加载器之间可以进行串联，一个加载器的输出可以成为另一个加载器的输入。比如LESS文件先通过less-load处理成css，然后再通过css-loader加载成css模块，最后由style-loader加载器对其做最后的处理，从而运行时可以通过style标签将其应用到最终的浏览器环境。

### react-hot-loader

Webpack本身具有运行时模块替换功能，称之为Hot Module Replacement (HMR)。当某个模块代码发生变化时，Webpack实时打包将其推送到页面并进行替换，从而无需刷新页面就实现代码替换。这个过程相对比较复杂，需要进行多方面考虑和配置。而现在针对React出现了一个第三方react-hot-loader加载器，使用这个加载器就可以轻松实现React组件的热替换，非常方便。其实正是因为React的每一次更新都是全局刷新的虚拟DOM机制，让React组件的热替换可以成为通用的加载器，从而极大提高开发效率。

### 将Webpack开发服务器集成到已有服务器

尽管Webpack开发服务器可以直接用于开发，但实际项目中我们可能必须使用自己的Web服务器。这就需要我们能将Webpack的服务集成到已有服务器，来使用Webpack提供的模块打包和加载功能。要实现这一点其实非常容易，只需要在载入打包文件时指定完整的URL地址，例如：

<script src="http://127.0.0.1:3000/assets/bundle.js"></script>
这就告诉当前页面应该去另外一个服务器获得脚本资源文件，在之前我们已经在配置文件中指定了开发服务器的地址，因此打包后的文件也知道应该通过哪个地址去建立Socket IO来动态加载模块。整个资源架构如下图所示：

### 打包成多个资源文件
将项目中的模块打包成多个资源文件有两个目的：

将多个页面的公用模块独立打包，从而可以利用浏览器缓存机制来提高页面加载效率；
减少页面初次加载时间，只有当某功能被用到时，才去动态的加载。

Webpack提供了非常强大的功能让你能够灵活的对打包方案进行配置。首先来看如何创建多个入口文件：

{
  entry: { a: "./a", b: "./b" },
  output: { filename: "[name].js" },
  plugins: [ new webpack.CommonsChunkPlugin("init.js") ]
}
可以看到，配置文件中定义了两个打包资源“a”和“b”，在输出文件中使用方括号来获得输出文件名。而在插件设置中使用了CommonsChunkPlugin，Webpack中将打包后的文件都称之为“Chunk”。这个插件可以将多个打包后的资源中的公共部分打包成单独的文件，这里指定公共文件输出为“init.js”。这样我们就获得了三个打包后的文件，在html页面中可以这样引用：

<script src="init.js"></script>
<script src="a.js"></script>
<script src="b.js"></script>
除了在配置文件中对打包文件进行配置，还可以在代码中进行定义：require.ensure，例如：

require.ensure(["module-a", "module-b"], function(require) {
  var a = require("module-a");
  // ...
});
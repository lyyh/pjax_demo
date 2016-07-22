import $ from 'jquery'
import pjax from 'coffce-pjax'

export function updatePage() {
	$('.comment-btn').on('click',function () {
		pjax.init({
			selector: '.comment-btn', //query选择器
			container: '.comment-body', //更新新页面内的容器
			cache : true, //在前进后退时开启本地缓存
			hash: true, //对低版本启用hash方案
			same: true, //允许跳转到当前相同URL，相当于刷新
			debug: false, //console.log调试信息
		})
	})
}
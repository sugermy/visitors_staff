<template>
  <div class="page">
    <router-view />
    <img @touchstart="down" @touchmove="move" @touchend="end" v-if="showBack" @click="goHome" id="back-home" src="../../assets/back_home.png">
  </div>
</template>
<script>
export default {
	data() {
		return { flags: false, position: { x: 0, y: 0 }, nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '', showBack: true }
	},
	methods: {
		// 实现移动端拖拽
		down() {
			let default_drag_comp = document.querySelector('#back-home')
			this.flags = true
			var touch
			if (event.touches) {
				touch = event.touches[0]
			} else {
				touch = event
			}
			this.maxW = document.body.clientWidth - default_drag_comp.offsetWidth
			this.maxH = document.body.clientHeight - default_drag_comp.offsetHeight

			this.position.x = touch.clientX - default_drag_comp.offsetLeft
			this.position.y = touch.clientY - default_drag_comp.offsetTop
			this.dx = touch.clientX
			this.dy = touch.clientY
		},
		move(event) {
			event.preventDefault()
			let default_drag_comp = document.querySelector('#back-home')
			if (this.flags) {
				var touch
				if (event.touches) {
					touch = event.touches[0]
				} else {
					touch = event
				}
				this.nx = touch.clientX - this.position.x
				this.ny = touch.clientY - this.position.y

				if (this.nx < 0) {
					this.nx = 0
				} else if (this.nx > this.maxW) {
					this.nx = this.maxW
				}

				if (this.ny < 0) {
					this.ny = 0
				} else if (this.ny >= this.maxH) {
					this.ny = this.maxH
				}

				default_drag_comp.style.left = this.nx + 'px'
				default_drag_comp.style.top = this.ny + 'px'
				//阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
				document.addEventListener(
					'touchmove',
					function() {
						// event.preventDefault()
					},
					false
				)
			}
		},
		//鼠标释放时候的函数
		end() {
			this.flags = false
		},
		//返回首页
		goHome() {
			if (this.$route.name != 'VisitorSelectTo') {
				this.$router.push({
					path: 'VisitorSelectTo',
					query: {
						VisitorsId: this.$route.query.VisitorsId,
						OpenID: this.$route.query.OpenID
					}
				})
			}
		}
	},
	watch: {
		$route(v) {
			if (v.name == 'VisitorSelectTo') {
				this.showBack = false
			} else {
				this.showBack = true
			}
		}
	}
}
</script>
<style lang="less" scoped>
.page {
	position: relative;
	#back-home {
		width: 8rem;
		height: 8rem;
		position: absolute;
		bottom: 0;
		right: 0;
	}
}
</style>
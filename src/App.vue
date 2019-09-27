<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
	data() {
		return {}
	},
	created() {
		this.goHome()
	},
	mounted() {},
	methods: {
		//根据权限判断进入模块
		goHome() {
			this.$ajax.get('Home/StatrtEnter', {}).then(res => {
				this.$router.push({
					path: res.PageType == 0 ? '/FirstIndex' : res.PageType == 1 ? '/StaffIndex' : '/VisitorIndex',
					query: {
						OpenID: res.OpenID,
						[res.PageType == 0 ? 'bind' : res.PageType == 1 ? 'UserID' : 'VisitorsId']: res.PageType == 0 ? '1' : res.PageType == 1 ? res.UserID : res.VisitorsId
					}
				})
			})
		}
	}
}
</script>

<style lang="less">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	position: relative;
	-webkit-overflow-scrolling: touch;
	overflow: auto;
}
</style>

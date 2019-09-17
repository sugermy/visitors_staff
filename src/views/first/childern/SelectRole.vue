<template>
  <div class="page">
    <div class="page-header">请选择你的身份</div>
    <div class="page-main">
      <div class="main-i visitor">
        <img src="../../../assets/first_visitor.png" @click="infoBind(1)">
        <p>我是访客</p>
      </div>
      <div class="main-i staff">
        <img src="../../../assets/first_staff.png" @click="infoBind(2)">
        <p>我是员工</p>
      </div>
    </div>
    <div class="page-foot">
      <img src="../../../assets/home_bot.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {}
	},
	created() {},
	methods: {
		//选择绑定信息
		infoBind(v) {
			v == 1
				? this.$router.push({ path: 'VisitorForm', query: { OpenID: this.$route.query.OpenID } })
				: this.$router.push({ path: 'StaffForm', query: { OpenID: this.$route.query.OpenID } })
		}
	}
}
</script>
<style lang="less" scoped>
.page {
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.page-header {
		height: 6rem;
		line-height: 6rem;
		font-size: 1.6rem;
		font-family: PingFangSC;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		margin-top: 2rem;
	}
	.page-main {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		.main-i {
			width: 100%;
			margin-bottom: 1.8rem;
			&:last-child {
				margin-bottom: 0rem;
			}
			img {
				width: 25%;
			}
			p {
				margin-top: 1.6rem;
				font-size: 2rem;
				font-family: PingFangSC;
				font-weight: 600;
				color: rgba(99, 123, 255, 1);
			}
		}
	}
	.page-foot {
		width: 100%;
		max-height: 40%;
		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
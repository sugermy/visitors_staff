<template>
  <div class="page">
      <div class="main-i visitor">
        <img src="../../../assets/staff_invor.png" @click="infoBind(1)">
      </div>
      <div class="main-i staff">
        <img src="../../../assets/base_per.png" @click="infoBind(2)">
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
			v == 1 ? this.$router.push({ path: 'InviteForm',query: {
						OpenID: this.$route.query.OpenID,
						UserID: this.$route.query.UserID
					}}) : this.$router.push({ path: 'StaffCenter',query: {
						OpenID: this.$route.query.OpenID,
						UserID: this.$route.query.UserID
					} })
		}
	}
}
</script>
<style lang="less" scoped>
.page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items:center;
	height:100%;
	overflow:hidden;
	background:url('../../../assets/staff_bg.png') no-repeat;
	background-size:100% 100%;
	.main-i {
		margin-bottom:2.5rem;
		&:first-child{
			margin-top:5rem;
		}
		img{
			width:70vw;
		}
	}
}
</style>
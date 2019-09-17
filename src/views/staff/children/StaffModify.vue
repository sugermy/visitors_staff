<template>
  <div class="page">
    <div class="page-main">
      <van-cell-group class="info-main info-one">
        <van-field v-model="person.username" clearable label="姓名" ref="username" placeholder="请输入您的姓名" @click="focusEvent('username')" input-align="right" />
        <van-field v-model="person.phone" type="tel" clearable label="手机号" ref="tel" placeholder="请输入您的手机号" @click="focusEvent('tel')" input-align="right" />
        <van-field v-model="person.idCard" type="tel" ref="idcard" clearable label="工号" @click="focusEvent('idcard')" placeholder="请输入您的工号" input-align="right" />
      </van-cell-group>
    </div>
    <div class="toast-info" v-show="nopass">
      <i class="toast-i"></i><span class="toast-s">请填写完整您的信息</span>
    </div>
    <div class="page-foot">
      <van-button type="info" size="normal" block @click="actionGo">保存</van-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
	data() {
		return {
			person: {
				username: '小笼包',
				phone: '17620481899',
				idCard: 'S19999999'
			},
			nopass: false
		}
	},
	methods: {
		//表单获取焦点事件
		focusEvent(name) {
			this.$refs[name].focus()
			this.nopass = false
		},
		//确认提交
		actionGo() {
			let count = 0
			Object.keys(this.person).forEach(el => {
				if (this.person[el] == '') {
					count++
				}
			})
			if (count == 0) {
				this.nopass = false
				Toast.loading({
					mask: true,
					message: '正在发送...',
					duration: 3000 //0不会自动关闭  调用Toast.clear()关闭
				})
				let _this = this
				setTimeout(function() {
					_this.$router.go(-1)
				}, 3000)
			} else {
				this.nopass = true
			}
		}
	}
}
</script>
<style lang="less" scoped>
.page {
	padding: 0 2rem;
	background: #f7f8fc;
	.page-main {
		margin-top: 1rem;
	}
	.toast-info {
		height: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 1rem;
		.toast-i {
			display: inline-block;
			width: 12px;
			height: 12px;
			background: url('../../../assets/toast.png') no-repeat;
			background-size: 100%;
			margin-right: 0.6rem;
		}
	}
	.page-foot {
		margin-top: 1.5rem;
		.van-button {
			width: 60%;
			margin: 0 auto;
			border-radius: 2rem;
		}
	}
}
</style>
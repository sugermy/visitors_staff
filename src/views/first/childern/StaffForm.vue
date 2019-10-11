<template>
  <div class="page con">
    <div class="page-header">请填写您的信息</div>
    <div class="page-main">
      <van-cell-group class="info-main info-one">
        <van-field v-model="person.staffName" clearable label="姓名" ref="staffName" placeholder="请输入您的姓名" @click="focusEvent('staffName')" @blur="checkVal(0)" input-align="right" />
        <van-field v-model="person.phone" type="tel" clearable label="手机号" ref="tel" placeholder="请输入您的手机号" @click="focusEvent('tel')" @blur="checkVal(1)" input-align="right" />
        <van-field v-model="person.staffCode" type="text" ref="staffCode" clearable label="工号" @click="focusEvent('staffCode')" placeholder="请输入您的工号" @blur="checkVal(2)"
          input-align="right" />
      </van-cell-group>
    </div>
    <div class="toast-info" v-show="nopass">
      <i class="toast-i"></i><span class="toast-s">{{notxt}}</span>
    </div>
    <van-popup v-model="bindStatusShow" class="popup-status" :close-on-click-overlay="false">
      <img :src="bindStatus?imgSrcSuc:imgSrcLose" class="popup-i">
      <div class="popup-t">
        <span class="bind-btn bind-suc" v-show="bindStatus" @click="Iknowe">我知道了</span>
        <span class="bind-btn bind-lose" v-show="!bindStatus" @click="Ireload">重新绑定</span>
      </div>
    </van-popup>
    <div class="page-foot">
      <van-button type="info" size="normal" color="#637bff" block @click="actionGo">绑定</van-button>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			person: {
				staffName: '',
				phone: '',
				staffCode: ''
			},
			imgSrcSuc: require('../../../assets/bind_suc.png'),
			imgSrcLose: require('../../../assets/bind_lose.png'),
			bindStatusShow: false,
			bindStatus: false,
			nopass: false, //不通过状态
			notxt: '请填写完整您的信息'
		}
	},
	created() {},
	methods: {
		//表单获取焦点事件
		focusEvent(name) {
			this.$refs[name].focus()
			this.nopass = false
		},
		//表单失焦事件
		checkVal(v) {
			if (v == 1) {
				if (!this.checkPhone()) {
					this.nopass = true
					this.notxt = '手机号格式不正确'
				}
			}
		},
		//确认提交
		actionGo() {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
			let count = 0
			Object.keys(this.person).forEach(el => {
				if (this.person[el] == '') {
					count++
				}
			})
			if (count == 0) {
				if (this.checkPhone()) {
					this.nopass = false
					let params = { OpenID: this.$route.query.OpenID, ...this.person }
					this.toast.loading({
						mask: true,
						message: '正在绑定...',
						loadingType: 'spinner',
						duration: 0 //0不会自动关闭  调用Toast.clear()关闭
					})
					this.$ajax.get('Home/bindStaff', params).then(res => {
						this.toast.clear()
						this.bindStatusShow = true
						if (res.Code == '1') {
							this.bindStatus = true
						} else {
							this.bindStatus = false
						}
					})
				} else {
					this.nopass = true
					this.notxt = '手机号格式不正确'
				}
			} else {
				this.nopass = true
				this.notxt = '请填写完整您的信息'
			}
		},
		//我知道了
		Iknowe() {
			this.bindStatusShow = false
			this.$ajax.get('Home/StatrtEnter', {}).then(res => {
				this.$router.push({
					path: '/StaffIndex',
					query: {
						OpenID: this.$route.query.OpenID,
						UserID: res.UserID
					}
				})
			})
		},
		//重新绑定
		Ireload() {
			this.bindStatusShow = false
		},
		//验证手机号
		checkPhone() {
			let telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
			if (!telStr.test(this.person.phone)) {
				return false
			} else {
				return true
			}
		}
	}
}
</script>
<style lang="less" scoped>
.page {
	background: #f7f8fc;
	.page-header {
		font-size: 1.6rem;
		font-family: PingFangSC;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
		margin: 2rem 0;
	}
	.page-main {
		.van-cell {
			padding: 14px 16px;
		}
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
		margin-top: 2.5rem;
		.van-button {
			width: 80%;
			margin: 0 auto;
			border-radius: 2rem;
		}
	}
	.popup-status {
		width: 70vw;
		height: 296px;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.popup-i {
			width: 100%;
			max-height: 196px;
		}
		.popup-t {
			height: calc(100% - 190px);
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.bind-btn {
				padding: 1rem 4rem;
				color: #fff;
				font-weight: blod;
				font-size: 1.6rem;
				border-radius: 2rem;
			}
			.bind-suc {
				background: rgba(99, 123, 255, 1);
			}
			.bind-lose {
				background: rgba(255, 90, 90, 1);
			}
		}
	}
}
</style>
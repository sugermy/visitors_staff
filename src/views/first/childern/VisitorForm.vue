<template>
  <div class="page con">
    <div class="page-header">请填写您的信息</div>
    <div class="page-main">
      <van-cell-group class="info-main info-one">
        <van-field v-model="person.VisitorsName" clearable label="姓名" ref="VisitorsName" placeholder="请输入您的姓名" @click="focusEvent('VisitorsName')" @blur="checkVal(0)"
          input-align="right" />
        <van-field v-model="person.VisitorsPhone" type="tel" clearable label="手机号" ref="VisitorsPhone" placeholder="请输入您的手机号" @click="focusEvent('VisitorsPhone')"
          @blur="checkVal(1)" input-align="right" />
        <van-field v-model="person.VisitorsSex" type="text" label="性别" readonly is-link input-align="right" @click="chooseSex" />
        <van-action-sheet v-model="genderVisible" cancel-text="取消" :actions="actions" @select="onSelect" />
        <van-field v-model="person.VisitorsIDCard" type="tel" ref="VisitorsIDCard" clearable label="身份证号" @click="focusEvent('VisitorsIDCard')" @blur="checkVal(2)"
          placeholder="请输入您的身份证号" input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main info-two">
        <van-field v-model="person.VisitorsUnit" clearable label="单位" ref="address" @click="focusEvent('address')" placeholder="请输入您的单位" input-align="right" />
        <van-field v-model="person.PlateNumber" type="text" clearable label="车牌号" ref="carId" @click="focusEvent('carId')" placeholder="请输入您的车牌号（选填）" input-align="right" />
        <div class="van-cell van-field">
          <div class="van-cell__title van-field__label"><span>照片</span></div>
          <div class="van-cell__value">
            <div class="van-field__body init-s">
              <van-uploader v-model="fileList" :after-read="afterRead" @delete="deletPhoto" :preview-size="50" :max-count='1' />
            </div>
          </div>
        </div>
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
      <van-button type="info" size="normal" color="#637bff" block @click="actionGo">确定</van-button>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			person: {
				VisitorsSex: '男',
				VisitorsImg: ''
			},
			nopass: false,
			notxt: '请填写完整您的信息',
			fileList: [],
			genderVisible: false,
			imgSrcSuc: require('../../../assets/bind_suc.png'),
			imgSrcLose: require('../../../assets/bind_lose.png'),
			bindStatusShow: false,
			bindStatus: false,
			actions: [{ name: '男', value: 1 }, { name: '女', value: 0 }]
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
			if (v == 0) {
				if (this.person.VisitorsName == '') {
					return
				}
			} else if (v == 1) {
				if (this.person.VisitorsPhone == '') {
					return
				}
				if (!this.checkPhone()) {
					this.nopass = true
					this.notxt = '手机号格式不正确'
				}
			} else {
				if (this.person.VisitorsIDCard == '') {
					return
				}
				if (!this.checkIdCard()) {
					this.nopass = true
					this.notxt = '身份证格式不正确'
				}
			}
		},
		//打开性别选择
		chooseSex() {
			this.genderVisible = true
		},
		//选择性别
		onSelect(item) {
			// 点击选项时默认不会关闭菜单，可以手动关闭
			this.genderVisible = false
			this.person.VisitorsSex = item.name
		},
		//图片上传
		afterRead(file) {
			//自动转base64
			this.dealImg(file.content, 500, res => {
				console.log(res)
				this.person.VisitorsImg = encodeURI(res.split('base64,')[1])
				this.$toast('上传成功')
			})
		},
		//删除图片
		deletPhoto() {
			this.person.VisitorsImg = ''
		},
		//确认提交
		actionGo() {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
			let count = 0
			Object.keys(this.person).forEach(el => {
				if (this.person[el] == '' && el != 'PlateNumber') {
					count++
				}
			})
			if (count == 0) {
				if (!this.checkPhone()) {
					this.nopass = true
					this.notxt = '手机号格式不正确'
					return
				}
				if (!this.checkIdCard()) {
					this.nopass = true
					this.notxt = '身份证格式不正确'
					return
				}
				this.nopass = false
				let params = { OpenID: this.$route.query.OpenID, ...this.person }
				params.VisitorsSex == '男' ? (params.VisitorsSex = 1) : (params.VisitorsSex = 0)
				this.toast.loading({
					mask: true,
					message: '正在绑定...',
					loadingType: 'spinner',
					duration: 0 //0不会自动关闭  调用Toast.clear()关闭
				})
				this.$ajax.post('Home/bindVisitor', {}, params).then(res => {
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
				this.notxt = '请填写完整您的信息'
			}
		},
		//我知道了
		Iknowe() {
			this.bindStatusShow = false
			this.$ajax.get('Home/StatrtEnter', {}).then(res => {
				this.$router.push({
					path: '/VisitorIndex',
					query: {
						OpenID: this.$route.query.OpenID,
						VisitorsId: res.VisitorsId
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
			if (!telStr.test(this.person.VisitorsPhone)) {
				return false
			} else {
				return true
			}
		},
		//验证身份证号
		checkIdCard() {
			let idStr = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
			if (!idStr.test(this.person.VisitorsIDCard)) {
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
		.init-s {
			justify-content: flex-end;
			.gender-v {
				margin-right: 1rem;
			}
		}
		.info-one {
			margin-bottom: 1rem;
		}
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
<template>
  <div class="page con">
    <div class="page-header">编辑{{title}}的信息</div>
    <div class="page-main">
      <van-cell-group class="info-main info-one">
        <van-field v-model="person.visitorsname" clearable label="姓名" ref="visitorsname" placeholder="请输入姓名" @click="focusEvent('visitorsname')" @blur="checkVal(0)"
          input-align="right" />
        <van-field v-model="person.visitorsphone" type="tel" clearable label="手机号" ref="visitorsphone" placeholder="请输入手机号" @blur="checkVal(1)" @click="focusEvent('visitorsphone')"
          input-align="right" />
        <van-field v-model="person.visitorssex" type="text" label="性别" readonly is-link input-align="right" @click="chooseSex" />
        <van-action-sheet v-model="genderVisible" cancel-text="取消" :actions="actions" @select="onSelect" />
        <van-field v-model="person.visitorsidcard" type="tel" ref="visitorsunit" clearable label="身份证号" @click="focusEvent('visitorsunit')" @blur="checkVal(2)"
          placeholder="请输入身份证号" input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main info-two">
        <van-field v-model="person.visitorsunit" clearable label="单位" ref="address" @click="focusEvent('address')" placeholder="请输入单位" input-align="right" />
        <van-field v-model="person.platenumber" clearable label="车牌号" ref="carId" @click="focusEvent('carId')" placeholder="请输入车牌号（选填）" input-align="right" />
        <div class="van-cell van-field">
          <div class="van-cell__title van-field__label"><span>照片</span></div>
          <div class="van-cell__value">
            <div class="van-field__body init-s">
              <van-uploader v-model="fileList" :after-read="afterRead" @delete="deletPhoto" :preview-size="40" :max-count='1' />
            </div>
          </div>
        </div>
      </van-cell-group>
    </div>
    <div class="toast-info" v-show="nopass">
      <i class="toast-i"></i><span class="toast-s">{{notxt}}</span>
    </div>
    <div class="page-foot">
      <van-button type="info" size="normal" color="#637BFF" block @click="actionGo">确定</van-button>
      <van-button type="info" plain size="normal" color="#637BFF" block @click="cancelGo">取消</van-button>

    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
	data() {
		return {
			title: '随访', //编辑标题
			person: {
				visitorssex: '男',
				visitorsimg: ''
			},
			nopass: false,
			fileList: [],
			genderVisible: false,
			actions: [{ name: '男', value: 1 }, { name: '女', value: 2 }],
			notxt: '请填写完整提交信息',
			loading: true
		}
	},
	created() {
		if (this.$route.query.type == 'visitor') {
			this.title = '访客'
		}
		this.getInfo()
	},
	methods: {
		getInfo() {
			this.$ajax.get('Visitor/QueryFollowVisit', { VisitorsId: this.$route.query.personID }).then(res => {
				this.person = res[0] || {}
				this.person.visitorssex == 1 ? (this.person.visitorssex = '女') : (this.person.visitorssex = '男')
				this.fileList.push({ url: 'data:image/jpeg;base64,' + this.person.visitorsimg, isImage: true })
			})
		},
		//表单获取焦点事件
		focusEvent(name) {
			this.$refs[name].focus()
			this.nopass = false
		},
		//表单失焦事件
		checkVal(v) {
			if (v == 0) {
				if (this.person.FoolowName == '') {
					return
				}
			} else if (v == 1) {
				if (this.person.FoolowVisitorsPhone == '') {
					return
				}
				if (!this.checkPhone()) {
					this.nopass = true
					this.notxt = '手机号格式不正确'
				}
			} else {
				if (this.person.FoolowIDCard == '') {
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
			this.person.visitorssex = item.name
		},
		//图片上传
		afterRead(file) {
			//自动转base64
			this.person.visitorsimg = file.content.split('base64,')[1]
			this.$toast('上传成功')
		},
		//删除图片
		deletPhoto(file) {
			this.person.visitorsimg = ''
		},
		//确认提交
		actionGo() {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
			let count = 0
			Object.keys(this.person).forEach(el => {
				if (this.person[el] == '' && el != 'platenumber') {
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
				let params = { VisitorsId: this.$route.query.personID, ...this.person }
				params.visitorssex == '男' ? (params.visitorssex = 0) : (params.visitorssex = 1)
				//新增成功or失败
				if (this.loading) {
					this.loading = false
					this.$ajax
						.post('Visitor/EditFollowVisit', {}, params)
						.then(res => {
							if (res.Code == '1') {
								this.toast(res.Message)
								let _this = this
								setTimeout(() => {
									_this.$router.push({
										path: 'VisitorCenter',
										query: {
											OpenID: this.$route.query.OpenID,
											VisitorsId: this.$route.query.VisitorsId,
											activeTab: this.$route.query.activeTab
										}
									})
								}, 1000)
							} else {
								this.toast(res.Message)
							}
							this.loading = true
						})
						.catch(err => {
							this.loading = true
						})
				}
			} else {
				this.nopass = true
				this.notxt = '请填写完整提交信息'
			}
		},
		//取消返回上一步
		cancelGo() {
			this.$router.push({
				path: 'VisitorCenter',
				query: {
					OpenID: this.$route.query.OpenID,
					VisitorsId: this.$route.query.VisitorsId,
					activeTab: this.$route.query.activeTab
				}
			})
		},
		//验证手机号
		checkPhone() {
			let telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
			if (!telStr.test(this.person.visitorsphone)) {
				return false
			} else {
				return true
			}
		},
		//验证身份证号
		checkIdCard() {
			let idStr = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
			if (!idStr.test(this.person.visitorsidcard)) {
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
			margin-bottom: 1.5rem;
		}
	}
}
</style>
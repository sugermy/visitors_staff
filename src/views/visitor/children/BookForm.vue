<template>
  <div class="page con">
    <div class="page-header">请填写预约信息</div>
    <div class="page-main">
      <van-cell-group class="info-main">
        <div class="van-cell van-field">
          <div class="van-cell__title van-field__label"><span>来访时间</span></div>
          <div class="van-cell__value" @click="dataPicker(1)">
            <div class="van-field__body init-s">
              {{formatSData}}
            </div>
          </div>
        </div>
        <div class="van-cell van-field">
          <div class="van-cell__title van-field__label"><span>结束时间</span></div>
          <div class="van-cell__value" @click="dataPicker(2)">
            <div class="van-field__body init-s">
              {{formatEData}}
            </div>
          </div>
        </div>
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.RealName" clearable label="被访员工姓名" ref="RealName" placeholder="请输入被访员工姓名" @click="focusEvent('RealName')" input-align="right" />
        <van-field v-model="person.Mobile" type="tel" clearable label="被访员工手机" @blur="checkVal(1)" ref="Mobile" placeholder="请输入被访员工手机号" @click="focusEvent('Mobile')"
          input-align="right" />
        <van-field v-model="person.Code" type="text" ref="Code" clearable label="被访员工工号" @click="focusEvent('Code')" placeholder="请输入被访员工工号" input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.VisitReason" type="textarea" clearable label="来访事由" autosize ref="VisitReason" @click="focusEvent('VisitReason')" placeholder="请输入来访事由说明"
          input-align="right" />
        <van-field v-model="person.SuiteList" type="textarea" clearable label="随访人员" readonly autosize ref="remark1" placeholder="请添加随访人员" input-align="right" />
      </van-cell-group>
      <van-popup v-model="showStartPicker" position="bottom">
        <van-datetime-picker :formatter="filterData" v-model="person.startDate" @change="changeData" @confirm="chooseDate(1)" @cancel="chooseDate(1)" type="datetime" />
      </van-popup>
      <van-popup v-model="showEndPicker" position="bottom">
        <van-datetime-picker v-model="person.endDate" :formatter="filterData" :min-date="person.startDate" @confirm="chooseDate(2)" @cancel="chooseDate(2)" type="datetime" />
      </van-popup>
    </div>
    <div class="toast-info" v-show="nopass">
      <i class="toast-i"></i><span class="toast-s">{{notxt}}</span>
    </div>
    <div class="page-foot">
      <van-button type="info" size="normal" block color="#637BFF" @click="actionGo">确定</van-button>
      <van-button type="info" plain size="normal" color="#637BFF" block @click="addPerson">添加随访</van-button>
    </div>
    <van-popup v-model="bindStatusShow" class="popup-status" :close-on-click-overlay="false">
      <img :src="bindStatus?imgSrcSuc:imgSrcLose" class="popup-i">
      <div class="popup-t">
        <span class="bind-btn bind-suc" v-show="bindStatus" @click="Iknowe">我知道了</span>
        <span class="bind-btn bind-lose" v-show="!bindStatus" @click="Ireload">重新预约</span>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
	name: 'BookForm',
	data() {
		return {
			person: {
				RealName: '',
				Mobile: '',
				Code: '',
				startDate: new Date(),
				endDate: new Date(),
				VisitReason: ''
			},
			nopass: false,
			genderVisible: false,
			showStartPicker: false,
			showEndPicker: false,
			bindStatusShow: false, //绑定弹窗显示
			bindStatus: false, //绑定状态
			imgSrcSuc: require('../../../assets/book_suc.png'),
			imgSrcLose: require('../../../assets/book_lose.png'),
			notxt: '请填写完整预约信息',
			canChange: true
		}
	},
	computed: {
		formatSData() {
			return this.getTime(this.person.startDate)
		},
		formatEData() {
			return this.getTime(this.person.endDate)
		},
		initData() {
			return this.person.startDate
		}
	},
	//当前路由被缓存只有第一次加载会进入此周期
	created() {
		this.$nextTick(() => {
			if (this.$store.state.bookForm.startDate) {
				this.canChange = false
				this.person = this.$store.state.bookForm
			} else {
				this.canChange = true
			}
			this.person.SuiteList = this.$store.state.suitelist.map(el => el.visitorsname).join('、')
		})
	},
	methods: {
		filterData(type, value) {
			if (type === 'year') {
				return `${value}年`
			} else if (type === 'month') {
				return `${value}月`
			} else if (type == 'day') {
				return `${value}日`
			} else if (type == 'hour') {
				return `${value}时`
			} else if (type == 'minute') {
				return `${value}分`
			}
			return value
		},
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
		//切换时间  防止读store的赋值问题
		changeData() {
			this.canChange = true
		},
		//时间选择
		dataPicker(v) {
			v == 1 ? (this.showStartPicker = true) : (this.showEndPicker = true)
		},
		//时间格式化
		getTime(date) {
			let m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
			let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
			let h = date.getHours()
			let Min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
			let timer = date.getFullYear() + '-' + m + '-' + d + ' ' + h + ':' + Min
			return timer
		},
		//开始时间
		chooseDate(v) {
			v == 1 ? (this.showStartPicker = false) : (this.showEndPicker = false)
		},
		//确认提交
		actionGo() {
			let count = 0
			Object.keys(this.person).forEach(el => {
				if (el != 'SuiteList') {
					if (this.person[el] == '') {
						count++
					}
				}
			})
			if (count == 0) {
				if (this.checkPhone()) {
					this.nopass = false
					let _this = this
					let params = { OpenID: this.$route.query.OpenID, VisitId: this.$route.query.VisitorsId, ...this.person, StartTime: this.formatSData, EndTime: this.formatEData }
					delete params.startDate
					delete params.endDate
					delete params.SuiteList
					params.addPerson = this.$store.state.suitelist.map(el => {
						return {
							FoolowID: el.visitorsid
						}
					})
					this.toast.loading({
						mask: true,
						message: '正在发送...',
						loadingType: 'spinner',
						duration: 0 //0不会自动关闭  调用Toast.clear()关闭
					})
					this.$ajax.post('Visitor/SubmitVisit', {}, { Bs_visit: JSON.stringify(params) }).then(res => {
						this.toast.clear()
						this.bindStatusShow = true
						if (res.Code == '1') {
							this.bindStatus = true
						} else {
							this.bindStatus = false
						}
					})
					setTimeout(function() {
						_this.bindStatusShow = true
						_this.toast.clear()
					}, 3000)
				} else {
					this.nopass = true
					this.notxt = '手机号格式不正确'
				}
			} else {
				this.nopass = true
				this.notxt = '请填写完整预约信息'
			}
		},
		//我知道了
		Iknowe() {
			this.bindStatusShow = false
			this.$store.dispatch('commitBook', {})
			this.$ajax.get('Home/StatrtEnter', {}).then(res => {
				this.$router.push({
					path: '/VisitorIndex',
					query: {
						VisitorsId: this.$route.query.VisitorsId,
						OpenID: this.$route.query.OpenID
					}
				})
			})
		},
		//重新绑定
		Ireload() {
			this.bindStatusShow = false
		},
		//添加随访
		addPerson() {
			this.$store.dispatch('commitBook', this.person)
			this.$router.push({
				path: 'SuiteList',
				query: {
					VisitorsId: this.$route.query.VisitorsId,
					OpenID: this.$route.query.OpenID
				}
			})
		},
		//验证手机号
		checkPhone() {
			let telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
			if (!telStr.test(this.person.Mobile)) {
				return false
			} else {
				return true
			}
		}
	},
	watch: {
		initData(v) {
			if (this.canChange) {
				this.person.endDate = v
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
		.info-main {
			margin-bottom: 1rem;
			&:last-child {
				margin-bottom: 0rem;
			}
		}
		.van-cell {
			padding: 10px 16px;
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
	.popup-status {
		width: 70vw;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.popup-i {
			width: 100%;
			height: 100%;
		}
		.popup-t {
			position: absolute;
			bottom: 2rem;
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
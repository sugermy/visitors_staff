<template>
  <div class="page con">
    <div class="page-header">员工邀约</div>
    <div class="page-main">
      <van-cell-group class="info-main">
        <van-field v-model="person.VisitorsName" clearable label="姓名" ref="VisitorsName" placeholder="请输入访客的姓名" @blur="checkVal(0)" @click="focusEvent('VisitorsName')"
          input-align="right" />
        <van-field v-model="person.VisitorsPhone" type="tel" clearable label="手机号" ref="VisitorsPhone" placeholder="请输入访客的手机号" @blur="checkVal(1)"
          @click="focusEvent('VisitorsPhone')" input-align="right" />
        <van-field v-model="person.VisitorsSex" type="text" label="性别" readonly is-link input-align="right" @click="chooseSex" />
        <van-action-sheet v-model="genderVisible" cancel-text="取消" :actions="actions" @select="onSelect" />
        <van-field v-model="person.VisitorsIDCard" type="tel" ref="VisitorsIDCard" clearable label="身份证号" @blur="checkVal(2)" @click="focusEvent('VisitorsIDCard')"
          placeholder="请输入访客的身份证号" input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.VisitorsUnit" clearable label="单位" ref="VisitorsUnit" @click="focusEvent('VisitorsUnit')" placeholder="请输入访客的单位" input-align="right" />
        <van-field v-model="person.PlateNumber" type="tel" clearable label="车牌号" ref="PlateNumber" @click="focusEvent('PlateNumber')" placeholder="请输入访客的车牌号（选填）"
          input-align="right" />
      </van-cell-group>
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
        <van-field v-model="person.VisitReason" type="textarea" clearable label="来访事由" autosize ref="VisitReason" @click="focusEvent('VisitReason')" placeholder="请输入来访事由说明"
          input-align="right" />
      </van-cell-group>
      <van-popup v-model="showStartPicker" position="bottom">
        <van-datetime-picker :formatter="filterData" v-model="person.startDate" @confirm="chooseDate(1)" @cancel="chooseDate(1)" type="datetime" />
      </van-popup>
      <van-popup v-model="showEndPicker" position="bottom">
        <van-datetime-picker v-model="person.endDate" :min-date="person.startDate" @confirm="chooseDate(2)" @cancel="chooseDate(2)" type="datetime" />
      </van-popup>
    </div>
    <div class="toast-info" v-show="nopass">
      <i class="toast-i"></i><span class="toast-s">{{notxt}}</span>
    </div>
    <div class="page-foot">
      <van-button type="info" size="normal" block @click="actionGo">确定</van-button>
    </div>
    <van-popup v-model="bindStatusShow" class="popup-status" :close-on-click-overlay="false">
      <img :src="bindStatus?imgSrcSuc:imgSrcLose" class="popup-i">
      <div class="popup-t">
        <span class="bind-btn bind-suc" v-show="bindStatus" @click="Iknowe">我知道了</span>
        <span class="bind-btn bind-lose" v-show="!bindStatus" @click="Ireload">重新发送</span>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
	data() {
		return {
			person: {
				VisitorsName: '',
				VisitorsPhone: '',
				VisitorsSex: '男',
				VisitorsIDCard: '',
				VisitorsUnit: '',
				PlateNumber: '',
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
			imgSrcSuc: require('../../../assets/send_suc.png'),
			imgSrcLose: require('../../../assets/send_lose.png'),
			actions: [{ name: '男', value: 1 }, { name: '女', value: 2 }],
			notxt: '请填写完整您的信息'
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
	created() {},
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
		//时间选择
		dataPicker(v) {
			v == 1 ? (this.showStartPicker = true) : (this.showEndPicker = true)
		},
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
		//打开性别选择
		chooseSex() {
			this.genderVisible = true
		},
		//选择性别
		onSelect(item) {
			// 点击选项时默认不会关闭菜单，可以手动关闭
			this.genderVisible = false
			this.person.gender = item.name
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
				if (this.checkPhone()) {
					if (this.checkIdCard()) {
						let params = {
							...this.person,
							StartTime: this.formatSData,
							EndTime: this.formatEData
						}
						params.VisitorsSex == '男' ? (params.VisitorsSex = 1) : (params.VisitorsSex = 0)
						delete params.startDate
						delete params.endDate
						this.toast.loading({
							mask: true,
							message: '正在发送...',
							loadingType: 'spinner',
							duration: 0 //0不会自动关闭  调用Toast.clear()关闭
						})
						this.$ajax.get('Staff/SaveInvitation', { Base_VisitInfo: params }).then(res => {
							this.toast.clear()
							console.log(res)
							this.bindStatusShow = true
							if (res.Code == '1') {
								this.bindStatus = true
							} else {
								this.toast(res.Message)
								this.bindStatus = false
							}
						})
					} else {
						this.nopass = true
						this.notxt = '身份证格式不正确'
					}
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
	},
	watch: {
		initData(v) {
			this.person.endDate = v
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
		margin-top: 1.5rem;
		.van-button {
			width: 60%;
			margin: 0 auto;
			border-radius: 2rem;
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
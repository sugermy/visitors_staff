<template>
  <div class="page con">
    <div class="page-header">请填写{{title}}的信息</div>
    <div class="page-main">
      <van-cell-group class="info-main info-one">
        <van-field v-model="person.username" clearable label="姓名" ref="username" placeholder="请输入姓名" @click="focusEvent('username')" input-align="right" />
        <van-field v-model="person.phone" type="tel" clearable label="手机号" ref="tel" placeholder="请输入手机号" @click="focusEvent('tel')" input-align="right" />
        <van-field v-model="person.gender" type="text" label="性别" readonly is-link input-align="right" @click="chooseSex" />
        <van-action-sheet v-model="genderVisible" cancel-text="取消" :actions="actions" @select="onSelect" />
        <van-field v-model="person.idCard" type="tel" ref="idcard" clearable label="身份证号" @click="focusEvent('idcard')" placeholder="请输入身份证号" input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main info-two">
        <van-field v-model="person.address" clearable label="单位" ref="address" @click="focusEvent('address')" placeholder="请输入单位" input-align="right" />
        <van-field v-model="person.carId" type="tel" clearable label="车牌号" ref="carId" @click="focusEvent('carId')" placeholder="请输入车牌号（选填）" input-align="right" />
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
      <i class="toast-i"></i><span class="toast-s">请填写完整提交信息</span>
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
			title: '随访人员', //编辑标题
			person: {
				gender: '男',
				photoCard: ''
			},
			nopass: false,
			fileList: [],
			genderVisible: false,
			actions: [{ name: '男', value: 1 }, { name: '女', value: 2 }]
		}
	},
	created() {
		if (this.$route.query.type == 'visitor') {
			this.title = '访客'
		} else {
			console.log(1)
		}
	},
	methods: {
		//表单获取焦点事件
		focusEvent(name) {
			this.$refs[name].focus()
			this.nopass = false
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
		//图片上传
		afterRead(file) {
			//自动转base64
			this.person.photoCard = file.content
		},
		//删除图片
		deletPhoto() {
			this.person.photoCard = ''
		},
		//确认提交
		actionGo() {
			let count = 0
			Object.keys(this.person).forEach(el => {
				if (this.person[el] == '') {
					count++
				}
			})
			count == 0 ? (this.nopass = false) : (this.nopass = true)
			// this.$router.push({
			// 	path: 'VisitorCenter',
			// 	query: {
			// 		activeTab: this.$route.query.activeTab
			// 	}
			// })
			this.$router.go(-1)
		},
		//取消返回上一步
		cancelGo() {
			this.$router.push({
				path: 'VisitorCenter',
				query: {
					activeTab: this.$route.query.activeTab,
					OpenID: this.$route.query.OpenID,
					VisitorsId: this.$route.query.VisitorsId
				}
			})
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
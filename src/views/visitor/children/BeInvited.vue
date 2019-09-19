<template>
  <div class="page con">
    <div class="page-main">
      <van-cell-group class="info-main">
        <van-field v-model="person.visitorsname" type="text" label="访客" readonly input-align="right" />
        <van-field v-model="person.visitorsphone" type="text" label="访客电话" readonly input-align="right" />
        <van-field v-model="person.visitorssex" type="text" label="性别" readonly input-align="right" />
        <van-field v-model="person.visitorsidcard" type="text" label="身份证号" readonly input-align="right" />
        <van-field v-model="person.visitorsunit" type="text" label="访客单位" readonly input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.realname" type="text" label="被访人" readonly input-align="right" />
        <van-field v-model="person.code" type="text" label="被访人工号" readonly input-align="right" />
        <van-field v-model="person.mobile" type="text" label="被访人电话" readonly input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.starttime" type="text" label="来访时间" readonly input-align="right" />
        <van-field v-model="person.endtime" type="text" label="结束时间" readonly input-align="right" />
        <van-field v-model="person.visitreason" type="text" label="来访事由" readonly input-align="right" />
        <van-field v-model="person.followname" type="textarea" label="随访人员" readonly input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="auditRemark" type="textarea" ref="auditRemark" label="备注" @click="focusEvent('auditRemark')" input-align="right" />
      </van-cell-group>
    </div>
    <div class="page-foot">
      <van-button type="info" plain color="#637BFF" size="normal" block @click="auditGo('1')">同意邀请</van-button>
      <van-button type="info" plain color="#FF5A5A" size="normal" block @click="auditGo('2')">不同意</van-button>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			person: {},
			auditRemark: ''
		}
	},
	created() {
		this.getDetail()
	},
	methods: {
		//获取预约信息
		getDetail() {
			this.$ajax.get('Visitor/Invite', { VisitId: this.$route.query.personID }).then(res => {
				this.person = res[0] || {}
				this.person.visitorssex == 1 ? (this.person.visitorssex = '男') : (this.person.visitorssex = '女')
				this.person.followname == null || this.person.followname == '' ? (this.person.followname = '无') : this.person.followname
			})
		},
		//表单获取焦点
		focusEvent(name) {
			this.$refs[name].focus()
		},
		//审核状态
		auditGo(type) {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
			this.$ajax.get('Staff/UpdateAudit', { VisitId: this.$route.query.personID, AuditState: type, AuditRemark: this.auditRemark }).then(res => {
				if (res.Code == '1') {
					this.toast(res.Message)
					let _this = this
					setTimeout(() => {
						_this.$router.go(-1)
					}, 1000)
				} else {
					this.toast(res.Message)
				}
			})
		}
	}
}
</script>
<style lang="less" scoped>
.page {
	background: #f7f8fc;
	.page-main {
		.info-main {
			margin-top: 1rem;
			&:last-child {
				margin-bottom: 1rem;
			}
			.init-s {
				justify-content: flex-end;
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
}
</style>
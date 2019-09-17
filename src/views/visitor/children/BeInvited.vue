<template>
  <div class="page con">
    <div class="page-main">
      <van-cell-group class="info-main">
        <van-field v-model="person.username" type="text" label="访客" readonly input-align="right" />
        <van-field v-model="person.phone" type="text" label="访客电话" readonly input-align="right" />
        <van-field v-model="person.gender" type="text" label="性别" readonly input-align="right" />
        <van-field v-model="person.idCard" type="text" label="身份证号" readonly input-align="right" />
        <van-field v-model="person.address" type="text" label="访客单位" readonly input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.username" type="text" label="被访人" readonly input-align="right" />
        <van-field v-model="person.workId" type="text" label="被访人工号" readonly input-align="right" />
        <van-field v-model="person.phone" type="text" label="被访人电话" readonly input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.startDate" type="text" label="来访时间" readonly input-align="right" />
        <van-field v-model="person.endDate" type="text" label="结束时间" readonly input-align="right" />
        <van-field v-model="person.remark" type="text" label="来访事由" readonly input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.remark" type="textarea" label="备注" readonly input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
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
    <div class="toast-info">
      <i class="toast-i"></i><span class="toast-s">同意邀请之前请先添加照片</span>
    </div>
    <div class="page-foot">
      <van-button type="info" plain color="#637BFF" size="normal" block @click="actionGo">同意邀请</van-button>
      <van-button type="info" plain color="#FF5A5A" size="normal" block @click="refuseGo">不同意</van-button>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			person: {
				username: '张满意',
				phone: '18520838663',
				workId: 'S147258',
				gender: '男',
				idCard: '411381199409094817',
				address: '深圳市道控技术有限公司',
				carId: '粤B 123456L',
				startDate: '2019-09-08 11:11:11',
				endDate: '2019-09-08 12:12:12',
				remark: '拜访商务合作',
				allowPer: '大笼包、奶茶'
			},
			photoCard: '',

			fileList: []
		}
	},
	methods: {
		//图片上传
		afterRead(file) {
			//自动转base64
			this.photoCard = file.content
		},
		//删除图片
		deletPhoto() {
			this.photoCard = ''
		},
		actionGo() {},
		refuseGo() {}
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
		margin-top: 1.5rem;
		.van-button {
			width: 60%;
			margin: 0 auto;
			border-radius: 2rem;
			margin-bottom: 1rem;
		}
	}
}
</style>
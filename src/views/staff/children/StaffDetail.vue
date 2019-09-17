<template>
  <div class="page con">
    <div class="page-main">
      <van-cell-group class="info-main">
        <van-field v-model="person.username" label="姓名" readonly input-align="right" />
        <van-field v-model="person.phone" type="tel" label="手机号" readonly input-align="right" />
        <van-field v-model="person.gender" type="text" label="性别" readonly input-align="right" />
        <van-field v-model="person.idCard" type="tel" label="身份证号" readonly input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.address" label="单位" readonly input-align="right" />
        <van-field v-model="person.carId" type="tel" readonly label="车牌号" input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.startDate" label="来访时间" readonly input-align="right" />
        <van-field v-model="person.endDate" label="结束时间" readonly input-align="right" />
        <van-field v-model="person.remark" type="textarea" autosize readonly label="来访事由" input-align="right" />
        <van-field v-model="person.allowPer" label="随访人员" readonly input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.remark" type="textarea" autosize readonly label="备注" input-align="right" />
        <div class="van-cell van-field" v-if="!isNopass">
          <div class="van-cell__title van-field__label"><span>预约码</span></div>
          <div class="van-cell__value">
            <div class="van-field__body only-img">
              <div style="display:none" id="qrcode" ref="qrcode"></div>
              <img :src="imgSrc" v-show="showQrcode" @click="showImg">
            </div>
          </div>
        </div>
      </van-cell-group>
    </div>
    <div class="page-foot" v-if="isNopass">
      <span class="bind-btn bind-suc" @click="Iknowe">审核通过</span>
      <span class="bind-btn bind-lose" @click="Ireload">重新绑定</span>
    </div>
    <!-- 遮罩层内容s -->
    <div class="prop-img" v-show="showUpload">
      <h3>预约码</h3>
      <img :src="imgSrc" class="prop-qrcode">
      <img class="prop-close" src="../../../assets/close.png" @click="showUpload = false">
    </div>
    <van-overlay :show="showUpload" />
    <!-- 遮罩层内容e -->
  </div>
</template>
<script>
import { Toast } from 'vant'
import QRCode from 'qrcodejs2' // 引入qrcode
import { setTimeout } from 'timers'
export default {
	data() {
		return {
			person: {
				username: '张满意',
				phone: '18520838663',
				gender: '男',
				idCard: '411381199409094817',
				address: '深圳市道控技术有限公司',
				carId: '粤B 123456L',
				startDate: '2019-09-08 11:11:11',
				endDate: '2019-09-08 12:12:12',
				remark: '拜访商务合作',
				allowPer: '大笼包、奶茶'
			},
			imgSrc: '',
			isNopass: false, //不通过状态显示内容
			showUpload: false, //查看二维码详情
			showQrcode: false //解决qrcode生成之前img无地址的尴尬
		}
	},
	computed: {},
	created() {},
	mounted() {
		if (this.$route.query.id == 2) {
			//待审核状态
			document.title = '待审核'
			this.isNopass = true
		} else {
			this.qrcode().then(() => {
				let imgSrc = this.$refs.qrcode.getElementsByTagName('img')[0]
				this.imgSrc = imgSrc.src
				this.showQrcode = true
			})
		}
	},
	methods: {
		Iknowe() {},
		Ireload() {},
		qrcode() {
			let p = new Promise((resolve, reject) => {
				new QRCode('qrcode', {
					width: 200,
					height: 200,
					text: 'https://www.baidu.com',
					colorDark: '#000',
					colorLight: '#fff'
				})
				setTimeout(function() {
					resolve()
				}, 100)
			})
			return p
		},
		//查看二维码
		showImg() {
			this.showUpload = true
		}
	}
}
</script>
<style lang="less" scoped>
.page {
	background: #f7f8fc;
	position: relative;
	.page-main {
		.info-main {
			margin-top: 1rem;
			&:last-child {
				margin-bottom: 1rem;
			}
		}
		.van-cell {
			padding: 10px 16px;
		}
		.only-img {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			img {
				width: 40px;
				height: 40px;
			}
		}
	}
	.page-foot {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.bind-btn {
			color: #fff;
			width: 50%;
			text-align: center;
			padding: 1rem 0;
			font-weight: blod;
			font-size: 1.6rem;
			border-radius: 2rem;
			margin-bottom: 2.2rem;
		}
		.bind-suc {
			margin-top: 1rem;
			background: rgba(99, 123, 255, 1);
		}
		.bind-lose {
			color: rgba(255, 90, 90, 1);
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(255, 90, 90, 1);
		}
	}
	.prop-img {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 70vw;
		text-align: center;
		background: #fff;
		background: rgba(254, 254, 255, 1);
		border-radius: 10px;
		z-index: 99;
		h3 {
			padding: 2rem 0;
			font-size: 1.7rem;
			font-family: PingFangSC;
			font-weight: 500;
			color: rgba(102, 102, 102, 1);
		}
		.prop-qrcode {
			padding-bottom: 2rem;
			width: 90%;
		}
		.prop-close {
			position: absolute;
			bottom: -25%;
			left: 50%;
			transform: translateX(-50%);
			width: 3rem;
			height: 3rem;
		}
	}
}
</style>
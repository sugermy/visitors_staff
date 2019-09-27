<template>
  <div class="page con">
    <div class="page-main">
      <van-cell-group class="info-main">
        <van-field v-model="person.realname" label="被访人" readonly input-align="right" />
        <van-field v-model="person.mobile" type="tel" label="被访人手机" readonly input-align="right" />
        <van-field v-model="person.code" type="tel" label="被访人工号" readonly input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.visitorsunit" label="访客单位" readonly input-align="right" />
        <van-field v-model="person.platenumber" readonly label="访客车牌号" input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.starttime" label="到访时间" readonly input-align="right" />
        <van-field v-model="person.endtime" label="结束时间" readonly input-align="right" />
        <van-field v-model="person.visitreason" type="textarea" readonly label="到访事由" input-align="right" />
        <van-field v-model="person.followname" label="随访人员" type="textarea" readonly input-align="right" />
      </van-cell-group>
      <van-cell-group class="info-main">
        <van-field v-model="person.remark" type="textarea" readonly label="备注" />
        <div class="van-cell van-field" v-show="showQRcode">
          <div class="van-cell__title van-field__label"><span>预约码</span></div>
          <div class="van-cell__value">
            <div class="van-field__body only-img">
              <div style="display:none" id="qrcode" ref="qrcode"></div>
              <img :src="imgSrc" v-show="showQrcode" @click="showImg">
            </div>
          </div>
        </div>
      </van-cell-group>
      <div>{{imgInfo}}</div>
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
			person: {},
			imgSrc: '',
			showUpload: false, //查看二维码详情
			showQrcode: false, //解决qrcode生成之前img无地址的尴尬
			showQRcode: true,
			imgInfo: null
		}
	},
	computed: {},
	created() {
		this.getInfo()
		if (this.$route.query.status == '5' || this.$route.query.status == '1' || this.$route.query.status == '4') {
			this.showQRcode = false
		}
	},
	mounted() {},
	methods: {
		getInfo() {
			this.$ajax.get('Visitor/Invite', { VisitId: this.$route.query.personID }).then(res => {
				this.person = res[0] || {}
				this.person.followname == null || this.person.followname == '' ? (this.person.followname = '无') : this.person.followname
				this.imgSrc = 'data:image/jpeg;base64,' + this.person.bookingno
				this.showQrcode = true
			})
		},
		qrcode(code) {
			let p = new Promise((resolve, reject) => {
				new QRCode('qrcode', {
					width: 200,
					height: 200,
					text: code,
					colorDark: '#000',
					colorLight: '#fff'
				})
				setTimeout(function() {
					resolve()
				}, 200)
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
				width: 50px !important;
				height: 50px;
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
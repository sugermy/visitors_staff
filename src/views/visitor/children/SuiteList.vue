<template>
  <div class="page">
    <div class="page-main">
      <div v-for="(item,index) in suitList" :key="index" class="list-book">
        <van-checkbox class="each-check" checked-color="#637BFF" v-model="item.checked"></van-checkbox>
        <div class="each-main">
          <h3 class="each-name">{{item.visitorsname}}</h3>
          <div class="each-body">
            <p>电话：{{item.visitorsphone}}</p>
            <p>单位：{{item.visitorsunit}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="page-foot">
      <van-button type="info" size="normal" color="#637BFF" block @click="addPerson">新增随访</van-button>
      <van-button type="info" size="normal" plain color="#637BFF" block @click="choosePer">确定返回上一步</van-button>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			suitList: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		//获取随访列表
		getList() {
			this.$ajax.get('Visitor/GetVisitorInfo', { VisitorsId: this.$route.query.VisitorsId }).then(res => {
				let data = res || []
				let storeData = JSON.parse(JSON.stringify(this.$store.state.suitelist))
				data.map(el => {
					if (storeData.length > 0) {
						storeData.forEach(kl => {
							if (kl.visitorsid == el.visitorsid) {
								el.checked = true
							}
						})
					} else {
						el.checked = false
					}
					return el
				})
				this.suitList = data.filter(el => el.visitorstype != 1)
			})
		},
		//新增随访人员
		addPerson() {
			this.$router.push({
				path: 'Follow',
				query: {
					from: 'book',
					OpenID: this.$route.query.OpenID,
					VisitorsId: this.$route.query.VisitorsId
				}
			})
		},
		//确认选择返回上一步
		choosePer() {
			let postData = this.suitList.filter(el => el.checked == true)
			// localStorage.setItem('checkData', JSON.stringify(postData))
			// this.$router.go(-1)
			this.$store.dispatch('commitSuite', postData)
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="less" scoped>
.page {
	background: #f7f8fc;
	.page-main {
		box-sizing: border-box;
		.list-book {
			margin-bottom: 0.8rem;
			display: flex;
			&:first-child {
				margin-top: 1rem;
			}
			.each-check {
				width: 15%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.each-main {
				background: #fff;
				border-radius: 10px 0 0 10px;
				padding: 0 1rem;
				width: 85%;
				.each-name {
					padding: 1.6rem 0;
					border-bottom: 1px solid #dde0eb;
				}
				.each-body {
					p {
						padding: 1rem 0;
						&:first-child {
							padding-bottom: 0;
						}
					}
				}
			}
		}
	}
	.page-foot {
		margin-top: 2.5rem;
		.van-button {
			width: calc((100% - 3rem) * 0.8);
			margin: 0 auto;
			border-radius: 2rem;
			margin-bottom: 1.5rem;
		}
	}
}
</style>
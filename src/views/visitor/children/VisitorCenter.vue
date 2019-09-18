<template>
  <div class="page">
    <van-tabs v-model="activeTab" animated color="#637BFF" line-width="30px">
      <van-tab title="预约信息">
        <div class="page-main">
          <div v-for="(item,index) in booklist" :key="index" class="list-book" @click="enterDetail(index)">
            <h3 class="each-name">{{item.visitorsname}}</h3>
            <div class="each-body">
              <div class="each-l">
                <p>电话：{{item.visitorsphone}}</p>
                <p>来访事由：{{item.visitreason}}</p>
              </div>
              <img class="each-r" :src="require(`../../../assets/status${item.status}.png`)" />
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="访客信息">
        <div class="page-main">
          <div class="list-info" v-for="(item,index) in suitelist" :key="index">
            <h3 class="each-name" @click="enterModify(item.visitorsid)">{{item.visitorsname}}
              <i class="edit-i"></i>
            </h3>
            <div class="each-body">
              <p>
                <span>电话</span>
                <span>{{item.visitorsphone}}</span>
              </p>
              <p>
                <span>单位</span>
                <span>{{item.visitorsunit}}</span>
              </p>
            </div>
            <img class="card" :src="item.visitorstype==0?require('../../../assets/visitor.png'):require('../../../assets/suite.png')">
          </div>
        </div>
        <div class="page-foot">
          <van-button type="info" size="normal" color="#637BFF" block @click="addPerson">新增随访</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
	data() {
		return {
			activeTab: 0,
			booklist: [],
			suitelist: []
		}
	},
	created() {
		if (this.$route.query.activeTab) {
			this.activeTab = this.$route.query.activeTab
		}
		this.getList()
		this.getSuite()
	},
	methods: {
		//获取列表信息
		getList() {
			this.$ajax.get('Visitor/GetReservation', { VisitorsId: this.$route.query.VisitorsId }).then(res => {
				this.booklist = res || []
			})
		},
		getSuite() {
			this.$ajax.get('Visitor/GetVisitorInfo', { VisitorsId: this.$route.query.VisitorsId }).then(res => {
				this.suitelist = res || []
			})
		},
		//进入详情
		enterDetail(id) {
			if (id == 2) {
				this.$router.push({
					path: 'BeInvited',
					query: {
						id: id
					}
				})
			} else {
				this.$router.push({
					path: 'VisitorDetail',
					query: {
						id: id
					}
				})
			}
		},
		//编辑
		enterModify(id) {
			this.$router.push({
				path: 'VisitorModify',
				query: {
					from: 'CenterEdit',
					type: id == 0 ? 'visitor' : 'suite',
					activeTab: this.activeTab,
					OpenID: this.$route.query.OpenID,
					VisitorsId: this.$route.query.VisitorsId
				}
			})
		},
		//新增随访
		addPerson() {
			this.$router.push({
				path: 'Follow',
				query: {
					from: 'center',
					activeTab: this.activeTab
				}
			})
		}
	}
}
</script>
<style lang="less" scoped>
.page {
	.page-main {
		box-sizing: border-box;
		padding: 0 2rem;
		.list-book {
			background: #fff;
			border-radius: 10px;
			padding: 0 1rem;
			margin-bottom: 0.8rem;
			&:first-child {
				margin-top: 1rem;
			}
			.each-name {
				padding: 1.6rem 0;
				position: relative;
				&::after {
					position: absolute;
					box-sizing: border-box;
					content: ' ';
					pointer-events: none;
					right: 0;
					bottom: 0;
					left: 0;
					border-bottom: 1px solid #ebedf0;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
				}
			}
			.each-body {
				display: flex;
				justify-content: space-between;
				.each-l {
					display: flex;
					flex-direction: column;
					p {
						line-height: 2.2rem;
						margin-top: 1rem;
					}
				}
				.each-r {
					height: 5.6rem;
					padding: 1rem 0;
				}
			}
		}
		.list-info {
			background: #fff;
			border-radius: 10px;
			margin-bottom: 0.8rem;
			display: flex;
			align-items: center;
			position: relative;
			&:first-child {
				margin-top: 1rem;
			}
			.each-name {
				width: 25%;
				text-align: center;
				padding: 1.6rem 0;
				position: relative;
				&::after {
					position: absolute;
					box-sizing: border-box;
					content: ' ';
					pointer-events: none;
					right: 0;
					bottom: 0;
					top: 0;
					border-right: 1px solid #ebedf0;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
				}
				.edit-i {
					position: absolute;
					bottom: -10%;
					left: 50%;
					transform: translateX(-50%);
					background: url('../../../assets/edit.png') no-repeat;
					background-size: 100% 100%;
					width: 1.4rem;
					height: 1.4rem;
				}
			}
			.each-body {
				width: 75%;
				p {
					line-height: 2rem;
					padding: 1rem 0;
					margin: 0 2.5rem 0 1.6rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					&:first-child {
						position: relative;
						&::after {
							position: absolute;
							box-sizing: border-box;
							content: ' ';
							pointer-events: none;
							right: 0;
							bottom: 0;
							left: 0;
							border-bottom: 1px solid #ebedf0;
							-webkit-transform: scaleY(0.5);
							transform: scaleY(0.5);
						}
					}
				}
			}
			.card {
				position: absolute;
				right: 0%;
				top: 0%;
				width: 3.6rem;
				height: 3rem;
			}
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
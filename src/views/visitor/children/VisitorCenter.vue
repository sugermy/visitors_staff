<template>
  <div class="page">
    <van-tabs v-model="activeTab" animated color="#637BFF" line-width="30px">
      <van-tab title="预约信息">
        <van-pull-refresh class="pull-refresh" v-if="booklist.length>=1" v-model="isLoading" @refresh="onRefresh">
          <div class="page-main">
            <div v-for="(item,index) in booklist" :key="index" class="list-book" @click="enterDetail(item.status,item.visitid)">
              <h3 class="each-name">{{item.realname}}</h3>
              <div class="each-body">
                <div class="each-l">
                  <p>电话：{{item.mobile}}</p>
                  <p>来访事由：{{item.visitreason}}</p>
                </div>
                <img class="each-r" :src="require(`../../../assets/status${item.status}.png`)" />
              </div>
            </div>
          </div>
        </van-pull-refresh>
        <div class="page-no" v-if="booklist.length==0">暂无预约信息</div>
      </van-tab>
      <van-tab title="访客信息">
        <div class="page-main">
          <van-swipe-cell v-for="(item,index) in suitelist" :key="index" :disabled="item.visitorstype==1">
            <div class="list-info">
              <h3 class="each-name" @click="enterModify(item.visitorsid,item.visitorstype)">{{item.visitorsname}}
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
              <img class="card" :src="item.visitorstype==1?require('../../../assets/visitor.png'):require('../../../assets/suite.png')">
            </div>
            <template slot="right">
              <van-button square class="swipe-cell-btn" color="#FE6464" @click="deleteSuite(item.visitorstype,item.visitorsid)" text="删除" />
            </template>
          </van-swipe-cell>
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
			suitelist: [],
			isLoading: false
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
		//刷新列表
		onRefresh() {
			this.$ajax.get('Visitor/GetReservation', { VisitorsId: this.$route.query.VisitorsId }).then(res => {
				this.booklist = res || []
				this.toast('刷新成功')
				this.isLoading = false
			})
		},
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
		enterDetail(status, id) {
			if (status == '4') {
				this.$router.push({
					path: 'BeInvited',
					query: {
						personID: id,
						OpenID: this.$route.query.OpenID,
						VisitorsId: this.$route.query.VisitorsId
					}
				})
			} else {
				this.$router.push({
					path: 'VisitorDetail',
					query: {
						personID: id,
						OpenID: this.$route.query.OpenID,
						VisitorsId: this.$route.query.VisitorsId,
						status: status
					}
				})
			}
		},
		//编辑
		enterModify(id, type) {
			this.$router.push({
				path: 'VisitorModify',
				query: {
					type: type == 1 ? 'visitor' : 'suite',
					personID: id,
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
					activeTab: this.activeTab,
					OpenID: this.$route.query.OpenID,
					VisitorsId: this.$route.query.VisitorsId
				}
			})
		},
		//删除随访
		deleteSuite(type, id) {
			this.dialog
				.confirm({
					title: '提示',
					message: '确认删除当前随访信息吗？'
				})
				.then(() => {
					// on confirm
					this.$ajax.get('Visitor/DelVisitor', { visitorsid: id, visitorstype: type }).then(res => {
						if (res.Code == '1') {
							this.toast(res.Message)
							this.getSuite()
						} else {
							this.toast(res.Message)
						}
					})
				})
				.catch(err => {
					// on cancel
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
	.swipe-cell-btn {
		height: 100%;
	}
	.page-no {
		text-align: center;
		margin-top: 10%;
	}
	.pull-refresh {
		min-height: calc(100vh - 44px);
	}
}
</style>
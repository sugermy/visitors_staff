<template>
  <div class="page">
    <div class="page-main">
      <div v-for="(item,index) in suitList" :key="index" class="list-book">
        <van-checkbox class="each-check" checked-color="#637BFF" v-model="item.checked"></van-checkbox>
        <div class="each-main">
          <h3 class="each-name">{{item.name}}</h3>
          <div class="each-body">
            <p>电话：{{item.phone}}</p>
            <p>单位：{{item.work}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="page-foot">
      <van-button type="info" size="normal" color="#637BFF" block @click="addPerson">新增随访</van-button>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			checked: false,
			suitList: [
				{ name: '张满意1', phone: '18520838663', work: '深圳市道控集团', checked: false },
				{ name: '张满意2', phone: '18520838663', work: '深圳市道控集团', checked: false },
				{ name: '张满意3', phone: '18520838663', work: '深圳市道控集团', checked: true }
			]
		}
	},
	methods: {
		addPerson() {
			this.$router.push({
        path: 'VisitorModify',
        query:{
          from:'BookNew',
					type:'suite'
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
		margin-top: 2rem;
		.van-button {
			width: 60%;
			margin: 0 auto;
			border-radius: 2rem;
		}
	}
}
</style>
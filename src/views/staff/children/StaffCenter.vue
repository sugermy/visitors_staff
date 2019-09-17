<template>
  <div class="page">
    <van-tabs v-model="active" animated color="#637BFF" line-width="30px">
      <van-tab title="预约信息">
        <div class="page-main">
          <div v-for="(item,index) in 6" :key="index" class="list-book" @click="enterDetail(index)">
            <h3 class="each-name">小笼包</h3>
            <div class="each-body">
              <div class="each-l">
                <p>电话：17620481899</p>
                <p>来访事由：商务合作</p>
              </div>
              <img class="each-r" :src="require(`../../../assets/status${item}.png`)" />
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="个人信息">
        <div class="page-main">
          <div class="list-info">
            <h3 class="each-name" @click="modifyAction">小笼包
              <i class="edit-i"></i>
            </h3>
            <div class="each-body">
              <p>
                <span>电话</span>
                <span>17620481899</span>
              </p>
              <p>
                <span>单位</span>
                <span>深圳市道控集团</span>
              </p>
            </div>
            <img class="card" src="../../../assets/card.png">
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
	data() {
		return {
			active: 0
		}
	},
	methods: {
		//进入详情
		enterDetail(id) {
			this.$router.push({
				path: 'StaffDetail',
				query: {
					id: id
				}
			})
		},
		//修改个人信息
		modifyAction() {
			this.$router.push({
				path: 'StaffModify',
				id: '1'
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
					margin: 0 1.6rem;
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
}
</style>
import Vue from 'vue';
import Router from 'vue-router';

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 第一次接入
const FirstIndex = () => import('./views/first/index.vue');
const SelectRole = () => import('./views/first/childern/SelectRole.vue');
const VisitorForm = () => import('./views/first/childern/VisitorForm.vue');
const StaffForm = () => import('./views/first/childern/StaffForm.vue');

//员工
const StaffIndex = () => import('./views/staff/index.vue');
const StaffSelectTo = () => import('./views/staff/children/SelectTo.vue');
const InviteForm = () => import('./views/staff/children/InviteForm.vue');
const StaffCenter = () => import('./views/staff/children/StaffCenter.vue');
const StaffDetail = () => import('./views/staff/children/StaffDetail.vue');
const StaffModify = () => import('./views/staff/children/StaffModify.vue');

//访客
const VisitorIndex = () => import('./views/visitor/index.vue');
const VisitorSelectTo = () => import('./views/visitor/children/SelectTo.vue');
const BookForm = () => import('./views/visitor/children/BookForm.vue');
const VisitorCenter = () => import('./views/visitor/children/VisitorCenter.vue');
const VisitorDetail = () => import('./views/visitor/children/VisitorDetail.vue');
const SuiteList = () => import('./views/visitor/children/SuiteList.vue');//随访列表
const VisitorModify = () => import('./views/visitor/children/VisitorModify.vue');//信息修改
const Follow = () => import('./views/visitor/children/Follow.vue');//新增随访
const BeInvited = () => import('./views/visitor/children/BeInvited.vue');//信息修改
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/FirstIndex',
      name: 'FirstIndex',
      redirect: '/FirstIndex/SelectRole',
      component: FirstIndex,
      children: [
        {
          path: 'SelectRole',
          name: 'SelectRole',
          component: SelectRole,
          meta: {
            title: '选择角色'
          }
        },
        {
          path: 'VisitorForm',
          name: 'VisitorForm',
          component: VisitorForm,
          meta: {
            title: '访客绑定'
          }
        },
        {
          path: 'StaffForm',
          name: 'StaffForm',
          component: StaffForm,
          meta: {
            title: '员工绑定'
          }
        },
      ]
    },
    {
      path: '/StaffIndex',
      name: 'StaffIndex',
      redirect: '/StaffIndex/StaffSelectTo',
      component: StaffIndex,
      children: [
        {
          path: 'StaffSelectTo',
          name: 'StaffSelectTo',
          component: StaffSelectTo,
          meta: {
            title: '选择操作'
          }
        },
        {
          path: 'InviteForm',
          name: 'InviteForm',
          component: InviteForm,
          meta: {
            title: '邀请'
          }
        },
        {
          path: 'StaffCenter',
          name: 'StaffCenter',
          component: StaffCenter,
          meta: {
            title: '个人中心'
          }
        },
        {
          path: 'StaffDetail',
          name: 'StaffDetail',
          component: StaffDetail,
          meta: {
            title: '预约信息'
          }
        },
        {
          path: 'StaffModify',
          name: 'StaffModify',
          component: StaffModify,
          meta: {
            title: '编辑信息'
          }
        },
      ]
    },
    {
      path: '/VisitorIndex',
      name: 'VisitorIndex',
      redirect: '/VisitorIndex/VisitorSelectTo',
      component: VisitorIndex,
      children: [
        {
          path: 'VisitorSelectTo',
          name: 'VisitorSelectTo',
          component: VisitorSelectTo,
          meta: {
            title: '选择操作'
          }
        },
        {
          path: 'BookForm',
          name: 'BookForm',
          component: BookForm,
          meta: {
            title: '预约'
          }
        },
        {
          path: 'VisitorCenter',
          name: 'VisitorCenter',
          component: VisitorCenter,
          meta: {
            title: '个人中心'
          }
        },
        {
          path: 'VisitorDetail',
          name: 'VisitorDetail',
          component: VisitorDetail,
          meta: {
            title: '预约信息'
          }
        },
        {
          path: 'SuiteList',
          name: 'SuiteList',
          component: SuiteList,
          meta: {
            title: '添加随访'
          }
        },
        {
          path: 'Follow',
          name: 'Follow',
          component: Follow,
          meta: {
            title: '随访信息'
          }
        },
        {
          path: 'VisitorModify',
          name: 'VisitorModify',
          component: VisitorModify,
          meta: {
            title: '访客信息'
          }
        },
        {
          path: 'BeInvited',
          name: 'BeInvited',
          component: BeInvited,
          meta: {
            title: '邀请信息'
          }
        },
      ]
    },
  ]
});

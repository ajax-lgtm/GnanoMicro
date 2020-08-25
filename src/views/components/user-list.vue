<template>
  <div class="userinfo-list-container">
    <div v-for="(user, index) in users" v-bind:key="index" class="my-3">
      <user-info-view :user="user"> </user-info-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userViewData } from '@/ts/data/users';
import UserInfoView from './userinfo-card.vue';
// import { icon } from '@/config/icon';

@Component({
  components: {
    UserInfoView
  }
})
export default class UserListView extends Vue {
  users = userViewData;
  mounted() {}
  create() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.userinfo-list-container {
  padding-top: 40px;
  padding-bottom: 60px;
}
</style>

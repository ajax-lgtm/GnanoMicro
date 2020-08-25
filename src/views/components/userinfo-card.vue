<template>
  <div class="userinfo-card-container">
    <div class="userinfo-card mx-auto py-4">
      <div class="user-avatar">
        <v-avatar size="60">
          <img :src="user.userAvatarUrl" alt="John" />
        </v-avatar>
        <div class="title">
          {{ user.userRealName }}
        </div>
        <div class="caption grey--text text--darken-1">一般用户</div>
      </div>
      <div class="param-head1 text-right body-2 grey--text text--darken-1">
        <div>用户名</div>
        <div>手机号</div>
        <div>邮箱</div>
        <div>最后登录</div>
      </div>
      <div class="param1 pl-2 text-left body-2 black--text">
        <div>{{ user.userName }}</div>
        <div>{{ user.mobile }}</div>
        <div>{{ user.email }}</div>
        <div>{{ user.lastLoginTime }}</div>
      </div>
      <div class="param2 text-left body-2 grey--text text--darken-1">
        <div>
          <span>数据</span>&nbsp&nbsp<span class="black--text">{{
            user.storage
          }}</span>
        </div>
        <div>目录</div>
        <v-btn icon class="mr-1 mt-3 folder-icon">
          <v-icon size="18" color="primary">{{ iconFolder }}</v-icon>
        </v-btn>
      </div>
      <div class="opt-icon">
        <v-btn icon class="mr-2">
          <v-icon size="20" color="grey">{{ iconAccountEdit }}</v-icon>
        </v-btn>
        <v-btn icon class="mr-2">
          <v-icon size="20" color="grey">{{ iconDelete }}</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { icon } from '@/config/icon';
import { UserInfoViewData } from '@/ts/modules/User';

@Component
export default class UserinfoCardView extends Vue {
  @Prop() user!: UserInfoViewData;
  iconFolder = icon.mdiFolder;
  iconAccountEdit = icon.mdiAccountEdit;
  iconDelete = icon.mdiDelete;
  mounted() {}
  create() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.userinfo-card-container {
  width: 100%;
  .userinfo-card {
    position: relative;
    width: 95%;
    max-width: 400px;
    border: #e0e0e0 1px solid;
    border-radius: 6px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    height: 150px;
    display: flex;
    align-content: center;
    // align-items: center;
    .user-avatar {
      white-space: nowrap;
      width: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      //   background-color: yellow;
    }
    .param-head1 {
      width: 60px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      //   background-color: red;
    }
    .param1 {
      width: 110px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      white-space: nowrap;
      text-overflow: ellipsis;
      //   overflow: hidden;
      //   background-color: blue;
    }
    .param2 {
      //   width: 60px;
      height: 50px;
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: left;
      justify-content: space-around;
      //   background-color: red;

      .folder-icon {
        position: absolute;
        left: 25px;
        bottom: -6px;
      }
    }
    .opt-icon {
      position: absolute;
      right: 20px;
      bottom: 8px;
    }
  }
}
</style>

<template>
      <v-card
      width="500"
      style="height:100%"
      tile
    >
        <v-list style="padding:0">
          <v-list-item link class="list-item">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>  
            <v-list-item-avatar>
              <v-img src="@/assets/image/default.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">Gnano Micro</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      <v-navigation-drawer style="width:100%;padding:0px" permanent>
        <v-divider></v-divider>
        <v-list
          nav
          dense
        >
          <v-list-item-group v-model="item" color="primary">
            <v-list-item class="list-item"
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" style="font-size:30px"></v-icon>
              </v-list-item-icon>
  
              <v-list-item-content>
                <v-list-item-title style="line-height:25px;font-size:20px" v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
</template>
<script>
export default {
    data: () => ({
    item: 0,
    items: [
      { text: '主页', icon: 'mdi-folder' },
      { text: '实时观测', icon: 'mdi-account-multiple' },
      { text: '个人相册', icon: 'mdi-star' },
      { text: '共享相册', icon: 'mdi-history' },
      { text: '团队成员', icon: 'mdi-check-circle' },
      { text: '设置中心', icon: 'mdi-upload' },
      { text: '喜爱收藏', icon: 'mdi-cloud-upload' },
      { text: '机器设置', icon: 'mdi-cloud-upload' }
    ],
  })
}
</script>
<style scoped>
  .list-item{
    padding: 20px;
    margin: 10px;
  }
  *{
    font-size:20px;
  }
</style>
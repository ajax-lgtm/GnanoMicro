<template>
     <v-app id="inspire">
        <v-navigation-drawer
          v-model="drawer"
          app
        >
        <v-list dense style="padding:0;width:100%;height:64px;">
          <v-list-item style="height:64px;" link>
            <v-list-item-avatar>
              <v-img src="@/assets/image/default.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">Gnano Micro</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
      <v-app-bar
        app
        color="#FFFFFF"
        dark
      >
        <v-app-bar-nav-icon style="color:#505050" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-items  style="color:#505050">
          <div class="align-center"><a href="#">通知中心</a><a href="#">帮助中心</a><p id="timer"></p></div>
          </v-toolbar-items>
      </v-app-bar>
      <v-main>
        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col class="text-center">
              <v-tooltip left>
                <!-- <span>Source</span> -->
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer
        color="indigo"
        app
      >
        <span class="white--text">&copy;本产品版权归观纳所有</span>
      </v-footer>
    </v-app>
</template>
<script>
export default {
    data: () => ({
    item: 0,
    drawer: null,
    items: [
      { text: '主页', icon: 'mdi-folder' },
      { text: '实时观测', icon: 'mdi-account-multiple' },
      { text: '个人相册', icon: 'mdi-star' },
      { text: '共享相册', icon: 'mdi-history' },
      { text: '团队成员', icon: 'mdi-check-circle' },
      { text: '设置中心', icon: 'mdi-upload' },
      { text: '喜爱收藏', icon: 'mdi-cloud-upload' },
      { text: '机器设置', icon: 'mdi-cloud-upload' }
    ]
  }),
  methods:{
    showtime(){
        console.log(11);
        const nowTime = new Date() ;  // 创建时间对象
        const hours = nowTime.getHours() ; //获得当前小时数
        const minutes = nowTime.getMinutes() ; //获得当前分钟数
        const seconds = nowTime.getSeconds() ; //获得当前秒数
        let timer = "" + ((hours > 12) ? hours - 12 : hours ) ; //将小时数值赋予变量timer
        timer += ((minutes < 10) ? ":0" : ":") + minutes ; //将分钟数值赋予变量timer
        timer += ((seconds < 10) ? ":0" : ":") + seconds ; //将秒数值赋予变量timer
        timer += " " + ((hours > 12) ? "pm" : "am") ; //将字符am或pm赋予变量timer
        // document.getElementById('timer').show. = timer ; //在id名为timer中输出变量timer的值
        // setTimeout("showtime()",1000) ; //设置每隔一秒钟自动调用一次showtime()函数 
    }
  },
  mounted:function(){
    this.$nextTick(function(){
      this.showtime();
    })
  }
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
  .v-toolbar-items{
    position: relative;
  }
  .align-center{
    position: absolute;
    right:5%  ;
    padding: 15px;
  }
  .align-center a{
    margin:15px;
    text-decoration: none;
  }
</style>
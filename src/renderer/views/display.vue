<template>
  <!-- 此处用于悬浮窗 -->
  <div class="view-display task">
    <ul class="task">
      <div>
        <span>今天</span>
        <i class="el-icon-s-home" @click="handHome"></i>
      </div>
      <li v-for="(task,index) in todayTask" :key="index">
        <div class="opertator">
          <i class="el-icon-check" @click="handCompelete(task.id)"></i>
        </div>
        <div class="text">{{task.title}}</div>
      </li>
    </ul>
    <div class="add-task">
      <el-input placeholder="添加" @keyup.enter.native="handAdd" v-model="title"></el-input>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getDateTask, getBeforeTask, getAfterTask } from "../helper/taskHelper";
export default {
  data() {
    return { title: "" };
  },
  computed: {
    todayTask() {
      return getDateTask(this.$store.state.task.ready, 0);
    }
  },
  methods: {
    timestampFormat(timestamp) {
      return dayjs(timestamp).format("MM-DD");
    },
    handCompelete(id) {
      this.$store.dispatch("compelteTask", id).then(_ => {});
    },
    handAdd() {
      this.$store
        .dispatch("addTask", {
          title: this.title,
          time: dayjs().valueOf(),
          content: ""
        })
        .then(_ => {
          this.title = "";
        });
    },
    handHome() {
      //open the main window
    //   this.$router.push({name:'main'})
    console.log(this.$electron)
      this.$electron.ipcRenderer.send("OPEN_MAIN_WINDOW");
    }
  }
};
</script>

<style lang="scss">
.view-display {
  @import "@/style/show.scss";
  .opertator {
    float: left !important;
  }
  .task > div:first-child {
    -webkit-app-region: drag;
    -webkit-user-select: none;
    user-select: none;

    >i{
        float: right;
        -webkit-app-region:no-drag;
        font-size: 24px;
    }
  }
}
html,
body {
  //   background: rgba(0, 0, 0, 0.8) !important;
  //  opacity: 0.8;
}
</style>


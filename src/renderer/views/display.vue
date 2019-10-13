<template>
  <!-- 此处用于悬浮窗 -->
  <div class="view-display" @mouseenter="handMouseEnter" @mouseleave="handMouseLeave">
    <div class="task">
      <div class="header">
        <span>今天</span>
        <i class="el-icon-s-home" @click="handHome"></i>
      </div>
      <el-scrollbar>
        <ul>
          <li v-for="(task,index) in todayTask" :key="index">
            <div class="opertator">
              <i class="el-icon-check" @click="handCompelete(task.id)"></i>
            </div>
            <div class="text">{{task.title}}</div>
          </li>
        </ul>
      </el-scrollbar>
      <div class="add-task">
        <el-input placeholder="添加" @keyup.enter.native="handAdd" v-model="title" size="small"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
// import iohook from "iohook";
import dayjs from "dayjs";
import { getDateTask, getBeforeTask, getAfterTask } from "../helper/taskHelper";
import { showWindow,hideWindow } from "../helper/windowHelper";

export default {
  data() {
    console.log("屏幕宽度", this.$electron.remote.screen.getPrimaryDisplay());
    return {
      title: "",
      windowWidth: this.$electron.remote.getCurrentWindow().getSize()[0],
      screenWidth: this.$electron.remote.screen.getPrimaryDisplay().size.width,
      animationing: false //正在动画
    };
  },
  computed: {
    todayTask() {
      return getDateTask(this.$store.state.task.ready, 0);
    }
  },
  mounted() {
    //获取屏幕尺寸
    //主窗口
    // let display = this.$electron.screen.getPrimaryDisplay();
    // let size = display.size;
    // //监听鼠标位置
    // iohook.on("mousemove", event => {
    //   // if()
    //   console.log(event)
    // });
    // iohook.start(true);
    // let showWindow = () => {
    //   this.$el.removeEventListener("mouseEnter");
    //   showWindow(
    //     this.$electron.remote.getCurrentWindow(),
    //     this.screenWidth
    //   ).then(_ => {
    //     this.$el.addEventListener("mouseEnter", showWindow);
    //   });
    // };
    // this.$el.addEventListener("mouseEnter", showWindow);
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
      console.log(this.$electron);
      this.$electron.ipcRenderer.send("OPEN_MAIN_WINDOW");
    },
    handMouseEnter(event) {
      if (!this.animationing) {
        this.animationing = true;
        hideWindow(
          this.$electron.remote.getCurrentWindow(),
          this.screenWidth
        ).then(_ => {
          this.animationing = false;
        });
      }

      // showWindow(this.$electron.remote.getCurrentWindow(),this.screenWidth);
      // console.log("mounen enter", { x: this.screenWidth - this.windowWidth });
      // this.$electron.remote
      //   .getCurrentWindow()
      //   .setBounds({ x: this.screenWidth - this.windowWidth  + 3 });
    },
    handMouseLeave() {
         if (!this.animationing) {
        this.animationing = true;
        showWindow(
          this.$electron.remote.getCurrentWindow(),
          this.screenWidth
        ).then(_ => {
          this.animationing = false;
        });
      }
      // this.$electron.remote
      //   .getCurrentWindow()
      //   .setBounds({ x: this.screenWidth - 10 });
    }
  }
};
</script>

<style lang="scss">
.view-display {
  $item-padding: 5px;

  $content-height: 300px;

  .el-scrollbar {
    height: $content-height;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-input__inner {
    border-color: #eee;
  }

  @import "@/style/show.scss";
  .opertator {
    float: left !important;
  }
  .add-task {
    margin-top: 5px;
  }
  .task {
    margin-top: 0;
    padding-top: 5px;
    > li {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    > div:first-child {
      -webkit-app-region: drag;
      -webkit-user-select: none;
      user-select: none;

      > i {
        float: right;
        -webkit-app-region: no-drag;
        font-size: 24px;
      }
    }
  }
}
html,
body {
  //   background: rgba(0, 0, 0, 0.8) !important;
  //  opacity: 0.8;
}
</style>


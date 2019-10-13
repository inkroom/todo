<template>
  <div class="view-index task">
    <ul class="task">
      <div>更早</div>
      <li v-for="(task,index) in beforeTask" :key="index">
        <div class="text">{{task.title}}</div>
        <div class="opertator">
          <el-tooltip effect="dark" content="Top Left 提示文字" placement="top-start">
            <span class="time">{{timestampFormat(task.time)}}</span>
          </el-tooltip>
          <i class="el-icon-check" @click="handComplete(task.id)"></i>
          <i class="el-icon-delete" @click="handDelete(task.id)"></i>
        </div>
      </li>
    </ul>
    <ul class="task">
      <div>今天</div>
      <li v-for="(task,index) in todayTask" :key="index">
        <div class="text">{{task.title}}</div>
        <div class="opertator">
          <el-tooltip effect="dark" content="Top Left 提示文字" placement="top-start">
            <span class="time">{{timestampFormat(task.time)}}</span>
          </el-tooltip>
          <i class="el-icon-check" @click="handComplete(task.id)"></i>
          <i class="el-icon-delete" @click="handDelete(task.id)"></i>
        </div>
      </li>
    </ul>
    <ul class="task">
      <div>明天</div>
      <li v-for="(task,index) in tomorrowTask" :key="index">
        <div class="text">{{task.title}}</div>
        <div class="opertator">
          <el-tooltip effect="dark" content="Top Left 提示文字" placement="top-start">
            <span class="time">{{timestampFormat(task.time)}}</span>
          </el-tooltip>
          <i class="el-icon-check" @click="handComplete(task.id)"></i>
          <i class="el-icon-delete" @click="handDelete(task.id)"></i>
        </div>
      </li>
    </ul>

    <ul class="task">
      <div>后天</div>
      <li v-for="(task,index) in afterTomorrowTask" :key="index">
        <div class="text">{{task.title}}</div>
        <div class="opertator">
          <el-tooltip effect="dark" content="Top Left 提示文字" placement="top-start">
            <span class="time">{{timestampFormat(task.time)}}</span>
          </el-tooltip>
          <i class="el-icon-check" @click="handComplete(task.id)"></i>
          <i class="el-icon-delete" @click="handDelete(task.id)"></i>
        </div>
      </li>
    </ul>
    <ul class="task">
      <div>更晚</div>
      <li v-for="(task,index) in afterTask" :key="index">
        <div class="text">{{task.title}}</div>
        <div class="opertator">
          <el-tooltip effect="dark" content="Top Left 提示文字" placement="top-start">
            <span class="time">{{timestampFormat(task.time)}}</span>
          </el-tooltip>
          <i class="el-icon-check" @click="handComplete(task.id)"></i>
          <i class="el-icon-delete" @click="handDelete(task.id)"></i>
        </div>
      </li>
    </ul>

    <!-- 添加位置 -->
    <div class="add-task">
      <div class="content-input">
        <el-input placeholder="任务标题" @keyup.enter.native="handAdd" v-model="form.title"></el-input>
      </div>

      <!-- TODO: datetime格式会有问题 -->
      <el-date-picker
        type="date"
        placeholder="选择日期时间"
        class="time-picker"
        v-model="form.time"
        format="MM-dd"
        @change="handAdd"
      ></el-date-picker>
    </div>
  </div>
</template>

<script>
import { getDateTask, getBeforeTask, getAfterTask } from "../helper/taskHelper";

import dayjs from "dayjs";
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        time: new Date()
      }
    };
  },
  mounted() {
    console.log(this.$electron);
  },
  computed: {
    todayTask() {
      return getDateTask(this.$store.state.task.ready, 0);
    },
    tomorrowTask() {
      return getDateTask(this.$store.state.task.ready, 1);
    },
    afterTomorrowTask() {
      return getDateTask(this.$store.state.task.ready, 2);
    },
    beforeTask() {
      return getBeforeTask(this.$store.state.task.ready);
    },
    afterTask() {
      //后天以后的任务
      return getAfterTask(this.$store.state.task.ready, 3);
    }
  },
  methods: {
    timestampFormat(timestamp) {
      return dayjs(timestamp).format("MM-DD");
    },
    handAdd() {
      console.log("添加", this.form);
      console.log("添加-判断", this.form.value && this.form.time);
      console.log("添加-判断", !!this.form.value);
      console.log("添加-判断", !!this.form.time);
      console.log("添加-判断", !!this.form.value && !!this.form.time);
      if (!!this.form.title && !!this.form.time) {
        let value = Object.assign({}, this.form);
        value.time = dayjs(value.time).valueOf();
        this.$store.dispatch("addTask", value).then(_ => {
          this.form = { title: "", content: "", time: new Date() };
        });
      }
    },
    handDelete(id) {
      console.log(
        "location",
        this.$electron.remote.getCurrentWindow().getBounds()
      );
      this.$store.dispatch("deleteReadyTask", id).then(_ => {});
    },
    handComplete(id) {
      this.$store.dispatch("compelteTask", id).then(_ => {});
    }
  }
};
</script>
<style lang="scss">
.view-index {
  @import "@/style/show.scss";
}
</style>
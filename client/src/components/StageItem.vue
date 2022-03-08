<template>
  <div class="stage-item">
    <div class="stage-aside">
      <h1 class="stage-title">{{ title }}</h1>
    </div>
    <div class="stage-content">
      <el-row :gutter="20">
        <v-draggable v-model="taskData" :animation="300" @end="onEnd">
          <transition-group class="stage-stretch">
            <el-col :md="8" :sm="12" v-for="task of taskData" :key="task._id">
              <TaskItem
                :task="task"
                @edit="() => $emit('edit', task)"
              />
            </el-col>
          </transition-group>
        </v-draggable>
      </el-row>
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem";
export default {
  name: "StageItem",
  components: { TaskItem },
  props: {
    title: String,
    tasks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      taskData: [],
    };
  },
  watch: {
    tasks: {
      immediate: true,
      handler(val) {
        this.taskData = JSON.parse(JSON.stringify(val));
      },
    },
  },
  methods: {
    onEnd() {
      const sorts = this.taskData.map(({ _id }, index) => ({
        _id,
        Priority: index + 1,
      }));
      fetch("/api/setTaskSort", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(sorts),
      })
        .then((res) => res.json())
        .then(() => {
          this.taskData = this.taskData.map((item, index) => ({
            ...item,
            Priority: index + 1,
          }));
        });
    },
  },
};
</script>

<style scoped lang="less">
.stage {
  &-item {
    display: flex;
    justify-content: flex-start;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
  &-aside {
    background-color: #dfe7ed;
    padding: 2rem;
    width: 13rem;
    flex-shrink: 0;
    box-sizing: border-box;
  }
  &-title {
    margin: 0;
  }
  &-content {
    width: 100%;
    background: #eff2f5;
    padding: 0.5rem 1rem;
    .el-col {
      margin: 0.5rem 0;
    }
    .task-item {
      height: 100%;
    }
  }
  &-stretch {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }
}
</style>

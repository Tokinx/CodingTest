<template>
  <div class="task-item">
    <h3 class="task-title">{{ task.Task }}</h3>
    <div class="task-body" v-html="task.Description"></div>
    <div class="task-footer">
      <div class="task-author">
        <el-avatar size="small"></el-avatar>
        {{ task.By_who }}
      </div>
      <div class="task-priority" :style="`background-color: ${color}`">
        Priority {{ task.Priority }}
      </div>
    </div>
    <div class="task-edit" @click="handleEdit">
      <i class="el-icon-edit"></i>
    </div>
  </div>
</template>

<script>
import colorRange from "color-range";
export default {
  name: "TaskItem",
  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    color() {
      return colorRange(
        this.task.Priority * 6 || 0,
        "HEX",
        "#E3594C",
        "#909090"
      );
    },
  },
  methods: {
    handleEdit() {
      this.$emit("edit");
    },
  },
};
</script>

<style scoped lang="less">
.task {
  &-item {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 0.15rem;
    background-color: #fff;
    &:hover .task-edit {
      opacity: 0.3;
      &:hover {
        opacity: 1;
      }
    }
  }
  &-title {
    margin: 0;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    word-break: break-all;
  }
  &-body {
    flex: 1;
    font-size: 0.7rem;
    color: #979797;
    word-break: break-all;
    /deep/ p {
      margin: 0;
      word-break: break-all;
    }
  }
  &-author,
  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-footer {
    margin-top: 0.5rem;
  }
  &-author {
    justify-content: flex-start;
    font-size: 0.7rem;
    word-break: break-all;
    .el-avatar {
      margin-right: 0.5rem;
      flex-shrink: 0;
    }
  }
  &-priority {
    font-size: 0.6rem;
    padding: 6px 10px;
    border-radius: 0.2rem;
    color: #fff;
    flex: none;
  }
  &-edit {
    position: absolute;
    right: 1rem;
    cursor: pointer;
    transition: 300ms;
    opacity: 0;
  }
}
</style>

<template>
  <div class="card-item">
    <h3 class="card-title">Task name</h3>
    <div class="card-body" v-html="card.Description"></div>
    <div class="card-footer">
      <div class="card-author">
        <el-avatar size="small"></el-avatar>
        {{ card.By_who }}
      </div>
      <el-button size="small">Priority {{ card.Priority }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    card: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped lang="less">
.card {
  &-item {
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.15rem;
    display: flex;
    flex-direction: column;
  }
  &-title {
    margin: 0;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  &-body {
    flex: 1;
    font-size: 0.7rem;
    color: #979797;
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
    .el-avatar {
      margin-right: 0.5rem;
    }
  }
}
</style>

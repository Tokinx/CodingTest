<template>
  <div class="card-item">
    <h3 class="card-title">{{ card.Task }}</h3>
    <div class="card-body" v-html="card.Description"></div>
    <div class="card-footer">
      <div class="card-author">
        <el-avatar size="small"></el-avatar>
        {{ card.By_who }}
      </div>
      <div class="card-priority" :style="`background-color: ${color}`">Priority {{ card.Priority }}</div>
    </div>
  </div>
</template>

<script>
import colorRange from "color-range";
export default {
  name: "CardItem",
  props: {
    card: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    color() {
      return colorRange(
        this.card.Priority * 6 || 0, "HEX", "#E3594C", "#909090");
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
    /deep/ p {
      margin: 0;
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
    .el-avatar {
      margin-right: 0.5rem;
    }
  }
  &-priority {
    font-size: 0.6rem;
    padding: 6px 10px;
    border-radius: 0.2rem;
    color: #fff;
  }
}
</style>

<template>
  <div class="stage-item">
    <div class="stage-aside">
      <h1 class="stage-title">{{ title }}</h1>
    </div>
    <div class="stage-content">
      <el-row :gutter="20">
        <v-draggable
          v-model="cardData"
          :animation="300"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group class="stage-stretch">
            <el-col :md="8" :sm="12" v-for="card of cardData" :key="card.Task">
              <CardItem :card="card" />
            </el-col>
          </transition-group>
        </v-draggable>
      </el-row>
    </div>
  </div>
</template>

<script>
import CardItem from "./CardItem";
export default {
  name: "StageItem",
  components: { CardItem },
  props: {
    title: String,
    cards: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      cardData: [],
    };
  },
  watch: {
    cards: {
      immediate: true,
      handler(val) {
        this.cardData = JSON.parse(JSON.stringify(val));
      },
    },
  },
  methods: {
    onStart() {
      console.log("onStart");
    },
    onEnd() {
      console.log("onEnd");
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
    .card-item {
      height: 100%;
      border: 1px solid #eee;
    }
  }
  &-stretch {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }
}
</style>

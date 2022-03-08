<template>
  <div class="stage-item">
    <div class="stage-aside">
      <h1 class="stage-title">{{ title }}</h1>
    </div>
    <div class="stage-content">
      <el-row :gutter="20">
        <v-draggable v-model="cardData" :animation="300" @end="onEnd">
          <transition-group class="stage-stretch">
            <el-col :md="8" :sm="12" v-for="card of cardData" :key="card._id">
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
    onEnd() {
      const sorts = this.cardData.map(({ _id }, index) => ({
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
          this.cardData = this.cardData.map((item, index) => ({
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

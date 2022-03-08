<template>
  <div class="index">
    <header class="index-header">
      <div></div>
      <div class="index-header__filter">
        <el-select v-model="sort" placeholder="Sort by stage" size="small">
          <el-option
            v-for="item in sortOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="filter" placeholder="Filter" size="small">
          <el-option
            v-for="item in filterOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </header>
    <StageItem
      v-for="stage of stageData"
      :key="stage.title"
      :title="stage.title"
      :cards="stage.cards"
    />
  </div>
</template>

<script>
import StageItem from "@/components/StageItem.vue";

export default {
  components: {
    StageItem,
  },
  data() {
    return {
      sort: "asc",
      sortOptions: [
        { label: "Sort by stage (high to low)", value: "desc" },
        { label: "Sort by stage (low to high)", value: "asc" },
      ],
      filter: '',
      filterOptions: [],
      cardData: [],
    };
  },
  created() {
    this.getStageData();
  },
  computed: {
    stageData() {
      let swap = {};
      this.cardData.forEach((item) => {
        if (!swap[item.Stage]) {
          swap[item.Stage] = { id: item.Stage, title: `Stage ${item.Stage}`, cards: [] };
        }
        swap[item.Stage].cards.push(item);
      });
      swap = Object.values(swap);
      if (this.sort === 'desc') swap.sort((self, next) => next.id - self.id);
      else swap.sort((self, next) => self.id - next.id);
      return swap;
    },
  },
  methods: {
    getStageData() {
      fetch('/api/getStageData').then(res => res.json()).then(rv => {
        this.cardData = rv.data;
      });
    },
  },
};
</script>

<style scoped lang="less">
.index {
  &-header {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    .el-select {
      margin-left: 1rem;
    }
  }
}
</style>

<template>
  <div class="index">
    <header class="index-header">
      <div>
        <el-button type="primary" size="small" @click="handleAddTask">
          Add Task
        </el-button>
      </div>
      <div class="index-header__filter">
        <el-select v-model="sort" placeholder="Sort by stage" size="small">
          <i slot="prefix" class="el-input__icon el-icon-sort"></i>
          <el-option
            v-for="item in sortOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="filter"
          placeholder="Filter"
          size="small"
          clearable
          multiple
          collapse-tags
          style="width: 150px"
        >
          <i slot="prefix" class="el-input__icon el-icon-s-operation"></i>
          <el-option
            v-for="stage in filterOptions"
            :key="stage"
            :label="`Stage ${stage}`"
            :value="stage"
          ></el-option>
        </el-select>
      </div>
    </header>
    <StageItem
      v-for="stage of stageData"
      :key="stage.id"
      :title="`Stage ${stage.id}`"
      :cards="stage.cards"
    />
    <SetTask ref="refSetTask" @complete="handleComplete" />
  </div>
</template>

<script>
import StageItem from "@/components/StageItem";
import SetTask from "@/components/SetTask";

export default {
  components: {
    StageItem,
    SetTask,
  },
  data() {
    return {
      sort: "asc",
      sortOptions: [
        { label: "Sort by stage (low to high)", value: "desc" },
        { label: "Sort by stage (high to low)", value: "asc" },
      ],
      filter: [],
      filterOptions: [],
      cardData: [],
    };
  },
  created() {
    this.getStageData();
  },
  watch: {
    cardData: {
      deep: true,
      handler(val) {
        this.filterOptions = [...new Set(val.map(({ Stage }) => Stage))];
      },
    },
  },
  computed: {
    stageData() {
      let swap = {};
      for (const item of this.cardData) {
        if (this.filter.length && this.filter.indexOf(item.Stage) < 0) continue;
        if (!swap[item.Stage]) {
          swap[item.Stage] = {
            id: item.Stage,
            cards: [],
          };
        }
        swap[item.Stage].cards.push(item);
      }
      swap = Object.values(swap);
      if (this.sort === "desc") swap.sort((self, next) => next.id - self.id);
      else swap.sort((self, next) => self.id - next.id);
      return swap;
    },
  },
  methods: {
    getStageData() {
      fetch("/api/getStageData")
        .then((res) => res.json())
        .then(({ data }) => {
          this.cardData = data;
        });
    },
    handleAddTask() {
      this.$refs.refSetTask.show();
    },
    handleComplete(task) {
      const index = this.cardData.findIndex(({ _id }) => _id === task._id);
      if (index > -1) {
        // Edit
        // this.splice(index, 0, task);
        this.getStageData();
      } else {
        this.cardData.push(task);
      }
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

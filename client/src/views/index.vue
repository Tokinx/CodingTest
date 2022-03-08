<template>
  <div class="index">
    <header class="index-header">
      <div class="index-header__add">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAddTask"
        >
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
          class="filter-stage"
          v-model="filter"
          placeholder="Filter"
          size="small"
          clearable
          multiple
          collapse-tags
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
      v-for="(stage, index) of stageData"
      :key="stage.id"
      :title="`Stage ${stage.id}`"
      :index="index"
      :tasks="stage.tasks"
      @edit="handleEdit"
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
      taskData: [],
    };
  },
  created() {
    this.getStageData();
  },
  watch: {
    taskData: {
      deep: true,
      handler(val) {
        this.filterOptions = [...new Set(val.map(({ Stage }) => Stage))].sort();
      },
    },
  },
  computed: {
    stageData() {
      let swap = {};
      for (const item of this.taskData) {
        if (this.filter.length && this.filter.indexOf(item.Stage) < 0) continue;
        if (!swap[item.Stage]) {
          swap[item.Stage] = {
            id: item.Stage,
            tasks: [],
          };
        }
        swap[item.Stage].tasks.push(item);
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
          this.taskData = data;
        });
    },
    handleAddTask() {
      this.$refs.refSetTask.show();
    },
    handleComplete(task) {
      const index = this.taskData.findIndex(({ _id }) => _id === task._id);
      if (index > -1) {
        // Edit
        this.taskData.splice(index, 1, task);
      } else {
        // Add
        this.taskData.push(task);
      }
    },
    handleEdit(task) {
      this.$refs.refSetTask.show(task);
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
    .el-select:not(:first-child) {
      margin-left: 1rem;
    }
    .filter-stage {
      width: 150px;
    }
  }
}

@media (max-width: 40rem) {
  .index {
    /deep/ .stage {
      &-item {
        flex-direction: column;
      }
      &-aside {
        width: 100%;
        padding: 1rem;
      }
    }
  }
}
@media (max-width: 34rem) {
  .index {
    &-header {
      flex-direction: column;
      &__filter {
        .el-select {
          width: 100%;
          &,
          &.filter-stage {
            margin: 0;
            margin-top: 0.5rem;
          }
        }
      }
    }
  }
}
</style>

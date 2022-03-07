<template>
  <div class="index">
    <header class="index-header">
      <div></div>
      <div class="index-header__filter">
        Filter
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

const $ajax = (type = "GET", url = "", fn, data = {}) => {
  let request = new XMLHttpRequest();
  let queryString = Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
  if (type == "POST") {
    const formHeader = "application/x-www-form-urlencoded; charset=UTF-8";
    request.setRequestHeader("Content-Type", formHeader);
  }
  if (type == "GET") {
    url = `${url}?${queryString}`;
  }
  request.open(type, url, true);
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      fn & fn(this.status >= 200 && this.status < 400, this);
    }
  };
  request.send(queryString);
  request = null;
};

export default {
  components: {
    StageItem,
  },
  data() {
    return {
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
      return Object.values(swap);
    },
  },
  methods: {
    getStageData() {
      $ajax("GET", "/mock.json", (status, req) => {
        if (status) {
          let data = JSON.parse(req.responseText);
          this.cardData = data;
        }
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

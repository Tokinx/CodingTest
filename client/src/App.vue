<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html {
  font-size: 20px;
}
body {
  padding: 0 1rem;
  margin: 0;
  background-color: #f9f9f9;
  font-size: 16px;
}
* {
  box-sizing: border-box;
}

.el-textarea,
.el-input {
  &__inner {
    border-radius: 0;
  }
}
.el-button,
.el-dialog,
.el-select-dropdown{
    border-radius: 0;
}
</style>

<template>
  <div class="dashboard-container">
    <div class="dashboard-text">2019年共招标{{ cfrsCount }}次</div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      cfrsCount: 21
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

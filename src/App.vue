<template>
  <div class="tabs">
    <div
      class="tab"
      v-for="tab in lists"
      :key="tab.label"
      :class="{ active: tab.label === current }"
      @click="current = tab.label"
    >
      {{ tab.label }}
    </div>
  </div>

  <div class="content" :key="current">
    <NormalList v-if="current === '普通列表'" />
    <StaticHeightVirtualListScroll
      v-else-if="current === '固定高度虚拟列表(scroll)'"
    />
    <StaticHeightVirtualListObserver
      v-else-if="current === '固定高度虚拟列表(observer)'"
    />
    <DynamicHeightVirtualList v-else-if="current === '动态高度虚拟列表'" />
    <DynamicHeightVirtualList
      no-image
      v-else-if="current === '动态高度虚拟列表(无图)'"
    />
  </div>
</template>

<script setup lang="ts">
const lists = ref([
  {
    label: "固定高度虚拟列表(observer)",
    component: "StaticHeightVirtualListObserver",
  },
  {
    label: "固定高度虚拟列表(scroll)",
    component: "StaticHeightVirtualListScroll",
  },
  {
    label: "动态高度虚拟列表",
    component: "DynamicHeightVirtualList",
  },
  {
    label: "普通列表",
    component: "NormalList",
  },
  {
    label: "动态高度虚拟列表(无图)",
    component: "DynamicHeightVirtualList",
  },
]);
const current = ref("动态高度虚拟列表");
</script>

<style scoped>
.tabs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
}

.tab {
  padding: 5px;
  margin: 0 10px;
  font-size: 18px;
  color: #333;
  cursor: pointer;
}

.tab.active {
  color: #007bff;
  font-weight: bold;
}

.tab:hover {
  color: #007bff;
}

.content {
  padding-top: 50px; /* Adjust this value based on the height of your tabs */
}
</style>

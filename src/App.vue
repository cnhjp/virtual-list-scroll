<template>
  <div class="tabs">
    <div
      class="tab"
      v-for="tab in lists"
      :key="tab"
      :class="{ active: tab === current }"
      @click="current = tab"
    >
      {{ tab }}
    </div>
  </div>

  <div class="content">
    <NormalList v-if="current === 'NormalList'" />
    <StaticHeightVirtualList
      v-else-if="current === 'StaticHeightVirtualList'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const lists = ref(["StaticHeightVirtualList", "NormalList"]);
const current = ref(lists.value[0]);
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

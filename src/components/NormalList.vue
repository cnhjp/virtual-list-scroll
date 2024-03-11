<script setup lang="ts">
import rawData from "../data.json";

const data: DataItem[] = rawData as DataItem[];

const visibleHeight = ref(450); // 可见区域高度
const list = ref<DataItem[]>(data); // 列表数据
</script>

<template>
  <div
    ref="refVirtualScrollList"
    class="virtual-scroll-list"
    :style="{ height: `${visibleHeight}px` }"
  >
    <div ref="refRenderList" class="render-list">
      <div class="list-item" v-for="(item, index) in list" :key="index">
        <span style="color: red">{{ index }}</span>
        <div>{{ item.text }}</div>
        <img :src="item.image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.virtual-scroll-list {
  position: relative;
  width: 100%;
  overflow-y: auto;
  border: 1px solid red;
}

.render-list {
  position: absolute;
  width: 100%;
}

.render-list .list-item {
  box-sizing: border-box;
  border-bottom: 1px solid #000;
  text-align: center;
  padding: 13px 0;
}

.render-list .list-item img {
  width: 25%;
}
</style>

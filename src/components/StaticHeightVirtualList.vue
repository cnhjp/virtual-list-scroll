<script setup lang="ts">
const itemHeight = ref(50); // 单个列表项高度
const itemCount = ref(1000); // 列表项数量
const visibleHeight = ref(300); // 可见区域高度
const startIndex = ref(0); // 可见区域起始索引
const refVirtualScrollList = ref<HTMLElement | null>(null); // 列表容器

// 列表高度
const listHeight = computed(() => {
  return itemHeight.value * itemCount.value;
});
// 可见列表项数量
const visibleCount = computed(() => {
  return Math.ceil(visibleHeight.value / itemHeight.value);
});
// 可见列表
const visibleList = computed(() => {
  return Array.from({ length: visibleCount.value }, (_, i) => {
    return startIndex.value + i;
  });
});
// 设置可见区域样式
const renderListStyle = computed(() => {
  return {
    top: `${startIndex.value * itemHeight.value}px`,
  };
});

// 监听滚动事件
function handleScroll(e: Event) {
  const target = e.target as HTMLElement;
  // 计算出当前滚动到的列表项索引
  startIndex.value = Math.floor(target.scrollTop / itemHeight.value);
}

onMounted(() => {
  if (!refVirtualScrollList.value) return;
  refVirtualScrollList.value.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  if (!refVirtualScrollList.value) return;
  refVirtualScrollList.value.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div
    ref="refVirtualScrollList"
    class="virtual-scroll-list"
    :style="{ height: `${visibleHeight}px` }"
  >
    <div class="scroll-list" :style="{ height: `${listHeight}px` }"></div>
    <div class="render-list" :style="renderListStyle">
      <div
        class="list-item"
        v-for="index in visibleList"
        :key="index"
        :style="{
          width: '100%',
          height: `${itemHeight}px`,
          lineHeight: `${itemHeight}px`,
          textAlign: 'center',
        }"
      >
        {{ index }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.virtual-scroll-list {
  position: relative;
  width: 90vw;
  overflow-y: auto;
  border: 1px solid red;
}

.render-list {
  position: absolute;
  width: 100%;
}
</style>

<script setup lang="ts">
const itemHeight = ref(50); // 单个列表项高度
const itemCount = ref(1000); // 列表项数量
const visibleHeight = ref(250); // 可见区域高度
const startIndex = ref(0); // 可见区域起始索引
const refVirtualScrollList = ref<HTMLElement | null>(null); // 列表容器

// 列表高度
const listHeight = computed(() => {
  return itemHeight.value * itemCount.value;
});
// 可见列表项数量
const visibleCount = computed(() => {
  return Math.ceil(visibleHeight.value / itemHeight.value) + 1;
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
    top: `${startIndex.value * itemHeight.value - itemHeight.value}px`,
  };
});

// 使用IntersectionObserver代替scroll事件进行优化
const observer = ref<IntersectionObserver | null>(null);
const refHead = ref<HTMLElement | null>(null); // 头部元素
const refFoot = ref<HTMLElement | null>(null); // 尾部元素

onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    console.log("intersection observer");
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === refHead.value) {
          // 头部元素进入可见区域
          startIndex.value = startIndex.value - 1;
        } else if (entry.target === refFoot.value) {
          // 尾部元素进入可见区域
          startIndex.value = startIndex.value + 1;
        }

        // let scrollTop = refVirtualScrollList.value!.scrollTop;
        // if (entry.target === refHead.value) {
        //   scrollTop -= itemHeight.value;
        // } else if (entry.target === refFoot.value) {
        //   // scrollTop += itemHeight.value;
        // }
        // startIndex.value = Math.floor(scrollTop / itemHeight.value);
      }
    }),
      {
        root: refVirtualScrollList.value,
        rootMargin: "10px",
        threshold: 0.1,
      };
  });
  observer.value.observe(refHead.value!);
  observer.value.observe(refFoot.value!);
});
</script>

<template>
  <div
    ref="refVirtualScrollList"
    class="virtual-scroll-list"
    :style="{ height: `${visibleHeight}px` }"
  >
    <div class="scroll-list" :style="{ height: `${listHeight}px` }"></div>
    <div ref="refRenderList" class="render-list" :style="renderListStyle">
      <!-- 头部元素 -->
      <div
        ref="refHead"
        class="list-item"
        :style="{ height: `${itemHeight}px` }"
      ></div>

      <div
        class="list-item"
        v-for="index in visibleList"
        :key="index"
        :style="{
          height: `${itemHeight}px`,
          lineHeight: `${itemHeight}px`,
        }"
      >
        {{ index }}
      </div>

      <!-- 尾部元素 -->
      <div
        ref="refFoot"
        class="list-item"
        :style="{ height: `${itemHeight}px` }"
      ></div>
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

.render-list .list-item {
  box-sizing: border-box;
  border-bottom: 1px solid #000;
  text-align: center;
}
</style>

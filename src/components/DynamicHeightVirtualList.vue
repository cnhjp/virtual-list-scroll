<script setup lang="ts">
import rawData from "../data.json";
const data: DataItem[] = rawData as DataItem[];

defineProps({
  noImage: {
    type: Boolean,
    default: false,
  },
});

interface Record {
  index: number;
  height: number;
  bottom: number;
}

const records = ref<Record[]>([]); // 记录列表项高度
  const estimateHeight = ref(500); // 列表项预估高度
const visibleHeight = ref(550); // 可见区域高度
const list = ref<DataItem[]>([]); // 列表数据
const startIndex = ref(0); // 可见区域起始索引
const endIndex = ref(0); // 可见区域结束索引
const refVirtualScrollList = ref<HTMLElement | null>(null); // 列表容器
const refRenderList = ref<HTMLElement | null>(null); // 可见区域容器
const idPrefix = ref("item_"); // 列表项id前缀

// 添加新的ref
const bufferAbove = ref(8);
const bufferBelow = ref(8);

// 列表总高度
const listHeight = computed(() => {
  if (records.value.length) {
    return records.value[records.value.length - 1].bottom;
  }
  return 0;
});
// 设置可见区域样式
const renderListStyle = computed(() => {
  if (!records.value.length) return {};
  const record = records.value[startIndex.value];
  return {
    top: `${record.bottom - record.height}px`,
  };
});
// 可见列表
const visibleList = computed(() => {
  const start = startIndex.value,
    end = endIndex.value;
  return records.value.slice(start, end + 1);
});

// 初始化列表项高度
onMounted(() => {
  const total = data.length;
  list.value = new Array(total).fill(0).map((_, index) => data[index]);

  records.value = new Array(total).fill(0).map((_, index) => ({
    index,
    bottom: index * estimateHeight.value,
    height: estimateHeight.value,
  }));
  const initialCount = Math.ceil(visibleHeight.value / estimateHeight.value);
  startIndex.value = 0; // Math.max(0, initialCount - bufferAbove.value);
  endIndex.value = startIndex.value + initialCount + bufferBelow.value;
});

// 更新items的高度
function updateItemsHeights() {
  console.log("updateItemsHeights");
  const items = refRenderList.value?.children;
  if (!items) return;
  [...items].forEach((element: any) => {
    const index = +element.id.replace(idPrefix.value, "");
    const height = element.offsetHeight;
    const record = records.value[index];
    if (record.height !== height) {
      record.height = height;
      records.value[index] = {
        ...record,
        height,
        bottom: index === 0 ? height : records.value[index - 1].bottom + height,
      };
    }
  });
}
onUpdated(() => {
  nextTick(() => {
    updateItemsHeights();
  });
});

// 监听滚动事件
function handleScroll(e: Event) {
  nextTick(() => {
    const target = e.target as HTMLElement;
    const scrollTop = target.scrollTop;
    // 更新startIndex和endIndex
    for (let i = 0; i < records.value.length; i++) {
      const record = records.value[i];
      if (
        scrollTop <= record.bottom &&
        scrollTop + record.height >= record.bottom
      ) {
        startIndex.value = Math.max(0, i - bufferAbove.value);
      }
      if (scrollTop + visibleHeight.value <= record.bottom) {
        endIndex.value = Math.min(
          records.value.length - 1,
          i + bufferBelow.value
        );
        break;
      }
    }
  });
}

const throttleHandleScroll = throttle(handleScroll, 16.7);

onMounted(() => {
  if (!refVirtualScrollList.value) return;
  refVirtualScrollList.value.addEventListener("scroll", throttleHandleScroll, {
    passive: true,
  });
});
onUnmounted(() => {
  if (!refVirtualScrollList.value) return;
  refVirtualScrollList.value.removeEventListener(
    "scroll",
    throttleHandleScroll
  );
});
</script>
<template>
  <div
    style="
      height: 250px;
      border: 1px solid #ccc;
      margin-bottom: 20px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    "
  >
    <div>startIndex: {{ startIndex }}, endIndex: {{ endIndex }}</div>
    <div>
      {{ visibleList }}
    </div>
  </div>
  <div
    ref="refVirtualScrollList"
    class="virtual-scroll-list"
    :style="{ height: `${visibleHeight}px` }"
  >
    <div class="scroll-list" :style="{ height: `${listHeight}px` }"></div>
    <div ref="refRenderList" class="render-list" :style="renderListStyle">
      <div
        class="list-item"
        v-for="item in visibleList"
        :key="item.index"
        :id="`${idPrefix}${item.index}`"
      >
        <span style="color: red">{{ item.index }}</span>
        <div>{{ list[item.index].text }}</div>
        <img :src="list[item.index].image" v-if="!noImage" />
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

<script setup lang="ts">
onMounted(() => {
  const button = document.getElementById("button");
  const ul = document.getElementById("container");

  if (button && ul) {
    button.addEventListener("click", function () {
      let now = Date.now();
      const total = 10000;

      for (let i = 0; i < total; i++) {
        let li = document.createElement("li");
        li.innerText = (~~(Math.random() * total)).toString();
        ul.appendChild(li);
      }
      console.log(`JS运行时间：${Date.now() - now}`);
      setTimeout(() => {
        console.log(`总运行时间：${Date.now() - now}`);
      }, 0);
    });
  }
});
</script>

<template>
  <button id="button">button</button><br />
  <ul id="container"></ul>
</template>

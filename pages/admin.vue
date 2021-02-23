<template>
  <NuxtChild @setAppClasses="(classesStr) => $emit('setAppClasses', classesStr)" />
</template>

<script>
export default {
  name: "admin",
  layout: "MainDashboard"
}
</script>

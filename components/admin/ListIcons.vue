<template>
  <vs-select :label="label" :autocomplete="true" v-model="value" @input="selected">
    <vs-select-item v-for="(icon , index) in Icons" :key="index" :text="icon" :value="icon" class="fal fa w-full" :class="icon"/>
  </vs-select>
</template>

<script>
import Icons from '@/plugins/IconsList'

export default {
  name: "ListIcons",
  props: {
    value: {
      require: true,
      type: String
    },
    label:{
      default:null
    }
  },
  data() {
    return {
      Icons
    }
  },
  methods:{
    selected(){
      this.$emit('input' , this.value)
    }
  }
}
</script>

<style scoped>

</style>

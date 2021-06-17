<template>
  <div class="grid grid-cols-4 gap-3">
    <vs-card class="col-span-1">
      <div>
        <vs-input class="w-full" v-model="post.name" name="name" data-vv-as="نام" v-validate="'required'" label="نام"/>
        <span class="text-danger text-sm" v-if="errors.has('name')">{{ errors.first('name') }}</span>
      </div>
      <div>
        <vs-input class="w-full" v-model="post.is_free" name="is_free" data-vv-as="رایگان" v-validate="'required'" label="رایگان"/>
        <span class="text-danger text-sm" v-if="errors.has('is_free')">{{ errors.first('is_free') }}</span>
      </div>
      <div>
        <span>استان</span>
        <tree-select  class="w-full" :options="ostan" :normalizer="(val)=>{return {label:val.name , id:val.id}}"
                     v-model="post.states" name="states" data-vv-as="استان ها" v-validate="'required'" multiple/>
        <span class="text-danger text-sm" v-if="errors.has('states')">{{ errors.first('states') }}</span>
      </div>
    </vs-card>
    <vs-card class="col-span-3">
      <div class="grid grid-cols-3">
        <vs-input label="از"/>
        <vs-input label="تا"/>
        <vs-input label="قیمت"/>
      </div>
      <vs-divider/>
      <div class="grid grid-cols-3">
        <vs-input label="از"/>
        <vs-input label="تا"/>
        <vs-input label="قیمت"/>
      </div>
    </vs-card>

  </div>
</template>

<script>
import treeSelect from '@riophae/vue-treeselect'
export default {
  name: "SavePost",
  props:{
    post:{
      required:true
    }
  },
  computed:{
    ostan(){
      return this.$store.getters['address/getOstans']
    },
    cities(){
      return this.$store.getters['address/getCities']
    let cities = this.$store.getters['address/getCities']
      // cities.forEach(city=>{
      //   if(){
      //
      //   }
      // })
    },
  },
  components:{
    treeSelect
  }
}
</script>

<style scoped>

</style>
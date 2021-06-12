<template>
<div>
  <vx-card class="mt-base" no-shadow card-border>
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="flex items-end px-3">
          <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
          <span class="font-medium text-lg leading-none">دسترسی</span>
        </div>
        <vs-divider />
      </div>
    </div>
    <vs-input v-model="role.name" label="نام نقش" class="font-bold"/>
    <div class="block overflow-x-auto">
      <table class="w-full">
        <tr>
          <th class="font-semibold text-base text-right px-3 py-2" v-for="heading in ['دسترسی', 'خواندن', 'ویرایش', 'ایجاد', 'حذف']" :key="heading">{{ heading }}</th>
        </tr>

        <tr v-for="(model, index) in models" :key="index">
          <td class="px-3 py-2">{{ model }}</td>
          <td v-for="name in ['read', 'update', 'create', 'delete']" class="px-3 py-2" :key="name+' '+model">
            <vs-checkbox v-model="role.permissions" :vs-value="name+' '+model"/>
          </td>
        </tr>
      </table>
    </div>

  </vx-card>
  <div class="vx-row">
    <div class="vx-col w-full">
      <div class="mt-8 flex flex-wrap items-center justify-end">
        <vs-button class="ml-auto mt-2" @click="saveRole">ذخیره</vs-button>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "SaveRole",
  data(){
    return{
     permissions:[]
    }
  },
  computed:{
    models(){
      return new Set(this.permissions.map(x=>x.split(' ')[1]))
    }
  },
  props:{
    role:{
      required:true
    }
  },
  fetch() {
    this.getPermissions()
  },
  methods:{
    saveRole(){
      this.$validator.validateAll().then(res=>{
        if(res){
          this.$emit('saveRole')
        }
      })
    },
    getPermissions(){
      this.$apiClient.get('api/permissions').then(res=>{
        if(res.status ===200){
          this.permissions = res.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
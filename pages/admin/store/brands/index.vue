<template>
  <vs-card>
    <vs-button @click.native="editPopup = true">ایجاد برند</vs-button>
    <vs-table ref="table" pagination :data="brands">
      <template slot="thead">
        <vs-th>لوگو</vs-th>
        <vs-th>نام</vs-th>
        <vs-th>نامک</vs-th>
        <vs-th>ویرایش</vs-th>
      </template>
      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            <p class=""><img width="100px" :src="tr.logo?tr.logo.link:''" alt="aaa"></p>
          </vs-td>
          <vs-td>
            <p class="">{{ tr.name }}</p>
          </vs-td>
          <vs-td>
            <p class="">{{ tr.slug }}</p>
          </vs-td>
          <vs-td class="whitespace-no-wrap">
            <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" class="ml-2" @click.stop="brand = JSON.parse(JSON.stringify(tr)) ; editPopup = true"/>
            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteBrand(tr)"/>
          </vs-td>
        </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <vs-popup :title="titlePopup" :active.sync="editPopup" @close="brand= { logo:{ link:'/storage/d3c3d67701c4eb4fcc97b859c57a96b4.png' } }">
      <div class="grid grid-cols-4 grid-rows-3 gap-1">
        <div class="col-span-2 row-start-1 ">
          <vs-input label="نام" v-model="brand.name" v-validate="'required'" name="name" class="w-full" data-vv-as="نام"/>
          <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
        </div>
       <div class="col-span-2 row-start-2">
         <vs-input label="نامک" v-model="brand.slug" class="w-full" v-validate="'required'" name="slug" data-vv-as="نامک"/>
         <span class="text-danger text-sm" v-show="errors.has('slug')">{{ errors.first('slug') }}</span>
       </div>
      <div class="col-start-3 col-span-2 row-start-1 row-end-4 ">
        <img :src="brand.logo.link || require('@/assets/images/Flag_of_None.png')" name="img"  @click="selectFile" class="rounded-lg w-full" data-vv-as="عکس"/>
        <span class="text-danger text-sm" v-show="errors.has('img')">{{ errors.first('img') }}</span>
      </div>

        <div class="col-span-1 flex flex-wrap content-end">
          <vs-button color="primary" @click.native="saveBrand">ذخیره</vs-button>
        </div>
      </div>
    </vs-popup>
  </vs-card>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      brands: [],
      editPopup: false,
      titlePopup: 'ایجاد',
      brand: {
        logo:{}
      }
    }
  },
  watch:{
    'brand':{
      deep : true,
      handler(val){
        if(!(val.logo||{}).link){
          this.errors.add({
            field:'img',
            msg : 'عکس الزامی است'
          })
        }
        else{
          this.errors.remove('img')
        }
      }
    }
  },
  async fetch() {
    await this.$store.dispatch('brands/getBrands')
    this.brands = this.$store.getters['brands/getBrands']
  },
  methods: {
    deleteBrand(brand) {
      this.$store.dispatch('brands/deleteBrand', brand.id).then((res) => {
        if (res.status === 200) {
          this.$store.commit('brands/DELETE_BRAND', brand)
          this.$vs.notify({
            title: "با موفقیت حذف شد.",
            time: 2000,
            color: "success",
            position: "bottom-right",
            icon: 'check_box',
          })
        }
      }).catch((err) => {
        this.$vs.notify({
          title: "حذف ناموفق!",
          text: "خطایی رخ داده است.",
          time: 2000,
          color: "danger",
          position: "bottom-right",
          icon: 'check_box',
        })
      })
    },
    selectFile() {
      let input = document.createElement('input')
      input.type = 'file'
      input.onchange = this.uploadFile
      input.click()
    },
    uploadFile(event) {
      let file = event.target.files[0]
      this.$store.dispatch('files/uploadBrandLogo', file).then(res => {
        this.brand.logo = {
          link: res.data.link,
          id: res.data.id,
        }
      })
    },
    saveBrand(){
      this.$validator.validateAll().then(res=>{
        if(!res) return
        let dispatch = this.brand.id ? 'brands/updateBrand':'brands/storeBrand'
        this.$store.dispatch(dispatch , this.brand).then(res => {
          if (res.status === 200){
            this.$fetch()
            this.editPopup = false
            this.brand = {
              logo:{
                link:'/storage/d3c3d67701c4eb4fcc97b859c57a96b4.png'
              }
            }
            this.$vs.notify({
              title: "با موفقیت ذخیره شد.",
              time: 2000,
              color: "success",
              position: "bottom-right",
              icon: 'check_box',
            })
          }
        }).catch(err => console.log(err.response))
      })

    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <vs-tabs color="danger">
      <vs-tab label="Header">
        <div class="grid grid-cols-6 gap-2">
          <vs-card class="col-span-4">
            <div class="grid grid-cols-6 gap-3">
              <h2 class="grid-cols-6">لوگو</h2>
              <div class="col-span-3 row-start-2 row-end-5">
                <img :src="header.logo.link || require('@/assets/images/Flag_of_None.png')" class="w-full" @click="selectFile('uploadSiteLogo' , (data) => header.logo.link = data.link)">
              </div>
              <vs-input label="لینک" class="row-start-2 col-span-3 w-full" v-model="header.logo.link"/>
              <vs-input label="متن جایگزین" class="row-start-3 col-span-3 w-full" v-model="header.logo.alt"/>
            </div>
          </vs-card>
          <vs-card class="col-span-2">
            <div class="grid grid-cols-6 gap-3">
              <h2 class="col-span-6">نوار پیمایش</h2>
              <vs-input label="تلفن" class="col-span-6 w-full" v-model="header.navbar.phone"/>
            </div>
          </vs-card>
          <vs-button @click.native="saveHeader">ذخیره</vs-button>
        </div>
      </vs-tab>
      <vs-tab label="Footer">
        <div class="grid grid-cols-6 gap-2">
          <vs-card class="col-span-2">
            <h3>اطلاعات تماس</h3>
            <vs-input label="آدرس" class="w-full" v-model="footer.contacts.address"/>
            <vs-input label="تلفن 1" class="w-full" v-model="footer.contacts.phone1"/>
            <vs-input label="تلفن 2" class="w-full" v-model="footer.contacts.phone2"/>
            <vs-input label="موبایل" class="w-full" v-model="footer.contacts.mobile"/>
          </vs-card>
          <vs-card class="col-span-4">
            <h3>لینک شبکه های اجتماعی</h3>
            <vs-button @click.native="footer.socialNetworks.push({icon:null,name:null,link:null})">افزودن</vs-button>
            <div class="grid grid-cols-9 gap-2" v-for="(socialNetwork , index) in footer.socialNetworks" :key="index">
              <ListIcons label="آیکون" class="col-span-3 w-full" v-model="socialNetwork.icon"/>
              <vs-input label="نام" class="col-span-2 w-full" v-model="socialNetwork.name"/>
              <vs-input label="لینک" class="col-span-3 w-full" v-model="socialNetwork.link"/>
              <vs-button class="col-span-1 w-full"  @click.native="footer.socialNetworks.splice(index , 1)">حذف</vs-button>
            </div>
          </vs-card>
          <vs-card class="col-span-4">
            <div class="grid grid-cols-6 gap-2">
              <div class="col-span-2">
                <img class="w-full" :src="footer.licenses[0].src || require('@/assets/images/Flag_of_None.png')"
                     @click="selectFile('uploadLicenseImage' , (data) => footer.licenses[0].src = data.link)" />
                <vs-input label="لینک" class="w-full" v-model="footer.licenses[0].link"/>
                <vs-input label="عکس" class="w-full" v-model="footer.licenses[0].src"/>
                <vs-input label="متن جایگذین" class="w-full" v-model="footer.licenses[0].alt"/>
              </div>
              <div class="col-span-2">
                <img class="w-full" :src="footer.licenses[1].src || require('@/assets/images/Flag_of_None.png')"
                     @click="selectFile('uploadLicenseImage' , (data) => footer.licenses[1].src = data.link)" />
                <vs-input label="لینک" class="w-full" v-model="footer.licenses[1].link"/>
                <vs-input label="عکس" class="w-full" v-model="footer.licenses[1].src"/>
                <vs-input label="متن جایگذین" class="w-full" v-model="footer.licenses[1].alt"/>
              </div>
              <div class="col-span-2">
                <img class="w-full" :src="footer.licenses[2].src || require('@/assets/images/Flag_of_None.png')"
                     @click="selectFile('uploadLicenseImage' , (data) => footer.licenses[2].src = data.link)" />
                <vs-input label="لینک" class="w-full" v-model="footer.licenses[2].link"/>
                <vs-input label="عکس" class="w-full" v-model="footer.licenses[2].src"/>
                <vs-input label="متن جایگذین" class="w-full" v-model="footer.licenses[2].alt"/>
              </div>
            </div>
          </vs-card>
          <vs-card class="col-span-2">
            <vs-button @click.native="footer.links.push({link:null , name:null})">افزودن</vs-button>
            <div class="grid grid-cols-6 gap-2" v-for="(link , index) in footer.links" :key="index">
              <vs-input label="نام" class="w-full col-span-2" v-model="link.name"/>
              <vs-input label="لینک" class="w-full col-span-3" v-model="link.link"/>
              <vs-button class="w-full col-span-1" @click.native="footer.links.splice(index , 1)">حذف</vs-button>
            </div>
          </vs-card>
        </div>
        <vs-button @click.native="saveFooter">ذخیره</vs-button>
      </vs-tab>
    </vs-tabs>
  </div>
</template>
<script>
import ListIcons from "~/components/admin/ListIcons";
export default {
  name: "index.vue",
  components:{
    ListIcons
  },
  data(){
    return {
      header:{
        logo :{ link:null, alt:null, },
        navbar:{},
      },
      footer:{
        contacts:{},
        socialNetworks:[],
        licenses:[{ link:null, src:null, alt:null, },{ link:null, src:null, alt:null, },{ link:null, src:null, alt:null, }],
        links:[],
      }
    }
  },
  fetch() {
    this.$store.dispatch('settings/getHeader').then(res => this.header = res.options)
    this.$store.dispatch('settings/getFooter').then(res => this.footer = res.options)
  },
  methods:{
    selectFile(action , setter){
      let input = document.createElement('input')
      input.type = 'file'
      input.onchange = (event) => {
        this.$store.dispatch('files/'+action, event.target.files[0]).then(res => {
          setter(res.data)
        }).catch(err => {
          if (err.response.status === 422){
            this.$vs.notify({
              title : 'درخواست شما با خطا مواجه شد!',
              text : err.response.data.errors.file[0],
              color:'danger',
            })
          }
        })
      }
      input.click()
    },
    saveHeader(){
      this.$store.dispatch('settings/updateHeader' , this.header).then(res => {
        this.$vs.notify({
          title: 'تنضیمات Header ذخیره شد.',
          color: 'success'
        })
      }).catch(err => {
        if (err.response.status === 422) {
          this.$vs.notify({
            title:'درخواست شما با خطا مواجه گردید',
            text : Object.entries(err.response.data.errors).reduce((x , y)=>x+y[1][0]+'\n'),
            color:'danger',
          })
        }
      })
    },
    saveFooter(){
      this.$store.dispatch('settings/updateFooter' , this.footer).then(res => {
        this.$vs.notify({
          title: 'تنضیمات Footer ذخیره شد.',
          color: 'success'
        })
      }).catch(err => {
        if (err.response.status === 422) {
          this.$vs.notify({
            title:'درخواست شما با خطا مواجه گردید',
            text : Object.entries(err.response.data.errors).reduce((x , y)=>x+y[1][0]+'\n'),
            color:'danger',
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

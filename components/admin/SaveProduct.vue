<template>
  <vs-card>
    <form-wizard title="" subtitle="" nextButtonText="بعدی" backButtonText="قبلی" finishButtonText="ارسال" @on-complete="saveProduct">
      <template slot="footer">

      </template>
      <tab-content title="اطلاعات کلی" :before-change="()=>validateStep('step1')">
        <form data-vv-scope="step1">
          <div class="grid grid-cols-8 gap-5">
            <div class="col-span-2">
              <vs-input label="نام" class="w-full" v-model="product.name" v-validate="'required'" name="name" data-vv-as="نام"/>
              <span class="text-danger text-sm" v-show="errors.has('step1.name')">{{ errors.first('step1.name') }}</span>
            </div>
            <div class="col-span-2">
              <vs-input label="کدمحصول" class="w-full" v-model="product.sku" v-validate="'required'" name="sku" data-vv-as="کد محصول"/>
              <span class="text-danger text-sm" v-show="errors.has('step1.sku')">{{ errors.first('step1.sku') }}</span>
            </div>
            <div class="col-span-2">
              <vs-input label="نامک" class="w-full" v-model="product.slug" v-validate="'required'" name="slug" data-vv-as="نامک"/>
              <span class="text-danger text-sm" v-show="errors.has('step1.slug')">{{ errors.first('step1.slug') }}</span>
            </div>
            <div class="col-span-6 row-start-2 row-end-7">
              <editor v-model="product.review" v-validate="'required'" name="review" data-vv-as="بررسی"/>
              <span class="text-danger text-sm" v-show="errors.has('step1.review')">{{ errors.first('step1.review') }}</span>
            </div>
            <div class="col-span-2 row-start-1 col-start-7">
              <label class="w-full">دسته ها</label>
              <tree-select v-model="product.categories" :options="categories" :normalizer="normalizer" v-validate="'required'" name="categories" data-vv-as="دسته"/>
              <span class="text-danger text-sm" v-show="errors.has('step1.categories')">{{ errors.first('step1.categories') }}</span>
            </div>
            <div class="col-span-2 row-start-2 col-start-7">
              <label class="w-full">نوع محصول</label>
              <tree-select v-model="product.type" :disabled="disabledProductType" @input="typeChanged" :options="types" v-validate="'required'" name="type" data-vv-as="نوع"/>
              <span class="text-danger text-sm" v-show="errors.has('step1.type')">{{ errors.first('step1.type') }}</span>
            </div>
            <div class="col-span-2 row-start-3 col-start-7">
              <label class="w-full">وضعیت محصول</label>
              <tree-select v-model="product.candition" :options="canditions" v-validate="'required'" name="candition" data-vv-as="وضعیت"/>
              <span class="text-danger text-sm" v-show="errors.has('step1.candition')">{{ errors.first('step1.candition') }}</span>
            </div>
            <div class="col-span-2 row-start-4 col-start-7">
              <label class="w-full">تاریخ انتشار محصول</label>
              <persion-date class="w-full" v-model="product.published_at" style="width:100%" v-validate="'required'" name="published_at" data-vv-as="تاریخ انتشار"/>
              <span class="text-danger text-sm" v-show="errors.has('step1.published_at')">{{ errors.first('step1.published_at') }}</span>
            </div>
          </div>
        </form>
      </tab-content>
      <tab-content title="ویژگی ها" :before-change="()=>validateStep('step2')">
        <form data-vv-scope="step2">
          <div class="grid grid-cols-12 gap-5">
            <template v-for="(attribute , index) in product.attributes">
              <div class="col-span-2">
                <vs-button icon="delete" @click.native="product.attributes.splice(index, 1)"/>
              </div>
              <div class="col-span-5">
                <tree-select v-model="attribute.id" :options="attributes" @input="attributeValues(index , attribute.id)" v-validate="'required'" :name="`attribute_id[${index}]`" data-vv-as="ویژگی"/>
                <span class="text-danger text-sm" v-show="errors.has(`step2.attribute_id[${index}]`)">{{ errors.first(`step2.attribute_id[${index}]`) }}</span>
              </div>
              <div class="col-span-5">
                <tree-select v-model="attribute.values" multiple :options="attribute.vals" v-validate="'required'" :name="`attribute_values[${index}]`" data-vv-as="مقدار"/>
                <span class="text-danger text-sm" v-show="errors.has(`step2.attribute_values[${index}]`)">{{ errors.first(`step2.attribute_values[${index}]`) }}</span>
              </div>
            </template>
            <vs-button color="primary" class="col-span-2" @click.native="product.attributes.push({id:null ,values:[],vals:[]})">افزودن ویژگی</vs-button>
          </div>
        </form>
      </tab-content>
      <tab-content title="متغیر ها" :before-change="()=>validateStep('step3')">
        <vs-collapse :not-arrow="true" :accordion="true" type="border" >
          <vs-collapse-item v-for="(variable , index) in product.variables" :key="index">
            <div slot="header" v-if="~~product.type === 2">
              {{ `${variableLabel()} ${variableValue(variable['variable_id']? variable['variable_id'] :null)}` }}
            </div>
            <div class="grid grid-cols-8 gap-5">
              <vs-button class="col-span-1 row-start-1 col-end-9" v-if="~~product.type === 2" color="primary" @click.native="product.variables.splice(index, 1)">حذف</vs-button>
              <label class="col-span-2 row-start-1 col-start-1" v-if="~~product.type === 2">{{ variableLabel() }}</label>
              <tree-select class="col-span-8" v-model="variable['variable_id']" v-if="~~product.type === 2" :options="product.variable.values"/>
              <vs-input label="قیمت خرید" v-model="variable['purchase_price']" class="col-span-2 w-full"/>
              <vs-input label="قیمت فروش" v-model="variable['selling_price']" class="col-span-2 w-full"/>
              <vs-input label="قیمت تخفیف خورده" v-model="variable['discounted_price']" class="col-span-2 w-full"/>
              <vs-input label="قیمت فروش کلی" v-model="variable['wholesale_price']" class="col-span-2 w-full"/>
              <vs-input label="کمترین مقدار خرید برای قیمت عمده" v-model="variable['minimum_wholesale']" class="col-span-2 w-full"/>
              <vs-input label="موجودی" v-model="variable['inventory']" class="col-span-2 w-full"/>
              <vs-input label="واحد" v-model="variable['unit']" class="col-span-2 w-full"/>
            </div>
          </vs-collapse-item>
        </vs-collapse>
        <tree-select v-model="product.variable.id" :options="variables" v-if="~~product.type === 2 && !product.variables.length" @input="variableValues(product.variable.id)"/>
        <vs-button v-if="~~product.type === 2" color="primary" class="col-span-2" @click.native="product.variables.push({id:null ,value:''})">افزودن ویژگی</vs-button>
      </tab-content>
      <tab-content title="عکس ها" :before-change="()=>validateStep('step4')">
        <vs-button @click.native="selectFile">آپلود عکس</vs-button>
        <div class="grid grid-cols-4 gap-5">
          <vs-card actionable class="col-span-1 cardx" v-for="(image , index) in product.images" :key="index">
            <div slot="header" v-if="~~product.type === 2">
              <tree-select :options="productVariables"/>
            </div>
            <div slot="media">
              <img :src="image.link" :alt="image.link">
            </div>
            <div slot="footer">
              <vs-row vs-justify="flex-start">
                <vs-button color="danger" type="gradient" @click.native="product.images.splice(index , 1)" >Delete</vs-button>
              </vs-row>
            </div>
          </vs-card>
        </div>
      </tab-content>
    </form-wizard>
  </vs-card>
</template>
<script>
function createTree(cats, disabled, id = null) {
  let catsFiltered = cats.filter(cat => cat.parent_id === id)

  catsFiltered.forEach(cat => {
    let disabledCat = 0
    if (!isNaN(disabled) && disabled > 0 && cat.id === disabled) {
      disabledCat = -1
    }

    if (!isNaN(disabledCat) && disabledCat === -1) {
      cat.isDisabled = true
    }

    let children = createTree(cats, disabled, cat.id)
    if (children.length) {
      cat.children = children
    }
  })
  return catsFiltered
}
import momentj from 'moment-jalaali'
import moment from 'moment'
import PersionDate from 'vue-persian-datetime-picker'
import Editor from "~/components/admin/Editor";
export default {
  name: "saveProduct",
  components: {
    Editor,
    PersionDate,
  },
  props: {
    product:{
      required: true,
    }
  },
  data() {
    return {
      canditions:[
        {
          id: 0,
          label: 'غیرفعال',
        },
        {
          id: 1,
          label: 'فعال',
        },
      ],
      types: [
        {
          id: 1,
          label: 'ساده',
        },
        {
          id: 2,
          label: 'متغیر',
        },
        {
          id: 3,
          label: 'دانلودی',
        },
      ]
    }
  },
  computed: {
    categories() {
      return createTree(this.$store.getters['storeCategory/getCategories'], false)
    },
    attributes() {
      let attributes = []
      this.$store.getters['attribute/getAttributes'].forEach(att => {
        let pushAtt = true
        this.product.attributes.forEach(a => {
          if (a.id === att.id){
            pushAtt = false
          }
        })
        if (pushAtt){
          attributes.push({id: att.id, label: att.name})
        }
      })
      return attributes
    },
    variables() {
      let variables = []
      this.$store.getters['attribute/getAttributes'].forEach(att => (att.is_variable ? variables.push({id: att.id, label: att.name}) : null))
      return variables
    },
    productVariables(){
      let variables = [

      ]
      this.product.variables.forEach((v  , k) => {
        variables.push({
          id:k,
          label: `${this.variableLabel()} ${this.variableValue(v['variable_id'])}`
        })
      })
      return variables
    },
    disabledProductType() {
      return ~~this.product.type === 2 && this.product.variables.length > 0
    },
  },
  methods: {
    saveProduct (){
      if (this.disable){
        return
      }
      this.$validator.validateAll().then(validated => {
        if (validated) {
          this.$store.commit('products/SET_PRODUCT' , this.product)
          this.$emit('save-attribute')
        }
      })
    },
    typeChanged(val){
      this.product.variables = []
      if (val !== 2){
        this.product.variables = [{

        }]
      }
    },
    selectFile(){
      let input = document.createElement('input')
      input.type='file'
      input.onchange = this.uploadFile
      input.click()
    },
    async uploadFile(event){
      let file = event.target.files[0]
      await this.$store.dispatch('files/uploadProductImage' , file)
      this.product.images.push({
        link : this.$store.getters['files/getFile'].link
      })
    },
    validateStep(scope){
      return new Promise((resolve, reject)=>{
        this.$validator.validateAll(scope).then((res)=>{
          console.log(res , this.errors , this.product)
          res ? resolve(true) : reject(false)
        })
      })
    },
    variableLabel(){
      return (this.variables.find(v => v.id === this.product.variable.id)).label
    },
    variableValue(id){
      if (id === null) return ''
      return this.$store.getters['attribute/getAttribute']['values'].find(v => v.id === id).value
    },
    async normalizeAttributes(id) {
      if (id === null) return []
      await this.$store.dispatch('attribute/getAttribute', id)
      let attribute = this.$store.getters['attribute/getAttribute']
      let values = []
      attribute.values.forEach(val => values.push({id: val.id, label: val.value}))
      return values
    },
    async attributeValues(index, id) {
      if (typeof id === 'undefined'){
        id=null
      }
      this.product.attributes[index].vals = await this.normalizeAttributes(id)
      this.product.attributes[index].values = []
    },
    async variableValues(id) {
      this.product.variable.values = await this.normalizeAttributes(id)
    },
    normalizer(cat) {
      return {
        id: cat.id,
        label: cat.name,
        children: cat.children,
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch('storeCategory/getCategories')
    this.$store.dispatch('attribute/getAttributes')
  }
}
</script>
<style>
.vpd-input-group input{
  width: 100%;
}
</style>

<template>
  <vs-card>
    <form-wizard v-if="active" title="" subtitle="" nextButtonText="بعدی" backButtonText="قبلی" finishButtonText="ارسال" @on-complete="saveProduct">
      <tab-content title="اطلاعات کلی" :before-changee="()=>validateStep('step1')">
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
            <div class="col-span-2">
              <label class="w-full">دسته ها</label>
              <tree-select v-model="product.categories" :options="categories" multiple :normalizer="normalizer" v-validate="'required'" name="categories" data-vv-as="دسته"/>
              <span class="text-danger text-sm" v-show="errors.has('step1.categories')">{{ errors.first('step1.categories') }}</span>
            </div>
            <div class="col-span-6 row-start-2 row-end-5">
              <editor v-model="product.review" v-validate="'required'" name="review" data-vv-as="بررسی"/>
              <span class="text-danger text-sm" v-show="errors.has('step1.review')">{{ errors.first('step1.review') }}</span>
            </div>
            <div class="col-span-3 row-start-5 row-end-7">
              <vs-textarea class="w-full" label="بررسی کوتاه" v-model="product.short_review" v-validate="'required'" name="short_review" data-vv-as="بررسی کوتاه"/>
              <span class="text-danger text-sm" v-show="errors.has('step1.short_review')">{{ errors.first('step1.short_review') }}</span>
            </div>
            <div class="col-span-3 row-start-5 row-end-7">
              <vs-textarea class="w-full" label="توضیحات" v-model="product.description" v-validate="'required'" name="description" data-vv-as="توضیحات"/>
              <span class="text-danger text-sm" v-show="errors.has('step1.description')">{{ errors.first('step1.description') }}</span>
            </div>
            <div class="col-span-2 row-start-2 row-end-7 gap-5">
              <div class="">
                <label class="w-full">نوع محصول</label>
                <tree-select v-model="product.type" :disabled="disabledProductType" @input="typeChanged" :options="types" v-validate="'required'" name="type" data-vv-as="نوع"/>
                <span class="text-danger text-sm" v-show="errors.has('step1.type')">{{ errors.first('step1.type') }}</span>
              </div>
              <div class="mt-2">
                <label class="w-full">برند</label>
                <tree-select v-model="product.brand_id" :options="brands" name="brand"/>
              </div>
              <div class="mt-2">
                <label class="w-full">وضعیت محصول</label>
                <tree-select v-model="product.condition" :options="conditions" v-validate="'required'" name="candition" data-vv-as="وضعیت"/>
                <span class="text-danger text-sm" v-show="errors.has('step1.candition')">{{ errors.first('step1.candition') }}</span>
              </div>
              <div class="mt-2">
                <label class="w-full">تاریخ انتشار محصول</label>
                <persion-date class="w-full" v-model="product.published_at" style="width:100%" v-validate="'required'" name="published_at" data-vv-as="تاریخ انتشار"/>
                <span class="text-danger text-sm" v-show="errors.has('step1.published_at')">{{ errors.first('step1.published_at') }}</span>
              </div>
              <div class="mt-2">
                <vs-input label="متن سفارشی 1" class="w-full" v-model="product.customText1" v-validate="''" name="customText1" data-vv-as="متن سفارشی 1"/>
                <span class="text-danger text-sm" v-show="errors.has('step1.customText1')">{{ errors.first('step1.customText1') }}</span>
              </div>
              <div class="mt-2">
                <vs-input label="متن سفارشی 2" class="w-full" v-model="product.customText2" v-validate="''" name="customText1" data-vv-as="متن سفارشی 2"/>
                <span class="text-danger text-sm" v-show="errors.has('step1.customText2')">{{ errors.first('step1.customText2') }}</span>
              </div>
            </div>
          </div>
        </form>
      </tab-content>
      <tab-content title="ویژگی ها" :before-change="()=>validateStep('step2')">
        <form data-vv-scope="step2">
          <div class="grid grid-cols-12 gap-5">
            <template v-for="(attributeGroup , index) in product.attributes">
              <div class="col-span-2">
                <vs-button icon="delete" @click.native="product.attributes.splice(index, 1)"/>
              </div>
              <div class="col-span-5">
                <tree-select v-model="attributeGroup.name" :options="groupAttributes" @input="attributeValues(index , attributeGroup.name)" v-validate="'required'" :name="`attributeGroup[${index}]`"
                             data-vv-as="ویژگی"/>
                <span class="text-danger text-sm" v-show="errors.has(`step2.attributeGroup[${index}]`)">{{ errors.first(`step2.attributeGroup[${index}]`) }}</span>
              </div>
              <div class="col-span-5">
                <tree-select v-model="attributeGroup.attributes" multiple :options="attributeGroup.atts" v-validate="'required'" :name="`attributes[${index}]`" data-vv-as="مقدار"/>
                <span class="text-danger text-sm" v-show="errors.has(`step2.attributes[${index}]`)">{{ errors.first(`step2.attributes[${index}]`) }}</span>
              </div>
            </template>
            <vs-button color="primary" class="col-span-2" @click.native="groupAttributes.length ?product.attributes.push({name : null ,attributes:[],atts:[]}):null">افزودن ویژگی</vs-button>
          </div>
        </form>
      </tab-content>
      <tab-content title="متغیر ها" :before-change="()=>validateStep('step3')">
        <vs-collapse :not-arrow="true" :accordion="true" type="border">
          <vs-collapse-item v-for="(variant , index) in product.variants" :key="index">
            <div slot="header" v-if="~~product.type === 2">
              {{ `${product.variantGroup.name} ${(product.variantGroup.attributes.find(a => a.id === variant['attribute_id']) || {label: ''}).label}` }}
            </div>
            <div class="grid grid-cols-8 gap-5">
              <vs-button class="col-span-1 row-start-1 col-end-9" v-if="~~product.type === 2" color="primary" @click.native="product.variants.splice(index, 1)">حذف</vs-button>
              <label class="col-span-2 row-start-1 col-start-1" v-if="~~product.type === 2">{{ product.variantGroup.name }}</label>
              <tree-select class="col-span-8" v-model="variant['attribute_id']" v-if="~~product.type === 2" :options="product.variantGroup.attributes"/>
              <vs-input label="قیمت خرید" v-model="variant['purchase_price']" class="col-span-2 w-full"/>
              <vs-input label="قیمت فروش" v-model="variant['selling_price']" class="col-span-2 w-full"/>
              <vs-input label="قیمت تخفیف خورده" v-model="variant['discounted_price']" class="col-span-2 w-full"/>
              <vs-input label="قیمت فروش کلی" v-model="variant['wholesale_price']" class="col-span-2 w-full"/>
              <vs-input label="کمترین مقدار خرید برای قیمت عمده" v-model="variant['minimum_wholesale']" class="col-span-2 w-full"/>
              <vs-input label="موجودی" v-model="variant['inventory']" class="col-span-2 w-full"/>
              <vs-input label="واحد" v-model="variant['unit']" class="col-span-2 w-full"/>
            </div>
          </vs-collapse-item>
        </vs-collapse>
        <tree-select v-model="product.variantGroup.name" :options="variables" v-if="~~product.type === 2 && !product.variants.length" @input="variableValues(product.variantGroup.name)"/>
        <vs-button v-if="~~product.type === 2" color="primary" class="col-span-2"
                   @click.native="product.variantGroup.attributes && product.variantGroup.attributes.length ? product.variants.push({id:null ,value:''}):null">افزودن ویژگی
        </vs-button>
      </tab-content>
      <tab-content title="عکس ها" :before-change="()=>validateStep('step4')">
        <vs-button @click.native="selectFile" class="mb-2">آپلود عکس</vs-button>
        <div class="grid grid-cols-6 gap-5">
          <vs-card class="col-span-1 cardx" v-for="(image , index) in product.images" :key="index" fixedHeight>
            <div slot="header" v-if="~~product.type === 2">
              <tree-select v-model="image.variant_index" :options="productVariables"/>
            </div>
            <div class="relative">
              <vs-button radius class="absolute" size="small" color="danger" type="gradient" icon="delete" @click.native="product.images.splice(index , 1)"/>
              <img :src="image.link" :alt="image.link">
            </div>
          </vs-card>
        </div>
      </tab-content>
      <tab-content title="لینک ها" :before-change="()=>validateStep('step5')" v-if="~~product.type === 3">
        <vs-button @click.native="product.links.push({title:'' , link:'' , description:''})">افزودن لینک</vs-button>
        <vs-collapse :not-arrow="true" :accordion="true" type="border">
          <vs-collapse-item v-for="(link , index) in product.links" :key="index">
            <h3 slot="header">
              {{ link.title }}
            </h3>
            <vs-button @click.native="product.links.splice(index , 1)">حذف</vs-button>
            <div class="grid grid-cols-1 gap-2">
              <vs-input class="w-full" label-placeholder="عنوان" v-model="link.title" required/>
              <vs-input class="w-full" label-placeholder="لینک" v-model="link.link" required/>
              <vs-textarea label="توضیحات" v-model="link.description" required/>
            </div>
          </vs-collapse-item>
        </vs-collapse>
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

import PersionDate from 'vue-persian-datetime-picker'
import Editor from "~/components/admin/Editor";

export default {
  name: "saveProduct",
  components: {
    Editor,
    PersionDate,
  },
  props: {
    product: {
      required: true,
    },
    active: {
      default: true,
    }
  },
  data() {
    return {
      conditions: [
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
  fetch() {
    this.$store.dispatch('storeCategory/getCategories').then(res => this.$store.commit('storeCategory/SET_CATEGORIES', res.data))
    this.$store.dispatch('attribute/getAttributes')
    this.$store.dispatch('brands/getBrands')
  },
  computed: {
    categories() {
      return createTree(this.$store.getters['storeCategory/getCategories'], false)
    },
    groupAttributes() {
      let attributes = []
      this.$store.getters['attribute/getAttributes'].forEach(att => {
        let pushAtt = this.product.attributes.find(a => a.name === att.name)

        if (!attributes.find(at => at.id === att.name)) {
          attributes.push({id: att.name, label: att.name, isDisabled: pushAtt})
        }
      })
      return attributes
    },
    attributes() {
      let attributes = []
      this.$store.getters['attribute/getAttributes'].forEach(att => {
        let pushAtt = true
        this.product.attributes.forEach(a => {
          if (a.id === att.id) {
            pushAtt = false
          }
        })
        if (pushAtt) {
          attributes.push({id: att.id, label: att.name})
        }
      })
      return attributes
    },
    brands() {
      let brands = []
      for (let brand of this.$store.getters['brands/getBrands']) {
        brands.push({
          id: brand.id,
          label: brand.name,
        })
      }
      return brands
    },
    variables() {
      let variables = []
      this.$store.getters['attribute/getAttributes'].forEach(att => {
        if (att.is_variable && !variables.find(at => at.id === att.name)) {
          variables.push({id: att.name, label: att.name})
        }
      })
      return variables
    },
    productVariables() {
      let variables = []
      this.product.variants.forEach((v, k) => {
        variables.push({
          id: k,
          label: `${this.product.variantGroup.name} ${(this.product.variantGroup.attributes.find(att => att.id === v.attribute_id) || {label: ''}).label}`
        })
      })
      return variables
    },
    disabledProductType() {
      return ~~this.product.type === 2 && this.product.variants.length > 0
    },
  },
  methods: {
    saveProduct() {
      if (this.disable) {
        return
      }
      this.$validator.validateAll().then(validated => {
        if (validated) {
          let product = JSON.parse(JSON.stringify(this.product))
          product.published_at = this.$jalaali(product.published_at, 'jYYYY/jMM/jDD').format('YYYY/MM/DD')
          this.$store.commit('products/SET_PRODUCT', product)
          this.$emit('save-product')
        }
      })
    },
    typeChanged(val) {
      if (val !== 2) {
        this.product.variants = [{}]
        if (val === 3 && !Array.isArray(this.product.links)) {
          this.$set(this.product, 'links', [])
        }
      } else {
        this.product.variants = []
      }
    },
    selectFile() {
      let input = document.createElement('input')
      input.type = 'file'
      input.onchange = this.uploadFile
      input.click()
    },
    async uploadFile(event) {
      let file = event.target.files[0]
      await this.$store.dispatch('files/uploadProductImage', file)
      this.product.images.push({
        link: this.$store.getters['files/getFile'].link,
        id: this.$store.getters['files/getFile'].id,
      })
    },
    validateStep(scope) {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll(scope).then((res) => {
          res ? resolve(true) : reject(false)
        })
      })
    },
    variableValue(id) {
      if (id === null) return ''
      return this.$store.getters['attribute/getAttribute']['values'].find(v => v.id === id).value
    },
    normalizeAttributes(id) {
      if (id === null) return []
      let attributes = []
      this.$store.getters['attribute/getAttributes'].forEach(att => att.name === id ? attributes.push({id: att.id, label: att.value}) : null)
      return attributes
    },
    attributeValues(index, id) {
      id = id || null
      this.product.attributes[index].atts = this.normalizeAttributes(id)
      this.product.attributes[index].attributes = []
    },
    variableValues(id) {
      if (id) {
        this.product.variantGroup.attributes = this.normalizeAttributes(id)
      }
    },
    normalizer(cat) {
      return {
        id: cat.id,
        label: cat.name,
        children: cat.children,
      }
    },
  },
}
</script>
<style>
.vpd-input-group input {
  width: 100%;
}
</style>

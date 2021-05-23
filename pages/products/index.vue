<template>
  <div class="archive-product">
    <section class="title-blog">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-30">
          <div class="col-span-12 border-cool-100 border py-7 rounded-lg my-5 ">
            <h1 class="text-center text-xl">عنوان آرشیو</h1>
            <div class="breadcumb text-sm text-center mx-auto">
              <vs-breadcrumb color="#eee" align="center">
                <li>
                  <a href="#" title="Home">صفحه اصلی</a>
                  <span class="vs-breadcrum--separator">/</span>
                </li>
                <li>
                  <a href="#" title="blogcat">دانشنامه</a>
                </li>
              </vs-breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="archive-area">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-5">
          <div class="right-box col-span-12 md:col-span-4 lg:col-span-3 relative">
            <div class="right-item p-3 border-cool-100 border rounded-lg relative mb-4">
              <div class="title-sidebar relative">
                <h3 class="text-center border-b-2 border-cool-600 pb-3 relative block px-1 lg:px-8 "> جستجو در این دسته </h3>
              </div>
              <div class="content-side text-right mt-5">
                <div class="font-fd my-auto search">
                  <vs-input color="#F97316" icon-after="true" icon-pack="fal" icon="fa-search" placeholder="جستجو ..." :icon-no-border="false" v-model="query2.search"/>
                </div>
              </div>
            </div>
            <div class="right-item p-3 border-cool-100 border rounded-lg relative mb-4">
              <div class="title-sidebar relative">
                <h3 class="text-center border-b-2 border-cool-600 pb-3 relative block px-1 lg:px-8  "> محصولات </h3>
              </div>
              <div class="content-side text-right mt-5">
              </div>
            </div>
            <div class="right-item p-3 border-cool-100 border rounded-lg relative mb-4">
              <div class="title-sidebar relative">
                <h3 class="text-center border-b-2 border-cool-600 pb-3 relative block px-1 lg:px-8  "> دسته بندی ها </h3>
              </div>
              <div class="content-side text-right mt-5">
                <template v-for="(cat , index) in mainCategories">
                  <vs-checkbox class="text-sm text-cool-600 mb-1" v-model="temp.categories" :vs-value="cat.slug" @input="selectCategory" :key="index">{{ cat.name }}</vs-checkbox>
                </template>
              </div>
            </div>
            <div class="right-item p-3 border-cool-100 border rounded-lg relative mb-4" v-if="childCategories.length">
              <div class="title-sidebar relative">
                <h3 class="text-center border-b-2 border-cool-600 pb-3 relative block px-1 lg:px-8  ">زیر دسته تجهیزات مخابراتی</h3>
              </div>
              <div class="content-side text-right mt-5">
                <template v-for="(cat , index) in childCategories">
                  <vs-checkbox class="text-sm text-cool-600 mb-1" icon-pack="fal" icon="fa-check" v-model="temp.categories" :vs-value="cat.slug" @input="selectCategory">{{ cat.name }}</vs-checkbox>
                </template>
              </div>
            </div>
            <div class="right-item p-3 border-cool-100 border rounded-lg relative mb-4" v-if="brands.length">
              <div class="title-sidebar relative">
                <h3 class="text-center border-b-2 border-cool-600 pb-3 relative block px-1 lg:px-8  "> برندها </h3>
              </div>
              <div class="content-side text-right mt-5">
                <vs-checkbox class="text-sm text-cool-600 mb-1" icon-pack="fal" icon=" fa-check" v-model="selectedBrands" :vs-value="brand.slug" v-for="(brand , index) in brands" :key="index"> {{ brand.name }}</vs-checkbox>
              </div>
            </div>
          </div>
          <div class="left-box col-span-12 md:col-span-8 lg:col-span-9 p-3 border-cool-100 border rounded-lg">
            <div class="order-area mb-5">
              <h4 class="inline-block text-cool-500 font-medium md:text-xs lg:text-base">مرتب سازی براساس :</h4>
              <a class="inline-block px-1 lg:px-3 py-1 mx-1 text-cool-700 font-thin md:text-xs lg:text-sm bg-ff rounded-lg hover:bg-orange-400 hover:text-cool-50" href="">گران ترین</a>
              <a class="inline-block px-1 lg:px-3 py-1 mx-1 text-cool-700 font-thin md:text-xs lg:text-sm bg-ff rounded-lg hover:bg-orange-400 hover:text-cool-50" href="">ارزان ترین</a>
              <a class="inline-block px-1 lg:px-3 py-1 mx-1 text-cool-700 font-thin md:text-xs lg:text-sm bg-ff rounded-lg hover:bg-orange-400 hover:text-cool-50" href="">محبوب ترین</a>
              <a class="inline-block px-1 lg:px-3 py-1 mx-1 text-cool-700 font-thin md:text-xs lg:text-sm bg-ff rounded-lg hover:bg-orange-400 hover:text-cool-50" href="">پرفروش ترین</a>
            </div>
            <div class="itemes-area">
              <div class="grid grid-cols-12 gap-5">
                <div class="col-span-6 lg:col-span-4" v-for="product in products" :key="product.slug">
                  <productCart :product="product"/>
                </div>
              </div>
            </div>
            <div class="paganition mt-5 mx-auto" v-if="pagination.last_page > 1">
              <vs-pagination max="6" :total="pagination.last_page" icon-pack="fal" prev-icon="fa-arrow-right" next-icon="fa-arrow-left" :color="colorx" v-model="query2.page"></vs-pagination>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import productCart from '@/components/front/store/productCart'

export default {
  components: {
    productCart
  },
  data() {
    return {
      temp: {categories: []},
      colorx: '#F97316',
      currentx: 5,
      products: [],
      pagination: {
        total: 0
      },
      selectedBrands:[],
      query2: {}
    };
  },
  name: "index",
  fetch() {
    this.getProducts()
    this.$store.dispatch('storeCategory/getCategories').then(res=>this.$store.commit('storeCategory/SET_CATEGORIES' , res.data))
    this.getBrands()
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()
    //   setTimeout(() => this.$nuxt.$loading.finish(), 500)
    // })
  },
  watch: {
    'query2.category'(value) {
      this.query2.page = 1
    },
    'selectedBrands'(value) {
      this.query2.brands = value
      this.query2.page = 1
    },
    query2: {
      deep: true,
      handler(c) {
        this.goToQuery().then(r => {

          this.$fetch()
        })
      }
    }
  },
  computed: {
    brands() {
      return this.$store.getters['brands/getBrands']
    },
    mainCategories() {
      let cat = this.$store.getters['storeCategory/getCategories'].find(c => c.slug === this.$route.query.category)
      return this.$store.getters['storeCategory/getCategories'].filter(c => ~~c.parent_id === ~~((cat || {}).parent_id || 0))
    },
    childCategories() {
      let cat = this.$store.getters['storeCategory/getCategories'].find(c => c.slug === this.$route.query.category)
      return this.$store.getters['storeCategory/getCategories'].filter(c => (c.parent_id === ~~(cat || {}).id))
    },
  },
  created() {
    let query = this.$cloneObject(this.$route.query)
    if (!query.category) {
      query.category = null
    }
    this.temp.categories = [query.category]
    query.brands = query.brands || []
    this.query2 = {...query}
  },
  methods: {
    getBrands() {
      let query = {}
      if (this.$route.query.category) {
        query.category = this.$route.query.category
      }
      this.$store.dispatch('brands/getBrands', query)
    },
    selectCategory(value) {
      this.temp.categories = [value[1]]
      this.query2.category = value[1]
    },
    getProducts() {
      let q = this.$cloneObject(this.$route.query)
      q.with = ['files', 'variants']
      q.pagination = true

      this.$store.dispatch('products/getProductsArchive', q).then(res => {
        this.products = []
        if (res.status === 200) {
          this.pagination = res.data
          res.data.data.forEach((product) => {
            let variant = product.variants.reduce((bestVariant, variant) => {
              return (variant.selling_price < bestVariant.selling_price) && variant.inventory !== 0 ? variant : bestVariant
            })
            this.products.push({
              name: product.name,
              slug: product.slug,
              type: product.type,
              description: product.description,
              thumbnail: product.files[0].link,
              inventory: variant.inventory,
              discounted_price: variant.discounted_price,
              selling_price: variant.selling_price,
            })
          })
        }
      });
    },
    goToQuery() {
      return this.$router.replace({path: this.$route.path, query: {...this.query2}})
    },
  },
}
</script>
<style>
.title-sidebar h3::before {
  content: "";
  height: 2px;
  width: 80%;
  background-color: #1f2937;
  position: absolute;
  bottom: -6px;
  right: 15px;
  left: 15px;
  margin: auto;
}

.content-side .con-vs-checkbox {
  justify-content: right !important;
}

.before-toman:after {
  content: "تومان";
  margin-right: 5px;
  font-size: 12px;
}

.img-product {
  border: 1px solid #eee;
  border-radius: 8px;
}

.item-pro:hover {
  transform: translateY(-5px);
  @apply shadow-lg;
}

.vs-pagination--mb {
  justify-content: center !important;
}

.archive-product .img-product img {
  max-height: 159px;
  max-width: 100%;
}
</style>

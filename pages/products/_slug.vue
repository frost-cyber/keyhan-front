<template>
  <div class="single-product-page mt-2" v-if="product.categories">
    <section class="landing-product">
      <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-30">
          <div class="col-span-12 md:col-span-12 lg:col-span-9 grid grid-cols-11 gap-30">
            <div class="col-span-11 md:col-span-5 lg:col-span-5 relative">
              <div class="breadcumb text-sm mb-2">
                <vs-breadcrumb color="#eee" :items="breadcrumbItems"/>
              </div>
              <vs-button class="save-product save-product-s" color="#D1D5DB" type="flat" icon-pack="fal" icon=" fa-bookmark"></vs-button>
              <div class="gallery-product ltr">
                <carousel v-if="images.length" :navText="['','']" :items="1" :autoplayHoverPause="true" :autoplay="false" :nav="true" :margin="30" :loop="false" :dots="false">
                  <img v-for="image in images" :src="image.src"/>
                </carousel>
              </div>  <!--slider -->
            </div>
            <div class="col-span-11 md:col-span-6 lg:col-span-6">
              <div>
                <div class="title-single md:mt-12">
                  <h1 class="text-lg font-bold text-cool-600">
                    {{ product.name }}
                  </h1>
                </div>
                <div class="custom-field mt-2">
                  <div class="cf-item inline-block" v-if="product.brand">
                    <span class="text-sm text-cool-700 font-normal">برند :</span>
                    <a class="text-sm text-cool-500 mr-2 font-thin hover:text-blue-400" href="">{{ product.brand.name }}</a>
                  </div>
                  <div class="cf-item inline-block mr-20">
                    <span class="text-sm text-cool-700 font-normal">دسته بندی :</span>
                    <a class="text-sm mr-2 font-thin text-blue-400" href="">{{ product.categories[0].name }}</a>
                  </div>
                </div>
                <div class="specific-row mt-4" v-if="product.type === 2">
                  <h4 class="text-sm text-cool-700 font-normal">انتخاب {{ product.variants[0].attribute.name }} : </h4>
                  <div class="colors mt-1" :class="product.variants[0].attribute.type === 2 ? 'colors' : 'spec-item' ">
                    <template v-for="(variant , index) in product.variants">
                      <vs-tooltip :key="index" v-if="variant.attribute.type === 2" class="inline-block" :text="variant.attribute.value" position="top" @click.native="activeVariant=index">
                        <button :class="{selected:index === activeVariant}" class="w-6 h-6 hover:shadow-lg border-4 inline-block rounded-full ml-1"
                                :style="{'border-color' : variant.attribute.code}"></button>
                      </vs-tooltip>
                      <button :key="index" v-else :class="{selected:index === activeVariant}" class="px-5 py-1 border-1 border-cool-300 focus:border-cool-700 text-cool-500 rounded-lg ml-4"
                              @click.native="activeVariant=index">
                        {{ variant.attribute.value + ' ' + variant.attribute.unit }}
                      </button>
                    </template>
                  </div>
                </div>
                <div class="des-product mt-4">
                  <h5 class="mb-1">ویژگی ها</h5>
                  <ul>
                    <li v-for="(item , index) in product.short_review.split('\n')" :key="index">{{ item }}</li>
                  </ul>
                </div>
                <div class="holesale mt-4" v-if="variantData.wholesale_price">
                  <h5 class="inline-block"> حداقل مقدار برای محاسبه خرید عمده :</h5>
                  <span class="num-holesale text-sm text-blue-400"> {{ variantData.minimum_wholesale }} </span>
                  <span class="unit-holesale text-sm text-blue-400" v-if="(variantData.attribute||{unit:''}).unit">{{ (variantData.attribute||{unit:''}).unit }}</span>
                </div>
              </div>
            </div>
            <div class="sidebar-product md:hidden col-span-full lg:hidden rounded-lg border border-cool-200 p-3 lg:mt-14">
            </div>
            <div class="col-span-11 md:col-span-11 lg:col-span-11">
              <div class="tab-area">
                <vs-tabs :color="colorx" position="top">
                  <vs-tab @click="colorx = '#EF4444'" label="مشخصات">
                    <div class="con-tab-ejemplo">
                      <div class="grid grid-cols-5 gap-3">
                        <template v-for="(attributeGroup , index) in product.attributes">
                          <div class="col-span-2 md:col-span-1 bg-cool-100 px-2 py-2 text-cool-700 text-center rounded-sm text-xs md:text-sm font-black" :key="index">
                            {{ attributeGroup.name }}
                          </div>
                          <div class="col-span-3 md:col-span-4 bg-cool-100 px-2 py-2 text-cool-700 text-right rounded-sm text-xs md:text-sm font-thin">
                            {{ attributeGroup.attributes.reduce((values , attribute)=>{ values.push(attribute.value); return values} , []).join(' , ') }}
                          </div>
                        </template>
                      </div>
                    </div>
                  </vs-tab>
                  <vs-tab label="نقد و بررسی">
                    <div class="con-tab-ejemplo" v-html="product.review"></div>
                  </vs-tab>
                  <vs-tab label="نظرات شما">
                    <div class="con-tab-ejemplo">
                      <div class="grid grid-cols-12 gap-30 text-cool-600">
                        <div class="col-span-12 md:col-span-7">
                          <comments :components-data="product.comments" color="#EF4444"/>
                        </div>
                        <div class="col-span-12 md:col-span-5">
                          <div>
                            <form data-vv-scope="comment" class="form-contact">
                              <template>
                                <vs-input class="contactform" placeholder="نام و نام خانوادگی" v-model="comment.name" size="small" v-validate="'required'" name="name" data-vv-as="نام"/>
                                <span class="text-danger text-sm" v-show="errors.has('comment.name')">{{ errors.first('comment.name') }}</span>
                                <vs-input class="contactform mt-3" placeholder="پست الکترونیک شما" v-model="comment.email" size="small" v-validate="'required'" name="email"  data-vv-as="ایمیل"/>
                                <span class="text-danger text-sm" v-show="errors.has('comment.email')">{{ errors.first('comment.email') }}</span>
                              </template>
                              <vs-textarea class="contactform mt-3" label="دیدگـــاه شما" height="200px" v-model="comment.body" v-validate="'required'" name="body"  data-vv-as="نظر"/>
                              <span class="text-danger text-sm" v-show="errors.has('comment.body')">{{ errors.first('comment.body') }}</span>
                              <div class="mt-3 text-sm">
                                <vs-button color="#F97316" type="filled" @click.native="saveComment">ثبت نظـــر شما</vs-button>
                              </div>
                            </form>
                            <div class="vote-area border border-cool-200 rounded-lg p-3 mt-4 grid grid-cols-4 gap-4 md:gap-30">
                              <div class="col-span-4">
                                <h3>
                                  امتیاز خودتان را در مورد این محصول ثبت کنید
                                </h3>
                              </div>
                              <div class="col-span-4 text-center">
                                <div class="starRating ml-2">
                                  <input id="rating5" type="radio" name="rating" value="5">
                                  <label for="rating5">5</label>
                                  <input id="rating4" type="radio" name="rating" value="4">
                                  <label for="rating4">4</label>
                                  <input id="rating3" type="radio" name="rating" value="3">
                                  <label for="rating3">3</label>
                                  <input id="rating2" type="radio" name="rating" value="2">
                                  <label for="rating2">2</label>
                                  <input id="rating1" type="radio" name="rating" value="1">
                                  <label for="rating1">1</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </vs-tab>
                </vs-tabs>
              </div>
            </div>
          </div>
          <div class="hidden md:block md:col-span-12 lg:col-span-3">
            <div class="sidebar-product rounded-lg border-2 border-cool-200 p-3 lg:mt-12 sticky top-5">
              <div>
                <div class="btn-customize block-btn pb-2 border-cool-300 border-dashed border-b">
                  <vs-button class="block" @click="popupActive=true" color="#4B5563" type="border">سفارشی سازی</vs-button>
                  <vs-popup class="customize-popup" title="فرم زیر را پر کنید با شما تماس میگیریم"
                            :active.sync="popupActive" icon-pack="fal" icon-close="fa-times">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </vs-popup>
                </div>
                <div class="grantee mt-2 pb-2 border-cool-300 border-dashed border-b-1" v-if="product.customFiled1">
                  <figure>
                    <i class="fal fa-check-square ml-3 text-blue-500 text-base"></i>
                    <span class="text-sm text-cool-600 font-thin">{{ product.customFiled1 }}</span>
                  </figure>
                </div>
                <div class="send mt-2 pb-2 border-cool-300 border-dashed border-b-1" v-if="product.customFiled2">
                  <figure>
                    <i class="fal fa-check-square ml-3 text-blue-500 text-base"></i>
                    <span class="text-sm text-cool-600 font-thin">>{{ product.customFiled2 }}</span>
                  </figure>
                </div>
                <div class="price-product py-4 h-16 text-left ">
                  <div class="price-old ltr">
                    <span class="value-discount bg-red-600 text-cool-50 text-sm px-2 rounded-xl" v-if="variantData.discounted_price">
                      {{ '%' + ~~((variantData.selling_price - variantData.discounted_price) / (variantData.selling_price / 100)) }}
                    </span>
                    <del class="value-old text-sm text-cool-400 line-through mx-1" v-if="variantData.discounted_price">
                      {{ variantData.selling_price }}
                    </del>
                    <span class="value-discount text-cool-600 text-sm font-bold float-right">
                      قیمت محصول
                    </span>
                  </div>
                  <div class="price-new">
                    <div class="price-new-area relative">
                      <span class="unit-price text-xs absolute top-1 left-0">
                        تومان
                      </span>
                      <ins class="text-base font-medium ml-10">{{ variantData.discounted_price || variantData.selling_price }}</ins>
                    </div>
                  </div>
                </div>
                <div class="addtocart block-btn mt-4 pb-2 border-cool-300 border-dashed border-b">
                  <vs-button color="var(--cart)">افزودن به سبدخرید</vs-button>
                </div>
                <div class="num-pro mt-4">
                  <p class="text-xs text-cool-500">اگر قصد خرید عمده دارید و یا همکار هستید تعداد را وارد کنید.</p>
                  <div class=" text-center m-auto">
                    <vs-input-number class="ltr" color="var(--dd)" icon-pack="fal" icon-dec="fa-minus" icon-inc="fa-plus" v-model="product.type"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import comments  from "~/components/front/comments";

export default {
  name: "slug",
  components: {
    carousel,
    comments,
  },
  async fetch() {
    await this.$store.dispatch('products/getProduct', {
      productId: this.$route.params.slug,
      query: {
        with: ['categories.parentRecursive', 'categories', 'brand', 'files', 'comments','comments.user', 'variants', 'variants.files', 'variants.attribute', 'attributes']
      }
    })
    let product = this.$cloneObject(this.$store.getters['products/getProduct'])
    product.attributes = [];
    this.$store.getters['products/getProduct'].attributes.forEach(attribute => {
      let attGroup = product.attributes.find(att => att.name === attribute.name);
      if (!attGroup) {
        attGroup = {name: attribute.name, attributes: []}
        product.attributes.push(attGroup)
      }
      attGroup.attributes.push(attribute)
    })
    this.comment.product_id = product.id
    this.product = product
  },
  data() {
    return {
      product: {},
      popupActive: false,
      activeVariant: 0,
      colorx : '#EF4444',
      comment:{
        name:'',
        email:'',
        body:'',
      },
    }
  },
  computed: {
    breadcrumbItems() {
      let breadcrumb = [
        {title: 'صفحه اصلی', url: '/'},
      ]
      let category = this.product.categories ? this.product.categories[0] : null
      while (category) {
        breadcrumb.push({
          title: category.name,
          url: '/',
        })
        category = category.parentRecursive
      }

      breadcrumb.push(
        {
          title: this.product.name || null,
          url: '',
          active: true,
          disabled: true,
        }
      )
      return breadcrumb
    },
    images() {
      let images = []
      if (this.product.files && this.product.variants) {
        this.product.files.forEach(file => {
          images.push({src: file.link, alt: this.product.name})
        })
        this.product.variants.forEach(variant => {
          variant.files.forEach(file => {
            images.push({src: file.link, alt: this.product.name})
          })
        })
      }
      return images
    },
    variantData() {
      return this.product.variants[this.activeVariant]
    }
  },
  methods: {
    saveComment(){
      this.$validator.validateAll('comment').then(res => {
        if (!res) return 0;
        this.$store.dispatch('productComment/storeComment' , this.comment).then(res => {
          if (res.status === 200){
            this.$vs.notify({
              title:'نظر شما با موفقیت ثبت گردید',
              time: 2000,
              color: "success",
              position: "bottom-center",
              icon: 'check_box',
            })
          }
        }).catch(error => {

          if (error.response.status === 422){
            this.$vs.notify({
              title:'نظر شما با خطا گردید',
              text: 'خطا های زیر را رفع کنید.',
              time: 3000,
              color: "danger",
              position: "bottom-center",
              icon: 'check_box',
            })

            Object.entries(error.response.data.errors).forEach((error , i)=>{
              setTimeout(() => {this.$vs.notify({
                title:'خطا!!!',
                text: error[1][0],
                time: 3500,
                color: "danger",
                position: "bottom-center",
                icon: 'check_box',
              }) }, 500 * (i+1))
            })
          }
        })
      })
    },
  }
}
</script>

<style scoped>

</style>

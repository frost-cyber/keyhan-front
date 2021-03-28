<template>
  <form @submit.prevent="saveArticle">
    <div class="vx-row">
      <div class="vx-col sm:w-1/3">
        <vs-card hover="true">
          <div slot="header">
            <h3> مطلب</h3>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>دسته:</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <v-select :closeOnSelect="true" label="name" v-validate="'required'" name="category" @input="log" v-model="article.categories" :options="categories" data-vv-as="دسته"
                        :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
              <span class="text-danger text-sm" v-show="errors.has('category')">{{ errors.first('category') }}</span>

            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>تگ:</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <v-select v-model="article.tags" name="tag" v-validate="'required'" taggable multiple :options="tags" data-vv-as="تگ"/>
              <span class="text-danger text-sm" v-show="errors.has('tag')">{{ errors.first('tag') }}</span>

            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
              <span>وضعیت:</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <vs-select v-model="article.status" class="w-full select-large"  v-validate="'required'" name="status" data-vv-as="وضعیت">
                <vs-select-item :key="index" :value="item.code" :text="item.label" v-for="(item,index) in status" class="w-full"/>
              </vs-select>
              <span class="text-danger text-sm" v-show="errors.has('status')">{{ errors.first('status') }}</span>

            </div>
<!--            <vs-upload action="http://keyhan/api/upload/img" @on-success="successUpload" :data="{type:'featherImage'}"-->
<!--                       fileName="file" :single-upload="true" limit="1" accept="image/jpeg,image/png,image/jpg"/>-->
          </div>

        </vs-card>
      </div>
      <div class="vx-col sm:w-2/3">
        <vs-card hover="true">
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-2/3 w-full">
              <span>عنوان</span>
            </div>
            <div class="vx-col sm:w-3/3 w-full">
              <vs-input class="w-full" v-model="article.title" v-validate="'required'" name="title" data-vv-as="عنوان مطلب"/>
              <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first('title') }}</span>
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-2/3 w-full">
              <span>نشانک:</span>
            </div>
            <div class="vx-col sm:w-3/3 w-full">
              <vs-input class="w-full" v-model="article.slug" v-validate="'required'" name="slug" data-vv-as="نشانک "/>
              <br>
              <span class="text-danger text-sm" v-show="errors.has('slug')">{{ errors.first('slug') }}</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <span>مطلب:</span>
            </div>
            <div class="vx-col sm:w-3/3 w-full">
              <editor v-model="article.body" v-validate="'required'" name="body" data-vv-as="مطلب" rows="5"/>
              <span class="text-danger text-sm" v-show="errors.has('body')">{{ errors.first('body') }}</span>

            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <span>توضیحات</span>
            </div>
            <div class="vx-col sm:w-3/3 w-full">
              <vs-textarea v-model="article.description" v-validate="'required'" name="description" data-vv-as="توضیحات" rows="5"/>
              <span class="text-danger text-sm" v-show="errors.has('description')">{{ errors.first('description') }}</span>

            </div>
            <div slot="footer">
              <vs-button color="success" :disabled="disable" type="filled" @click="saveArticle">ذخیره</vs-button>
            </div>
          </div>
        </vs-card>
      </div>
    </div>
  </form>
</template>

<script>
  import vSelect from 'vue-select'
  import Editor from "~/components/admin/Editor";

  export default {
    name: "save-article",
    components: {
      Editor,
      'v-select': vSelect
    },
    props: {
      article: {
        required: true,
      },
      disable: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tags: [],
        categories: [],
        status: [
          { code: 'active',label: 'فعال'},
          { code: 'deactive',label: 'غیرفعال'}
        ]
      }
    },
    watch: {
      '$store.state.article.errors': {
        deep: false,
        handler(errors) {
          Object.entries(errors).forEach(error => {
            let name = error[0].split('.')
            if (name.length === 1) {
              name = name[0]
            } else {
              name = `${name[2]}[${name[1]}]`
            }
            this.errors.add({
              field: name,
              msg: error[1][0]
            })
          })
        }
      }
    },
    computed: {
      category: {
        get() {
          let index = this.categories.length
          let category = []
          for (let i = 0; i < index; i++) {
            category.push(this.categories[i].name)
          }
          return category
        }
      },
    },
    methods: {
      log(){
        console.log(this.article.category)
      },
      successUpload(event) {
        let response = (JSON.parse(event.currentTarget.response))
        this.article.image_id = response.uploaded.id
        this.$vs.notify({color: 'success', title: 'با موفقیت آپلود شد'})
      },
      saveArticle() {
        if (this.disable) {
          return
        }
        this.$validator.validateAll().then(validated => {
          if (validated) {
            this.$store.commit('article/SET_ARTICLE', this.article)
            this.$emit('save-article')
          }
        })
      },
    },
    async created() {
      await this.$store.dispatch('articleCategory/getCategories')
      this.categories = this.$store.getters['articleCategory/getCategories']
      // let index = categories.length
      // this.categories = []
      // for (let i = 0; i < index; i++) {
      //   this.categories.push({code:categories[i].id , label: categories[i].name})
      // }
    },
    mounted() {
      this.tags = this.$store.getters['article/getTags']
    }
  }
</script>

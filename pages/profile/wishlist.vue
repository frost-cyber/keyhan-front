<template>

  <div class="wishlist-profile">
    <div class="title-section mb-6 relative">
      <h3 class="title-border relative text-base font-black text-cool-800 inline-block border-b-2 border-cool-800 pb-2 pl-10">
        لیست علاقه مندی های من
      </h3>
    </div>
    <div class="tab-wishlist">
      <vs-tabs :color="colorx" position="top">
        <vs-tab @click="colorx = '#EF4444'" label="محصولات">
          <productwishlist/>
        </vs-tab>

        <vs-tab label="دوره ها">
          <coursewishlist/>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>


</template>
<script>
import Productwishlist from "~/components/front/profile/productwishlist";
import Coursewishlist from "~/components/front/profile/coursewishlist";

export default {

  components: {
    Productwishlist,
    Coursewishlist
  },

}
</script>

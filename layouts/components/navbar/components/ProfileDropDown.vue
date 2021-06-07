<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.name">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ activeUserInfo.name + ' ' + (activeUserInfo.last_name||'')}}</p>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img" :class="{'ml-3' : !this.$vs.rtl ,'mr-3' : this.$vs.rtl}">
        <img key="onlineImg" :src="((activeUserInfo.files || [])[0] || {}).link || require('@/assets/images/portrait/small/avatar-s-11.jpg')" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <nuxt-link :to="{name:'admin-profile'}">
              <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
              <span class="ml-2">Profile</span>
            </nuxt-link>
          </li>

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">خروج</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  computed: {
    activeUserInfo () {
      return this.$auth.user||{}
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>

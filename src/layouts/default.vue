<template>
  <v-app>
  <AppHeader />
  <v-content>
    <nuxt class="nuxt-content"/>
  </v-content>
  <AppFooter/>
  </v-app>
</template>
<script>
  import AppFooter from '~/components/Sections/AppFooter'
  import AppHeader from '~/components/Sections/AppHeader'

  export default {
    components: {
      AppFooter , AppHeader
    }
  }
</script>
<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nuxt-content {
  flex-grow: 1;
}
</style>

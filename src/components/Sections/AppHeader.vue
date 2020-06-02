<template>
<div :class="{head: isIndex}">
  <nav>
        <nuxt-link :to="{name: 'index'}"><img src="../../assets/images/logo.png" class="logoImage"> <span class="logoText"> Eigenspace</span></nuxt-link>
        <ul class="nav">
          <li class="navitem" ><nuxt-link :class="{active : this.$route.name===`index`}" :to="{name: 'index'}">Home</nuxt-link></li>
          <li class="navitem" ><nuxt-link :class="{active : this.$route.name===`about`}" :to="{name: 'about'}">About</nuxt-link></li>
          <li class="navitem" ><nuxt-link :class="{active : this.$route.name===`contact`}" :to="{name: 'contact'}">Contact</nuxt-link></li>
          <v-auth></v-auth>
        </ul>
  </nav>
</div>
</template>

<script>
import vAuth from '~/components/auth.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    vAuth,
  },

  computed: {
    ...mapState({
      authUser: 'authUser'
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    }),
    isIndex () {
        return this.$route.path.split('/')[1]==='blog' ? false : true
    }
  }

}
</script>

<style lang="scss">
.head {
    background-image: url(../../static/images/index.jpg);
    background-size: contain;
    background-position-y: 0;
    background-repeat-x:repeat;
}

nav {
    display: flex;
    height: inherit;
    margin-left: 5%;
    margin-right: 5%;
    padding-left:  $gutter;
    padding-right: $gutter;
    padding-top: 1rem;

    .active {
    border-bottom: 3px solid #000000;
    /* border-top: 3px solid #080808; */
    background: #fafafac4;
    border-radius: 15px 15px 18px 18px;
    }

    ul {
        display: flex;
        margin-left:auto;
    }

    .navitem a {
        color: black;
        font-weight: bolder;
        margin: 0;
        padding: 0.75rem 1rem;
    }

    .logoImage {
        width: auto;
        vertical-align: bottom;
    }

    .logoText {
        height:100%;
        margin-left: 5px;
        font-weight: bold;
        color:black;
        font-size: 1.5rem;
    }
}

@media (max-width: $screen-md) {
    .head   {   height: 20rem;  }
    nav     {   
                width: 100%;
                margin: 1rem;  

                .navitem {
                    margin: 0px 2px 0px 0px;
                    padding: 0;
                    margin-left: 5px;

                    a { line-height: 2.8; }
                }
                // li:not(:last-child)::after{
                //     content: '\02002 \00B7';
                // }
            }
}

@media (min-width: $screen-md){
    .head   {   height: 40rem;  }
    
    .navitem {
        display:block;
        padding: 0.25rem 1rem;
        margin-left: 1px 
    }
}

</style>
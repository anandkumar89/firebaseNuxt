<template>
  <v-footer>
    <v-row>
      <span>© {{ year }} — Eigenspace.ml</span>
      <v-spacer></v-spacer>
      <span>{{this.footerCredits}}</span>
      <a href="#top" class="footer__top-page">^</a>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      footerCredits: "made using Nuxt, Firebase"
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
.footer {
	&__info {
		background-color: $background-secondary;
		padding: 1.5em 0;
  }
  
  &__info-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-direction: column;

    @media (min-width: $screen-sm){
      flex-direction: row;
    }
  }

	&__copyright {
		text-align: center;
		@media (min-width: $screen-sm) {
			text-align: inherit;
		}
	}

	&__top-page {
		color: $text-negative;
		display: block;
		text-align: center;
		line-height: 1;
		-webkit-transition: 1s;
		-moz-transition: 1s;
    transition: 1s;
    
		@media (min-width: $screen-sm){
			text-align: right;
		}
	}
}
</style>


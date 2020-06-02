<template>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
            <template  v-slot:activator="{ on }">
                <li class="navitem" v-on="on">
                    <span v-if="!isLoggedIn">Login</span>
                    <v-avatar v-else><img class="avatarImage" src="" :alt="authUser.displayName"></v-avatar>
                </li>
            </template>
    
            <v-card>
            <v-list v-if="isLoggedIn">
                <v-list-item>
                <v-list-item-avatar>
                    <img class="avatarImage" src="" :alt="authUser.displayName">
                </v-list-item-avatar>
    
                <v-list-item-content>
                    <v-list-item-title>{{authUser.displayName}}</v-list-item-title>
                    <v-list-item-subtitle>{{authUser.email}}</v-list-item-subtitle>
                </v-list-item-content>
    
                <v-list-item-action>
                    <v-btn icon dark @click="logOut"><v-icon>mdi-power</v-icon></v-btn>
                </v-list-item-action>
                </v-list-item>
            </v-list>
            <v-container v-else> 
            <v-divider></v-divider>
                <v-text-field v-model="formData.email"  color="primary"  outlined  placeholder="Email" type="email"  autocomplete="username"></v-text-field>
                <v-text-field v-model="formData.password" color="primary" outlined placeholder="Password" type="password" autocomplete="current-password"></v-text-field>        
                    
                <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="createUser">register</v-btn>
                        <v-btn text @click="signInUser" color="primary">signIn</v-btn>
                        <v-btn text @click="googleSignIn">SignIn Using Google</v-btn>
                </v-card-actions>
            </v-container>
            </v-card>
        </v-menu>  
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {

  data: () => ({
    menu: false,    
    formData: {
      email: '',
      password: ''
    },
    photoURL:''
  }),

  computed: {
    ...mapState({
      authUser: 'authUser'
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    })
  },
//     formValid: false,
//     formRules: {
//       email: [
//         (v: string) => !!v || 'E-mail is required',
//         (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
//       ],
//       names: [
//         (v: string) => !!v || 'Name is required',
//         (v: string) =>
//           (v && v.length <= 10) || 'Name must be less than 10 characters'
//       ],
//       membershipUntil: [(v: string) => !!v || 'Required']
//     }
//   }),
methods: {
    async createUser() {
      try {
        await this.$store.dispatch('createUser', this.formData)
      } catch (e) {
        alert(e)
      }
    },
    async googleSignIn() {
      try {
        await this.$store.dispatch('googleSignIn')
      } catch (e) {
        alert(e)
      }
    },
    async signInUser() {
      try {
        await this.$store.dispatch('signInUser', this.formData)
      } catch (e) {
        alert(e)
      }
    },
    async logOut() {
      try {
        await this.$store.dispatch('logOut')
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>

export const state = () => ({
    authUser: null
})
  
export const mutations = {

    RESET_STORE: (state) => {
        Object.assign(state, initialState())
    },
    LOGOUT: (state) => {
      state.authUser= null
    },
    SET_AUTH_USER: (state, {authUser}) => {
        console.log('COMMIT: SET_AUTH_USER: ' + authUser)
        // console.log(authUser)
        state.authUser = {
          uid: authUser.uid,
          email: authUser.email,
          photoUrl: authUser.photoURL || null,
          displayName: authUser.displayName
        }
        // console.log('SET_AUTH_USER: COMMITTED authUser to Store')
    }
}

export const actions = {

    async nuxtServerInit({ dispatch, commit}, ctx) {
      console.log('ACTIONS: NUXT_SERVER_INIT')
      // console.log(ctx.req.headers.authorization)
      // if (!ctx.req.headers){
      //       // console.log(admin.apps.length)
      //       // Parse the injected ID token from the request header.
      //       const authorizationHeader = ctx.req.headers.authorization || '';
      //       const components = authorizationHeader.split(' ');
      //       const idToken = components.length > 1 ? components[1] : '';

      //           // Verify the ID token using the Firebase Admin SDK.
      //           // User already logged in. Redirect to profile page.
      //       admin.auth().verifyIdToken(idToken)
      //           .then((decodedClaims) => {
      //                 // User is authenticated, user claims can be retrieved from
      //                 // decodedClaims.
      //                 // In this sample code, authenticated users are always redirected to
      //                 // the profile page.
      //                 uid = decodedClaims.uid
      //                 admin.auth().getUser(uid)
      //                 .then(function(userRecord) {
      //                   // See the UserRecord reference doc for the contents of userRecord.
      //                   console.log('Successfully fetched user data:', userRecord.toJSON());
      //                 })
      //                 .catch(function(error) {
      //                   console.log('Error fetching user data:', error);
      //                 });
      //                 // res.redirect('/profile');
      //           }).catch((error) => {
      //             console.log("store/index.js: can't verify id-tokens")
      //           });
      //   }

        if (this.$fireAuth === null) {
          throw('nuxtServerInit Example not working - this.$fireAuth cannot be accessed.')
        }
    
        if (ctx.$fireAuth === null) {
          throw('nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.')
        }
    
        if (ctx.app.$fireAuth === null) {
          throw('nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.')
        }
    
        // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'
        // var user = this.$fireAuth.currentUser
        // if (user) {
        //   var userData = {
        //     'uid'           :user.uid || null,
        //     'displayName'   :user.displayName,
        //     'email'         :user.email,
        //     'emailVerified' :user.emailVerified,
        //     'lastSignTime'  :user.metadata.lastSignInTIme,
        //     'photoURL'      :user.photoURL || null
        //   }
        //   commit('SET_USER_DATA', userData)
        // }

          /** Get the VERIFIED authUser from the server */
          if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
            const { allClaims: claims, ...authUser } = ctx.res.locals.user
            
            // console.log('NuxtServerInit Was called')
            // console.log(authUser)
            // console.info(
            //   'Auth User verified on server-side. User: ',
            //   authUser,
            //   'Claims:',
            //   claims
            // )
            console.log({
              authUser,
              claims
            })
            await dispatch('onAuthStateChanged', {
              authUser,
              claims
            })
          }    
        
    },
    
    onAuthStateChanged({ commit }, { authUser }) {
      if (!process.client){
        console.log("STATE CHANGE DETECTED: SERVER")
      }
      if(process.client){
        console.log('STATE CHANGE DETECTED: CLIENT')
      }
        // console.log(authUser)
        if (!authUser) {
          commit('LOGOUT')
          console.log('STATE CHANGED: USER LOGGED OUT, AWAIT COMMIT')
          return
        } 
        console.log('STATE CHANGED: USER LOGGED IN, AWAIT COMMIT')
        commit('SET_AUTH_USER', { authUser })
    },

    async createUser(ctx, formData) {
      try {
        await this.$fireAuth.createUserWithEmailAndPassword(
          formData.email,
          formData.password
        )
      } catch (e) {
        alert(e)
      }
    },
    async signInUser(ctx, formData) {
      try {
        await this.$fireAuth.signInWithEmailAndPassword(
          formData.email,
          formData.password
        )
      } catch (e) {
        alert(e)
      }
    },
    async logOut({commit} ) {
      try {
        await this.$fireAuth.signOut()
        commit('LOGOUT')
      } catch (e) {
        alert(e)
      }
    },

    async registerServiceWorker(){
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('firebase-auth-sw.js', {scope: '/'});
        console.log('ACTION: SERVICE WORKER REGISTERED')
      }
    },

    async googleSignIn({commit, dispatch}) {
        this.$fireAuth.signInWithPopup(new this.$fireAuthObj.GoogleAuthProvider()).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken;
            console.log('SIGNIN: GOOGLE : SUCCESSFULL, AWAIT COMMIT')
            // console.log(result.user)
            // The signed-in user info.
            var userData = {
                'uid'           :result.user.uid || null,
                'displayName'   :result.user.displayName,
                'email'         :result.user.email,
                'emailVerified' :result.user.emailVerified,
                'lastSignTime'  :result.user.metadata.lastSignInTIme,
                'photoURL'      :result.user.photoURL || null
            }

            // console.log(userData)
            dispatch('registerServiceWorker')
            commit('SET_AUTH_USER', {'authUser': userData})

            }).catch(function(error) {
            // An error happened.
            console.log('ERROR/STORE/ACTIONS/GoogleSignIn : Failed to signInWithPopup. More details below')
            console.log(error)
            if (error.code === 'auth/account-exists-with-different-credential') {
                // Step 2.
                // User's email already exists.
                // The pending Google credential.
                var pendingCred = error.credential;
                // The provider account's email address.
                var email = error.email;
                // Get sign-in methods for this email.
                this.$fireAuth.fetchSignInMethodsForEmail(email).then(function(methods) {
                    // Step 3.
                    // If the user has several sign-in methods,
                    // the first method in the list will be the "recommended" method to use.
                    if (methods[0] === 'password') {
                        // Asks the user their password.
                        // In real scenario, you should handle this asynchronously.
                        var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
                        this.$fireAuth.signInWithEmailAndPassword(email, password).then(function(user) {
                            // Step 4a.
                            return user.linkWithCredential(pendingCred);
                        }).then(function() {
                            // Google account successfully linked to the existing Firebase user.
                            console.log("Google ACCOUNT SUCCESSFULLY LINKED TO EXISTING LOGIN METHOD")
                        });

                        return;
                    }
                    // All the other cases are external providers.
                    // Construct provider object for that provider.
                    // TODO: implement getProviderForProviderId.
                    var provider = getProviderForProviderId(methods[0]);
                    // At this point, you should let the user know that they already has an account
                    // but with a different provider, and let them validate the fact they want to
                    // sign in with this provider.
                    // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
                    // so in real scenario you should ask the user to click on a "continue" button
                    // that will trigger the signInWithPopup.
                    this.$fireAuth.signInWithPopup(provider).then(function(result) {
                    // Remember that the user may have signed in with an account that has a different email
                    // address than the first one. This can happen as Firebase doesn't control the provider's
                    // sign in flow and the user is free to login using whichever account they own.
                    // Step 4b.
                    // Link to Google credential.
                    // As we have access to the pending credential, we can directly call the link method.
                    console.log('Google Login successful')
                        result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
                            // Google account successfully linked to the existing Firebase user.
                            context.commit('setUserToAnything', usercred)                                
                        });
                    });
                });
            }
        });
    }

}
export const getters= {
    isLoggedIn: (state) => {
        try {
          return state.authUser.id !== null
        } catch {
          return false
        }
      }
}

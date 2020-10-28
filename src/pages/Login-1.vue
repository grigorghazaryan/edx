<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../statics/profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
              @submit="login"
            >
              <q-input
                filled
                v-model="username"
                label="Username"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please fill this field.']"
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules
                :rules="[ val => val && val.length > 6 || 'Please fill this field.']"
              />

              <div>
                <q-btn :loading="loading" label="Login" type="submit" color="primary" />
              </div>

            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
    import config from '../../config';
    import axios from 'axios';

    export default {
        data() {
            return {
                username: 'admin@admin.com',
                password: '!admin@2020',
                loading: false
            }
        },
        methods: {
          login() {
            this.loading = true
            let body = {
              email:    this.username,
              password: this.password
            }
            axios.post(config.login, body)
              .then(res => {
                console.log('LOGIN RESPONSE : ', res.data.data)

                let data = res.data.data
                localStorage.setItem('user-info', JSON.stringify(data.user))
                localStorage.setItem('access-token', data.tokens.access_token)

                this.$router.push('/')
              })
              .catch(e => {
                console.log('ERROR : ------- ', e)
                this.loading = false
              })
            }
        }
    }
</script>

<style>
  .bg-image {
   background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
  }
</style>

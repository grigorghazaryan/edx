<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex edx-bg-blue bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section class="text-center">
            <!-- <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../statics/profile.svg">
            </q-avatar> -->
            <img class="w-50" src="https://upload.wikimedia.org/wikipedia/commons/8/8f/EdX.svg" alt="">
          </q-card-section>
          <q-card-section>
            <div class="text-center">
              <div class="col text-h6 ellipsis">
                Please Login!
              </div>
            </div>
          </q-card-section>
          <q-card-section>

            <q-form
              class="q-gutter-md"
              @submit="login"
            >
              <q-input
                outlined
                dense
                v-model="username"
                label="Username"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please fill this field.']"
              />

              <q-input
                type="password"
                outlined
                dense
                v-model="password"
                label="Password"
                lazy-rules
                :rules="[ val => val && val.length > 6 || 'Please fill this field.']"
              />

              <div>
                <q-btn size="md" :loading="loading" label="Login" type="submit" class="edx-add-btn w-100" />
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

            // localStorage.setItem('role', 'super_admin')
            // admin
            // user

            ////////////////////
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
                localStorage.setItem('role', data.user.admin_role)

                console.log('DATA', data)

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
</style>

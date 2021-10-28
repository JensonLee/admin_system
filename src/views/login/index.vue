<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button">
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "login",
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    ...mapActions(['login']),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.login(values).then(res=>{
            if(res.code ==='10000'){
              if(this.$route.query.redirect){
                this.$router.push({path:this.$route.query.redirect})
              }else {
                this.$router.push({path:"/"})
              }
            }else {
              this.$message.error(`${res.msg}`)
            }
          })
        }
      });
    },
  },
  created() {
    console.log(this.$route.query);
  }
}
</script>

<style scoped>
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
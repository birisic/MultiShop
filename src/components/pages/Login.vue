<template>
    <section class="mb-login">
        <form>
        <div class="container">
            <div class="row justify-content-center">
                        <div class="col-md-8 col-12 mb-3">
                            <Textfield :error="errors.email" v-model="credentials.email" :type="'email'" :label="'Email'" :placeholder="'example@gmail.com...'" :id="'email'" :name="'email'"/>
                        </div>
                        <div class="col-md-8 col-12 mb-3">
                            <Textfield :error="errors.pass" v-model="credentials.pass" :type="'password'" :label="'Password'" :placeholder="''" :id="'pass'" :name="'pass'"/>
                        </div>
                        <div class="col-md-8 col-12">
                            <input @click="performLogin" type="button" class="btn btn-primary mb-2" name="mb-login-submit" id="mb-login-submit" value="Send Credentials"/>
                            <p v-if="messageBox" id="message-box" class="alert alert-warning fs-4">{{messageBox}}</p>
                            <p>Don't have an account? <span class="text-primary mb-span-link" @click="$router.push('/register')">Register</span></p>
                        </div>
            </div>  
        </div>
    </form>      
    </section>
    
  </template>
  
  <script>
  import Textfield from '../forms/Textfield.vue';
  import { mapGetters } from "vuex";
  
  export default {
      name: "LoginComponent",
      components: {
        Textfield
      },
      data() {
              return {
                credentials: {
                    email: "",
                    pass: ""
                },
                regexes: {
                    emailRegex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    passwordRegex: /^[a-zA-Z\d]{8,20}$/
                },
                errors: {
                    email: "",
                    pass: "",
                },
                messageBox: ""
              }
          },
      mounted() {
        let user = JSON.parse(localStorage.getItem("user"));
        if(user && user.role != 'unauthorized') {
            this.$router.push("/shop")
        }
      },
      computed : {
           ...mapGetters(['getUsers', 'role'])
      },
      
      methods: {
        performLogin() {
                    this.errors = {}
  
                    // Validate email
                    if (!this.regexes.emailRegex.test(this.credentials.email)) {
                        this.errors.email = "Invalid email format.";
                    }

                    // Validate password
                    if (!this.regexes.passwordRegex.test(this.credentials.pass)) {
                        this.errors.pass = "Password must only include letters, numbers and be between 8 and 20 characters long.";
                    }

                    if (Object.keys(this.errors).length === 0) {
                        let user = this.getUsers.find(x => x.email == this.credentials.email && x.pass == this.credentials.pass);
                        
                        if(!user) {
                            this.messageBox = "Pogresni kredencijali."
                            return ;
                        }
                        
                        this.messageBox = ""

                        let localStorageItem = {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                pass: user.pass,
                                role : user.role
                            }

                        localStorage.setItem("user", JSON.stringify(localStorageItem));
                        this.$store.commit("changeUser", localStorageItem);
                        this.$router.push("/shop");
                        location.reload();
                    }
            }
      }
  }   
  </script>
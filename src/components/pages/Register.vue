<template>
    <section id="mb-register">
        <form>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-4 col-12 mb-3">
                        <Textfield :error="errors.firstName" v-model="credentials.firstName" :label="'First name'" :placeholder="'Pera...'" :id="'first-name'" :name="'first-name'"/>
                    </div>
                    <div class="col-md-4 col-12 mb-3">
                        <Textfield :error="errors.lastName" v-model="credentials.lastName" :label="'Last name'" :placeholder="'Peric...'" :id="'last-name'" :name="'last-name'"/>
                    </div>
                    <div class="col-md-8 col-12 mb-3">
                        <Textfield :error="errors.email" v-model="credentials.email" :type="'email'" :label="'Email'" :placeholder="'example@gmail.com...'" :id="'email'" :name="'email'"/>
                        <Textfield :error="errors.pass" v-model="credentials.pass" :type="'password'" :label="'Password'" :placeholder="''" :id="'pass'" :name="'pass'"/>
                        <Textfield :error="errors.confirmPass" v-model="credentials.confirmPass" :type="'password'" :label="'Confirm password'" :placeholder="''" :id="'confirm-pass'" :name="'confirm-pass'"/>
                    </div>
                    <div class="col-md-8 col-12">
                        <input @click="register" type="button" class="btn btn-primary mb-2" name="mb-register-submit" id="mb-register-submit" value="Send Credentials"/>
                        <p v-if="messageBox" id="message-box" class="alert alert-danger fs-4">{{messageBox}}</p>
                        <p>Already have an account? <span class="text-primary mb-span-link" @click="$router.push('/login')">Log in</span></p>
                    </div>
                </div>
                </div>
        </form>
    </section>
</template>

<script>
    import Textfield from '../forms/Textfield.vue';
    import { mapGetters } from "vuex"

    export default {
        name: "RegisterComponent",
        components: {
            Textfield
        },
        data(){
            return {
                credentials: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    pass: "",
                    confirmPass: ""
                },
                regexes: {
                    nameRegex: /^[A-ZŠĆĐČŽ][a-zšćđčž]{2,19}$/,
                    emailRegex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    passwordRegex: /^[a-zA-Z\d]{8,20}$/
                },
                errors: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    pass: "",
                    confirmPass: ""
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
            ...mapGetters(['getUsers'])
        },

        methods: {
            validateInputs(){
                this.errors = {};

                if (!this.regexes.nameRegex.test(this.credentials.firstName)) {
                    this.errors.firstName = "First name must start with an uppercase letter and have at least 2 lowercase letters.";
                }

                // Validate last name
                if (!this.regexes.nameRegex.test(this.credentials.lastName)) {
                    this.errors.lastName = "Last name must start with an uppercase letter and have at least 2 lowercase letters.";
                }

                // Validate email
                if (!this.regexes.emailRegex.test(this.credentials.email)) {
                    this.errors.email = "Invalid email format.";
                }

                // Validate password
                if (!this.regexes.passwordRegex.test(this.credentials.pass)) {
                    this.errors.pass = "Password must only include letters, numbers and be between 8 and 20 characters long.";
                }

                // Validate confirm password
                if (this.credentials.confirmPass != this.credentials.pass) {
                    this.errors.confirmPass = "Passwords do not match.";
                }

                return Object.keys(this.errors).length === 0; // Return true if no errors
            },
            register() {
                if (this.validateInputs()) {
                    let user = {
                        firstName: this.credentials.firstName,
                        lastName: this.credentials.lastName,
                        email: this.credentials.email,
                        pass: this.credentials.pass,
                        passConfirm: this.credentials.confirmPass,
                        role: "user"
                    }
                    let users = this.getUsers;

                    let exists = users.some(u => u.email == user.email);

                    if (exists) {
                        this.messageBox = "Email je vec u upotrebi."
                        return ;
                    }

                    this.messageBox = ""

                    users.push(user);
                    localStorage.setItem("users", JSON.stringify(users));
                    this.$store.commit("registerUser", user);
                    this.$router.push("/shop");

                    //login
                    let localStorageItem = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            pass: user.pass,
                            role : user.role
                        }
                    
                    

                    localStorage.setItem("user", JSON.stringify(localStorageItem));
                    this.$store.commit("changeUser", localStorageItem);
                    location.reload();
                }
            }
        }
    }
</script>
<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12"><h1 class="h3">Add a new user:</h1></div>
        <div class="col-lg-2 col-12">
          <Textfield v-model="newUser.firstName" :name="'insert-first-name'" :id="'insert-first-name'" :label="'First Name'" :placeholder="'Pera...'"/>
        </div>
        <div class="col-lg-2 col-12">
          <Textfield v-model="newUser.lastName" :name="'insert-last-name'" :id="'insert-last-name'" :label="'Last Name'" :placeholder="'Peric...'"/>
        </div>
        <div class="col-lg-2 col-12">
          <Textfield v-model="newUser.email" :name="'insert-email'" :id="'insert-email'" :label="'Email'" :placeholder="'peraperic@gmail.com...'" :type="'email'"/>
        </div>
        <div class="col-lg-2 col-12">
          <Textfield v-model="newUser.pass" :name="'insert-password'" :id="'insert-password'" :label="'Password'" :placeholder="''" :type="'password'" />
        </div>
        <div class="col-lg-2 col-12">
          <Dropdown v-model="newUser.role" :options="roles" :firstElement="'Choose role:'" :name="'insert-role'" :id="'insert-role'" :label="'Role'" textProperty="name" valueProperty="name" />
        </div>
      </div>
      <div class="col-6 mx-auto mt-3">
        <p v-if="messageBox" id="message-box" class="alert alert-warning fs-4">{{messageBox}}</p>
      </div>
      <button @click="addUser" class="btn btn-primary my-2" type="button" name="btn-insert-user" id="btn-insert-user">Add User</button>
    </div>
  </template>
  
  <script>
  import Textfield from '../forms/Textfield.vue';
  import Dropdown from '../forms/Dropdown.vue';
  import { mapGetters } from 'vuex';
  
  export default {
    components: {
      Textfield,
      Dropdown
    },
    data() {
      return {
        newUser: {
          firstName: '',
          lastName: '',
          email: '',
          pass: '',
          role: ''
        },
        messageBox: "",
        roles: [{name:"user"},{name:"admin"}]
      };
    },
    computed: {
      ...mapGetters(['getUsers'])
    },
    methods: {
      addUser() {
        if (this.newUser.firstName == '' ||
            this.newUser.lastName == '' ||
            this.newUser.email == '' ||
            this.newUser.pass == '' || 
            this.newUser.role == '') {
              this.messageBox = 'Please fill in all fields';
              return;
        }

        if (this.newUser.role == '0') this.newUser.role = 'user';


        let exists = this.getUsers.some(u => u.email == this.newUser.email);
  
        if (exists) {
          this.messageBox = "Email already exists";
          return ;
        }

        this.messageBox = ""

        let users = this.getUsers;
        users.push(this.newUser);
        localStorage.setItem("users", JSON.stringify(users));
        this.$store.commit("setUsers", users);

        // clear form
        this.newUser = {
          firstName: '',
          lastName: '',
          email: '',
          pass: '',
          role: ''
        };

        this.$emit('update-table');
      }
    }
  };
  </script>
  
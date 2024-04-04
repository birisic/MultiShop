<template>
    <div class="container" v-if="user && editingUser">
      <div class="row justify-content-center">
        <div class="col-12"><h1 class="h3">Edit an existing user:</h1></div>
        <div class="col-lg-2 col-12">
            <Textfield v-model="editingUser.firstName" :name="'edit-first-name'" :id="'edit-first-name'" :label="'First Name'"/>
        </div>
        <div class="col-lg-2 col-12">
            <Textfield v-model="editingUser.lastName" :name="'edit-last-name'" :id="'edit-last-name'" :label="'Last Name'"/>
        </div>
        <div class="col-lg-2 col-12">
            <Textfield v-model="editingUser.email" :name="'edit-email'" :id="'edit-email'" :label="'Email'" :type="'email'"/>
        </div>
        <div class="col-lg-2 col-12">
            <Textfield v-model="editingUser.pass" :name="'edit-password'" :id="'edit-password'" :label="'Password'" :type="'password'" />
        </div>
        <div class="col-lg-2 col-12">
            <Dropdown v-model="editingUser.role" :options="roles" :firstElement="'Choose role:'" :name="'edit-role'" :id="'edit-role'" :label="'Role'" textProperty="name" valueProperty="name" />
        </div>
      </div>
      <div class="col-6 mx-auto mt-3">
        <p v-if="messageBox" id="message-box" class="alert alert-warning fs-4">{{messageBox}}</p>
      </div>
      <button @click="editUser" class="btn btn-primary my-2" type="button" name="btn-edit-user" id="btn-edit-user">Edit User</button>
      <button @click="$emit('cancel-edit')" class="btn btn-secondary my-2" name="btn-cancel" id="btn-cancel" type="button">Cancel</button>
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
        editingUser: null,
        messageBox: "",
        roles: [{name:"user"},{name:"admin"}]
      };
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.editingUser = this.user;
    },
    computed: {
      ...mapGetters(['getUsers'])
    },
    methods: {
      editUser() {
        if (this.editingUser.firstName == '' ||
            this.editingUser.lastName == '' ||
            this.editingUser.email == '' ||
            this.editingUser.pass == '' ||
            this.editingUser.role == '') {
              this.messageBox = 'Please fill in all fields';
              return;
        }
        if (this.editingUser.role == '0') this.editingUser.role = 'user';

        let emailExists = this.getUsers.some((u) => u.email == this.editingUser.email && u !== this.user);

        if (emailExists) {
            this.messageBox = 'Email je vec u upotrebi.';
            return;
        }
        let updatedUser = this.editingUser;

        this.$store.commit('updateUser', updatedUser);
        let users = this.getUsers;
        localStorage.setItem("users", JSON.stringify(users));



        this.editingUser = null;
        this.$emit('update-table');
      }
    }
  };
  </script>
  
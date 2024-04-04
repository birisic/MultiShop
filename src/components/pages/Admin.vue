<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <InsertUser v-if="!editingUser" @update-table="populateTable"/>
                <EditUser v-else :user="editingUser" @cancel-edit="cancelEdit" @update-table="populateTable"/>
            </div>
            <div class="col-12 table-responsive">
                <p v-if="messageBox" id="message-box" class="alert alert-danger fs-4">{{messageBox}}</p>
                <table v-if="users" class="table table-bordered table-hover" id="table-users">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(user, index) in users" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ user.firstName }}</td>
                        <td>{{ user.lastName }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.pass }}</td>
                        <td>{{ user.role }}</td>
                        <td>
                          <button class="btn btn-warning rounded" :data-id="index" @click="editUser(user)">Edit</button>
                        </td>
                        <td>
                          <button class="btn btn-danger rounded" :data-id="index" @click="deleteUser(index)">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
            </div>
        </div>
    </div>
  </template>

<script>
    import { mapGetters } from "vuex";
    import InsertUser from '../users/InsertUser.vue';
    import EditUser from '../users/EditUser.vue';

    export default {
        name: "AdminComponent",
        components: {
            InsertUser,
            EditUser
        },
        data() {
            return {
                users: [],
                messageBox: "",
                editingUser: null
            };
        },
        computed : {
           ...mapGetters(['getUsers'])
        },
        mounted() {
            let user = JSON.parse(localStorage.getItem("user"));
            if(!user || user.role != 'admin') {
                this.$router.push("/shop");
                return;
            }
            this.populateTable();
        },
        methods: {
            populateTable(){
                this.editingUser = null;

                let users = this.getUsers;
                let table = document.getElementById("table-users");

                if (users.length > 1 && users[0].role == "admin") {
                    this.messageBox = "";
                    table.classList.remove("d-none");

                    this.users = users.slice(1);
                    return;
                }
                
                this.messageBox = "Trenutno nema registrovanih korisnika.";
                table.classList.add("d-none");
            },
            editUser(user) {
                this.editingUser = user;
            },
            cancelEdit() {
                this.populateTable();
                location.reload();
            },
            deleteUser(id) {
                let confirmed = confirm("UPOZORENJE! Ova akcija trajno brise korisnika, nastavite samo ako to sigurno zelite.");

                if (confirmed) {
                    this.users.splice(id,1);

                    let admin = {
                        firstName: "admin",
                        lastName: "admin",
                        email: "admin@gmail.com",
                        pass: "adminadmin",
                        role: "admin" 
                    }

                    this.users.unshift(admin)
                    localStorage.setItem("users", JSON.stringify(this.users));
                    this.$store.commit("setUsers",this.users);
                    this.populateTable();
                }
            }
        }
    }
</script>
// import axios from 'axios'
export default {
    state: {
        user: {
            firstName: "guest",
            lastName: "guest",
            email: "guest@email.com",
            pass: "guest",
            role: "unauthorized" 
        },
        users: []
    },

    mutations: {
        updateUser(state, updatedUser) {
            let index = state.users.findIndex(user => user.email == updatedUser.email);
            if (index !== -1) {
                state.users[index] = updatedUser;
            }
        },
        
        setUsers(state, users) {
            state.users = users;
        },

        registerUser(state, user){
            state.user = user;
            state.users.push(user);
            // state.users = [...state.users, user];
        },

        changeUser(state, newUser) {
            if(!newUser) {
                localStorage.removeItem("user")
                return
            }

            state.user.firstName = newUser.firstName
            state.user.lastName = newUser.lastName
            state.user.email = newUser.email
            state.user.pass = newUser.pass
            state.user.role = newUser.role
        }
    },

    // actions: {
    //     // fetchUsers({ commit }){

    //     //     axios.get('https://eliteshoppy-praktikumphp.000webhostapp.com/EliteShoppy-v2/models/api.php', { params: { table: 'users' } })
    //     //     .then(function(result){
    //     //         commit("setUsers", result.data);
    //     //     }).catch(function(error){
    //     //         console.log(error);
    //     //     });
    //     // },

    //     fetchUserInputs({ state, commit }, user){
    //         let exists = state.users.some(u => u.email == user.email);

    //         if (exists) {
    //             console.log("email already exists");
    //             return false;
    //         }

    //         commit("registerUser", user);
    //         // this.$router.push("/shop");
    //         // axios.post('https://eliteshoppy-praktikumphp.000webhostapp.com/EliteShoppy-v2/models/insert-users.php', user)
    //         // .then(function(result){
    //         //     commit("registerUser", result.data);
    //         // }).catch(function(error){
    //         //     console.log(error);
    //         // });
    //     }
    // },

    getters: {
        role(state) {
            return state.user.role;
        },
        getUsers(state) {
            return state.users;
        }
    }
}
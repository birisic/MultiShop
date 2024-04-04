<template>
    <div class="container-fluid bg-dark mb-30">
        <div class="row px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <div class="row align-items-center py-1 px-xl-5 d-none d-lg-flex">
                    <div class="col-lg-4">
                        <a href="/" class="text-decoration-none">
                            <span class="h1 text-uppercase text-primary bg-dark px-2">Multi</span>
                            <span class="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-lg-9">
                <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                    <a href="" class="text-decoration-none d-block d-lg-none">
                        <span class="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                        <span class="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                    </a>
                    <button type="button" class="navbar-toggler" @click="showDropdown" data-toggle="collapse" data-target="#navbarCollapse" id="hamburger">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav mr-auto py-0">
                            <router-link v-for="l in filteredLinks" :key="l.path" :to="l.path" v-role="l.role" class="nav-item nav-link">{{ l.text }}</router-link> 
                            <button v-if="user" @click="logout" type="button" class="nav-item nav-link btn">Logout</button>
                        </div>
                        <div class="navbar-nav ml-auto py-0 d-none d-lg-block">
                            <a href="" class="btn px-0">
                                <i class="fas fa-heart text-primary"></i>
                                <span class="badge text-secondary border border-secondary rounded-circle" style="padding-bottom: 2px;">0</span>
                            </a>
                            <a href="" class="btn px-0 ml-3">
                                <i class="fas fa-shopping-cart text-primary"></i>
                                <span class="badge text-secondary border border-secondary rounded-circle" style="padding-bottom: 2px;">0</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavComponent",
        data() {
            return {
                links: [
                { path: "/", text: "Home", role: ["unauthorized","user","admin"] },
                { path: "/shop", text: "Shop", role: ["unauthorized","user","admin"]},
                { path: "/contact", text: "Contact", role: ["unauthorized","user","admin"]},
                { path: "/login", text: "Login", role: ["unauthorized"] },
                { path: "/register", text: "Register", role: ["unauthorized"] },
                { path: "/admin", text: "Admin", role: ["admin"] }
                ],
                user: null
            }
        },
        computed: {
            filteredLinks() {
                const isLoggedIn = Boolean(localStorage.getItem("user"));
                if (isLoggedIn) {
                    return this.links.filter((link) => link.path !== "/login" && link.path !== "/register");
                }

                // return this.links;
                else {
                // User is not logged in, return links that should be shown to logged-out users
                    return this.links.filter((link) => link.path !== "/admin");
                }
            }
        },
        mounted() {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                this.user = JSON.parse(storedUser);
            }       
        },
        methods: {
            showDropdown() {
                let hamburger = document.getElementById("hamburger");
                let navbar = document.getElementById("navbarCollapse");

                if (hamburger.classList.contains("collapsed")){
                    hamburger.classList.remove("collapsed");
                    navbar.classList.add("show");
                }
                else {
                    hamburger.classList.add("collapsed");
                    navbar.classList.remove("show");
                }
            },


            logout(){
                this.$store.commit("changeUser", undefined)
                this.$forceUpdate()
                this.$router.push("/login")
                location.reload();
            }
        }
    }
</script>
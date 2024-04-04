<template>
    <section id="mb-shop">
        <!-- Breadcrumb Start -->
    <div class="container-fluid">
        <div class="row px-xl-5">
            <div class="col-12">
                <nav class="breadcrumb bg-light mb-30">
                    <a class="breadcrumb-item text-dark" href="#">Home</a>
                    <a class="breadcrumb-item text-dark" href="#">Shop</a>
                    <span class="breadcrumb-item active">Shop List</span>
                </nav>
            </div>
        </div>
    </div>
    <!-- Breadcrumb End -->


    <!-- Shop Start -->
    <div class="container-fluid">
        <div class="row px-xl-5">
            <!-- Shop Sidebar Start -->
            <div class="col-lg-3 col-md-4">
                <!-- Price Start -->
                <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary px-1">Category</span></h5>
                <div class="bg-light p-4 mb-30">
                    <Dropdown error="Error while retrieving data" v-model="filters.category" :options="categories" textProperty="name" valueProperty="id" name="mb-dropdown" id="mb-dropdown"/>
                </div>
                <!-- Price End -->
                
                <!-- Color Start -->
                <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary px-1">Gender</span></h5>
                <div class="bg-light p-4 mb-30">
                    <RadioGenders v-model="filters.gender" :options="genders" textProperty="name" valueProperty="id" name="genders" id="mb-gender"/>
                </div>
                <!-- Color End -->

                <!-- Size Start -->
                <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary px-1">Price Up To</span></h5>
                <div class="bg-light p-4 mb-30">
                    <RangePrice v-model="filters.price" min="10" max="1000" name="range-price" id="range-price"/>
                </div>
                <!-- Size End -->
            </div>
            <!-- Shop Sidebar End -->

            <!-- Spinner -->
            <div v-if="isLoading" class="col-lg-9 d-flex justify-content-center align-items-center">
                <img src="../../../public/img/spinner.gif" alt="spinner"/>
            </div>

            <!-- Shop Product Start -->
            <div v-else class="col-lg-9 col-md-8">
                <div class="row">
                    <div class="col-12 pb-1">
                        <div class="mb-4">
                            <div class="ml-2 d-flex align-items-center justify-content-between">
                                <div class="btn-group d-flex align-items-center justify-content-between">
                                    <Textfield :type="'search'" v-model="filters.search" :placeholder="'Search articles...'" :id="'input-search'" :name="'input-search'"/>
                                    <div class="col-3">
                                        <input @click="loadArticles" class="btn btn-primary" type="button" value="Search" id="btn-input-search"/>
                                    </div>
                                </div>
                                <div class="btn-group">
                                    <Dropdown v-model="filters.sort" :options="sorts" :firstElement="'Sort by:'" textProperty="name" valueProperty="id" name="mb-sort" id="mb-sort"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <p v-if="messageBox" id="message-box" class="alert alert-warning fs-4">{{messageBox}}</p>
                    </div>
                </div>
                <div class="row pb-3" id="mb-articles-container">
                    <div class="col-lg-3 col-md-6 col-sm-6 pb-1" v-for="a in articles" :key="a.id">
                        <Article :image="'https://eliteshoppy-praktikumphp.000webhostapp.com/EliteShoppy-v2/images/upload/thumbnail/'+a.image"
                                 :article_name="a.article_name"
                                 :active_price="a.active_price"
                                 :old_price="a.old_price"
                                 :tag="a.tag"
                                 :ag_id="parseInt(a.ag_id)" />
                    </div>
                </div>
            </div>
            <!-- Shop Product End -->
        </div>
    </div>
    <!-- Shop End -->
    </section>
</template>

<script>
    import Article from '../articles/Article.vue'; 
    import Dropdown from '../forms/Dropdown.vue';
    import RadioGenders from '../forms/RadioGenders.vue';
    import RangePrice from '../forms/RangePrice.vue';
    import Textfield from '../forms/Textfield.vue';

    export default {
        name: "ShopComponent",
        components: {
            Article,
            Dropdown,
            RadioGenders,
            RangePrice,
            Textfield
        },
        data() {
            return {
                isLoading: false,
                messageBox: "",
                articles: [],
                categories: [],
                genders: [],
                sorts: [
                        { id: "1", name: "Name(A - Z)"},
                        { id: "2", name: "Name(Z - A)"},
                        { id: "3", name: "Price(High - Low)"},
                        { id: "4", name: "Price(Low - High)"}
                       ],
                filters: {
                    category: 0,
                    gender: '',
                    price: 0,
                    search: "",
                    sort: 0
                }
            }
        },
        methods: {
            loadArticles() {
                let that = this;
                let inputCategory;
                let inputSort;
                this.filters.category == 0 || this.filters.category == '0' ? inputCategory = '' : inputCategory = this.filters.category;
                this.filters.sort == 0 || this.filters.sort == '0' ? inputSort = '' : inputSort = this.filters.sort;

                this.isLoading = true;

                let params = {//for adding filters and sort
                    inputCategory: inputCategory,
                    inputGender: this.filters.gender,
                    inputPrice: this.filters.price,
                    inputSearch: this.filters.search,
                    inputSort: inputSort
                } 

                this.$axios.get('models/get-articles.php', { params: params })
                .then(function(result){
                    that.isLoading = false;
                    that.messageBox = "";

                    //if any articles
                    that.$set(that, 'articles', result.data);

                }).catch(function(error){
                    that.isLoading = false;
                    let errors = error.response.data.errors;

                    that.messageBox = "";

                    //if no articles
                    that.$set(that, 'articles', []);
                    if (errors.length>0){
                        that.messageBox = errors.join("<br/>");
                    }
                    else {
                        that.messageBox = "";
                    }

                });
            }
        },
        mounted() {
            this.loadArticles();
            this.$loadGenerics("categories");
            this.$loadGenerics("genders");
        },
        watch: {
            "filters.category": function() {
                this.loadArticles();
            },
            "filters.gender": function() {
                this.loadArticles();
            },
            "filters.price": function() {
                this.loadArticles();
            },
            "filters.sort": function() {
                this.loadArticles();
            },
            "filters.search": function() {
                if (this.filters.search.length === 0) {
                    this.loadArticles();
                }
            }
        }
    }
</script>
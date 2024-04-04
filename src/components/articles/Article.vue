<template>
    <div class="product-item bg-light mb-4">
        <div class="product-img position-relative overflow-hidden">
            <img class="img-fluid w-100" :src="image" :alt="article_name">
            <div class="product-action">
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                <router-link class="btn btn-outline-dark btn-square" :to="`/products/${ag_id}`"><i class="fa fa-search"></i></router-link>
            </div>
        </div>
        <div class="text-center py-4">
            <a class="h6 text-decoration-none text-truncate" href="">{{ article_name }}</a>
            <div class="d-flex align-items-center justify-content-center mt-2">
                <h5>{{ active_price }}</h5><h6 class="text-muted ml-2"><del>{{ old_price }}</del></h6>
            </div>
            <div class="d-flex align-items-center justify-content-center mb-1">
                <p class="text-center">Discount: {{ tag }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ArticleComponent",
    props: {
        ag_id: {
            type: Number,
            required: true
        },
        article_name: {
            type: String
        },
        active_price: {
            type: String
        },
        old_price: {
            type: String
        },
        tag: {
            type: String
        },
        image: {
            type: String
        }
    },
    methods: {
        nameClick: function() {
            // this.$router.push("/products/" + this.id)
        }
    }
}
</script>
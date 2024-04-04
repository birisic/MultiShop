<template>
    <form class="mb-range" id="form-price">
        <label :for="id" class="d-block">${{value}}</label>
        <input type="range" v-model="value" class="form-control" :min="min" :max="max" :name="name" :id="id"/>
    </form>
</template>

<script>
    export default {
        name: "RangePriceComponent",
        data(){
            return {
                value: this.max/2
            }
        },
        props: {
            min: {
                type: [String, Number]
            },
            max: {
                type: [String, Number]
            },
            id: {
                type: String
            },
            name: {
                type: String
            }
        },
        watch: {
            value: function() {
                this.$emit("input", this.value)
            },
            // value: function() {
            //     this.selected = this.value
            // }
        }
    }
</script>
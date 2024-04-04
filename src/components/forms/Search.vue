<template>
    <form class="mb-search" id="form-search">
        <div class="row">
            <div class="col-9">
                <input class="form-control" type="search" v-model="search" :name="name" :id="id" :placeholder="placeholder"/>
            </div>
            <div class="col-3">
                <input @click="$emit('search')" class="btn btn-primary" type="button" value="Search" id="btn-input-search"/>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: "SearchComponent",
        data() {
            return {
                search: this.value
            }
        },
        props: {
            placeholder: {
                type: String,
                default: "Search here..."
            },
            value: {
                type: [String, Number]
            },
            textProperty: {
                type: String,
                default: "Choose an option"
            },
            valueProperty: {
                type: String,
                default: "value"
            },
            id: {
                type: String
            },
            name: {
                type: String
            }
        },
        watch: {
            search: function() {
                this.$emit("input", this.search)
            },
            value: function() {
                this.search = this.value
            }
        }
    }
</script>
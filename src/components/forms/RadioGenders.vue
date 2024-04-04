<template>
    <form class="mb-radio" id="form-genders">
        <div class="form-check d-inline" v-for="option in options" :key="option[valueProperty]">
            <label class="form-check-label" :for="name + '-' + option[valueProperty]">{{ option[textProperty] }}</label>
            <input v-model="selected" class="mx-2" type="radio"
                   :name="name" :id="name + '-' + option[valueProperty]" :value="option[valueProperty]"/>
        </div>
        <div class="d-flex justify-content-center">
            <button @click="uncheck" class="btn btn-secondary" type="button">Undo</button>
        </div>
    </form>
</template>

<script>
    export default {
        name: "RadioGendersComponent",
        data() {
            return {
                selected: this.value
            }
        },
        props: {
            error: {
                type: String,
            },
            options: {
                type: Array,
                required: true
            },
            value: {
                type: [String, Number]
            },
            textProperty: {
                type: String,
                default: ""
            },
            valueProperty: {
                type: String,
                default: ""
            },
            id: {
                type: String
            },
            name: {
                type: String
            }
        },
        methods: {
            uncheck() {
                this.selected = "";
            }
        },
        watch: {
            selected: function() {
                this.$emit("input", this.selected)
            },
            value: function() {
                this.selected = this.value
            }
        }
    }
</script>
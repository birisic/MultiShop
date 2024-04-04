<template>
    <div class="mb-custom-component">
        <label :for="id">{{label}}</label>
        <select :name="name" v-model="selected" :id="id"  class="form-control">
            <option value="0">{{firstElement}}</option>
            <option v-for="option in options" :key="option[valueProperty]" :value="option[valueProperty]">{{option[textProperty]}}</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "DropdownComponent",
        data() {
            return {
                selected: this.value
            }
        },
        props: {
            label: {
                type: String,
                default: ""
            },
            firstElement: {
                type: String,
                default: "Choose an option"
            },
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
            selected: function() {
                this.$emit("input", this.selected)
            },
            value: function() {
                this.selected = this.value
            }
        }
    }
</script>
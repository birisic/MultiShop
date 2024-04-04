<template>
    <div class="mb-custom-component">
        <label v-if="label" :for="id" class="form-label">{{ label }}</label>
        <textarea :style="style" v-model="textValue" v-if="multiline" :rows="rowCount" :placeholder="placeholder" class="form-control" :id="id"></textarea>
        <input :style="style" v-model="textValue" v-else :type="type" :placeholder="placeholder" class="form-control" :id="id">
        <div v-if="showHint" class="form-text mb-help">{{ hint }}</div>
        <div v-if="error" class="alert p-1 mt-2 alert-danger" role="alert">
            {{ error }}
        </div>
    </div>
</template>
<script>
export default {
    name: "TextField",
    props: {
        placeholder: {
            type: String,
            default: "Type here..."
        },
        value: {
            required: false,
            type: String
        },
        rowCount: {
            type: String,
            default: "3"
        },
        multiline: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: "text"
        },
        id: {
            type: String
        },
        hint: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: ""
        },
        error: {
            type: String
        }
    },
    data() {
        return {
            textValue: ""
        }
    },
    mounted() {
        this.textValue = this.value
    },
    computed: {
        style: function() {
            return this.error ? "border: 1px solid red" : ""
        },
        showHint: function() {
            return !this.error && this.hint;
        }
    },  
    watch: {
        textValue: function() {
            this.$emit("input", this.textValue)
        },
        value: function() {
            this.textValue = this.value
        }
    }
}
</script>
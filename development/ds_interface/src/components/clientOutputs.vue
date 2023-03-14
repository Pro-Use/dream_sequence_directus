<template>
    <h2>{{clientTitle}}</h2>

    <div class="table">
        <div class="row table-header">
            <div class="lg-left">Name</div>
            <div class="lg-span-2 lg-left">Description</div>
            <div class="lg-span-2 lg-left">Source Device</div>
            <div class="lg-span-2 lg-left">Data Point</div>
            <div class="lg-center">Min</div>
            <div class="lg-center">Max</div>
            <div class="lg-center">Live Data Value</div>
        </div>

        <outputTableRow v-for="output in outputs" :key="output.name" :output="output"></outputTableRow>
        <newOutputTableRow :client="client" ></newOutputTableRow>

    </div>

</template>

<script setup>
    import { computed } from 'vue'
    import outputTableRow from './outputTableRow.vue';
    import newOutputTableRow from './newOutputTableRow.vue';

    const props = defineProps(['all_outputs', 'clientTitle', 'client'])

    const outputs = computed(() => {
        return props.all_outputs.filter((output) => output.clients == props.client)
    })

</script>

<style scoped>

    h2{
        font-size: 1.25em;
        padding: 1em 0;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        text-transform: uppercase;
    }

    .table-header div{
        display: none;
    }

    .table{
        padding-top: 2em;
    }

    @media screen and (min-width: 1200px) {

        .row{
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-gap: 2px;
            width: 100%;
        }

        .lg-span-2{
            grid-column: span 2;
        }

        .lg-center{
            text-align: center;
        }

        .lg-left{
            text-align: left;
        }

        .table-header div{
            display: initial;
            font-size: 12px;
            font-weight: bold;
            line-height: 15px;
            padding-bottom: .5em;
        }

    }

</style>
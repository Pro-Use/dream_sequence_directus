<template>
    <h2>Unreal Engine</h2>

    <div class="table">
        <div class="row table-header">
            <div class="lg-left">ID</div>
            <div class="lg-span-2 lg-left">Description</div>
            <div class="lg-span-2 lg-left">Source Device</div>
            <div class="lg-span-2 lg-left">Data Point</div>
            <div class="lg-center">Live Data Value</div>
            <div class="lg-center">Min</div>
            <div class="lg-center">Max</div>
            <div class="lg-center lg-span-2">Live Output</div>
        </div>

        <outputTableRow></outputTableRow>
        <outputTableRow></outputTableRow>
        <outputTableRow></outputTableRow>
        <outputTableRow></outputTableRow>


    </div>

</template>

<script>
    import outputTableRow from './outputTableRow.vue';
    export default {
        components: {
            outputTableRow
        },
        mounted() {

        }
    }
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
        }

    }

</style>
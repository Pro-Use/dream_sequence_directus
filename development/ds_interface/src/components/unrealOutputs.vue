<template>
    <h2>Unreal Engine</h2>

    <div class="table">
        <div class="row header">
            <div class="lg-left">ID</div>
            <div class="lg-span-2 lg-left">Description</div>
            <div class="lg-span-2 lg-left">Source Device</div>
            <div class="lg-span-2 lg-left">Data Point</div>
            <div>Live Data Value</div>
            <div>Min</div>
            <div>Max</div>
            <div class="lg-span-2">Live Output</div>
        </div>

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

<style lang="css">

    h2{
        font-size: 1.25em;
        padding: 1em 0;
        border-top: 1px solid black;
        text-transform: uppercase;
    }

    div{
        display: none;
    }

    table{
        widdiv: 100%;
        display: block;
    }

    @media screen and (min-widdiv: 1200px) {

        .row{
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-gap: 10px;
            widdiv: 100%;
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

        .header div{
            display: initial;
            font-size: 12px;
            font-weight: bold;
        }

        .row div{
            border: 1px solid black
            /* background-color: pink; */
        }
    }

</style>
<template>
    <h1><slot></slot></h1>
</template>

<script>
    export default {
        mounted() {

        }
    }
</script>

<style lang="css" scoped>

    h1{
        margin: 0;
        padding: 0;
        font-size: 24px;
        text-transform: uppercase;
        padding: 32px 0px 96px;
        color: inherit;
        font-weight: 700;
    }



    @media screen and (min-width: 960px) {
        h1{
        padding: 32px 16px 96px;
    }

    }

</style>
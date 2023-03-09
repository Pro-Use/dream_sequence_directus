<template>
    <div class="row">
        <div class="lg-left bg-light-blue">
            <label class="label" for="id">ID</label>
            <input id="id" class="input" type="text" v-model="data.id" disabled>
        </div>
        <div class="lg-span-2 lg-left bg-light-blue">
            <label id="description" class="label" for="description">Description</label>
            <textarea class="input textarea" type="textarea" wrap="hard" v-model="data.description"></textarea>
        </div>
        <div class="lg-span-2 lg-left bg-light-blue">
            <label class="label" for="device">device</label>
            <select id="device" class="input" type="textarea" v-model="data.device">
                <option value="uRad">uRad</option>
                <option value="waterMonitor">Water Monitor</option>
            </select>
        </div>
        <div class="lg-span-2 lg-left bg-light-blue">
            <label class="label" for="dataPoint">data Point</label>
            <select id="dataPoint" class="input" type="textarea" v-model="data.dataPoint">
                <option value="o2">o2</option>
                <option value="temperature">Temperature</option>
            </select>
        </div>
        <div class="lg-center bg-light-blue">
            <label class="label" for="daliveDataValuetaPoint">Live Data Value</label>
            <input id="liveDataValue" class="input lg-center" type="text" v-model="data.liveDataValue" disabled>
        </div>
        <div class="lg-center bg-light-blue">
            <label class="label" for="min">Min</label>
            <input id="min" class="input lg-center" type="text" v-model="data.min" disabled>
        </div>
        <div class="lg-center bg-light-blue">
            <label class="label" for="max">Max</label>
            <input id="max" class="input lg-center" type="text" v-model="data.max" disabled>
        </div>
        <div class="lg-span-2 lg-center bg-light-blue">
            <label class="label" for="liveOutputValue">Live Output Value</label>
            <input id="liveOutputValue"  class="input lg-center" type="text" v-model="data.liveOutputValue" disabled>
        </div>
    </div>
</template>

<script setup>

let data = { 
        "id": 1, 
        "description": "Controls fog and water",
        "device": "uRad",
        "dataPoint": "o2",
        "liveDataValue": 1.234,
        "min": 0.1,
        "max": 1,
        "liveOutputValue": 0.823
    }; 
</script>

<style scoped>
    @import url(../assets/css/forms.css);

    .row{
        display: grid;
        grid-template-columns: 1fr;
        margin-bottom: 1em;
        border: 1px solid grey;
        border-radius: 5px;
        overflow: hidden;
    }

    .row div{
        display: grid;
        grid-template-columns: 150px 1fr;
        border-bottom: 1px solid grey;
    }
    .row div:last-child{
        border-bottom: 0px;
    }

    label{
        padding: 8px;
        font-weight: 700;
        font-size: 12px;
        text-transform: capitalize;
        border-right: 1px solid grey;
        background-color: var(--light-blue);
    }


    @media screen and (min-width: 1200px) {

        .label{
            clip: rect(0 0 0 0);
            clip-path: inset(50%);
            height: 1px;
            overflow: hidden;
            position: absolute;
            white-space: nowrap;
            width: 1px;
        }

        .row{
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-gap: 1px;
            width: 100%;
            margin-bottom: 2px;
            border: 0px;
        }

        .row div{
            display: block;
            grid-template-columns: 150px 1fr;
            border-bottom: 0px;
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
        }

        .row div{
            overflow: hidden;
            /* background-color: var(--light-blue); */
        }

        .row:hover .input{
            background-color: var(--pale-green);
        }

        .row:hover .input:enabled:hover{
            background-color: var(--hover-bg);
        }

        .row:hover .input:disabled:hover{
            background-color: var(--light-grey);
        }

        textarea{
            height: 35px;
            padding-top: 10px;
        }

    }

</style>

<template>
    <div class="add-container " v-if="!new_output">
        <button class="add" @click="update()">New</button>
    </div>
    <div v-else class="row">
        <div class="lg-left bg-light-blue">
            <label class="label" for="name">Name</label>
            <input id="name" class="input" type="text" v-model="name">
        </div>
        <div class="lg-span-2 lg-left bg-light-blue">
            <label id="description" class="label" for="description">Description</label>
            <textarea class="input textarea" type="textarea" wrap="hard" v-model="description"></textarea>
        </div>
        <div class="lg-span-2 lg-left bg-light-blue">
            <label class="label" for="device">device</label>
            <select id="device" class="input" type="textarea" v-model="data_source">
                <option v-for="source in data_sources" :key="source" :value="source">{{source}}</option>
            </select>
        </div>
        <div class="lg-span-2 lg-left bg-light-blue">
            <label class="label" for="dataPoint">data Type</label>
            <select id="dataPoint" class="input" type="textarea" v-model="data_type">
                <option v-for="type in cur_data_types" :key="type" :value="type">{{type}}</option>
            </select>
        </div>
        <div class="lg-center bg-light-blue">
            <label class="label" for="min">Min</label>
            <input id="min" class="input lg-center" type="number" min="0" max="1" step="0.001" v-model="min" @change="checkMinMax()">
        </div>
        <div class="lg-center bg-light-blue">
            <label class="label" for="max">Max</label>
            <input id="max" class="input lg-center" type="number" min="0" max="1" step="0.001" v-model="max" @change="checkMinMax()">
        </div>
        <div class="lg-center lg-span-2 bg-light-blue">
            <label class="label" for="liveOutputValue">Live Output Value</label>
            <input id="liveOutputValue"  class="input lg-center" type="text" v-model="liveOutputValue" disabled>
        </div>
        <div class="lg-center bg-light-blue">
            
        </div>
    </div>
    <div>
        <div class="lg-span-2 error" v-for="error in errors" :key="errror">
            <v-icon name="error"/> {{error}}
        </div>
    </div>
</template>

<script setup>
    import { inject, ref, computed, watch } from 'vue'
    import { useApi } from '@directus/extensions-sdk'

    const props = defineProps(['client'])

    const api = useApi();

    const name = ref('')
    const description = ref('')
    const data_source = ref(null)
    const data_type = ref(null)
    const min = ref(0)
    const max = ref(1)
    const liveOutputValue = ref('-')
    const new_output = ref(false)
    const errors = ref([])
    
    const { save, discard, outputUpdated, outputSaved, outputFailed } = inject('update')
    const { all_outputs, addOutput} = inject('add')

    const data_sources = inject('data_sources')
    const data_types = inject('data_types')

    const cur_data_types = computed(() =>{
        return data_types[data_source.value]
    })

    const update = () => {
        if (!new_output.value){
            new_output.value = true;
            outputUpdated()
        }
            
    }

    const checkMinMax = () => {
        if (!min.value) {
            min.value = 0
        }
        if (!max.value) {
            max.value = 1
        }
    }

    const validate = () => {
        errors.value = []
        if (name.value.length == 0){
            errors.value.push('Output name cannot be blank')
        } else {
            let check_name = all_outputs.value.filter((output) => output.name == name.value)
            if (check_name.length > 0){
                errors.value.push('An output named "'+name.value+'" already exists')
            }
        }
        if (data_source.value == null){
            errors.value.push('Output must have a data source')
        } else if (data_type.value == null) {
            errors.value.push('Output must have a data type')
        }
        if (errors.value.length != 0) {
            outputFailed()
            return false
        } else {
            return true
        }

    }

    const reset = () => {
        name.value = ''
        description.value = ''
        data_source.value = null
        data_type.value = null
        min.value = 0
        max.value = 1
        errors.value = []
    }

    watch(save, async (newVal) => {
        if (newVal && new_output.value){
            if (validate() ) {
                console.log('component saving')
                let new_output_data = {
                    'name': name.value,
                    'data_source': data_source.value,
                    'data_type': data_type.value,
                    'description': description.value,
                    'min': min.value,
                    'max': max.value,
                    'clients': props.client
                }
                // saving logic here...
                let res = await api.post('/items/outputs/', new_output_data)
                console.log(res)
                new_output.value = false;
                // // emit save
                addOutput(res.data.data)
                reset()
            }

        }
    })

    watch(discard, (newVal) => {
        if(newVal && new_output.value){
            new_output.value = false;
            // // emit discard
            outputSaved()
            reset()
        }
    })

    watch(min, (newMin, oldMin) =>{
        if (0 > newMin || newMin > 1 || newMin >= max.value){
            min.value = oldMin
        }
    })

    watch(max, (newMax, oldMax) =>{
        console.log(newMax)
        if (!newMax){
        }
        if (0 > newMax || newMax > 1 || newMax <= min.value){
            max.value = oldMax
        }
    })



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

    .error {
        padding: 8px;
        color: darkred;
    }

    .add {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 8px;
        font-size: 14px;
        min-height: 35px;
    }

    .add-container {
        width: 100px;
        align-content: center;
        display: grid;
        border: #dddddd solid 1px;
        border-radius: 100px;
        background: white;
        -webkit-box-shadow: 5px 5px 10px 1px #dddddd;
        -moz-box-shadow: 5px 5px 10px 1px #dddddd;
        box-shadow: 5px 5px 10px 1px #dddddd;
        margin: 10px 0px;
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

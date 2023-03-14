<template>
    <div class="row">
        <div class="lg-left bg-light-blue">
            <label class="label" for="name">Name</label>
            <input id="name" class="input" type="text" v-model="name" @input="update()">
        </div>
        <div class="lg-span-2 lg-left bg-light-blue">
            <label id="description" class="label" for="description">Description</label>
            <textarea class="input textarea" type="textarea" wrap="hard" v-model="description" @input="update()"></textarea>
        </div>
        <div class="lg-span-2 lg-left bg-light-blue">
            <label class="label" for="device">device</label>
            <select id="device" class="input" type="textarea" v-model="data_source" @input="update()">
                <option v-for="source in data_sources" :key="source" :value="source">{{source}}</option>
            </select>
        </div>
        <div class="lg-span-2 lg-left bg-light-blue">
            <label class="label" for="dataPoint">data Point</label>
            <select id="dataPoint" class="input" type="textarea" v-model="data_type" @input="update()">
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
            <input id="liveOutputValue"  class="input lg-center" type="text" :value="latest_val" disabled>
        </div>
        <div class="lg-center bg-light-blue">
            <button v-if="!deleting" @click="preDelete()"><v-icon name="delete"/></button>
            <button v-else @click="doDelete()">Delete?</button>
        </div>
    </div>
    <div>
        <div class="lg-span-2" v-for="error in errors" :key="errror">{{error}}</div>
    </div>
</template>

<script setup>
    import { inject, ref, computed, watch } from 'vue'
    import { useApi } from '@directus/extensions-sdk'

    const props = defineProps(['output'])

    const api = useApi();

    const id = ref(props.output.id)
    const name = ref(props.output.name)
    const description = ref(props.output.description)
    const data_source = ref(props.output.data_source)
    const data_type = ref(props.output.data_type)
    const min = ref(props.output.min)
    const max = ref(props.output.max)
    const updated = ref(false)
    const deleting = ref(false)
    const errors = ref([])

    const prev_vals = {
        name: props.output.name,
        description: props.output.description,
        data_source: props.output.data_source,
        data_type: props.output.data_type,
        min: props.output.min,
        max: props.output.max,
    }
    
    const { save, discard, outputSaved, outputUpdated, outputFailed } = inject('update')
    const { all_outputs } = inject('add')

    const data_sources = inject('data_sources')
    const data_types = inject('data_types')
    const deleteOutput = inject('delete')

    const output_vals = inject('output_vals')

    const cur_data_types = computed(() =>{
        let val = data_types[data_source.value]
        if (val){
            return val
        } else {
            return '-'
        }
    })

    const latest_val = computed(() => {
        return output_vals.value[name.value]
    })

    const update = () => {
        if (!updated.value){
            updated.value = true;
            outputUpdated()
        }
            
    }

    const preDelete = () => {
        deleting.value = setTimeout(() => {
            clearTimeout(deleting.value)
            deleting.value = false
        }, 3000)
    }

    const doDelete = () => {
        deleteOutput(id.value)
        clearTimeout(deleting.value)
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

    watch(save, async (newVal) => {
        if (newVal && updated.value){
            if (validate()){
                console.log('component saving')
                let new_output_data = {
                    'data_source': data_source.value,
                    'data_type': data_type.value,
                    'description': description.value,
                    'min': min.value,
                    'max': max.value
                }
                let res = await api.patch('/items/outputs/'+id.value, new_output_data)
                console.log(res)
                // saving logic here...
                updated.value = false;
                // emit save
                outputSaved()
                prev_vals.name = name.value
                prev_vals.description = description.value
                prev_vals.data_source = data_source.value
                prev_vals.data_type = data_type.value
                prev_vals.min = min.value
                prev_vals.max = max.value
                console.log(prev_vals)
            }
        }
    })

    watch(discard, (newVal) => {
        if(newVal && updated.value){
            name.value = prev_vals.name 
            description.value = prev_vals.description
            data_source.value = prev_vals.data_source
            data_type.value = prev_vals.data_type
            min.value = prev_vals.min
            max.value = prev_vals.max
            updated.value = false;
            // emit discard
            outputSaved()
        }
    })

    watch(min, (newMin, oldMin) =>{
        if (0 > newMin || newMin > 1 || newMin >= max.value){
            min.value = oldMin
            return
        }
        update()
    })

    watch(max, (newMax, oldMax) =>{
        console.log(newMax)
        if (!newMax){
            return
        }
        if (0 > newMax || newMax > 1 || newMax <= min.value){
            max.value = oldMax
            return
        }
        update()
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

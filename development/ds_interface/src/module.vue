<template>
	
	<private-view title="OUTPUTS">
		<template #navigation>
	      <!-- This goes in the navigation bar! -->
	      <v-list nav="true">
			<v-list-item to="/ds_interface">
				<v-list-item-icon><v-icon name="label" /></v-list-item-icon>
				<v-list-item-content>Output</v-list-item-content>
			</v-list-item>
			<v-list-item>
				<v-list-item-icon><v-icon name="label" /></v-list-item-icon>
				<v-list-item-content>System</v-list-item-content>
			</v-list-item>
		  </v-list>
	    </template>
		<div class="page-container">

			<clientOutputs :all_outputs="all_outputs" client='unreal' clientTitle="Unreal Engine"></clientOutputs>

			<clientOutputs :all_outputs="all_outputs" client='midi' clientTitle="MIDI"></clientOutputs>


		</div>
		<div v-if="allUpdates > 0">
			<button @click="doSave()" :disabled="discard">
				<span v-if="!save">Save</span>
				<span v-else>Saving...</span>
			</button>
			<button @click="doDiscard()"> Discard </button>
		</div>
	</private-view>
	
</template>

<script setup>
	// import pageTitle from './components/pageTitle.vue';
	import clientOutputs from './components/clientOutputs.vue';
	import { provide, ref, onMounted } from 'vue'
	import { useApi, defineOperationApp } from '@directus/extensions-sdk';
	import { io } from "socket.io-client";

	const sockets = []
	const clients = ['unreal', 'midi']
	const api = useApi();

	const allUpdates = ref(0)
	const allFailed = ref(0)
	const save = ref(false)
	const discard = ref(false)

	const data_sources = ref([])
	const data_types = ref({})
	var all_outputs = ref([])

	const latest_vals = ref({})
	
	const outputSaved = () => {
		console.log("1 ouput saved")
		if (allUpdates.value > 0){
			allUpdates.value -= 1
			if (allUpdates.value == 0){
				save.value = false
				discard.value = false
			}
		}
	}

	const outputFailed = () => {
		allFailed.value += 1
		if (allFailed.value == allUpdates.value){
			save.value = false
		}
	}

	const outputUpdated = () => {
		allUpdates.value  += 1
		console.log(allUpdates.value + " ouput updated")
	}

	const addOutput = (new_output) => {
		all_outputs.value.push(new_output)
		console.log(all_outputs.value)
		outputSaved()
	}

	const doSave = () => {
		allFailed.value = 0
		save.value = true;
	}

	const doDiscard = () => {
		allFailed.value = 0
		discard.value = true
	}

	const deleteOutput = async (id) => {
		let res = await api.delete('/items/outputs/'+id)
		all_outputs.value = all_outputs.value.filter((output) => output.id != id)
	}

	const startSocket = (name) => {
		let socket = io("/"+name)
		socket.onAny((eventName, ...args) => {
		  // console.log(eventName)
		  // console.log(args)
		  latest_vals.value[eventName] = args[0]
		});
		sockets.push(socket)

	}

	onMounted( async () => {
		for (let i = 0;i<clients.length;i++){
			startSocket(clients[i])
		}
		api.get('/items/data_sources').then((res) => {
            res.data.data.forEach(source => { 
                data_sources.value.push(source.name)
                api.get('items/'+source.name+'?limit=1').then((res) => {
                    let keys = Object.keys(res.data.data[0])
                    let dt = keys.filter((key) => key != 'id' && key != 'date_created')
                    data_types.value[source.name] = dt
                })
            })
        });
        console.log(data_sources.value)
        console.log(data_types.value)
        provide('data_sources', data_sources.value)
        provide('data_types', data_types.value)

        let res = await api.get('/items/outputs')

    	console.log(res.data.data)
        all_outputs.value = res.data.data

        console.log(all_outputs.value)
	})

	// Injects

	provide('update',{ save, discard, outputSaved, outputUpdated, outputFailed })

	provide('add', { all_outputs, addOutput })

	provide ('delete', deleteOutput)

	provide ('output_vals', latest_vals)

	const title = ref('Outputs')


</script>

<style>
	@import url('./assets/css/variables.css');
	/* @import url('./assets/css/forms.css'); */

	.page-container{
		padding: 32px 16px;
		color: black;
	}

    @media screen and (min-width: 600px) {
		.page-container{
			padding: 0 48px;
		}
	}

</style>
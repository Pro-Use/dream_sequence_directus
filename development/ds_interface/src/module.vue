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
		<button v-if="allUpdates > 0" @click="doSave()">
			<span v-if="!save">Save</span>
			<span v-else>Saving...</span>
		</button>
	</private-view>
	
</template>

<script setup>
	// import pageTitle from './components/pageTitle.vue';
	import clientOutputs from './components/clientOutputs.vue';
	import { provide, ref, reactive, onMounted } from 'vue'
	import { useApi } from '@directus/extensions-sdk';

	const api = useApi();

	const allUpdates = ref(0)
	const save = ref(false)

	const data_sources = ref([])
	const data_types = ref({})
	var all_outputs = ref([])
	
	const outputSaved = () => {
		console.log("1 ouput saved")
		if (allUpdates.value > 0){
			allUpdates.value -= 1
			if (allUpdates.value == 0){
				save.value = false
			}
		}
	}

	const outputUpdated = () => {
		console.log("1 ouput updated")
		allUpdates.value  += 1
	}

	const doSave = () => {
		save.value = true;
	}

	onMounted( async () => {
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

	provide('update',{ save, outputSaved, outputUpdated })

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
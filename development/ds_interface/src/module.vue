<template>
	
	<private-view title="OUTPUTS">
		<div class="page-container">

			<unrealOutputs></unrealOutputs>


		</div>

	</private-view>
	
</template>

<script>
import { useApi, useStores } from '@directus/extensions-sdk';
import pageTitle from './components/pageTitle.vue';
import unrealOutputs from './components/unrealOutputs.vue';
export default {
	data() {
		return {
			collections: null,
			title: 'Outputs'
		};
	},
	components: {
		pageTitle,
		unrealOutputs
	},
	methods: {
		logToConsole: function () {
			console.log(this.collections);
		},
	},
	inject: ['api'],
	mounted() {
		// log the system field so you can see what attributes are available under it
		// remove this line when you're done.
		console.log(this.api);

		// Get a list of all available collections to use with this module
		this.api.get('/collections?limit=-1').then((res) => {
			this.collections = res.data.data;
		});
	},
};
</script>

<style>
	@import url('./assets/css/variables.css');
	@import url('./assets/css/forms.css');

	.page-container{
		padding: 32px 16px;
		color: black;
	}

    @media screen and (min-width: 600px) {
		.page-container{
			padding: 0 32px;
		}
	}

</style>
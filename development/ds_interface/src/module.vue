<template>
	<private-view title="My Custom Module">Content goes here...</private-view>
</template>

<script>
import { useApi, useStores } from '@directus/extensions-sdk';
export default {
	data() {
		return {
			collections: null,
		};
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

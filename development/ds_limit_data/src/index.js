export default ({ action }, {database}) => {

	const max_data = 7200;

	action('items.create', async ({collection, key}) => {
		console.log('item created for '+ collection);
		if (collection == 'urad' || collection == 'water_monitor'){
			let data_count = await(database(collection).count('*', {as: 'count'}))
			console.log(data_count)
			if (data_count.length ){
				let first_id = key - max_data
				if (data_count[0].count > max_data) {
					let del_rows = await(database(collection).where('id', '<=', first_id).del())
					console.log('deleting: '+ del_rows)
				}
			}
		}
	});
};

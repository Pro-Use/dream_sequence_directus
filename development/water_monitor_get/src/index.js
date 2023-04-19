import axios from 'axios';

export default async ({ schedule }, {database, getSchema, env}) => {
	const config = {
		'headers': {
			'Authorization': 'Bearer '+ env.WM_BEARER,
		}
	}

	const max_data = 7200
	var latest_data = -1

	schedule('*/5 * * * * *', async () => {
		let res = await axios.get('https://dev.10pm.studio/dream-sequence/wm_data', config);
		let newData = res.data.water_monitor_data
		let newTimestamp = res.data.updated
		console.log(res.data)
		if (latest_data !== newTimestamp){
			latest_data = newTimestamp
			let db_res = await database('water_monitor').insert(newData)
			console.log(db_res[0])
			let data_count = await(database('water_monitor').count('*', {as: 'count'}))
			console.log(data_count)
			if (data_count.length && db_res){
				let first_id = db_res[0] - max_data
				if (data_count[0].count > max_data) {
					let del_rows = await(database('water_monitor').where('id', '<=', first_id).del())
					console.log('deleting: '+del_rows)
				}
			}
		}
	});
};

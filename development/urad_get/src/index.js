import axios from 'axios';

export default async ({ schedule }, {database, getSchema, env}) => {
	const config = {
		'headers': {
			'X-User-id': env.URAD_USER,
			'X-User-hash': env.URAD_HASH
		}
	}
	const max_data = 7200 - 1;
	const admin_fields = ['id', 'date_created']
	let schema = await getSchema()
	// console.log(schema.collections.urad.fields)
	let fields = Object.keys(schema.collections.urad.fields)
	fields = fields.filter(x => !admin_fields.includes(x));
	console.log(fields)
	schedule('* * * * *', async () => {
		let res = await axios.get('http://data.uradmonitor.com/api/v1/devices/82000202/all/60', config);
		let latest = res.data.pop()
		let asArray = Object.entries(latest);
		const filtered = asArray.filter(([key, value]) => fields.includes(key));
		let newData = Object.fromEntries(filtered);
		console.log(newData)
		let db_res = await database('urad').insert(newData, ['id'])
		console.log(db_res)
		let data_count = await(database('urad').count('*', {as: 'count'}))
		console.log(data_count)
		if (data_count.length && db_res){
			let first_id = db_res[0].id - max_data
			if (data_count[0].count > max_data) {
				let del_rows = await(database('urad').where('id', '<=', first_id).del())
				console.log('deleting: '+del_rows)
			}
		}
		

	});
};
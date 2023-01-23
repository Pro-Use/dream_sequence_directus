import axios from 'axios';

export default async ({ schedule }, {database, getSchema, env}) => {
	const config = {
		'headers': {
			'X-User-id': env.URAD_USER,
			'X-User-hash': env.URAD_HASH
		}
	}
	let schema = await getSchema()
	let fields = Object.keys(schema.collections.urad.fields)
	fields = fields.splice(2, (fields.length - 2))
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

	});
};
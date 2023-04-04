export default (router, {database, exceptions}) => {

	const { ServiceUnavailableException } = exceptions;

	const scale =  (number, inMin, inMax, outMin, outMax) => {
	    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
	}

	router.get('/', async (req, res, next) => {
		let output = await database('outputs').select('*').where('clients', 'floodplain').first();
		if (output) {
			// console.log(output)
			let min = await database(output.data_source).min(output.data_type + ' as min');
			let max = await database(output.data_source).max(output.data_type + ' as max');
			if (min[0].min == max[0].max){
				var data_point = 0.5;
			} else {
				let data_real = await database(output.data_source).orderBy('id', 'desc').first(output.data_type);
				var data_point = scale(data_real[output.data_type], min[0].min, max[0].max, output.min, output.max)
			}
			output_json = {'floodplain': data_point}
			console.log(output_json)
			res.json(output_json)


		} else {
			next(new ServiceUnavailableException("No floodplain output"));
		}
	});
};

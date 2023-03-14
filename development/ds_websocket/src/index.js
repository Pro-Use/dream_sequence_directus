import { Server } from "socket.io";

export default async ({ schedule, action }, {database, getSchema}) => {

	const scale =  (number, inMin, inMax, outMin, outMax) => {
	    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
	}

	let io = null

	action('server.start', ({ server }) => {
		// console.log(server)
		io = new Server(server, {
			cors: {
			    origin: "*",
			},
		});
		// console.log(io)

		io.on('connection', (socket) => {
		  console.log('a client connected');
		  socket.emit("hello", "browser", (response) => {
		    console.log(response);
		  });

		  // receive data
		  socket.on("data", (data) => {
		  	console.log(data)
		  });
		});
	});

	schedule('*/10 * * * * *', async () => {
		if(!io){
			return
		}
		// UE
		let ue_outputs = await database('outputs').select('*').where('clients', 'unreal');
		// console.log(ue_outputs)
		await ue_outputs.forEach( async (output) => {
			// console.log(output)
			let min = await database(output.data_source).min(output.data_type + ' as min');
			let max = await database(output.data_source).max(output.data_type + ' as max');
			if (min[0].min == max[0].max){
				var data_point = 0.5;
			} else {
				let data_real = await database(output.data_source).orderBy('id', 'desc').first(output.data_type);
				var data_point = scale(data_real[output.data_type], min[0].min, max[0].max, output.min, output.max)
			}
			console.log(output.name+': '+data_point)
			io.emit(output.name, data_point)
			io.of('/unreal').emit(output.name, data_point)
		})
		// Midi
		let midi_outputs = await database('outputs').select('*').where('clients', 'midi');
		// console.log(midi_outputs)
		await midi_outputs.forEach( async (output) => {
			// console.log(output)
			let min = await database(output.data_source).min(output.data_type + ' as min');
			let max = await database(output.data_source).max(output.data_type + ' as max');
			if (min[0].min == max[0].max){
				var data_point = 0.5;
			} else {
				let data_real = await database(output.data_source).orderBy('id', 'desc').first(output.data_type);
				var data_point = scale(data_real[output.data_type], min[0].min, max[0].max, output.min, output.max)
			}
			io.of('/midi').emit(output.name, data_point)
		})
	});
};
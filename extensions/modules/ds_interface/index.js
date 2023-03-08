import '@directus/extensions-sdk';
import { resolveComponent, openBlock, createBlock, withCtx, createTextVNode } from 'vue';

var script = {
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

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_private_view = resolveComponent("private-view");

  return (openBlock(), createBlock(_component_private_view, { title: "My Custom Module" }, {
    default: withCtx(() => [
      createTextVNode("Content goes here...")
    ]),
    _: 1 /* STABLE */
  }))
}

script.render = render;
script.__file = "src/module.vue";

var index = {
	id: 'ds_interface',
	name: 'Dream_Seequence_Interface',
	icon: 'output',
	routes: [
		{
			path: '',
			component: script,
		},
	],
};

export { index as default };

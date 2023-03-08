import '@directus/extensions-sdk';
import { openBlock, createElementBlock, renderSlot, createElementVNode, withDirectives, unref, vModelText, vModelSelect, resolveComponent, Fragment, createVNode, createStaticVNode, createBlock, withCtx } from 'vue';

var script$3 = {
        mounted() {

        }
    };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("h1", null, [
    renderSlot(_ctx.$slots, "default")
  ]))
}

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css$2 = "\nh1[data-v-29612ca9]{\n        margin: 0;\n        padding: 0;\n        font-size: 24px;\n        text-transform: uppercase;\n        padding: 32px 0px 96px;\n        color: inherit;\n        font-weight: 700;\n}\n@media screen and (min-width: 960px) {\nh1[data-v-29612ca9]{\n        padding: 32px 16px 96px;\n}\n}\n\n";
n(css$2,{});

script$3.render = render$2;
script$3.__scopeId = "data-v-29612ca9";
script$3.__file = "src/components/pageTitle.vue";

const _hoisted_1$2 = { class: "row" };
const _hoisted_2$1 = { class: "lg-left bg-light-blue" };
const _hoisted_3$1 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_4 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_5 = /*#__PURE__*/createElementVNode("option", { value: "uRad" }, "uRad", -1 /* HOISTED */);
const _hoisted_6 = /*#__PURE__*/createElementVNode("option", { value: "waterMonitor" }, "Water Monitor", -1 /* HOISTED */);
const _hoisted_7 = [
  _hoisted_5,
  _hoisted_6
];
const _hoisted_8 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_9 = /*#__PURE__*/createElementVNode("option", { value: "o2" }, "o2", -1 /* HOISTED */);
const _hoisted_10 = /*#__PURE__*/createElementVNode("option", { value: "temperature" }, "Temperature", -1 /* HOISTED */);
const _hoisted_11 = [
  _hoisted_9,
  _hoisted_10
];
const _hoisted_12 = { class: "lg-center bg-light-blue" };
const _hoisted_13 = { class: "lg-center bg-light-blue" };
const _hoisted_14 = { class: "lg-center bg-light-blue" };
const _hoisted_15 = { class: "lg-span-2 lg-center bg-light-blue" };


var script$2 = {
  __name: 'outputTableRow',
  setup(__props) {


let data = { 
        "id": 1, 
        "description": "Controls fog and water",
        "device": "uRad",
        "dataPoint": "o2",
        "liveDataValue": 1.234,
        "min": 0.1,
        "max": 1,
        "liveOutputValue": .823
    }; 

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createElementVNode("div", _hoisted_2$1, [
      withDirectives(createElementVNode("input", {
        type: "text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(data).id) = $event)),
        disabled: ""
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, unref(data).id]
      ])
    ]),
    createElementVNode("div", _hoisted_3$1, [
      withDirectives(createElementVNode("input", {
        type: "textarea",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((unref(data).description) = $event))
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, unref(data).description]
      ])
    ]),
    createElementVNode("div", _hoisted_4, [
      withDirectives(createElementVNode("select", {
        type: "textarea",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((unref(data).device) = $event))
      }, _hoisted_7, 512 /* NEED_PATCH */), [
        [vModelSelect, unref(data).device]
      ])
    ]),
    createElementVNode("div", _hoisted_8, [
      withDirectives(createElementVNode("select", {
        type: "textarea",
        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((unref(data).dataPoint) = $event))
      }, _hoisted_11, 512 /* NEED_PATCH */), [
        [vModelSelect, unref(data).dataPoint]
      ])
    ]),
    createElementVNode("div", _hoisted_12, [
      withDirectives(createElementVNode("input", {
        type: "text",
        "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((unref(data).liveDataValue) = $event)),
        disabled: ""
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, unref(data).liveDataValue]
      ])
    ]),
    createElementVNode("div", _hoisted_13, [
      withDirectives(createElementVNode("input", {
        type: "text",
        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((unref(data).min) = $event)),
        disabled: ""
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, unref(data).min]
      ])
    ]),
    createElementVNode("div", _hoisted_14, [
      withDirectives(createElementVNode("input", {
        type: "text",
        "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((unref(data).max) = $event)),
        disabled: ""
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, unref(data).max]
      ])
    ]),
    createElementVNode("div", _hoisted_15, [
      withDirectives(createElementVNode("input", {
        type: "text",
        "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((unref(data).liveOutpuValue) = $event)),
        disabled: ""
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, unref(data).liveOutpuValue]
      ])
    ])
  ]))
}
}

};

script$2.__file = "src/components/outputTableRow.vue";

var script$1 = {
        components: {
            outputTableRow: script$2
        },
        mounted() {

        }
    };

const _hoisted_1$1 = /*#__PURE__*/createElementVNode("h2", null, "Unreal Engine", -1 /* HOISTED */);
const _hoisted_2 = { class: "table" };
const _hoisted_3 = /*#__PURE__*/createStaticVNode("<div class=\"row header\"><div class=\"lg-left\">ID</div><div class=\"lg-span-2 lg-left\">Description</div><div class=\"lg-span-2 lg-left\">Source Device</div><div class=\"lg-span-2 lg-left\">Data Point</div><div>Live Data Value</div><div>Min</div><div>Max</div><div class=\"lg-span-2\">Live Output</div></div>", 1);

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_outputTableRow = resolveComponent("outputTableRow");

  return (openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1$1,
    createElementVNode("div", _hoisted_2, [
      _hoisted_3,
      createVNode(_component_outputTableRow)
    ])
  ], 64 /* STABLE_FRAGMENT */))
}

var css$1 = "\nh2{\n        font-size: 1.25em;\n        padding: 1em 0;\n        border-top: 1px solid black;\n        text-transform: uppercase;\n}\ndiv{\n        display: none;\n}\ntable{\n        widdiv: 100%;\n        display: block;\n}\n@media screen and (min-widdiv: 1200px) {\n.row{\n            display: grid;\n            grid-template-columns: repeat(12, 1fr);\n            grid-gap: 10px;\n            widdiv: 100%;\n}\n.lg-span-2{\n            grid-column: span 2;\n}\n.lg-center{\n            text-align: center;\n}\n.lg-left{\n            text-align: left;\n}\n.header div{\n            display: initial;\n            font-size: 12px;\n            font-weight: bold;\n}\n.row div{\n            border: 1px solid black\n            /* background-color: pink; */\n}\n}\n\n";
n(css$1,{});

script$1.render = render$1;
script$1.__file = "src/components/unrealOutputs.vue";

var script = {
	data() {
		return {
			collections: null,
			title: 'Outputs'
		};
	},
	components: {
		pageTitle: script$3,
		unrealOutputs: script$1
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

const _hoisted_1 = { class: "page-container" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_unrealOutputs = resolveComponent("unrealOutputs");
  const _component_private_view = resolveComponent("private-view");

  return (openBlock(), createBlock(_component_private_view, { title: "OUTPUTS" }, {
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1, [
        createVNode(_component_unrealOutputs)
      ])
    ]),
    _: 1 /* STABLE */
  }))
}

var css = ":root {\n    --light-blue: rgba(184, 223, 236, 0.5);\n  }\n/* ----------------------------------------------------------------------------------------------------\n\nSuper Form Reset\n\nA couple of things to watch out for:\n\n- IE8: If a text input doesn't have padding on all sides or none the text won't be centered.\n- The default border sizes on text inputs in all UAs seem to be slightly different. You're better off using custom borders.\n- You NEED to set the font-size and family on all form elements\n- Search inputs need to have their appearance reset and the box-sizing set to content-box to match other UAs\n- You can style the upload button in webkit using ::-webkit-file-upload-button\n- ::-webkit-file-upload-button selectors can't be used in the same selector as normal ones. FF and IE freak out.\n- IE: You don't need to fake inline-block with labels and form controls in IE. They function as inline-block.\n- By turning off ::-webkit-search-decoration, it removes the extra whitespace on the left on search inputs\n\n----------------------------------------------------------------------------------------------------*/\ninput,\nlabel,\nselect,\nbutton,\ntextarea\n{\n\tmargin:0;\n\tborder:0;\n\tpadding:0;\n\tdisplay:inline-block;\n\tvertical-align:middle;\n\twhite-space:normal;\n\tbackground:none;\n\tline-height:1;\n\t/* Browsers have different default form fonts */\n\tfont-size:13px;\n\tfont-family:Arial;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;    \n    box-sizing: border-box;\n}\n/* Remove the stupid outer glow in Webkit */\ninput:focus\n{\n\toutline:0;\n}\n/* Box Sizing Reset\n-----------------------------------------------*/\n/* All of our custom controls should be what we expect them to be */\ninput,\ntextarea\n{\n\t-webkit-box-sizing:content-box;\n\t-moz-box-sizing:content-box;\n\tbox-sizing:content-box;\n}\n/* These elements are usually rendered a certain way by the browser */\nbutton,\ninput[type=reset],\ninput[type=button],\ninput[type=submit],\ninput[type=checkbox],\ninput[type=radio],\nselect\n{\n\t-webkit-box-sizing:border-box;\n\t-moz-box-sizing:border-box;\n\tbox-sizing:border-box;\n}\n/* Text Inputs\n-----------------------------------------------*/\ninput[type=date],\ninput[type=datetime],\ninput[type=datetime-local],\ninput[type=email],\ninput[type=month],\ninput[type=number],\ninput[type=password],\ninput[type=range],\ninput[type=search],\ninput[type=tel],\ninput[type=text],\ninput[type=time],\ninput[type=url],\ninput[type=week]\n{\n}\n/* Button Controls\n-----------------------------------------------*/\ninput[type=checkbox],\ninput[type=radio]\n{\n\twidth:13px;\n\theight:13px;\n}\n/* File Uploads\n-----------------------------------------------*/\ninput[type=file]\n{\n\n}\n/* Search Input\n-----------------------------------------------*/\n/* Make webkit render the search input like a normal text field */\ninput[type=search]\n{\n\t-webkit-appearance:textfield;\n\t-webkit-box-sizing:content-box;\n}\n/* Turn off the recent search for webkit. It adds about 15px padding on the left */\n::-webkit-search-decoration\n{\n\tdisplay:none;\n}\n/* Buttons\n-----------------------------------------------*/\nbutton,\ninput[type=\"reset\"],\ninput[type=\"button\"],\ninput[type=\"submit\"]\n{\n\t/* Fix IE7 display bug */\n\toverflow:visible;\n\twidth:auto;\n}\n/* IE8 and FF freak out if this rule is within another selector */\n::-webkit-file-upload-button\n{\t\n\tpadding:0;\n\tborder:0;\n\tbackground:none;\n}\n/* Textarea\n-----------------------------------------------*/\ntextarea \n{\n\t/* Move the label to the top */\n\tvertical-align:top;\n\t\n\t/* Turn off scroll bars in IE unless needed */\n\toverflow:auto;\n}\n/* Selects\n-----------------------------------------------*/\nselect\n{\n\n}\nselect[multiple] \n{\n\t/* Move the label to the top */\n\tvertical-align:top;\n}\ninput, select{\n    width: 100%;\n    background-color: var(--light-blue);\n    padding: 5px;\n    border: 1px solid red;\n}\n.page-container{\n\t\tpadding: 32px 16px;\n\t\tcolor: black;\n}\n@media screen and (min-width: 600px) {\n.page-container{\n\t\t\tpadding: 0 32px;\n}\n}\n\n";
n(css,{});

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

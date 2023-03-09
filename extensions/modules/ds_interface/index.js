import '@directus/extensions-sdk';
import { openBlock, createElementBlock, createElementVNode, withDirectives, unref, vModelText, vModelSelect, pushScopeId, popScopeId, resolveComponent, Fragment, createVNode, createStaticVNode, createBlock, withCtx } from 'vue';

const _withScopeId$1 = n => (pushScopeId("data-v-c4d9ca46"),n=n(),popScopeId(),n);
const _hoisted_1$2 = { class: "row" };
const _hoisted_2$1 = { class: "lg-left bg-light-blue" };
const _hoisted_3$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "id"
}, "ID", -1 /* HOISTED */));
const _hoisted_4 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_5 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  id: "description",
  class: "label",
  for: "description"
}, "Description", -1 /* HOISTED */));
const _hoisted_6 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_7 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "device"
}, "device", -1 /* HOISTED */));
const _hoisted_8 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("option", { value: "uRad" }, "uRad", -1 /* HOISTED */));
const _hoisted_9 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("option", { value: "waterMonitor" }, "Water Monitor", -1 /* HOISTED */));
const _hoisted_10 = [
  _hoisted_8,
  _hoisted_9
];
const _hoisted_11 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_12 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "dataPoint"
}, "data Point", -1 /* HOISTED */));
const _hoisted_13 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("option", { value: "o2" }, "o2", -1 /* HOISTED */));
const _hoisted_14 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("option", { value: "temperature" }, "Temperature", -1 /* HOISTED */));
const _hoisted_15 = [
  _hoisted_13,
  _hoisted_14
];
const _hoisted_16 = { class: "lg-center bg-light-blue" };
const _hoisted_17 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "daliveDataValuetaPoint"
}, "Live Data Value", -1 /* HOISTED */));
const _hoisted_18 = { class: "lg-center bg-light-blue" };
const _hoisted_19 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "min"
}, "Min", -1 /* HOISTED */));
const _hoisted_20 = { class: "lg-center bg-light-blue" };
const _hoisted_21 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "max"
}, "Max", -1 /* HOISTED */));
const _hoisted_22 = { class: "lg-span-2 lg-center bg-light-blue" };
const _hoisted_23 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "liveOutputValue"
}, "Live Output Value", -1 /* HOISTED */));


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
        "liveOutputValue": 0.823
    }; 

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createElementVNode("div", _hoisted_2$1, [
      _hoisted_3$1,
      withDirectives(createElementVNode("input", {
        id: "id",
        class: "input",
        type: "text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(data).id) = $event)),
        disabled: ""
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, unref(data).id]
      ])
    ]),
    createElementVNode("div", _hoisted_4, [
      _hoisted_5,
      withDirectives(createElementVNode("textarea", {
        class: "input textarea",
        type: "textarea",
        wrap: "hard",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((unref(data).description) = $event))
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, unref(data).description]
      ])
    ]),
    createElementVNode("div", _hoisted_6, [
      _hoisted_7,
      withDirectives(createElementVNode("select", {
        id: "device",
        class: "input",
        type: "textarea",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((unref(data).device) = $event))
      }, _hoisted_10, 512 /* NEED_PATCH */), [
        [vModelSelect, unref(data).device]
      ])
    ]),
    createElementVNode("div", _hoisted_11, [
      _hoisted_12,
      withDirectives(createElementVNode("select", {
        id: "dataPoint",
        class: "input",
        type: "textarea",
        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((unref(data).dataPoint) = $event))
      }, _hoisted_15, 512 /* NEED_PATCH */), [
        [vModelSelect, unref(data).dataPoint]
      ])
    ]),
    createElementVNode("div", _hoisted_16, [
      _hoisted_17,
      withDirectives(createElementVNode("input", {
        id: "liveDataValue",
        class: "input lg-center",
        type: "text",
        "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((unref(data).liveDataValue) = $event)),
        disabled: ""
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, unref(data).liveDataValue]
      ])
    ]),
    createElementVNode("div", _hoisted_18, [
      _hoisted_19,
      withDirectives(createElementVNode("input", {
        id: "min",
        class: "input lg-center",
        type: "text",
        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((unref(data).min) = $event)),
        disabled: ""
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, unref(data).min]
      ])
    ]),
    createElementVNode("div", _hoisted_20, [
      _hoisted_21,
      withDirectives(createElementVNode("input", {
        id: "max",
        class: "input lg-center",
        type: "text",
        "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((unref(data).max) = $event)),
        disabled: ""
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, unref(data).max]
      ])
    ]),
    createElementVNode("div", _hoisted_22, [
      _hoisted_23,
      withDirectives(createElementVNode("input", {
        id: "liveOutputValue",
        class: "input lg-center",
        type: "text",
        "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((unref(data).liveOutputValue) = $event)),
        disabled: ""
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, unref(data).liveOutputValue]
      ])
    ])
  ]))
}
}

};

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css$2 = "/* ----------------------------------------------------------------------------------------------------\n\nSuper Form Reset\n\nA couple of things to watch out for:\n\n- IE8: If a text input doesn't have padding on all sides or none the text won't be centered.\n- The default border sizes on text inputs in all UAs seem to be slightly different. You're better off using custom borders.\n- You NEED to set the font-size and family on all form elements\n- Search inputs need to have their appearance reset and the box-sizing set to content-box to match other UAs\n- You can style the upload button in webkit using ::-webkit-file-upload-button\n- ::-webkit-file-upload-button selectors can't be used in the same selector as normal ones. FF and IE freak out.\n- IE: You don't need to fake inline-block with labels and form controls in IE. They function as inline-block.\n- By turning off ::-webkit-search-decoration, it removes the extra whitespace on the left on search inputs\n\n----------------------------------------------------------------------------------------------------*/\n\ninput,\nlabel,\nselect,\nbutton,\ntextarea\n{\n\tmargin:0;\n\tborder:0;\n\tpadding:0;\n\tdisplay:inline-block;\n\tvertical-align:middle;\n\twhite-space:normal;\n\tbackground:none;\n\tline-height:1;\n\t/* Browsers have different default form fonts */\n\tfont-size:inherit;\n\tfont-family:inherit;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;    \n    box-sizing: border-box;\n}\n\n/* Remove the stupid outer glow in Webkit */\ninput:focus\n{\n\toutline:0;\n}\n\n/* Box Sizing Reset\n-----------------------------------------------*/\n\n/* All of our custom controls should be what we expect them to be */\n/* input,\ntextarea\n{\n\t-webkit-box-sizing:content-box;\n\t-moz-box-sizing:content-box;\n\tbox-sizing:content-box;\n} */\n\n/* These elements are usually rendered a certain way by the browser */\nbutton,\ninput[type=reset],\ninput[type=button],\ninput[type=submit],\ninput[type=checkbox],\ninput[type=radio],\nselect\n{\n\t-webkit-box-sizing:border-box;\n\t-moz-box-sizing:border-box;\n\tbox-sizing:border-box;\n}\n\n/* Text Inputs\n-----------------------------------------------*/\n\ninput[type=date],\ninput[type=datetime],\ninput[type=datetime-local],\ninput[type=email],\ninput[type=month],\ninput[type=number],\ninput[type=password],\ninput[type=range],\ninput[type=search],\ninput[type=tel],\ninput[type=text],\ninput[type=time],\ninput[type=url],\ninput[type=week]\n{\n}\n\n/* Button Controls\n-----------------------------------------------*/\n\ninput[type=checkbox],\ninput[type=radio]\n{\n\twidth:13px;\n\theight:13px;\n}\n\n/* File Uploads\n-----------------------------------------------*/\n\ninput[type=file]\n{\n\n}\n\n/* Search Input\n-----------------------------------------------*/\n\n/* Make webkit render the search input like a normal text field */\ninput[type=search]\n{\n\t-webkit-appearance:textfield;\n\t/* -webkit-box-sizing:content-box; */\n}\n\n/* Turn off the recent search for webkit. It adds about 15px padding on the left */\n::-webkit-search-decoration\n{\n\tdisplay:none;\n}\n\n/* Buttons\n-----------------------------------------------*/\n\nbutton,\ninput[type=\"reset\"],\ninput[type=\"button\"],\ninput[type=\"submit\"]\n{\n\t/* Fix IE7 display bug */\n\toverflow:visible;\n\twidth:auto;\n}\n\n/* IE8 and FF freak out if this rule is within another selector */\n::-webkit-file-upload-button\n{\t\n\tpadding:0;\n\tborder:0;\n\tbackground:none;\n}\n\n/* Textarea\n-----------------------------------------------*/\n\ntextarea \n{\n\t/* Move the label to the top */\n\tvertical-align:top;\n\t/* Turn off scroll bars in IE unless needed */\n\toverflow:auto;\n\tresize: vertical;\n\twhite-space: pre-wrap;\n}\n\n/* Selects\n-----------------------------------------------*/\n\nselect\n{\n\n}\n\nselect[multiple] \n{\n\t/* Move the label to the top */\n\tvertical-align:top;\n}\n\n\n\n.input{\n\twidth: 100% !important;\n\t-webkit-box-sizing: border-box;\n\t-moz-box-sizing: border-box;    \n\tbox-sizing: border-box;\n\tbackground-color: var(--light-blue);\n\tpadding: 8px;\n\tfont-size: 14px;\n\tmin-height: 35px;\n}\n\n.input:enabled:hover{\n\tbackground-color: var(--hover-bg);\n}\n\nselect:hover{\n\tcursor: pointer;\n}\n\n.input:disabled{\n\tcursor: not-allowed;\n}\n.row[data-v-c4d9ca46]{\n        display: grid;\n        grid-template-columns: 1fr;\n        margin-bottom: 1em;\n        border: 1px solid grey;\n        border-radius: 5px;\n        overflow: hidden;\n}\n.row div[data-v-c4d9ca46]{\n        display: grid;\n        grid-template-columns: 150px 1fr;\n        border-bottom: 1px solid grey;\n}\n.row div[data-v-c4d9ca46]:last-child{\n        border-bottom: 0px;\n}\nlabel[data-v-c4d9ca46]{\n        padding: 8px;\n        font-weight: 700;\n        font-size: 12px;\n        text-transform: capitalize;\n        border-right: 1px solid grey;\n        background-color: var(--light-blue);\n}\n@media screen and (min-width: 1200px) {\n.label[data-v-c4d9ca46]{\n            clip: rect(0 0 0 0);\n            clip-path: inset(50%);\n            height: 1px;\n            overflow: hidden;\n            position: absolute;\n            white-space: nowrap;\n            width: 1px;\n}\n.row[data-v-c4d9ca46]{\n            display: grid;\n            grid-template-columns: repeat(12, 1fr);\n            grid-gap: 1px;\n            width: 100%;\n            margin-bottom: 2px;\n            border: 0px;\n}\n.row div[data-v-c4d9ca46]{\n            display: block;\n            grid-template-columns: 150px 1fr;\n            border-bottom: 0px;\n}\n.lg-span-2[data-v-c4d9ca46]{\n            grid-column: span 2;\n}\n.lg-center[data-v-c4d9ca46]{\n            text-align: center;\n}\n.lg-left[data-v-c4d9ca46]{\n            text-align: left;\n}\n.table-header div[data-v-c4d9ca46]{\n            display: initial;\n            font-size: 12px;\n            font-weight: bold;\n}\n.row div[data-v-c4d9ca46]{\n            overflow: hidden;\n            /* background-color: var(--light-blue); */\n}\n.row:hover .input[data-v-c4d9ca46]{\n            background-color: var(--pale-green);\n}\n.row:hover .input[data-v-c4d9ca46]:enabled:hover{\n            background-color: var(--hover-bg);\n}\n.row:hover .input[data-v-c4d9ca46]:disabled:hover{\n            background-color: var(--light-grey);\n}\ntextarea[data-v-c4d9ca46]{\n            height: 35px;\n            padding-top: 10px;\n}\n}\n\n";
n(css$2,{});

script$2.__scopeId = "data-v-c4d9ca46";
script$2.__file = "src/components/outputTableRow.vue";

var script$1 = {
        components: {
            outputTableRow: script$2
        },
        mounted() {

        }
    };

const _withScopeId = n => (pushScopeId("data-v-71f43e7b"),n=n(),popScopeId(),n);
const _hoisted_1$1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("h2", null, "Unreal Engine", -1 /* HOISTED */));
const _hoisted_2 = { class: "table" };
const _hoisted_3 = /*#__PURE__*/createStaticVNode("<div class=\"row table-header\" data-v-71f43e7b><div class=\"lg-left\" data-v-71f43e7b>ID</div><div class=\"lg-span-2 lg-left\" data-v-71f43e7b>Description</div><div class=\"lg-span-2 lg-left\" data-v-71f43e7b>Source Device</div><div class=\"lg-span-2 lg-left\" data-v-71f43e7b>Data Point</div><div class=\"lg-center\" data-v-71f43e7b>Live Data Value</div><div class=\"lg-center\" data-v-71f43e7b>Min</div><div class=\"lg-center\" data-v-71f43e7b>Max</div><div class=\"lg-center lg-span-2\" data-v-71f43e7b>Live Output</div></div>", 1);

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_outputTableRow = resolveComponent("outputTableRow");

  return (openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1$1,
    createElementVNode("div", _hoisted_2, [
      _hoisted_3,
      createVNode(_component_outputTableRow),
      createVNode(_component_outputTableRow),
      createVNode(_component_outputTableRow),
      createVNode(_component_outputTableRow)
    ])
  ], 64 /* STABLE_FRAGMENT */))
}

var css$1 = "\nh2[data-v-71f43e7b]{\n        font-size: 1.25em;\n        padding: 1em 0;\n        border-top: 1px solid black;\n        border-bottom: 1px solid black;\n        text-transform: uppercase;\n}\n.table-header div[data-v-71f43e7b]{\n        display: none;\n}\n.table[data-v-71f43e7b]{\n        padding-top: 2em;\n}\n@media screen and (min-width: 1200px) {\n.row[data-v-71f43e7b]{\n            display: grid;\n            grid-template-columns: repeat(12, 1fr);\n            grid-gap: 2px;\n            width: 100%;\n}\n.lg-span-2[data-v-71f43e7b]{\n            grid-column: span 2;\n}\n.lg-center[data-v-71f43e7b]{\n            text-align: center;\n}\n.lg-left[data-v-71f43e7b]{\n            text-align: left;\n}\n.table-header div[data-v-71f43e7b]{\n            display: initial;\n            font-size: 12px;\n            font-weight: bold;\n            line-height: 15px;\n            padding-bottom: .5em;\n}\n}\n\n";
n(css$1,{});

script$1.render = render$1;
script$1.__scopeId = "data-v-71f43e7b";
script$1.__file = "src/components/unrealOutputs.vue";

var script = {
	data() {
		return {
			collections: null,
			title: 'Outputs'
		};
	},
	components: {
		// pageTitle,
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

var css = ":root {\n    --light-blue: #DBEFF5;\n    --hover-bg: #BDFF00;\n    --pale-green: #DFFF84;\n    --light-grey: #f5f5f5;\n  }\n\t/* @import url('./assets/css/forms.css'); */\n.page-container{\n\t\tpadding: 32px 16px;\n\t\tcolor: black;\n}\n@media screen and (min-width: 600px) {\n.page-container{\n\t\t\tpadding: 0 48px;\n}\n}\n\n";
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

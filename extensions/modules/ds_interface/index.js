import { ref, inject, computed, watch, openBlock, createElementBlock, createElementVNode, withDirectives, vModelText, Fragment, renderList, unref, toDisplayString, vModelSelect, pushScopeId, popScopeId, createBlock, createStaticVNode, onMounted, provide, resolveComponent, withCtx, createCommentVNode, createVNode, createTextVNode } from 'vue';
import { useApi } from '@directus/extensions-sdk';

const _withScopeId = n => (pushScopeId("data-v-c4d9ca46"),n=n(),popScopeId(),n);
const _hoisted_1$2 = { class: "row" };
const _hoisted_2$2 = { class: "lg-left bg-light-blue" };
const _hoisted_3$1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "name"
}, "Name", -1 /* HOISTED */));
const _hoisted_4 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  id: "description",
  class: "label",
  for: "description"
}, "Description", -1 /* HOISTED */));
const _hoisted_6 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_7 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "device"
}, "device", -1 /* HOISTED */));
const _hoisted_8 = ["value"];
const _hoisted_9 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_10 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "dataPoint"
}, "data Point", -1 /* HOISTED */));
const _hoisted_11 = ["value"];
const _hoisted_12 = { class: "lg-center bg-light-blue" };
const _hoisted_13 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "daliveDataValuetaPoint"
}, "Live Data Value", -1 /* HOISTED */));
const _hoisted_14 = { class: "lg-center bg-light-blue" };
const _hoisted_15 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "min"
}, "Min", -1 /* HOISTED */));
const _hoisted_16 = { class: "lg-center bg-light-blue" };
const _hoisted_17 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "max"
}, "Max", -1 /* HOISTED */));
const _hoisted_18 = { class: "lg-span-2 lg-center bg-light-blue" };
const _hoisted_19 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "liveOutputValue"
}, "Live Output Value", -1 /* HOISTED */));

    
var script$2 = {
  __name: 'outputTableRow',
  props: ['output'],
  setup(__props) {

const props = __props;

    

    const api = useApi();

    const id = ref(props.output.id);
    const name = ref(props.output.name);
    const description = ref(props.output.description);
    const data_source = ref(props.output.data_source);
    const data_type = ref(props.output.data_type);
    const liveDataValue = ref(1.234);
    const min = ref(props.output.min);
    const max = ref(props.output.max);
    const liveOutputValue = ref(0.823);
    const updated = ref(false);
    
    const { save, outputSaved, outputUpdated } = inject('update');

    const data_sources = inject('data_sources');
    const data_types = inject('data_types');

    const cur_data_types = computed(() =>{
        return data_types[data_source.value]
    });

    const update = () => {
        if (!updated.value){
            updated.value = true;
            outputUpdated();
        }
            
    };

    const checkMinMax = () => {
        if (!min.value) {
            min.value = 0;
        }
        if (!max.value) {
            max.value = 1;
        }
    };

    watch(save, async (newVal) => {
        if (newVal){
            console.log('component saved');
            let new_output_data = {
                'data_source': data_source.value,
                'data_type': data_type.value,
                'description': description.value,
                'min': min.value,
                'max': max.value
            };
            let res = await api.patch('/items/outputs/'+id.value, new_output_data);
            console.log(res);
            // saving logic here...
            updated.value = false;
            // emit save
            outputSaved();

        }
    });

    watch(min, (newMin, oldMin) =>{
        if (0 > newMin || newMin > 1 || newMin >= max.value){
            min.value = oldMin;
            return
        }
        update();
    });

    watch(max, (newMax, oldMax) =>{
        console.log(newMax);
        if (!newMax){
            return
        }
        if (0 > newMax || newMax > 1 || newMax <= min.value){
            max.value = oldMax;
            return
        }
        update();
    });




return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createElementVNode("div", _hoisted_2$2, [
      _hoisted_3$1,
      withDirectives(createElementVNode("input", {
        id: "name",
        class: "input",
        type: "text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((name).value = $event)),
        disabled: ""
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, name.value]
      ])
    ]),
    createElementVNode("div", _hoisted_4, [
      _hoisted_5,
      withDirectives(createElementVNode("textarea", {
        class: "input textarea",
        type: "textarea",
        wrap: "hard",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((description).value = $event)),
        onInput: _cache[2] || (_cache[2] = $event => (update()))
      }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
        [vModelText, description.value]
      ])
    ]),
    createElementVNode("div", _hoisted_6, [
      _hoisted_7,
      withDirectives(createElementVNode("select", {
        id: "device",
        class: "input",
        type: "textarea",
        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((data_source).value = $event)),
        onInput: _cache[4] || (_cache[4] = $event => (update()))
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(data_sources), (source) => {
          return (openBlock(), createElementBlock("option", {
            key: source,
            value: source
          }, toDisplayString(source), 9 /* TEXT, PROPS */, _hoisted_8))
        }), 128 /* KEYED_FRAGMENT */))
      ], 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
        [vModelSelect, data_source.value]
      ])
    ]),
    createElementVNode("div", _hoisted_9, [
      _hoisted_10,
      withDirectives(createElementVNode("select", {
        id: "dataPoint",
        class: "input",
        type: "textarea",
        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((data_type).value = $event)),
        onInput: _cache[6] || (_cache[6] = $event => (update()))
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(cur_data_types), (type) => {
          return (openBlock(), createElementBlock("option", {
            key: type,
            value: type
          }, toDisplayString(type), 9 /* TEXT, PROPS */, _hoisted_11))
        }), 128 /* KEYED_FRAGMENT */))
      ], 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
        [vModelSelect, data_type.value]
      ])
    ]),
    createElementVNode("div", _hoisted_12, [
      _hoisted_13,
      withDirectives(createElementVNode("input", {
        id: "liveDataValue",
        class: "input lg-center",
        type: "text",
        "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((liveDataValue).value = $event)),
        disabled: ""
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, liveDataValue.value]
      ])
    ]),
    createElementVNode("div", _hoisted_14, [
      _hoisted_15,
      withDirectives(createElementVNode("input", {
        id: "min",
        class: "input lg-center",
        type: "number",
        min: "0",
        max: "1",
        step: "0.001",
        "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((min).value = $event)),
        onChange: _cache[9] || (_cache[9] = $event => (checkMinMax()))
      }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
        [vModelText, min.value]
      ])
    ]),
    createElementVNode("div", _hoisted_16, [
      _hoisted_17,
      withDirectives(createElementVNode("input", {
        id: "max",
        class: "input lg-center",
        type: "number",
        min: "0",
        max: "1",
        step: "0.001",
        "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((max).value = $event)),
        onChange: _cache[11] || (_cache[11] = $event => (checkMinMax()))
      }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
        [vModelText, max.value]
      ])
    ]),
    createElementVNode("div", _hoisted_18, [
      _hoisted_19,
      withDirectives(createElementVNode("input", {
        id: "liveOutputValue",
        class: "input lg-center",
        type: "text",
        "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((liveOutputValue).value = $event)),
        disabled: ""
      }, null, 512 /* NEED_PATCH */), [
        [vModelText, liveOutputValue.value]
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

const _hoisted_1$1 = { class: "table" };
const _hoisted_2$1 = /*#__PURE__*/createStaticVNode("<div class=\"row table-header\" data-v-345ca9e7><div class=\"lg-left\" data-v-345ca9e7>Name</div><div class=\"lg-span-2 lg-left\" data-v-345ca9e7>Description</div><div class=\"lg-span-2 lg-left\" data-v-345ca9e7>Source Device</div><div class=\"lg-span-2 lg-left\" data-v-345ca9e7>Data Point</div><div class=\"lg-center\" data-v-345ca9e7>Live Data Value</div><div class=\"lg-center\" data-v-345ca9e7>Min</div><div class=\"lg-center\" data-v-345ca9e7>Max</div><div class=\"lg-center lg-span-2\" data-v-345ca9e7>Live Output</div></div>", 1);

    
var script$1 = {
  __name: 'clientOutputs',
  props: ['all_outputs', 'clientTitle', 'client'],
  setup(__props) {

const props = __props;

    

    const outputs = computed(() => {
        return props.all_outputs.filter((output) => output.clients == props.client)
    });


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createElementVNode("h2", null, toDisplayString(__props.clientTitle), 1 /* TEXT */),
    createElementVNode("div", _hoisted_1$1, [
      _hoisted_2$1,
      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(outputs), (output) => {
        return (openBlock(), createBlock(script$2, {
          key: output.name,
          output: output
        }, null, 8 /* PROPS */, ["output"]))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

var css$1 = "\nh2[data-v-345ca9e7]{\n        font-size: 1.25em;\n        padding: 1em 0;\n        border-top: 1px solid black;\n        border-bottom: 1px solid black;\n        text-transform: uppercase;\n}\n.table-header div[data-v-345ca9e7]{\n        display: none;\n}\n.table[data-v-345ca9e7]{\n        padding-top: 2em;\n}\n@media screen and (min-width: 1200px) {\n.row[data-v-345ca9e7]{\n            display: grid;\n            grid-template-columns: repeat(12, 1fr);\n            grid-gap: 2px;\n            width: 100%;\n}\n.lg-span-2[data-v-345ca9e7]{\n            grid-column: span 2;\n}\n.lg-center[data-v-345ca9e7]{\n            text-align: center;\n}\n.lg-left[data-v-345ca9e7]{\n            text-align: left;\n}\n.table-header div[data-v-345ca9e7]{\n            display: initial;\n            font-size: 12px;\n            font-weight: bold;\n            line-height: 15px;\n            padding-bottom: .5em;\n}\n}\n\n";
n(css$1,{});

script$1.__scopeId = "data-v-345ca9e7";
script$1.__file = "src/components/clientOutputs.vue";

const _hoisted_1 = { class: "page-container" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 1 };

	
var script = {
  __name: 'module',
  setup(__props) {

	// import pageTitle from './components/pageTitle.vue';
	const api = useApi();

	const allUpdates = ref(0);
	const save = ref(false);

	const data_sources = ref([]);
	const data_types = ref({});
	var all_outputs = ref([]);
	
	const outputSaved = () => {
		console.log("1 ouput saved");
		if (allUpdates.value > 0){
			allUpdates.value -= 1;
			if (allUpdates.value == 0){
				save.value = false;
			}
		}
	};

	const outputUpdated = () => {
		console.log("1 ouput updated");
		allUpdates.value  += 1;
	};

	const doSave = () => {
		save.value = true;
	};

	onMounted( async () => {
		api.get('/items/data_sources').then((res) => {
            res.data.data.forEach(source => { 
                data_sources.value.push(source.name);
                api.get('items/'+source.name+'?limit=1').then((res) => {
                    let keys = Object.keys(res.data.data[0]);
                    let dt = keys.filter((key) => key != 'id' && key != 'date_created');
                    data_types.value[source.name] = dt;
                });
            });
        });
        console.log(data_sources.value);
        console.log(data_types.value);
        provide('data_sources', data_sources.value);
        provide('data_types', data_types.value);

        let res = await api.get('/items/outputs');

    	console.log(res.data.data);
        all_outputs.value = res.data.data;

        console.log(all_outputs.value);
	});

	provide('update',{ save, outputSaved, outputUpdated });

	ref('Outputs');



return (_ctx, _cache) => {
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_list_item_icon = resolveComponent("v-list-item-icon");
  const _component_v_list_item_content = resolveComponent("v-list-item-content");
  const _component_v_list_item = resolveComponent("v-list-item");
  const _component_v_list = resolveComponent("v-list");
  const _component_private_view = resolveComponent("private-view");

  return (openBlock(), createBlock(_component_private_view, { title: "OUTPUTS" }, {
    navigation: withCtx(() => [
      createCommentVNode(" This goes in the navigation bar! "),
      createVNode(_component_v_list, { nav: "true" }, {
        default: withCtx(() => [
          createVNode(_component_v_list_item, { to: "/ds_interface" }, {
            default: withCtx(() => [
              createVNode(_component_v_list_item_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_v_icon, { name: "label" })
                ]),
                _: 1 /* STABLE */
              }),
              createVNode(_component_v_list_item_content, null, {
                default: withCtx(() => [
                  createTextVNode("Output")
                ]),
                _: 1 /* STABLE */
              })
            ]),
            _: 1 /* STABLE */
          }),
          createVNode(_component_v_list_item, null, {
            default: withCtx(() => [
              createVNode(_component_v_list_item_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_v_icon, { name: "label" })
                ]),
                _: 1 /* STABLE */
              }),
              createVNode(_component_v_list_item_content, null, {
                default: withCtx(() => [
                  createTextVNode("System")
                ]),
                _: 1 /* STABLE */
              })
            ]),
            _: 1 /* STABLE */
          })
        ]),
        _: 1 /* STABLE */
      })
    ]),
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1, [
        createVNode(script$1, {
          all_outputs: unref(all_outputs),
          client: "unreal",
          clientTitle: "Unreal Engine"
        }, null, 8 /* PROPS */, ["all_outputs"]),
        createVNode(script$1, {
          all_outputs: unref(all_outputs),
          client: "midi",
          clientTitle: "MIDI"
        }, null, 8 /* PROPS */, ["all_outputs"])
      ]),
      (allUpdates.value > 0)
        ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: _cache[0] || (_cache[0] = $event => (doSave()))
          }, [
            (!save.value)
              ? (openBlock(), createElementBlock("span", _hoisted_2, "Save"))
              : (openBlock(), createElementBlock("span", _hoisted_3, "Saving..."))
          ]))
        : createCommentVNode("v-if", true)
    ]),
    _: 1 /* STABLE */
  }))
}
}

};

var css = ":root {\n    --light-blue: #DBEFF5;\n    --hover-bg: #BDFF00;\n    --pale-green: #DFFF84;\n    --light-grey: #f5f5f5;\n  }\n\t/* @import url('./assets/css/forms.css'); */\n.page-container{\n\t\tpadding: 32px 16px;\n\t\tcolor: black;\n}\n@media screen and (min-width: 600px) {\n.page-container{\n\t\t\tpadding: 0 48px;\n}\n}\n\n";
n(css,{});

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

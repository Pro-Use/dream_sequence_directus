import { ref, inject, computed, watch, resolveComponent, openBlock, createElementBlock, Fragment, createElementVNode, normalizeClass, withDirectives, vModelText, renderList, unref, toDisplayString, vModelSelect, createVNode, createTextVNode, pushScopeId, popScopeId, createBlock, createStaticVNode, onMounted, provide, withCtx, createCommentVNode } from 'vue';
import { useApi } from '@directus/extensions-sdk';

const _withScopeId$1 = n => (pushScopeId("data-v-c4d9ca46"),n=n(),popScopeId(),n);
const _hoisted_1$3 = { class: "lg-left bg-light-blue" };
const _hoisted_2$3 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "name"
}, "Name", -1 /* HOISTED */));
const _hoisted_3$3 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_4$2 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  id: "description",
  class: "label",
  for: "description"
}, "Description", -1 /* HOISTED */));
const _hoisted_5$2 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_6$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "device"
}, "device", -1 /* HOISTED */));
const _hoisted_7$1 = ["value"];
const _hoisted_8$1 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_9$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "dataPoint"
}, "data Point", -1 /* HOISTED */));
const _hoisted_10$1 = ["value"];
const _hoisted_11$1 = { class: "lg-center bg-light-blue" };
const _hoisted_12$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "min"
}, "Min", -1 /* HOISTED */));
const _hoisted_13$1 = { class: "lg-center bg-light-blue" };
const _hoisted_14$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "max"
}, "Max", -1 /* HOISTED */));
const _hoisted_15$1 = { class: "lg-center lg-span-2 bg-light-blue" };
const _hoisted_16$1 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "liveOutputValue"
}, "Live Output Value", -1 /* HOISTED */));
const _hoisted_17$1 = ["value"];
const _hoisted_18$1 = { class: "lg-center bg-light-blue" };

    
var script$3 = {
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
    const min = ref(props.output.min);
    const max = ref(props.output.max);
    const updated = ref(false);
    const deleting = ref(false);
    const errors = ref([]);

    const prev_vals = {
        name: props.output.name,
        description: props.output.description,
        data_source: props.output.data_source,
        data_type: props.output.data_type,
        min: props.output.min,
        max: props.output.max,
    };
    
    const { save, discard, outputSaved, outputUpdated, outputFailed } = inject('update');
    const { all_outputs } = inject('add');

    const data_sources = inject('data_sources');
    const data_types = inject('data_types');
    const deleteOutput = inject('delete');

    const output_vals = inject('output_vals');

    const cur_data_types = computed(() =>{
        let val = data_types[data_source.value];
        if (val){
            return val
        } else {
            return '-'
        }
    });

    const latest_val = computed(() => {
        return output_vals.value[name.value]
    });

    const update = () => {
        if (!updated.value){
            updated.value = true;
            outputUpdated();
        }
            
    };

    const preDelete = () => {
        deleting.value = setTimeout(() => {
            clearTimeout(deleting.value);
            deleting.value = false;
        }, 3000);
    };

    const doDelete = () => {
        deleteOutput(id.value);
        clearTimeout(deleting.value);
    };

    const checkMinMax = () => {
        if (!min.value) {
            min.value = 0;
        }
        if (!max.value) {
            max.value = 1;
        }
    };

    const validate = () => {
        errors.value = [];
        if (name.value.length == 0){
            errors.value.push('Output name cannot be blank');
        } else {
            if(prev_vals.name != name.value){
                let check_name = all_outputs.value.filter((output) => output.name == name.value);
                if (check_name.length > 0){
                    errors.value.push('An output named "'+name.value+'" already exists');
                }
            }
        }
        if (data_source.value == null){
            errors.value.push('Output must have a data source');
        } else if (data_type.value == null) {
            errors.value.push('Output must have a data type');
        }
        if (errors.value.length != 0) {
            outputFailed();
            return false
        } else {
            return true
        }

    };

    watch(save, async (newVal) => {
        if (newVal && updated.value){
            if (validate()){
                console.log('component saving');
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
                prev_vals.name = name.value;
                prev_vals.description = description.value;
                prev_vals.data_source = data_source.value;
                prev_vals.data_type = data_type.value;
                prev_vals.min = min.value;
                prev_vals.max = max.value;
                console.log(prev_vals);
            }
        }
    });

    watch(discard, (newVal) => {
        if(newVal && updated.value){
            name.value = prev_vals.name; 
            description.value = prev_vals.description;
            data_source.value = prev_vals.data_source;
            data_type.value = prev_vals.data_type;
            min.value = prev_vals.min;
            max.value = prev_vals.max;
            updated.value = false;
            // emit discard
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
  const _component_v_icon = resolveComponent("v-icon");

  return (openBlock(), createElementBlock(Fragment, null, [
    createElementVNode("div", {
      class: normalizeClass([{'updated':updated.value, 'not-updated':!updated.value}, "row"])
    }, [
      createElementVNode("div", _hoisted_1$3, [
        _hoisted_2$3,
        withDirectives(createElementVNode("input", {
          id: "name",
          class: "input",
          type: "text",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((name).value = $event)),
          onInput: _cache[1] || (_cache[1] = $event => (update()))
        }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
          [vModelText, name.value]
        ])
      ]),
      createElementVNode("div", _hoisted_3$3, [
        _hoisted_4$2,
        withDirectives(createElementVNode("textarea", {
          class: "input textarea",
          type: "textarea",
          wrap: "hard",
          "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((description).value = $event)),
          onInput: _cache[3] || (_cache[3] = $event => (update()))
        }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
          [vModelText, description.value]
        ])
      ]),
      createElementVNode("div", _hoisted_5$2, [
        _hoisted_6$1,
        withDirectives(createElementVNode("select", {
          id: "device",
          class: "input",
          type: "textarea",
          "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((data_source).value = $event)),
          onInput: _cache[5] || (_cache[5] = $event => (update()))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(data_sources), (source) => {
            return (openBlock(), createElementBlock("option", {
              key: source,
              value: source
            }, toDisplayString(source), 9 /* TEXT, PROPS */, _hoisted_7$1))
          }), 128 /* KEYED_FRAGMENT */))
        ], 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
          [vModelSelect, data_source.value]
        ])
      ]),
      createElementVNode("div", _hoisted_8$1, [
        _hoisted_9$1,
        withDirectives(createElementVNode("select", {
          id: "dataPoint",
          class: "input",
          type: "textarea",
          "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((data_type).value = $event)),
          onInput: _cache[7] || (_cache[7] = $event => (update()))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(cur_data_types), (type) => {
            return (openBlock(), createElementBlock("option", {
              key: type,
              value: type
            }, toDisplayString(type), 9 /* TEXT, PROPS */, _hoisted_10$1))
          }), 128 /* KEYED_FRAGMENT */))
        ], 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
          [vModelSelect, data_type.value]
        ])
      ]),
      createElementVNode("div", _hoisted_11$1, [
        _hoisted_12$1,
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
      createElementVNode("div", _hoisted_13$1, [
        _hoisted_14$1,
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
      createElementVNode("div", _hoisted_15$1, [
        _hoisted_16$1,
        createElementVNode("input", {
          id: "liveOutputValue",
          class: "input lg-center",
          type: "text",
          value: unref(latest_val),
          disabled: ""
        }, null, 8 /* PROPS */, _hoisted_17$1)
      ]),
      createElementVNode("div", _hoisted_18$1, [
        (!deleting.value)
          ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "del-buttons",
              onClick: _cache[12] || (_cache[12] = $event => (preDelete()))
            }, [
              createVNode(_component_v_icon, { name: "delete" })
            ]))
          : (openBlock(), createElementBlock("button", {
              key: 1,
              class: "del-buttons",
              onClick: _cache[13] || (_cache[13] = $event => (doDelete()))
            }, "Delete?"))
      ])
    ], 2 /* CLASS */),
    createElementVNode("div", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(errors.value, (error) => {
        return (openBlock(), createElementBlock("div", {
          class: "lg-span-2 error",
          key: _ctx.errror
        }, [
          createVNode(_component_v_icon, { name: "error" }),
          createTextVNode(" " + toDisplayString(error), 1 /* TEXT */)
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css$3 = "/* ----------------------------------------------------------------------------------------------------\n\nSuper Form Reset\n\nA couple of things to watch out for:\n\n- IE8: If a text input doesn't have padding on all sides or none the text won't be centered.\n- The default border sizes on text inputs in all UAs seem to be slightly different. You're better off using custom borders.\n- You NEED to set the font-size and family on all form elements\n- Search inputs need to have their appearance reset and the box-sizing set to content-box to match other UAs\n- You can style the upload button in webkit using ::-webkit-file-upload-button\n- ::-webkit-file-upload-button selectors can't be used in the same selector as normal ones. FF and IE freak out.\n- IE: You don't need to fake inline-block with labels and form controls in IE. They function as inline-block.\n- By turning off ::-webkit-search-decoration, it removes the extra whitespace on the left on search inputs\n\n----------------------------------------------------------------------------------------------------*/\n\ninput,\nlabel,\nselect,\nbutton,\ntextarea\n{\n\tmargin:0;\n\tborder:0;\n\tpadding:0;\n\tdisplay:inline-block;\n\tvertical-align:middle;\n\twhite-space:normal;\n\tbackground:none;\n\tline-height:1;\n\t/* Browsers have different default form fonts */\n\tfont-size:inherit;\n\tfont-family:inherit;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;    \n    box-sizing: border-box;\n}\n\n/* Remove the stupid outer glow in Webkit */\ninput:focus\n{\n\toutline:0;\n}\n\n/* Box Sizing Reset\n-----------------------------------------------*/\n\n/* All of our custom controls should be what we expect them to be */\n/* input,\ntextarea\n{\n\t-webkit-box-sizing:content-box;\n\t-moz-box-sizing:content-box;\n\tbox-sizing:content-box;\n} */\n\n/* These elements are usually rendered a certain way by the browser */\nbutton,\ninput[type=reset],\ninput[type=button],\ninput[type=submit],\ninput[type=checkbox],\ninput[type=radio],\nselect\n{\n\t-webkit-box-sizing:border-box;\n\t-moz-box-sizing:border-box;\n\tbox-sizing:border-box;\n}\n\n/* Text Inputs\n-----------------------------------------------*/\n\ninput[type=date],\ninput[type=datetime],\ninput[type=datetime-local],\ninput[type=email],\ninput[type=month],\ninput[type=number],\ninput[type=password],\ninput[type=range],\ninput[type=search],\ninput[type=tel],\ninput[type=text],\ninput[type=time],\ninput[type=url],\ninput[type=week]\n{\n}\n\n/* Button Controls\n-----------------------------------------------*/\n\ninput[type=checkbox],\ninput[type=radio]\n{\n\twidth:13px;\n\theight:13px;\n}\n\n/* File Uploads\n-----------------------------------------------*/\n\ninput[type=file]\n{\n\n}\n\n/* Search Input\n-----------------------------------------------*/\n\n/* Make webkit render the search input like a normal text field */\ninput[type=search]\n{\n\t-webkit-appearance:textfield;\n\t/* -webkit-box-sizing:content-box; */\n}\n\n/* Turn off the recent search for webkit. It adds about 15px padding on the left */\n::-webkit-search-decoration\n{\n\tdisplay:none;\n}\n\n/* Buttons\n-----------------------------------------------*/\n\nbutton,\ninput[type=\"reset\"],\ninput[type=\"button\"],\ninput[type=\"submit\"]\n{\n\t/* Fix IE7 display bug */\n\toverflow:visible;\n\twidth:auto;\n}\n\n/* IE8 and FF freak out if this rule is within another selector */\n::-webkit-file-upload-button\n{\t\n\tpadding:0;\n\tborder:0;\n\tbackground:none;\n}\n\n/* Textarea\n-----------------------------------------------*/\n\ntextarea \n{\n\t/* Move the label to the top */\n\tvertical-align:top;\n\t/* Turn off scroll bars in IE unless needed */\n\toverflow:auto;\n\tresize: vertical;\n\twhite-space: pre-wrap;\n}\n\n/* Selects\n-----------------------------------------------*/\n\nselect\n{\n\n}\n\nselect[multiple] \n{\n\t/* Move the label to the top */\n\tvertical-align:top;\n}\n\n\n\n.input{\n\twidth: 100% !important;\n\t-webkit-box-sizing: border-box;\n\t-moz-box-sizing: border-box;    \n\tbox-sizing: border-box;\n\tbackground-color: var(--light-blue);\n\tpadding: 8px;\n\tfont-size: 14px;\n\tmin-height: 35px;\n}\n\n.input:enabled:hover{\n\tbackground-color: var(--hover-bg);\n}\n\nselect:hover{\n\tcursor: pointer;\n}\n\n.input:disabled{\n\tcursor: not-allowed;\n}\n.row[data-v-c4d9ca46]{\n        display: grid;\n        grid-template-columns: 1fr;\n        margin-bottom: 1em;\n        border-radius: 5px;\n        overflow: hidden;\n}\n.row div[data-v-c4d9ca46]{\n        display: grid;\n        grid-template-columns: 150px 1fr;\n        border-bottom: 1px solid grey;\n}\n.row div[data-v-c4d9ca46]:last-child{\n        border-bottom: 0px;\n}\nlabel[data-v-c4d9ca46]{\n        padding: 8px;\n        font-weight: 700;\n        font-size: 12px;\n        text-transform: capitalize;\n        border-right: 1px solid grey;\n        background-color: var(--light-blue);\n}\n.updated input[data-v-c4d9ca46], .updated select[data-v-c4d9ca46], .updated textarea[data-v-c4d9ca46]{\n        background-color: #ff990064 !important;\n}\n.not-updated[data-v-c4d9ca46] {\n        border: 1px solid grey;\n}\n.del-buttons[data-v-c4d9ca46] {\n        grid-column: 1 / 3;\n        min-height: 35px;\n        background: var(--light-blue);\n        width: 100%;\n}\n.del-buttons[data-v-c4d9ca46]:hover{\n        color: red;\n}\n.error[data-v-c4d9ca46] {\n        padding: 8px;\n        color: darkred;\n}\n@media screen and (min-width: 1200px) {\n.label[data-v-c4d9ca46]{\n            clip: rect(0 0 0 0);\n            clip-path: inset(50%);\n            height: 1px;\n            overflow: hidden;\n            position: absolute;\n            white-space: nowrap;\n            width: 1px;\n}\n.row[data-v-c4d9ca46]{\n            display: grid;\n            grid-template-columns: repeat(12, 1fr);\n            grid-gap: 1px;\n            width: 100%;\n            margin-bottom: 2px;\n}\n.not-updated[data-v-c4d9ca46] {\n            border: 0px;\n}\n.row div[data-v-c4d9ca46]{\n            display: block;\n            grid-template-columns: 150px 1fr;\n            border-bottom: 0px;\n}\n.lg-span-2[data-v-c4d9ca46]{\n            grid-column: span 2;\n}\n.lg-center[data-v-c4d9ca46]{\n            text-align: center;\n}\n.lg-left[data-v-c4d9ca46]{\n            text-align: left;\n}\n.table-header div[data-v-c4d9ca46]{\n            display: initial;\n            font-size: 12px;\n            font-weight: bold;\n}\n.row div[data-v-c4d9ca46]{\n            overflow: hidden;\n            /* background-color: var(--light-blue); */\n}\n.row:hover .input[data-v-c4d9ca46]{\n            background-color: var(--pale-green);\n}\n.row:hover .input[data-v-c4d9ca46]:enabled:hover{\n            background-color: var(--hover-bg);\n}\n.row:hover .input[data-v-c4d9ca46]:disabled:hover{\n            background-color: var(--light-grey);\n}\ntextarea[data-v-c4d9ca46]{\n            height: 35px;\n            padding-top: 10px;\n}\n}\n\n";
n(css$3,{});

script$3.__scopeId = "data-v-c4d9ca46";
script$3.__file = "src/components/outputTableRow.vue";

const _withScopeId = n => (pushScopeId("data-v-7df546ad"),n=n(),popScopeId(),n);
const _hoisted_1$2 = {
  key: 0,
  class: "add-container"
};
const _hoisted_2$2 = {
  key: 1,
  class: "row updated"
};
const _hoisted_3$2 = { class: "lg-left bg-light-blue" };
const _hoisted_4$1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "name"
}, "Name", -1 /* HOISTED */));
const _hoisted_5$1 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_6 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  id: "description",
  class: "label",
  for: "description"
}, "Description", -1 /* HOISTED */));
const _hoisted_7 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_8 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "device"
}, "device", -1 /* HOISTED */));
const _hoisted_9 = ["value"];
const _hoisted_10 = { class: "lg-span-2 lg-left bg-light-blue" };
const _hoisted_11 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "dataPoint"
}, "data Type", -1 /* HOISTED */));
const _hoisted_12 = ["value"];
const _hoisted_13 = { class: "lg-center bg-light-blue" };
const _hoisted_14 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "min"
}, "Min", -1 /* HOISTED */));
const _hoisted_15 = { class: "lg-center bg-light-blue" };
const _hoisted_16 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "max"
}, "Max", -1 /* HOISTED */));
const _hoisted_17 = { class: "lg-center lg-span-2 bg-light-blue" };
const _hoisted_18 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("label", {
  class: "label",
  for: "liveOutputValue"
}, "Live Output Value", -1 /* HOISTED */));
const _hoisted_19 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("div", { class: "lg-center bg-light-blue" }, null, -1 /* HOISTED */));

    
var script$2 = {
  __name: 'newOutputTableRow',
  props: ['client'],
  setup(__props) {

const props = __props;

    

    const api = useApi();

    const name = ref('');
    const description = ref('');
    const data_source = ref(null);
    const data_type = ref(null);
    const min = ref(0);
    const max = ref(1);
    const liveOutputValue = ref('-');
    const new_output = ref(false);
    const errors = ref([]);
    
    const { save, discard, outputUpdated, outputSaved, outputFailed } = inject('update');
    const { all_outputs, addOutput} = inject('add');

    const data_sources = inject('data_sources');
    const data_types = inject('data_types');

    const cur_data_types = computed(() =>{
        if (data_source.value) {
            return data_types[data_source.value]
        } else {
            return []
        }
        
    });

    const update = () => {
        if (!new_output.value){
            new_output.value = true;
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

    const validate = () => {
        errors.value = [];
        if (name.value.length == 0){
            errors.value.push('Output name cannot be blank');
        } else {
            let check_name = all_outputs.value.filter((output) => {
                console.log("does " + output.clients + " == " + props.client);
                return output.name == name.value && output.clients == props.client
            });
            if (check_name.length > 0){
                errors.value.push('An output named "'+name.value+'" already exists');
            }
        }
        if (data_source.value == null){
            errors.value.push('Output must have a data source');
        } else if (data_type.value == null) {
            errors.value.push('Output must have a data type');
        }
        if (errors.value.length != 0) {
            outputFailed();
            return false
        } else {
            return true
        }

    };

    const reset = () => {
        name.value = '';
        description.value = '';
        data_source.value = null;
        data_type.value = null;
        min.value = 0;
        max.value = 1;
        errors.value = [];
    };

    watch(save, async (newVal) => {
        if (newVal && new_output.value){
            if (validate() ) {
                console.log('component saving');
                let new_output_data = {
                    'name': name.value,
                    'data_source': data_source.value,
                    'data_type': data_type.value,
                    'description': description.value,
                    'min': min.value,
                    'max': max.value,
                    'clients': props.client
                };
                // saving logic here...
                let res = await api.post('/items/outputs/', new_output_data);
                console.log(res);
                new_output.value = false;
                // // emit save
                addOutput(res.data.data);
                reset();
            }

        }
    });

    watch(discard, (newVal) => {
        if(newVal && new_output.value){
            new_output.value = false;
            // // emit discard
            outputSaved();
            reset();
        }
    });

    watch(min, (newMin, oldMin) =>{
        if (0 > newMin || newMin > 1 || newMin >= max.value){
            min.value = oldMin;
        }
    });

    watch(max, (newMax, oldMax) =>{
        console.log(newMax);
        if (0 > newMax || newMax > 1 || newMax <= min.value){
            max.value = oldMax;
        }
    });




return (_ctx, _cache) => {
  const _component_v_icon = resolveComponent("v-icon");

  return (openBlock(), createElementBlock(Fragment, null, [
    (!new_output.value)
      ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
          createElementVNode("button", {
            class: "add",
            onClick: _cache[0] || (_cache[0] = $event => (update()))
          }, "Add New")
        ]))
      : (openBlock(), createElementBlock("div", _hoisted_2$2, [
          createElementVNode("div", _hoisted_3$2, [
            _hoisted_4$1,
            withDirectives(createElementVNode("input", {
              id: "name",
              class: "input",
              type: "text",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((name).value = $event))
            }, null, 512 /* NEED_PATCH */), [
              [vModelText, name.value]
            ])
          ]),
          createElementVNode("div", _hoisted_5$1, [
            _hoisted_6,
            withDirectives(createElementVNode("textarea", {
              class: "input textarea",
              type: "textarea",
              wrap: "hard",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((description).value = $event))
            }, null, 512 /* NEED_PATCH */), [
              [vModelText, description.value]
            ])
          ]),
          createElementVNode("div", _hoisted_7, [
            _hoisted_8,
            withDirectives(createElementVNode("select", {
              id: "device",
              class: "input",
              type: "textarea",
              "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((data_source).value = $event))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(data_sources), (source) => {
                return (openBlock(), createElementBlock("option", {
                  key: source,
                  value: source
                }, toDisplayString(source), 9 /* TEXT, PROPS */, _hoisted_9))
              }), 128 /* KEYED_FRAGMENT */))
            ], 512 /* NEED_PATCH */), [
              [vModelSelect, data_source.value]
            ])
          ]),
          createElementVNode("div", _hoisted_10, [
            _hoisted_11,
            withDirectives(createElementVNode("select", {
              id: "dataPoint",
              class: "input",
              type: "textarea",
              "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((data_type).value = $event))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(cur_data_types), (type) => {
                return (openBlock(), createElementBlock("option", {
                  key: type,
                  value: type
                }, toDisplayString(type), 9 /* TEXT, PROPS */, _hoisted_12))
              }), 128 /* KEYED_FRAGMENT */))
            ], 512 /* NEED_PATCH */), [
              [vModelSelect, data_type.value]
            ])
          ]),
          createElementVNode("div", _hoisted_13, [
            _hoisted_14,
            withDirectives(createElementVNode("input", {
              id: "min",
              class: "input lg-center",
              type: "number",
              min: "0",
              max: "1",
              step: "0.001",
              "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((min).value = $event)),
              onChange: _cache[6] || (_cache[6] = $event => (checkMinMax()))
            }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
              [vModelText, min.value]
            ])
          ]),
          createElementVNode("div", _hoisted_15, [
            _hoisted_16,
            withDirectives(createElementVNode("input", {
              id: "max",
              class: "input lg-center",
              type: "number",
              min: "0",
              max: "1",
              step: "0.001",
              "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((max).value = $event)),
              onChange: _cache[8] || (_cache[8] = $event => (checkMinMax()))
            }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
              [vModelText, max.value]
            ])
          ]),
          createElementVNode("div", _hoisted_17, [
            _hoisted_18,
            withDirectives(createElementVNode("input", {
              id: "liveOutputValue",
              class: "input lg-center",
              type: "text",
              "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((liveOutputValue).value = $event)),
              disabled: ""
            }, null, 512 /* NEED_PATCH */), [
              [vModelText, liveOutputValue.value]
            ])
          ]),
          _hoisted_19
        ])),
    createElementVNode("div", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(errors.value, (error) => {
        return (openBlock(), createElementBlock("div", {
          class: "lg-span-2 error",
          key: _ctx.errror
        }, [
          createVNode(_component_v_icon, { name: "error" }),
          createTextVNode(" " + toDisplayString(error), 1 /* TEXT */)
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

var css$2 = "/* ----------------------------------------------------------------------------------------------------\n\nSuper Form Reset\n\nA couple of things to watch out for:\n\n- IE8: If a text input doesn't have padding on all sides or none the text won't be centered.\n- The default border sizes on text inputs in all UAs seem to be slightly different. You're better off using custom borders.\n- You NEED to set the font-size and family on all form elements\n- Search inputs need to have their appearance reset and the box-sizing set to content-box to match other UAs\n- You can style the upload button in webkit using ::-webkit-file-upload-button\n- ::-webkit-file-upload-button selectors can't be used in the same selector as normal ones. FF and IE freak out.\n- IE: You don't need to fake inline-block with labels and form controls in IE. They function as inline-block.\n- By turning off ::-webkit-search-decoration, it removes the extra whitespace on the left on search inputs\n\n----------------------------------------------------------------------------------------------------*/\n\ninput,\nlabel,\nselect,\nbutton,\ntextarea\n{\n\tmargin:0;\n\tborder:0;\n\tpadding:0;\n\tdisplay:inline-block;\n\tvertical-align:middle;\n\twhite-space:normal;\n\tbackground:none;\n\tline-height:1;\n\t/* Browsers have different default form fonts */\n\tfont-size:inherit;\n\tfont-family:inherit;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;    \n    box-sizing: border-box;\n}\n\n/* Remove the stupid outer glow in Webkit */\ninput:focus\n{\n\toutline:0;\n}\n\n/* Box Sizing Reset\n-----------------------------------------------*/\n\n/* All of our custom controls should be what we expect them to be */\n/* input,\ntextarea\n{\n\t-webkit-box-sizing:content-box;\n\t-moz-box-sizing:content-box;\n\tbox-sizing:content-box;\n} */\n\n/* These elements are usually rendered a certain way by the browser */\nbutton,\ninput[type=reset],\ninput[type=button],\ninput[type=submit],\ninput[type=checkbox],\ninput[type=radio],\nselect\n{\n\t-webkit-box-sizing:border-box;\n\t-moz-box-sizing:border-box;\n\tbox-sizing:border-box;\n}\n\n/* Text Inputs\n-----------------------------------------------*/\n\ninput[type=date],\ninput[type=datetime],\ninput[type=datetime-local],\ninput[type=email],\ninput[type=month],\ninput[type=number],\ninput[type=password],\ninput[type=range],\ninput[type=search],\ninput[type=tel],\ninput[type=text],\ninput[type=time],\ninput[type=url],\ninput[type=week]\n{\n}\n\n/* Button Controls\n-----------------------------------------------*/\n\ninput[type=checkbox],\ninput[type=radio]\n{\n\twidth:13px;\n\theight:13px;\n}\n\n/* File Uploads\n-----------------------------------------------*/\n\ninput[type=file]\n{\n\n}\n\n/* Search Input\n-----------------------------------------------*/\n\n/* Make webkit render the search input like a normal text field */\ninput[type=search]\n{\n\t-webkit-appearance:textfield;\n\t/* -webkit-box-sizing:content-box; */\n}\n\n/* Turn off the recent search for webkit. It adds about 15px padding on the left */\n::-webkit-search-decoration\n{\n\tdisplay:none;\n}\n\n/* Buttons\n-----------------------------------------------*/\n\nbutton,\ninput[type=\"reset\"],\ninput[type=\"button\"],\ninput[type=\"submit\"]\n{\n\t/* Fix IE7 display bug */\n\toverflow:visible;\n\twidth:auto;\n}\n\n/* IE8 and FF freak out if this rule is within another selector */\n::-webkit-file-upload-button\n{\t\n\tpadding:0;\n\tborder:0;\n\tbackground:none;\n}\n\n/* Textarea\n-----------------------------------------------*/\n\ntextarea \n{\n\t/* Move the label to the top */\n\tvertical-align:top;\n\t/* Turn off scroll bars in IE unless needed */\n\toverflow:auto;\n\tresize: vertical;\n\twhite-space: pre-wrap;\n}\n\n/* Selects\n-----------------------------------------------*/\n\nselect\n{\n\n}\n\nselect[multiple] \n{\n\t/* Move the label to the top */\n\tvertical-align:top;\n}\n\n\n\n.input{\n\twidth: 100% !important;\n\t-webkit-box-sizing: border-box;\n\t-moz-box-sizing: border-box;    \n\tbox-sizing: border-box;\n\tbackground-color: var(--light-blue);\n\tpadding: 8px;\n\tfont-size: 14px;\n\tmin-height: 35px;\n}\n\n.input:enabled:hover{\n\tbackground-color: var(--hover-bg);\n}\n\nselect:hover{\n\tcursor: pointer;\n}\n\n.input:disabled{\n\tcursor: not-allowed;\n}\n.row[data-v-7df546ad]{\n        display: grid;\n        grid-template-columns: 1fr;\n        margin-bottom: 1em;\n        border: 1px solid grey;\n        border-radius: 5px;\n        overflow: hidden;\n}\n.row div[data-v-7df546ad]{\n        display: grid;\n        grid-template-columns: 150px 1fr;\n        border-bottom: 1px solid grey;\n}\n.row div[data-v-7df546ad]:last-child{\n        border-bottom: 0px;\n}\nlabel[data-v-7df546ad]{\n        padding: 8px;\n        font-weight: 700;\n        font-size: 12px;\n        text-transform: capitalize;\n        border-right: 1px solid grey;\n        background-color: var(--light-blue);\n}\n.updated input[data-v-7df546ad], .updated select[data-v-7df546ad], .updated textarea[data-v-7df546ad]{\n        background-color: #ff990064 !important;\n}\n.error[data-v-7df546ad] {\n        padding: 8px;\n        color: darkred;\n}\n.add[data-v-7df546ad] {\n        -webkit-box-sizing: border-box;\n        -moz-box-sizing: border-box;\n        box-sizing: border-box;\n        padding: 8px;\n        font-size: 14px;\n        min-height: 35px;\n}\n.add-container[data-v-7df546ad] {\n        margin-top: 2em;\n        align-content: center;\n        margin: 1.5em 0px;\n}\n.add-container button[data-v-7df546ad]{\n        font-size: .875em;\n        border-radius: 100px;\n        padding: 0 35px;\n        border: rgba(0, 0, 0, 0.1) solid 1px;\n        background: white;\n        -webkit-box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.1);\n        -moz-box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.1);\n        box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.1);\n}\n.add-container button[data-v-7df546ad]:hover{\n        background-color: var(--pale-green);\n        -webkit-box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.1);\n        -moz-box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.1);\n        box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.1);\n}\n@media screen and (min-width: 1200px) {\n.label[data-v-7df546ad]{\n            clip: rect(0 0 0 0);\n            clip-path: inset(50%);\n            height: 1px;\n            overflow: hidden;\n            position: absolute;\n            white-space: nowrap;\n            width: 1px;\n}\n.row[data-v-7df546ad]{\n            display: grid;\n            grid-template-columns: repeat(12, 1fr);\n            grid-gap: 1px;\n            width: 100%;\n            margin-bottom: 2px;\n            border: 0px;\n}\n.row div[data-v-7df546ad]{\n            display: block;\n            grid-template-columns: 150px 1fr;\n            border-bottom: 0px;\n}\n.lg-span-2[data-v-7df546ad]{\n            grid-column: span 2;\n}\n.lg-center[data-v-7df546ad]{\n            text-align: center;\n}\n.lg-left[data-v-7df546ad]{\n            text-align: left;\n}\n.table-header div[data-v-7df546ad]{\n            display: initial;\n            font-size: 12px;\n            font-weight: bold;\n}\n.row div[data-v-7df546ad]{\n            overflow: hidden;\n            /* background-color: var(--light-blue); */\n}\n.row:hover .input[data-v-7df546ad]{\n            background-color: var(--pale-green);\n}\n.row:hover .input[data-v-7df546ad]:enabled:hover{\n            background-color: var(--hover-bg);\n}\n.row:hover .input[data-v-7df546ad]:disabled:hover{\n            background-color: var(--light-grey);\n}\ntextarea[data-v-7df546ad]{\n            height: 35px;\n            padding-top: 10px;\n}\n}\n\n";
n(css$2,{});

script$2.__scopeId = "data-v-7df546ad";
script$2.__file = "src/components/newOutputTableRow.vue";

const _hoisted_1$1 = { class: "output-group-container" };
const _hoisted_2$1 = { class: "table" };
const _hoisted_3$1 = /*#__PURE__*/createStaticVNode("<div class=\"row table-header\" data-v-345ca9e7><div class=\"lg-left\" data-v-345ca9e7>Name</div><div class=\"lg-span-2 lg-left\" data-v-345ca9e7>Description</div><div class=\"lg-span-2 lg-left\" data-v-345ca9e7>Source Device</div><div class=\"lg-span-2 lg-left\" data-v-345ca9e7>Data Point</div><div class=\"lg-center\" data-v-345ca9e7>Min</div><div class=\"lg-center\" data-v-345ca9e7>Max</div><div class=\"lg-center\" data-v-345ca9e7>Live Data Value</div></div>", 1);

    
var script$1 = {
  __name: 'clientOutputs',
  props: ['all_outputs', 'clientTitle', 'client'],
  setup(__props) {

const props = __props;

    

    const outputs = computed(() => {
        return props.all_outputs.filter((output) => output.clients == props.client)
    });


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createElementVNode("h2", null, toDisplayString(__props.clientTitle), 1 /* TEXT */),
    createElementVNode("div", _hoisted_2$1, [
      _hoisted_3$1,
      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(outputs), (output) => {
        return (openBlock(), createBlock(script$3, {
          key: output.name,
          output: output
        }, null, 8 /* PROPS */, ["output"]))
      }), 128 /* KEYED_FRAGMENT */)),
      createVNode(script$2, { client: __props.client }, null, 8 /* PROPS */, ["client"])
    ])
  ]))
}
}

};

var css$1 = "\n.output-group-container[data-v-345ca9e7]{\n        padding-bottom: 3em;\n}\nh2[data-v-345ca9e7]{\n        font-size: 1.25em;\n        padding: 1em 0;\n        border-top: 1px solid black;\n        border-bottom: 1px solid black;\n        text-transform: uppercase;\n}\n.table-header div[data-v-345ca9e7]{\n        display: none;\n}\n.table[data-v-345ca9e7]{\n        padding-top: 2em;\n}\n@media screen and (min-width: 1200px) {\n.row[data-v-345ca9e7]{\n            display: grid;\n            grid-template-columns: repeat(12, 1fr);\n            grid-gap: 2px;\n            width: 100%;\n}\n.lg-span-2[data-v-345ca9e7]{\n            grid-column: span 2;\n}\n.lg-center[data-v-345ca9e7]{\n            text-align: center;\n}\n.lg-left[data-v-345ca9e7]{\n            text-align: left;\n}\n.table-header div[data-v-345ca9e7]{\n            display: initial;\n            font-size: 12px;\n            font-weight: bold;\n            line-height: 15px;\n            padding-bottom: .5em;\n}\n}\n\n";
n(css$1,{});

script$1.__scopeId = "data-v-345ca9e7";
script$1.__file = "src/components/clientOutputs.vue";

const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach(key => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = { type: "error", data: "parser error" };

const withNativeBlob$1 = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
const withNativeArrayBuffer$2 = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView$1 = obj => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob$1 && data instanceof Blob) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(data, callback);
        }
    }
    else if (withNativeArrayBuffer$2 &&
        (data instanceof ArrayBuffer || isView$1(data))) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(new Blob([data]), callback);
        }
    }
    // plain string
    return callback(PACKET_TYPES[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        const content = fileReader.result.split(",")[1];
        callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
};

// imported from https://github.com/socketio/base64-arraybuffer
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
const lookup$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
    lookup$1[chars.charCodeAt(i)] = i;
}
const decode$1 = (base64) => {
    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = lookup$1[base64.charCodeAt(i)];
        encoded2 = lookup$1[base64.charCodeAt(i + 1)];
        encoded3 = lookup$1[base64.charCodeAt(i + 2)];
        encoded4 = lookup$1[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
};

const withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
        return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType)
        };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
        return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
        };
    }
    const packetType = PACKET_TYPES_REVERSE[type];
    if (!packetType) {
        return ERROR_PACKET;
    }
    return encodedPacket.length > 1
        ? {
            type: PACKET_TYPES_REVERSE[type],
            data: encodedPacket.substring(1)
        }
        : {
            type: PACKET_TYPES_REVERSE[type]
        };
};
const decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer$1) {
        const decoded = decode$1(data);
        return mapBinary(decoded, binaryType);
    }
    else {
        return { base64: true, data }; // fallback for old browsers
    }
};
const mapBinary = (data, binaryType) => {
    switch (binaryType) {
        case "blob":
            return data instanceof ArrayBuffer ? new Blob([data]) : data;
        case "arraybuffer":
        default:
            return data; // assuming the data is already an ArrayBuffer
    }
};

const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback) => {
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
        // force base64 encoding for binary packets
        encodePacket(packet, false, encodedPacket => {
            encodedPackets[i] = encodedPacket;
            if (++count === length) {
                callback(encodedPackets.join(SEPARATOR));
            }
        });
    });
};
const decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = decodePacket(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
            break;
        }
    }
    return packets;
};
const protocol$1 = 4;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

const globalThisShim = (() => {
    if (typeof self !== "undefined") {
        return self;
    }
    else if (typeof window !== "undefined") {
        return window;
    }
    else {
        return Function("return this")();
    }
})();

function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
        if (obj.hasOwnProperty(k)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
const NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
    }
    else {
        obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
        obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
    }
}
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const BASE64_OVERHEAD = 1.33;
// we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
function byteLength(obj) {
    if (typeof obj === "string") {
        return utf8Length(obj);
    }
    // arraybuffer or blob
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
    let c = 0, length = 0;
    for (let i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        }
        else if (c < 0x800) {
            length += 2;
        }
        else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        }
        else {
            i++;
            length += 4;
        }
    }
    return length;
}

class TransportError extends Error {
    constructor(reason, description, context) {
        super(reason);
        this.description = description;
        this.context = context;
        this.type = "TransportError";
    }
}
class Transport extends Emitter {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */
    constructor(opts) {
        super();
        this.writable = false;
        installTimerFunctions(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.socket = opts.socket;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */
    onError(reason, description, context) {
        super.emitReserved("error", new TransportError(reason, description, context));
        return this;
    }
    /**
     * Opens the transport.
     */
    open() {
        this.readyState = "opening";
        this.doOpen();
        return this;
    }
    /**
     * Closes the transport.
     */
    close() {
        if (this.readyState === "opening" || this.readyState === "open") {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */
    send(packets) {
        if (this.readyState === "open") {
            this.write(packets);
        }
    }
    /**
     * Called upon open
     *
     * @protected
     */
    onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */
    onData(data) {
        const packet = decodePacket(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @protected
     */
    onPacket(packet) {
        super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @protected
     */
    onClose(details) {
        this.readyState = "closed";
        super.emitReserved("close", details);
    }
    /**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */
    pause(onPause) { }
}

// imported from https://github.com/unshiftio/yeast
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''), length = 64, map = {};
let seed = 0, i = 0, prev;
/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode$1(num) {
    let encoded = '';
    do {
        encoded = alphabet[num % length] + encoded;
        num = Math.floor(num / length);
    } while (num > 0);
    return encoded;
}
/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
    const now = encode$1(+new Date());
    if (now !== prev)
        return seed = 0, prev = now;
    return now + '.' + encode$1(seed++);
}
//
// Map each character to its index.
//
for (; i < length; i++)
    map[alphabet[i]] = i;

// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */
function encode(obj) {
    let str = '';
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (str.length)
                str += '&';
            str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
        }
    }
    return str;
}
/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */
function decode(qs) {
    let qry = {};
    let pairs = qs.split('&');
    for (let i = 0, l = pairs.length; i < l; i++) {
        let pair = pairs[i].split('=');
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
}

// imported from https://github.com/component/has-cors
let value = false;
try {
    value = typeof XMLHttpRequest !== 'undefined' &&
        'withCredentials' in new XMLHttpRequest();
}
catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
}
const hasCORS = value;

// browser shim for xmlhttprequest module
function XHR(opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
            return new XMLHttpRequest();
        }
    }
    catch (e) { }
    if (!xdomain) {
        try {
            return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
        }
        catch (e) { }
    }
}

function empty() { }
const hasXHR2 = (function () {
    const xhr = new XHR({
        xdomain: false,
    });
    return null != xhr.responseType;
})();
class Polling extends Transport {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */
    constructor(opts) {
        super(opts);
        this.polling = false;
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) {
                port = isSSL ? "443" : "80";
            }
            this.xd =
                (typeof location !== "undefined" &&
                    opts.hostname !== location.hostname) ||
                    port !== opts.port;
            this.xs = opts.secure !== isSSL;
        }
        /**
         * XHR supports binary
         */
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
    }
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */
    doOpen() {
        this.poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */
    pause(onPause) {
        this.readyState = "pausing";
        const pause = () => {
            this.readyState = "paused";
            onPause();
        };
        if (this.polling || !this.writable) {
            let total = 0;
            if (this.polling) {
                total++;
                this.once("pollComplete", function () {
                    --total || pause();
                });
            }
            if (!this.writable) {
                total++;
                this.once("drain", function () {
                    --total || pause();
                });
            }
        }
        else {
            pause();
        }
    }
    /**
     * Starts polling cycle.
     *
     * @private
     */
    poll() {
        this.polling = true;
        this.doPoll();
        this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @protected
     */
    onData(data) {
        const callback = (packet) => {
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") {
                this.onOpen();
            }
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose({ description: "transport closed by the server" });
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        decodePayload(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this.polling = false;
            this.emitReserved("pollComplete");
            if ("open" === this.readyState) {
                this.poll();
            }
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @protected
     */
    doClose() {
        const close = () => {
            this.write([{ type: "close" }]);
        };
        if ("open" === this.readyState) {
            close();
        }
        else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            this.once("open", close);
        }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */
    write(packets) {
        this.writable = false;
        encodePayload(packets, (data) => {
            this.doWrite(data, () => {
                this.writable = true;
                this.emitReserved("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "https" : "http";
        let port = "";
        // cache busting is forced
        if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = yeast();
        }
        if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
        }
        // avoid port if default for schema
        if (this.opts.port &&
            (("https" === schema && Number(this.opts.port) !== 443) ||
                ("http" === schema && Number(this.opts.port) !== 80))) {
            port = ":" + this.opts.port;
        }
        const encodedQuery = encode(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return (schema +
            "://" +
            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
            port +
            this.opts.path +
            (encodedQuery.length ? "?" + encodedQuery : ""));
    }
    /**
     * Creates a request.
     *
     * @param {String} method
     * @private
     */
    request(opts = {}) {
        Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
        return new Request(this.uri(), opts);
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @private
     */
    doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data,
        });
        req.on("success", fn);
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr post error", xhrStatus, context);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @private
     */
    doPoll() {
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr poll error", xhrStatus, context);
        });
        this.pollXhr = req;
    }
}
class Request extends Emitter {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */
    constructor(uri, opts) {
        super();
        installTimerFunctions(this, opts);
        this.opts = opts;
        this.method = opts.method || "GET";
        this.uri = uri;
        this.async = false !== opts.async;
        this.data = undefined !== opts.data ? opts.data : null;
        this.create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */
    create() {
        const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        opts.xscheme = !!this.opts.xs;
        const xhr = (this.xhr = new XHR(opts));
        try {
            xhr.open(this.method, this.uri, this.async);
            try {
                if (this.opts.extraHeaders) {
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for (let i in this.opts.extraHeaders) {
                        if (this.opts.extraHeaders.hasOwnProperty(i)) {
                            xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                        }
                    }
                }
            }
            catch (e) { }
            if ("POST" === this.method) {
                try {
                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                }
                catch (e) { }
            }
            try {
                xhr.setRequestHeader("Accept", "*/*");
            }
            catch (e) { }
            // ie6 check
            if ("withCredentials" in xhr) {
                xhr.withCredentials = this.opts.withCredentials;
            }
            if (this.opts.requestTimeout) {
                xhr.timeout = this.opts.requestTimeout;
            }
            xhr.onreadystatechange = () => {
                if (4 !== xhr.readyState)
                    return;
                if (200 === xhr.status || 1223 === xhr.status) {
                    this.onLoad();
                }
                else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    this.setTimeoutFn(() => {
                        this.onError(typeof xhr.status === "number" ? xhr.status : 0);
                    }, 0);
                }
            };
            xhr.send(this.data);
        }
        catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(() => {
                this.onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this.index = Request.requestsCount++;
            Request.requests[this.index] = this;
        }
    }
    /**
     * Called upon error.
     *
     * @private
     */
    onError(err) {
        this.emitReserved("error", err, this.xhr);
        this.cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @private
     */
    cleanup(fromError) {
        if ("undefined" === typeof this.xhr || null === this.xhr) {
            return;
        }
        this.xhr.onreadystatechange = empty;
        if (fromError) {
            try {
                this.xhr.abort();
            }
            catch (e) { }
        }
        if (typeof document !== "undefined") {
            delete Request.requests[this.index];
        }
        this.xhr = null;
    }
    /**
     * Called upon load.
     *
     * @private
     */
    onLoad() {
        const data = this.xhr.responseText;
        if (data !== null) {
            this.emitReserved("data", data);
            this.emitReserved("success");
            this.cleanup();
        }
    }
    /**
     * Aborts the request.
     *
     * @package
     */
    abort() {
        this.cleanup();
    }
}
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */
if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
        // @ts-ignore
        attachEvent("onunload", unloadHandler);
    }
    else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
    }
}
function unloadHandler() {
    for (let i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
            Request.requests[i].abort();
        }
    }
}

const nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
        return (cb) => Promise.resolve().then(cb);
    }
    else {
        return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
})();
const WebSocket = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
const usingBrowserWebSocket = true;
const defaultBinaryType = "arraybuffer";

// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" &&
    typeof navigator.product === "string" &&
    navigator.product.toLowerCase() === "reactnative";
class WS extends Transport {
    /**
     * WebSocket transport constructor.
     *
     * @param {Object} opts - connection options
     * @protected
     */
    constructor(opts) {
        super(opts);
        this.supportsBinary = !opts.forceBase64;
    }
    get name() {
        return "websocket";
    }
    doOpen() {
        if (!this.check()) {
            // let probe timeout
            return;
        }
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = isReactNative
            ? {}
            : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
        }
        try {
            this.ws =
                usingBrowserWebSocket && !isReactNative
                    ? protocols
                        ? new WebSocket(uri, protocols)
                        : new WebSocket(uri)
                    : new WebSocket(uri, protocols, opts);
        }
        catch (err) {
            return this.emitReserved("error", err);
        }
        this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @private
     */
    addEventListeners() {
        this.ws.onopen = () => {
            if (this.opts.autoUnref) {
                this.ws._socket.unref();
            }
            this.onOpen();
        };
        this.ws.onclose = (closeEvent) => this.onClose({
            description: "websocket connection closed",
            context: closeEvent,
        });
        this.ws.onmessage = (ev) => this.onData(ev.data);
        this.ws.onerror = (e) => this.onError("websocket error", e);
    }
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            encodePacket(packet, this.supportsBinary, (data) => {
                // always create a new object (GH-437)
                const opts = {};
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    if (usingBrowserWebSocket) {
                        // TypeError is thrown when passing the second argument on Safari
                        this.ws.send(data);
                    }
                }
                catch (e) {
                }
                if (lastPacket) {
                    // fake drain
                    // defer to next tick to allow Socket to clear writeBuffer
                    nextTick(() => {
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "wss" : "ws";
        let port = "";
        // avoid port if default for schema
        if (this.opts.port &&
            (("wss" === schema && Number(this.opts.port) !== 443) ||
                ("ws" === schema && Number(this.opts.port) !== 80))) {
            port = ":" + this.opts.port;
        }
        // append timestamp to URI
        if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = yeast();
        }
        // communicate binary support capabilities
        if (!this.supportsBinary) {
            query.b64 = 1;
        }
        const encodedQuery = encode(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return (schema +
            "://" +
            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
            port +
            this.opts.path +
            (encodedQuery.length ? "?" + encodedQuery : ""));
    }
    /**
     * Feature detection for WebSocket.
     *
     * @return {Boolean} whether this transport is available.
     * @private
     */
    check() {
        return !!WebSocket;
    }
}

const transports = {
    websocket: WS,
    polling: Polling,
};

// imported from https://github.com/galkn/parseuri
/**
 * Parses a URI
 *
 * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
 *
 * See:
 * - https://developer.mozilla.org/en-US/docs/Web/API/URL
 * - https://caniuse.com/url
 * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
 *
 * History of the parse() method:
 * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
 * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
 * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */
const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];
function parse(str) {
    const src = str, b = str.indexOf('['), e = str.indexOf(']');
    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }
    let m = re.exec(str || ''), uri = {}, i = 14;
    while (i--) {
        uri[parts[i]] = m[i] || '';
    }
    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);
    return uri;
}
function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.slice(-1) == '/') {
        names.splice(names.length - 1, 1);
    }
    return names;
}
function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });
    return data;
}

let Socket$1 = class Socket extends Emitter {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri - uri or options
     * @param {Object} opts - options
     */
    constructor(uri, opts = {}) {
        super();
        this.writeBuffer = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            uri = parse(uri);
            opts.hostname = uri.host;
            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
            opts.port = uri.port;
            if (uri.query)
                opts.query = uri.query;
        }
        else if (opts.host) {
            opts.hostname = parse(opts.host).host;
        }
        installTimerFunctions(this, opts);
        this.secure =
            null != opts.secure
                ? opts.secure
                : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) {
            // if no port is specified manually, use the protocol default
            opts.port = this.secure ? "443" : "80";
        }
        this.hostname =
            opts.hostname ||
                (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port =
            opts.port ||
                (typeof location !== "undefined" && location.port
                    ? location.port
                    : this.secure
                        ? "443"
                        : "80");
        this.transports = opts.transports || ["polling", "websocket"];
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            addTrailingSlash: true,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024,
            },
            transportOptions: {},
            closeOnBeforeunload: true,
        }, opts);
        this.opts.path =
            this.opts.path.replace(/\/$/, "") +
                (this.opts.addTrailingSlash ? "/" : "");
        if (typeof this.opts.query === "string") {
            this.opts.query = decode(this.opts.query);
        }
        // set on handshake
        this.id = null;
        this.upgrades = null;
        this.pingInterval = null;
        this.pingTimeout = null;
        // set on heartbeat
        this.pingTimeoutTimer = null;
        if (typeof addEventListener === "function") {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                this.beforeunloadEventListener = () => {
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                };
                addEventListener("beforeunload", this.beforeunloadEventListener, false);
            }
            if (this.hostname !== "localhost") {
                this.offlineEventListener = () => {
                    this.onClose("transport close", {
                        description: "network connection lost",
                    });
                };
                addEventListener("offline", this.offlineEventListener, false);
            }
        }
        this.open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */
    createTransport(name) {
        const query = Object.assign({}, this.opts.query);
        // append engine.io protocol identifier
        query.EIO = protocol$1;
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id)
            query.sid = this.id;
        const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port,
        });
        return new transports[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @private
     */
    open() {
        let transport;
        if (this.opts.rememberUpgrade &&
            Socket$1.priorWebsocketSuccess &&
            this.transports.indexOf("websocket") !== -1) {
            transport = "websocket";
        }
        else if (0 === this.transports.length) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        }
        else {
            transport = this.transports[0];
        }
        this.readyState = "opening";
        // Retry with the next transport if the transport is disabled (jsonp: false)
        try {
            transport = this.createTransport(transport);
        }
        catch (e) {
            this.transports.shift();
            this.open();
            return;
        }
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */
    setTransport(transport) {
        if (this.transport) {
            this.transport.removeAllListeners();
        }
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport
            .on("drain", this.onDrain.bind(this))
            .on("packet", this.onPacket.bind(this))
            .on("error", this.onError.bind(this))
            .on("close", (reason) => this.onClose("transport close", reason));
    }
    /**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */
    probe(name) {
        let transport = this.createTransport(name);
        let failed = false;
        Socket$1.priorWebsocketSuccess = false;
        const onTransportOpen = () => {
            if (failed)
                return;
            transport.send([{ type: "ping", data: "probe" }]);
            transport.once("packet", (msg) => {
                if (failed)
                    return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport)
                        return;
                    Socket$1.priorWebsocketSuccess = "websocket" === transport.name;
                    this.transport.pause(() => {
                        if (failed)
                            return;
                        if ("closed" === this.readyState)
                            return;
                        cleanup();
                        this.setTransport(transport);
                        transport.send([{ type: "upgrade" }]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                }
                else {
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed)
                return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = (err) => {
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) {
                freezeTransport();
            }
        }
        // Remove all listeners on the transport and on self
        const cleanup = () => {
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        transport.open();
    }
    /**
     * Called when connection is deemed open.
     *
     * @private
     */
    onOpen() {
        this.readyState = "open";
        Socket$1.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
        // we check for `readyState` in case an `open`
        // listener already closed the socket
        if ("open" === this.readyState && this.opts.upgrade) {
            let i = 0;
            const l = this.upgrades.length;
            for (; i < l; i++) {
                this.probe(this.upgrades[i]);
            }
        }
    }
    /**
     * Handles a packet.
     *
     * @private
     */
    onPacket(packet) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            switch (packet.type) {
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this.resetPingTimeout();
                    this.sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this.onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */
    onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.maxPayload = data.maxPayload;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState)
            return;
        this.resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */
    resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(() => {
            this.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);
        if (this.opts.autoUnref) {
            this.pingTimeoutTimer.unref();
        }
    }
    /**
     * Called on `drain` event
     *
     * @private
     */
    onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this.prevBufferLen = 0;
        if (0 === this.writeBuffer.length) {
            this.emitReserved("drain");
        }
        else {
            this.flush();
        }
    }
    /**
     * Flush write buffers.
     *
     * @private
     */
    flush() {
        if ("closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length) {
            const packets = this.getWritablePackets();
            this.transport.send(packets);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this.prevBufferLen = packets.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */
    getWritablePackets() {
        const shouldCheckPayloadSize = this.maxPayload &&
            this.transport.name === "polling" &&
            this.writeBuffer.length > 1;
        if (!shouldCheckPayloadSize) {
            return this.writeBuffer;
        }
        let payloadSize = 1; // first packet type
        for (let i = 0; i < this.writeBuffer.length; i++) {
            const data = this.writeBuffer[i].data;
            if (data) {
                payloadSize += byteLength(data);
            }
            if (i > 0 && payloadSize > this.maxPayload) {
                return this.writeBuffer.slice(0, i);
            }
            payloadSize += 2; // separator + packet type
        }
        return this.writeBuffer;
    }
    /**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} callback function.
     * @return {Socket} for chaining.
     */
    write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type: packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */
    sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) {
            return;
        }
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options,
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn)
            this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     */
    close() {
        const close = () => {
            this.onClose("forced close");
            this.transport.close();
        };
        const cleanupAndClose = () => {
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = () => {
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
                this.once("drain", () => {
                    if (this.upgrading) {
                        waitForUpgrade();
                    }
                    else {
                        close();
                    }
                });
            }
            else if (this.upgrading) {
                waitForUpgrade();
            }
            else {
                close();
            }
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @private
     */
    onError(err) {
        Socket$1.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @private
     */
    onClose(reason, description) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            // clear timers
            this.clearTimeoutFn(this.pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (typeof removeEventListener === "function") {
                removeEventListener("beforeunload", this.beforeunloadEventListener, false);
                removeEventListener("offline", this.offlineEventListener, false);
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, description);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this.prevBufferLen = 0;
        }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */
    filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        let i = 0;
        const j = upgrades.length;
        for (; i < j; i++) {
            if (~this.transports.indexOf(upgrades[i]))
                filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
    }
};
Socket$1.protocol = protocol$1;

/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        obj = parse(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}

const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        toString.call(Blob) === "[object BlobConstructor]");
const withNativeFile = typeof File === "function" ||
    (typeof File !== "undefined" &&
        toString.call(File) === "[object FileConstructor]");
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
        (withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File));
}
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON &&
        typeof obj.toJSON === "function" &&
        arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}

/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return { packet: pack, buffers: buffers };
}
function _deconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (isBinary(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
    }
    else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    }
    else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments; // no longer useful
    return packet;
}
function _reconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (data && data._placeholder === true) {
        const isIndexValid = typeof data.num === "number" &&
            data.num >= 0 &&
            data.num < buffers.length;
        if (isIndexValid) {
            return buffers[data.num]; // appropriate buffer (should be natural order anyway)
        }
        else {
            throw new Error("illegal attachments");
        }
    }
    else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
        }
    }
    else if (typeof data === "object") {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}

/**
 * Protocol version.
 *
 * @public
 */
const protocol = 5;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    constructor(replacer) {
        this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if (hasBinary(obj)) {
                return this.encodeAsBinary({
                    type: obj.type === PacketType.EVENT
                        ? PacketType.BINARY_EVENT
                        : PacketType.BINARY_ACK,
                    nsp: obj.nsp,
                    data: obj.data,
                    id: obj.id,
                });
            }
        }
        return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT ||
            obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data, this.replacer);
        }
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
        const deconstruction = deconstructPacket(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends Emitter {
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */
    constructor(reviver) {
        super();
        this.reviver = reviver;
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
        let packet;
        if (typeof obj === "string") {
            if (this.reconstructor) {
                throw new Error("got plaintext data when reconstructing a packet");
            }
            packet = this.decodeString(obj);
            const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
            if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
                packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emitReserved("decoded", packet);
                }
            }
            else {
                // non-binary full packet
                super.emitReserved("decoded", packet);
            }
        }
        else if (isBinary(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            }
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        }
        else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0)),
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT ||
            p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) { }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if ("," === c)
                    break;
                if (i === str.length)
                    break;
            }
            p.nsp = str.substring(start, i);
        }
        else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length)
                    break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = this.tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            }
            else {
                throw new Error("invalid payload");
            }
        }
        return p;
    }
    tryParse(str) {
        try {
            return JSON.parse(str, this.reviver);
        }
        catch (e) {
            return false;
        }
    }
    static isPayloadValid(type, payload) {
        switch (type) {
            case PacketType.CONNECT:
                return typeof payload === "object";
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || typeof payload === "object";
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return Array.isArray(payload) && payload.length > 0;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
            this.reconstructor = null;
        }
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
    constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = reconstructPacket(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}

var parser = /*#__PURE__*/Object.freeze({
  __proto__: null,
  protocol: protocol,
  get PacketType () { return PacketType; },
  Encoder: Encoder,
  Decoder: Decoder
});

function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}

/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
/**
 * A Socket is the fundamental class for interacting with the server.
 *
 * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
 *
 * @example
 * const socket = io();
 *
 * socket.on("connect", () => {
 *   console.log("connected");
 * });
 *
 * // send an event to the server
 * socket.emit("foo", "bar");
 *
 * socket.on("foobar", () => {
 *   // an event was received from the server
 * });
 *
 * // upon disconnection
 * socket.on("disconnect", (reason) => {
 *   console.log(`disconnected due to ${reason}`);
 * });
 */
class Socket extends Emitter {
    /**
     * `Socket` constructor.
     */
    constructor(io, nsp, opts) {
        super();
        /**
         * Whether the socket is currently connected to the server.
         *
         * @example
         * const socket = io();
         *
         * socket.on("connect", () => {
         *   console.log(socket.connected); // true
         * });
         *
         * socket.on("disconnect", () => {
         *   console.log(socket.connected); // false
         * });
         */
        this.connected = false;
        /**
         * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
         * be transmitted by the server.
         */
        this.recovered = false;
        /**
         * Buffer for packets received before the CONNECT packet
         */
        this.receiveBuffer = [];
        /**
         * Buffer for packets that will be sent once the socket is connected
         */
        this.sendBuffer = [];
        /**
         * The queue of packets to be sent with retry in case of failure.
         *
         * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
         * @private
         */
        this._queue = [];
        /**
         * A sequence to generate the ID of the {@link QueuedPacket}.
         * @private
         */
        this._queueSeq = 0;
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        this._opts = Object.assign({}, opts);
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */
    get disconnected() {
        return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            on(io, "open", this.onopen.bind(this)),
            on(io, "packet", this.onpacket.bind(this)),
            on(io, "error", this.onerror.bind(this)),
            on(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for {@link connect()}.
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */
    emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev.toString() + '" is a reserved event name');
        }
        args.unshift(ev);
        if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
            this._addToQueue(args);
            return this;
        }
        const packet = {
            type: PacketType.EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) ;
        else if (this.connected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
        var _a;
        const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(() => {
            delete this.acks[id];
            for (let i = 0; i < this.sendBuffer.length; i++) {
                if (this.sendBuffer[i].id === id) {
                    this.sendBuffer.splice(i, 1);
                }
            }
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        this.acks[id] = (...args) => {
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, [null, ...args]);
        };
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */
    emitWithAck(ev, ...args) {
        // the timeout flag is optional
        const withErr = this.flags.timeout !== undefined || this._opts.ackTimeout !== undefined;
        return new Promise((resolve, reject) => {
            args.push((arg1, arg2) => {
                if (withErr) {
                    return arg1 ? reject(arg1) : resolve(arg2);
                }
                else {
                    return resolve(arg1);
                }
            });
            this.emit(ev, ...args);
        });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */
    _addToQueue(args) {
        let ack;
        if (typeof args[args.length - 1] === "function") {
            ack = args.pop();
        }
        const packet = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: false,
            args,
            flags: Object.assign({ fromQueue: true }, this.flags),
        };
        args.push((err, ...responseArgs) => {
            if (packet !== this._queue[0]) {
                // the packet has already been acknowledged
                return;
            }
            const hasError = err !== null;
            if (hasError) {
                if (packet.tryCount > this._opts.retries) {
                    this._queue.shift();
                    if (ack) {
                        ack(err);
                    }
                }
            }
            else {
                this._queue.shift();
                if (ack) {
                    ack(null, ...responseArgs);
                }
            }
            packet.pending = false;
            return this._drainQueue();
        });
        this._queue.push(packet);
        this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */
    _drainQueue(force = false) {
        if (!this.connected || this._queue.length === 0) {
            return;
        }
        const packet = this._queue[0];
        if (packet.pending && !force) {
            return;
        }
        packet.pending = true;
        packet.tryCount++;
        this.flags = packet.flags;
        this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this._sendConnectPacket(data);
            });
        }
        else {
            this._sendConnectPacket(this.auth);
        }
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */
    _sendConnectPacket(data) {
        this.packet({
            type: PacketType.CONNECT,
            data: this._pid
                ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data)
                : data,
        });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(reason, description) {
        this.connected = false;
        delete this.id;
        this.emitReserved("disconnect", reason, description);
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                    this.onconnect(packet.data.sid, packet.data.pid);
                }
                else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case PacketType.CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        if (null != packet.id) {
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
        if (this._pid && args.length && typeof args[args.length - 1] === "string") {
            this._lastOffset = args[args.length - 1];
        }
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            self.packet({
                type: PacketType.ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if ("function" === typeof ack) {
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
        }
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id, pid) {
        this.id = id;
        this.recovered = pid && this._pid === pid;
        this._pid = pid; // defined only if connection state recovery is enabled
        this.connected = true;
        this.emitBuffered();
        this.emitReserved("connect");
        this._drainQueue(true);
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        });
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */
    disconnect() {
        if (this.connected) {
            this.packet({ type: PacketType.DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */
    timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAny() {
        return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */
    offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyOutgoingListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyOutgoingListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */
    notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const listeners = this._anyOutgoingListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, packet.data);
            }
        }
    }
}

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */
function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */
Backoff.prototype.duration = function () {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */
Backoff.prototype.reset = function () {
    this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */
Backoff.prototype.setMin = function (min) {
    this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */
Backoff.prototype.setMax = function (max) {
    this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */
Backoff.prototype.setJitter = function (jitter) {
    this.jitter = jitter;
};

class Manager extends Emitter {
    constructor(uri, opts) {
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        installTimerFunctions(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || parser;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        if (~this._readyState.indexOf("open"))
            return this;
        this.engine = new Socket$1(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = on(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        // emit `error`
        const errorSub = on(socket, "error", (err) => {
            self.cleanup();
            self._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                self.maybeReconnectOnOpen();
            }
        });
        if (false !== this._timeout) {
            const timeout = this._timeout;
            if (timeout === 0) {
                openSubDestroy(); // prevents a race condition with the 'open' event
            }
            // set timer
            const timer = this.setTimeoutFn(() => {
                openSubDestroy();
                socket.close();
                // @ts-ignore
                socket.emit("error", new Error("timeout"));
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        try {
            this.decoder.add(data);
        }
        catch (e) {
            this.onclose("parse error", e);
        }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
        nextTick(() => {
            this.emitReserved("packet", packet);
        }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        else if (this._autoConnect && !socket.active) {
            socket.connect();
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
        if (this.engine)
            this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */
    onclose(reason, description) {
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason, description);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            this._reconnecting = true;
            const timer = this.setTimeoutFn(() => {
                if (self.skipReconnect)
                    return;
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    }
                    else {
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}

/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = url(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        io = new Manager(source, opts);
    }
    else {
        if (!cache[id]) {
            cache[id] = new Manager(source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager,
    Socket,
    io: lookup,
    connect: lookup,
});

const _hoisted_1 = { class: "page-container" };
const _hoisted_2 = {
  key: 0,
  class: "update-bar"
};
const _hoisted_3 = ["disabled"];
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { key: 1 };

	
var script = {
  __name: 'module',
  setup(__props) {
	const clients = ['unreal', 'midi'];
	const api = useApi();

	const allUpdates = ref(0);
	const allFailed = ref(0);
	const save = ref(false);
	const discard = ref(false);

	const data_sources = ref([]);
	const data_types = ref({});
	var all_outputs = ref([]);

	const latest_vals = ref({});
	
	const outputSaved = () => {
		console.log("1 ouput saved");
		if (allUpdates.value > 0){
			allUpdates.value -= 1;
			if (allUpdates.value == 0){
				save.value = false;
				discard.value = false;
			}
		}
	};

	const outputFailed = () => {
		allFailed.value += 1;
		if (allFailed.value == allUpdates.value){
			save.value = false;
		}
	};

	const outputUpdated = () => {
		allUpdates.value  += 1;
		console.log(allUpdates.value + " ouput updated");
	};

	const addOutput = (new_output) => {
		all_outputs.value.push(new_output);
		console.log(all_outputs.value);
		outputSaved();
	};

	const doSave = () => {
		allFailed.value = 0;
		save.value = true;
	};

	const doDiscard = () => {
		allFailed.value = 0;
		discard.value = true;
	};

	const deleteOutput = async (id) => {
		await api.delete('/items/outputs/'+id);
		all_outputs.value = all_outputs.value.filter((output) => output.id != id);
	};

	const startSocket = (name) => {
		let socket = lookup("/"+name);
		socket.onAny((eventName, ...args) => {
		  // console.log(eventName)
		  // console.log(args)
		  latest_vals.value[eventName] = args[0];
		});

	};

	onMounted( async () => {
		for (let i = 0;i<clients.length;i++){
			startSocket(clients[i]);
		}
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

	// Injects

	provide('update',{ save, discard, outputSaved, outputUpdated, outputFailed });

	provide('add', { all_outputs, addOutput });

	provide ('delete', deleteOutput);

	provide ('output_vals', latest_vals);

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
          clientTitle: "Unreal Engine:"
        }, null, 8 /* PROPS */, ["all_outputs"]),
        createVNode(script$1, {
          all_outputs: unref(all_outputs),
          client: "midi",
          clientTitle: "MIDI"
        }, null, 8 /* PROPS */, ["all_outputs"])
      ]),
      (allUpdates.value > 0)
        ? (openBlock(), createElementBlock("div", _hoisted_2, [
            createElementVNode("button", {
              class: "update-button",
              onClick: _cache[0] || (_cache[0] = $event => (doSave())),
              disabled: discard.value
            }, [
              (!save.value)
                ? (openBlock(), createElementBlock("span", _hoisted_4, "Save"))
                : (openBlock(), createElementBlock("span", _hoisted_5, "Saving..."))
            ], 8 /* PROPS */, _hoisted_3),
            createElementVNode("button", {
              class: "update-button",
              onClick: _cache[1] || (_cache[1] = $event => (doDiscard()))
            }, " Discard ")
          ]))
        : createCommentVNode("v-if", true)
    ]),
    _: 1 /* STABLE */
  }))
}
}

};

var css = ":root {\n    --light-blue: #DBEFF5;\n    --hover-bg: #BDFF00;\n    --pale-green: #DFFF84;\n    --light-grey: #f5f5f5;\n  }\n\t/* @import url('./assets/css/forms.css'); */\n.page-container{\n\t\tpadding: 32px 16px;\n\t\tcolor: black;\n}\n.update-bar {\n\t    position: sticky;\n\t    height: 50px;\n\t    bottom: 0px;\n\t    background: #ff8400;\n\t    line-height: 50px;\n\t    width: 100%;\n\t    padding: 0 16px;\n}\n.update-button {\n\t    padding: 12px;\n\t    min-width: 100px;\n\t    margin-right: 8px;\n\t    color: white;\n\t    border: white solid 1px;\n\t    border-radius: 50px;\n}\n@media screen and (min-width: 600px) {\n.page-container{\n\t\t\tpadding: 0 48px;\n}\n.update-bar {\n\t\t    padding: 0 48px;\n\t\t    margin-top: 48px;\n}\n}\n\n";
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

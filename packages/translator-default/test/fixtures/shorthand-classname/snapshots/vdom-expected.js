const _marko_template = _t();

export default _marko_template;
import _marko_class_merge from "marko/src/runtime/helpers/class-value";
import _marko_renderer from "marko/src/runtime/components/renderer";
import { t as _t } from "marko/src/runtime/vdom";
import { r as _marko_registerComponent } from "marko/src/runtime/components/registry-browser";

const _marko_componentType = _marko_registerComponent("packages/translator-default/test/fixtures/shorthand-classname/template.marko", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.e("div", {
    "class": "shorthand"
  }, "0", component, 0, 1);
  out.e("div", {
    "class": "shorthand1 shorthand2"
  }, "1", component, 0, 1);
  out.e("div", {
    "class": "shorthand1 shorthand2 inline"
  }, "2", component, 0, 1);
  out.e("div", {
    "class": _marko_class_merge(["shorthand1 shorthand2", dynamic1])
  }, "3", component, 0, 1);
  out.e("div", {
    "class": _marko_class_merge([dynamic1, "inline"])
  }, "4", component, 0, 1);
  out.e("div", {
    "class": _marko_class_merge([dynamic1, "shorthand2", "inline"])
  }, "5", component, 0, 1);
  out.e("div", {
    "class": _marko_class_merge([dynamic1, "shorthand2", dynamic2])
  }, "6", component, 0, 1);
  out.e("div", {
    "class": _marko_class_merge([dynamic2, dynamic3, dynamic1, "shorthand2"])
  }, "7", component, 0, 1);
  out.e("div", {
    "class": _marko_class_merge([dynamic1, dynamic2, "shorthand"])
  }, "8", component, 0, 1);
  out.e("div", {
    "class": _marko_class_merge(["partially-" + dynamic1, "shorthand2", dynamic2])
  }, "9", component, 0, 1);
}, {
  t: _marko_componentType,
  i: true,
  d: true
}, _marko_component);
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
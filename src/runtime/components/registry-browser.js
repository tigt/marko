var defineComponent = require("./defineComponent");
require(".");

var registered = {};
var loaded = {};
var componentTypes = {};

function register(componentId, def) {
    registered[componentId] = def;
    delete loaded[componentId];
    delete componentTypes[componentId];
    return componentId;
}

function load(typeName) {
    var target = loaded[typeName];
    if (!target) {
        target = registered[typeName];

        if (target) {
            target = target();
        }

        if (!target) {
            throw Error("Component not found: " + typeName);
        }

        loaded[typeName] = target;
    }

    return target;
}

function getComponentClass(typeName) {
    var ComponentClass = componentTypes[typeName];

    if (ComponentClass) {
        return ComponentClass;
    }

    ComponentClass = load(typeName);

    ComponentClass = ComponentClass.Component || ComponentClass;

    if (!ComponentClass.___isComponent) {
        ComponentClass = defineComponent(
            ComponentClass,
            ComponentClass.renderer
        );
    }

    // Make the component "type" accessible on each component instance
    ComponentClass.prototype.___type = typeName;

    // eslint-disable-next-line no-constant-condition
    if ("MARKO_DEBUG") {
        var classNameMatch = /\/([^/]+?)(?:\/index|\/template|)(?:\.marko|\.component(?:-browser)?|)$/.exec(
            typeName
        );
        var className = classNameMatch
            ? classNameMatch[1]
            : "AnonymousComponent";
        className = className.replace(/-(.)/g, function(g) {
            return g[1].toUpperCase();
        });
        className = className
            .replace(/\$\d+\.\d+\.\d+$/, "")
            .replace(/^[^a-z$_]/i, "_$&")
            .replace(/[^0-9a-z$_]+/gi, "_");
        className = className[0].toUpperCase() + className.slice(1);
        // eslint-disable-next-line no-unused-vars
        try {
            var OldComponentClass = ComponentClass;
            eval(
                "ComponentClass = function " +
                    className +
                    "(id, doc) { OldComponentClass.call(this, id, doc); }"
            );
            ComponentClass.prototype = OldComponentClass.prototype;
        } catch (e) {
            /** ignore error */
        }
    }

    componentTypes[typeName] = ComponentClass;

    return ComponentClass;
}

function createComponent(typeName, id) {
    var ComponentClass = getComponentClass(typeName);
    return new ComponentClass(id);
}

exports.r = register;
exports.___createComponent = createComponent;

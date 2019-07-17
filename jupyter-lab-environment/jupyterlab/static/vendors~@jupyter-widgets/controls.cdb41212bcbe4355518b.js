(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~@jupyter-widgets/controls"],{

/***/ "+RhG":
/*!*******************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_bool.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var widget_description_1 = __webpack_require__(/*! ./widget_description */ "1OD8");
var base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
var _ = __webpack_require__(/*! underscore */ "F/us");
var BoolModel = /** @class */ (function (_super) {
    __extends(BoolModel, _super);
    function BoolModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoolModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            value: false,
            disabled: false,
            _model_name: 'BoolModel'
        });
    };
    return BoolModel;
}(widget_core_1.CoreDescriptionModel));
exports.BoolModel = BoolModel;
var CheckboxModel = /** @class */ (function (_super) {
    __extends(CheckboxModel, _super);
    function CheckboxModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            indent: true,
            _view_name: 'CheckboxView',
            _model_name: 'CheckboxModel'
        });
    };
    return CheckboxModel;
}(widget_core_1.CoreDescriptionModel));
exports.CheckboxModel = CheckboxModel;
var CheckboxView = /** @class */ (function (_super) {
    __extends(CheckboxView, _super);
    function CheckboxView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Called when view is rendered.
     */
    CheckboxView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-checkbox');
        // adding a zero-width space to the label to help
        // the browser set the baseline correctly
        this.label.innerHTML = '&#8203;';
        // label containing the checkbox and description span
        this.checkboxLabel = document.createElement('label');
        this.checkboxLabel.classList.add('widget-label-basic');
        this.el.appendChild(this.checkboxLabel);
        // checkbox
        this.checkbox = document.createElement('input');
        this.checkbox.setAttribute('type', 'checkbox');
        this.checkboxLabel.appendChild(this.checkbox);
        // span to the right of the checkbox that will render the description
        this.descriptionSpan = document.createElement('span');
        this.checkboxLabel.appendChild(this.descriptionSpan);
        this.listenTo(this.model, 'change:indent', this.updateIndent);
        this.update(); // Set defaults.
        this.updateDescription();
        this.updateIndent();
    };
    /**
     * Overriden from super class
     *
     * Update the description span (rather than the label) since
     * we want the description to the right of the checkbox.
     */
    CheckboxView.prototype.updateDescription = function () {
        // can be called before the view is fully initialized
        if (this.checkboxLabel == null) {
            return;
        }
        var description = this.model.get('description');
        this.descriptionSpan.innerHTML = description;
        this.typeset(this.descriptionSpan);
        this.descriptionSpan.title = description;
        this.checkbox.title = description;
    };
    /**
     * Update the visibility of the label in the super class
     * to provide the optional indent.
     */
    CheckboxView.prototype.updateIndent = function () {
        var indent = this.model.get('indent');
        this.label.style.display = indent ? '' : 'none';
    };
    CheckboxView.prototype.events = function () {
        return {
            'click input[type="checkbox"]': '_handle_click'
        };
    };
    /**
     * Handles when the checkbox is clicked.
     *
     * Calling model.set will trigger all of the other views of the
     * model to update.
     */
    CheckboxView.prototype._handle_click = function () {
        var value = this.model.get('value');
        this.model.set('value', !value, { updated_view: this });
        this.touch();
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed. The model may have been
     * changed by another view or by a state update from the back-end.
     */
    CheckboxView.prototype.update = function (options) {
        this.checkbox.checked = this.model.get('value');
        if (options === undefined || options.updated_view != this) {
            this.checkbox.disabled = this.model.get('disabled');
        }
        return _super.prototype.update.call(this);
    };
    return CheckboxView;
}(widget_description_1.DescriptionView));
exports.CheckboxView = CheckboxView;
var ToggleButtonModel = /** @class */ (function (_super) {
    __extends(ToggleButtonModel, _super);
    function ToggleButtonModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleButtonModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _view_name: 'ToggleButtonView',
            _model_name: 'ToggleButtonModel',
            tooltip: '',
            icon: '',
            button_style: ''
        });
    };
    return ToggleButtonModel;
}(BoolModel));
exports.ToggleButtonModel = ToggleButtonModel;
var ToggleButtonView = /** @class */ (function (_super) {
    __extends(ToggleButtonView, _super);
    function ToggleButtonView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Called when view is rendered.
     */
    ToggleButtonView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('jupyter-button');
        this.el.classList.add('widget-toggle-button');
        this.listenTo(this.model, 'change:button_style', this.update_button_style);
        this.set_button_style();
        this.update(); // Set defaults.
    };
    ToggleButtonView.prototype.update_button_style = function () {
        this.update_mapped_classes(ToggleButtonView.class_map, 'button_style');
    };
    ToggleButtonView.prototype.set_button_style = function () {
        this.set_mapped_classes(ToggleButtonView.class_map, 'button_style');
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed. The model may have been
     * changed by another view or by a state update from the back-end.
     */
    ToggleButtonView.prototype.update = function (options) {
        if (this.model.get('value')) {
            this.el.classList.add('mod-active');
        }
        else {
            this.el.classList.remove('mod-active');
        }
        if (options === undefined || options.updated_view !== this) {
            this.el.disabled = this.model.get('disabled');
            this.el.setAttribute('title', this.model.get('tooltip'));
            var description = this.model.get('description');
            var icon = this.model.get('icon');
            if (description.trim().length === 0 && icon.trim().length === 0) {
                this.el.innerHTML = '&nbsp;'; // Preserve button height
            }
            else {
                this.el.textContent = '';
                if (icon.trim().length) {
                    var i = document.createElement('i');
                    this.el.appendChild(i);
                    i.classList.add('fa');
                    i.classList.add('fa-' + icon);
                }
                this.el.appendChild(document.createTextNode(description));
            }
        }
        return _super.prototype.update.call(this);
    };
    ToggleButtonView.prototype.events = function () {
        return {
            // Dictionary of events and their handlers.
            'click': '_handle_click'
        };
    };
    /**
     * Handles and validates user input.
     *
     * Calling model.set will trigger all of the other views of the
     * model to update.
     */
    ToggleButtonView.prototype._handle_click = function (event) {
        event.preventDefault();
        var value = this.model.get('value');
        this.model.set('value', !value, { updated_view: this });
        this.touch();
    };
    Object.defineProperty(ToggleButtonView.prototype, "tagName", {
        /**
         * The default tag name.
         *
         * #### Notes
         * This is a read-only attribute.
         */
        get: function () {
            // We can't make this an attribute with a default value
            // since it would be set after it is needed in the
            // constructor.
            return 'button';
        },
        enumerable: true,
        configurable: true
    });
    ToggleButtonView.class_map = {
        primary: ['mod-primary'],
        success: ['mod-success'],
        info: ['mod-info'],
        warning: ['mod-warning'],
        danger: ['mod-danger']
    };
    return ToggleButtonView;
}(base_1.DOMWidgetView));
exports.ToggleButtonView = ToggleButtonView;
var ValidModel = /** @class */ (function (_super) {
    __extends(ValidModel, _super);
    function ValidModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValidModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            readout: 'Invalid',
            _view_name: 'ValidView',
            _model_name: 'ValidModel'
        });
    };
    return ValidModel;
}(BoolModel));
exports.ValidModel = ValidModel;
var ValidView = /** @class */ (function (_super) {
    __extends(ValidView, _super);
    function ValidView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Called when view is rendered.
     */
    ValidView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-valid');
        this.el.classList.add('widget-inline-hbox');
        var icon = document.createElement('i');
        this.el.appendChild(icon);
        this.readout = document.createElement('span');
        this.readout.classList.add('widget-valid-readout');
        this.readout.classList.add('widget-readout');
        this.el.appendChild(this.readout);
        this.update();
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed.  The model may have been
     * changed by another view or by a state update from the back-end.
     */
    ValidView.prototype.update = function () {
        this.el.classList.remove('mod-valid');
        this.el.classList.remove('mod-invalid');
        this.readout.textContent = this.model.get('readout');
        if (this.model.get('value')) {
            this.el.classList.add('mod-valid');
        }
        else {
            this.el.classList.add('mod-invalid');
        }
    };
    return ValidView;
}(widget_description_1.DescriptionView));
exports.ValidView = ValidView;


/***/ }),

/***/ "0c3I":
/*!*******************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_core.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// widget_core implements some common patterns for the core widget collection
// that are not to be used directly by third-party widget authors.
var base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
var widget_description_1 = __webpack_require__(/*! ./widget_description */ "1OD8");
var version_1 = __webpack_require__(/*! ./version */ "VKie");
var _ = __webpack_require__(/*! underscore */ "F/us");
var CoreWidgetModel = /** @class */ (function (_super) {
    __extends(CoreWidgetModel, _super);
    function CoreWidgetModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CoreWidgetModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'CoreWidgetModel',
            _view_module: '@jupyter-widgets/controls',
            _model_module: '@jupyter-widgets/controls',
            _view_module_version: version_1.JUPYTER_CONTROLS_VERSION,
            _model_module_version: version_1.JUPYTER_CONTROLS_VERSION,
        });
    };
    return CoreWidgetModel;
}(base_1.WidgetModel));
exports.CoreWidgetModel = CoreWidgetModel;
var CoreDOMWidgetModel = /** @class */ (function (_super) {
    __extends(CoreDOMWidgetModel, _super);
    function CoreDOMWidgetModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CoreDOMWidgetModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'CoreDOMWidgetModel',
            _view_module: '@jupyter-widgets/controls',
            _model_module: '@jupyter-widgets/controls',
            _view_module_version: version_1.JUPYTER_CONTROLS_VERSION,
            _model_module_version: version_1.JUPYTER_CONTROLS_VERSION,
        });
    };
    return CoreDOMWidgetModel;
}(base_1.DOMWidgetModel));
exports.CoreDOMWidgetModel = CoreDOMWidgetModel;
var CoreDescriptionModel = /** @class */ (function (_super) {
    __extends(CoreDescriptionModel, _super);
    function CoreDescriptionModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CoreDescriptionModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'CoreDescriptionModel',
            _view_module: '@jupyter-widgets/controls',
            _model_module: '@jupyter-widgets/controls',
            _view_module_version: version_1.JUPYTER_CONTROLS_VERSION,
            _model_module_version: version_1.JUPYTER_CONTROLS_VERSION,
        });
    };
    return CoreDescriptionModel;
}(widget_description_1.DescriptionModel));
exports.CoreDescriptionModel = CoreDescriptionModel;


/***/ }),

/***/ "0pQw":
/*!*************************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_controller.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
var _ = __webpack_require__(/*! underscore */ "F/us");
var utils = __webpack_require__(/*! ./utils */ "SisM");
var ControllerButtonModel = /** @class */ (function (_super) {
    __extends(ControllerButtonModel, _super);
    function ControllerButtonModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControllerButtonModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'ControllerButtonModel',
            _view_name: 'ControllerButtonView',
            value: 0.0,
            pressed: false
        });
    };
    return ControllerButtonModel;
}(widget_core_1.CoreDOMWidgetModel));
exports.ControllerButtonModel = ControllerButtonModel;
/**
 * Very simple view for a gamepad button.
 */
var ControllerButtonView = /** @class */ (function (_super) {
    __extends(ControllerButtonView, _super);
    function ControllerButtonView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControllerButtonView.prototype.render = function () {
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-controller-button');
        this.support = document.createElement('div');
        this.support.style.position = 'relative';
        this.support.style.margin = '1px';
        this.support.style.width = '16px';
        this.support.style.height = '16px';
        this.support.style.border = '1px solid black';
        this.support.style.background = 'lightgray';
        this.el.appendChild(this.support);
        this.bar = document.createElement('div');
        this.bar.style.position = 'absolute';
        this.bar.style.width = '100%';
        this.bar.style.bottom = '0px';
        this.bar.style.background = 'gray';
        this.support.appendChild(this.bar);
        this.update();
        this.label = document.createElement('div');
        this.label.textContent = this.model.get('description');
        this.label.style.textAlign = 'center';
        this.el.appendChild(this.label);
    };
    ControllerButtonView.prototype.update = function () {
        this.bar.style.height = (100 * this.model.get('value')) + '%';
    };
    return ControllerButtonView;
}(base_1.DOMWidgetView));
exports.ControllerButtonView = ControllerButtonView;
var ControllerAxisModel = /** @class */ (function (_super) {
    __extends(ControllerAxisModel, _super);
    function ControllerAxisModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControllerAxisModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'ControllerAxisModel',
            _view_name: 'ControllerAxisView',
            value: 0.0
        });
    };
    return ControllerAxisModel;
}(widget_core_1.CoreDOMWidgetModel));
exports.ControllerAxisModel = ControllerAxisModel;
/**
 * Very simple view for a gamepad axis.
 */
var ControllerAxisView = /** @class */ (function (_super) {
    __extends(ControllerAxisView, _super);
    function ControllerAxisView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControllerAxisView.prototype.render = function () {
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-controller-axis');
        this.el.style.width = '16px';
        this.el.style.padding = '4px';
        this.support = document.createElement('div');
        this.support.style.position = 'relative';
        this.support.style.margin = '1px';
        this.support.style.width = '4px';
        this.support.style.height = '64px';
        this.support.style.border = '1px solid black';
        this.support.style.background = 'lightgray';
        this.bullet = document.createElement('div');
        this.bullet.style.position = 'absolute';
        this.bullet.style.margin = '-4px';
        this.bullet.style.width = '10px';
        this.bullet.style.height = '10px';
        this.bullet.style.background = 'gray';
        this.label = document.createElement('div');
        this.label.textContent = this.model.get('description');
        this.label.style.textAlign = 'center';
        this.support.appendChild(this.bullet);
        this.el.appendChild(this.support);
        this.el.appendChild(this.label);
        this.update();
    };
    ControllerAxisView.prototype.update = function () {
        this.bullet.style.top = (50 * (this.model.get('value') + 1)) + '%';
    };
    return ControllerAxisView;
}(base_1.DOMWidgetView));
exports.ControllerAxisView = ControllerAxisView;
var ControllerModel = /** @class */ (function (_super) {
    __extends(ControllerModel, _super);
    function ControllerModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControllerModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'ControllerModel',
            _view_name: 'ControllerView',
            index: 0,
            name: '',
            mapping: '',
            connected: false,
            timestamp: 0,
            buttons: [],
            axes: []
        });
    };
    ControllerModel.prototype.initialize = function (attributes, options) {
        _super.prototype.initialize.call(this, attributes, options);
        if (navigator.getGamepads === void 0) {
            // Checks if the browser supports the gamepad API
            this.readout = 'This browser does not support gamepads.';
            console.error(this.readout);
        }
        else {
            // Start the wait loop, and listen to updates of the only
            // user-provided attribute, the gamepad index.
            this.readout = 'Connect gamepad and press any button.';
            if (this.get('connected')) {
                // No need to re-create Button and Axis widgets, re-use
                // the models provided by the backend which may already
                // be wired to other things.
                this.update_loop();
            }
            else {
                // Wait for a gamepad to be connected.
                this.wait_loop();
            }
        }
    };
    /**
     * Waits for a gamepad to be connected at the provided index.
     * Once one is connected, it will start the update loop, which
     * populates the update of axes and button values.
     */
    ControllerModel.prototype.wait_loop = function () {
        var index = this.get('index');
        var pad = navigator.getGamepads()[index];
        if (pad) {
            var that_1 = this;
            this.setup(pad).then(function (controls) {
                that_1.set(controls);
                that_1.save_changes();
                window.requestAnimationFrame(that_1.update_loop.bind(that_1));
            });
        }
        else {
            window.requestAnimationFrame(this.wait_loop.bind(this));
        }
    };
    /**
     * Given a native gamepad object, returns a promise for a dictionary of
     * controls, of the form
     * {
     *     buttons: list of Button models,
     *     axes: list of Axis models,
     * }
     */
    ControllerModel.prototype.setup = function (pad) {
        // Set up the main gamepad attributes
        this.set({
            name: pad.id,
            mapping: pad.mapping,
            connected: pad.connected,
            timestamp: pad.timestamp
        });
        // Create buttons and axes. When done, start the update loop
        var that = this;
        return utils.resolvePromisesDict({
            buttons: Promise.all(pad.buttons.map(function (btn, index) {
                return that._create_button_model(index);
            })),
            axes: Promise.all(pad.axes.map(function (axis, index) {
                return that._create_axis_model(index);
            })),
        });
    };
    /**
     * Update axes and buttons values, until the gamepad is disconnected.
     * When the gamepad is disconnected, this.reset_gamepad is called.
     */
    ControllerModel.prototype.update_loop = function () {
        var index = this.get('index');
        var id = this.get('name');
        var pad = navigator.getGamepads()[index];
        if (pad && index === pad.index && id === pad.id) {
            this.set({
                timestamp: pad.timestamp,
                connected: pad.connected
            });
            this.save_changes();
            this.get('buttons').forEach(function (model, index) {
                model.set({
                    value: pad.buttons[index].value,
                    pressed: pad.buttons[index].pressed
                });
                model.save_changes();
            });
            this.get('axes').forEach(function (model, index) {
                model.set('value', pad.axes[index]);
                model.save_changes();
            });
            window.requestAnimationFrame(this.update_loop.bind(this));
        }
        else {
            this.reset_gamepad();
        }
    };
    /**
     * Resets the gamepad attributes, and start the wait_loop.
     */
    ControllerModel.prototype.reset_gamepad = function () {
        this.get('buttons').forEach(function (button) {
            button.close();
        });
        this.get('axes').forEach(function (axis) {
            axis.close();
        });
        this.set({
            name: '',
            mapping: '',
            connected: false,
            timestamp: 0.0,
            buttons: [],
            axes: []
        });
        this.save_changes();
        window.requestAnimationFrame(this.wait_loop.bind(this));
    };
    /**
     * Creates a gamepad button widget.
     */
    ControllerModel.prototype._create_button_model = function (index) {
        return this.widget_manager.new_widget({
            model_name: 'ControllerButtonModel',
            model_module: '@jupyter-widgets/controls',
            model_module_version: this.get('_model_module_version'),
            view_name: 'ControllerButtonView',
            view_module: '@jupyter-widgets/controls',
            view_module_version: this.get('_view_module_version'),
        }).then(function (model) {
            model.set('description', index);
            return model;
        });
    };
    /**
     * Creates a gamepad axis widget.
     */
    ControllerModel.prototype._create_axis_model = function (index) {
        return this.widget_manager.new_widget({
            model_name: 'ControllerAxisModel',
            model_module: '@jupyter-widgets/controls',
            model_module_version: this.get('_model_module_version'),
            view_name: 'ControllerAxisView',
            view_module: '@jupyter-widgets/controls',
            view_module_version: this.get('_view_module_version'),
        }).then(function (model) {
            model.set('description', index);
            return model;
        });
    };
    ControllerModel.serializers = __assign({}, widget_core_1.CoreDOMWidgetModel.serializers, { buttons: { deserialize: base_1.unpack_models }, axes: { deserialize: base_1.unpack_models } });
    return ControllerModel;
}(widget_core_1.CoreDOMWidgetModel));
exports.ControllerModel = ControllerModel;
/**
 * A simple view for a gamepad.
 */
var ControllerView = /** @class */ (function (_super) {
    __extends(ControllerView, _super);
    function ControllerView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControllerView.prototype.initialize = function (parameters) {
        _super.prototype.initialize.call(this, parameters);
        this.button_views = new base_1.ViewList(this.add_button, null, this);
        this.listenTo(this.model, 'change:buttons', function (model, value) {
            this.button_views.update(value);
        });
        this.axis_views = new base_1.ViewList(this.add_axis, null, this);
        this.listenTo(this.model, 'change:axes', function (model, value) {
            this.axis_views.update(value);
        });
        this.listenTo(this.model, 'change:name', this.update_label);
    };
    ControllerView.prototype.render = function () {
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-controller');
        this.box = this.el;
        this.label = document.createElement('div');
        this.box.appendChild(this.label);
        this.axis_box = document.createElement('div');
        this.axis_box.style.display = 'flex';
        this.box.appendChild(this.axis_box);
        this.button_box = document.createElement('div');
        this.button_box.style.display = 'flex';
        this.box.appendChild(this.button_box);
        this.button_views.update(this.model.get('buttons'));
        this.axis_views.update(this.model.get('axes'));
        this.update_label();
    };
    ControllerView.prototype.update_label = function () {
        this.label.textContent = this.model.get('name') || this.model.readout;
    };
    ControllerView.prototype.add_button = function (model) {
        var that = this;
        var dummy = document.createElement('div');
        that.button_box.appendChild(dummy);
        return this.create_child_view(model).then(function (view) {
            that.button_box.replaceChild(view.el, dummy);
            that.displayed.then(function () {
                view.trigger('displayed', that);
            });
            return view;
        }).catch(utils.reject('Could not add button view', true));
    };
    ControllerView.prototype.add_axis = function (model) {
        var that = this;
        var dummy = document.createElement('div');
        that.axis_box.appendChild(dummy);
        return this.create_child_view(model).then(function (view) {
            that.axis_box.replaceChild(view.el, dummy);
            that.displayed.then(function () {
                view.trigger('displayed', that);
            });
            return view;
        }).catch(utils.reject('Could not add axis view', true));
    };
    ControllerView.prototype.remove = function () {
        _super.prototype.remove.call(this);
        this.button_views.remove();
        this.axis_views.remove();
    };
    return ControllerView;
}(base_1.DOMWidgetView));
exports.ControllerView = ControllerView;


/***/ }),

/***/ "1OD8":
/*!**************************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_description.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
var utils_1 = __webpack_require__(/*! ./utils */ "SisM");
var version_1 = __webpack_require__(/*! ./version */ "VKie");
var DescriptionStyleModel = /** @class */ (function (_super) {
    __extends(DescriptionStyleModel, _super);
    function DescriptionStyleModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DescriptionStyleModel.prototype.defaults = function () {
        return __assign({}, _super.prototype.defaults.call(this), { _model_name: 'DescriptionStyleModel', _model_module: '@jupyter-widgets/controls', _model_module_version: version_1.JUPYTER_CONTROLS_VERSION });
    };
    DescriptionStyleModel.styleProperties = {
        description_width: {
            selector: '.widget-label',
            attribute: 'width',
            default: null
        },
    };
    return DescriptionStyleModel;
}(base_1.StyleModel));
exports.DescriptionStyleModel = DescriptionStyleModel;
var DescriptionModel = /** @class */ (function (_super) {
    __extends(DescriptionModel, _super);
    function DescriptionModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DescriptionModel.prototype.defaults = function () {
        return __assign({}, _super.prototype.defaults.call(this), { _model_name: 'DescriptionModel', _view_name: 'DescriptionView', _view_module: '@jupyter-widgets/controls', _model_module: '@jupyter-widgets/controls', _view_module_version: version_1.JUPYTER_CONTROLS_VERSION, _model_module_version: version_1.JUPYTER_CONTROLS_VERSION, description: '', description_tooltip: null });
    };
    return DescriptionModel;
}(base_1.DOMWidgetModel));
exports.DescriptionModel = DescriptionModel;
var DescriptionView = /** @class */ (function (_super) {
    __extends(DescriptionView, _super);
    function DescriptionView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DescriptionView.prototype.render = function () {
        this.label = document.createElement('label');
        this.el.appendChild(this.label);
        this.label.className = 'widget-label';
        this.label.style.display = 'none';
        this.listenTo(this.model, 'change:description', this.updateDescription);
        this.listenTo(this.model, 'change:description_tooltip', this.updateDescription);
        this.updateDescription();
    };
    DescriptionView.prototype.typeset = function (element, text) {
        this.displayed.then(function () { return utils_1.typeset(element, text); });
    };
    DescriptionView.prototype.updateDescription = function () {
        var description = this.model.get('description');
        var description_tooltip = this.model.get('description_tooltip');
        if (description_tooltip === null) {
            description_tooltip = description;
        }
        if (description.length === 0) {
            this.label.style.display = 'none';
        }
        else {
            this.label.innerHTML = description;
            this.typeset(this.label);
            this.label.style.display = '';
        }
        this.label.title = description_tooltip;
    };
    return DescriptionView;
}(base_1.DOMWidgetView));
exports.DescriptionView = DescriptionView;
/**
 * For backwards compatibility with jupyter-js-widgets 2.x.
 *
 * Use DescriptionModel instead.
 */
var LabeledDOMWidgetModel = /** @class */ (function (_super) {
    __extends(LabeledDOMWidgetModel, _super);
    function LabeledDOMWidgetModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LabeledDOMWidgetModel;
}(DescriptionModel));
exports.LabeledDOMWidgetModel = LabeledDOMWidgetModel;
/**
 * For backwards compatibility with jupyter-js-widgets 2.x.
 *
 * Use DescriptionView instead.
 */
var LabeledDOMWidgetView = /** @class */ (function (_super) {
    __extends(LabeledDOMWidgetView, _super);
    function LabeledDOMWidgetView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LabeledDOMWidgetView;
}(DescriptionView));
exports.LabeledDOMWidgetView = LabeledDOMWidgetView;


/***/ }),

/***/ "4IhH":
/*!**************************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/phosphor/accordion.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var algorithm_1 = __webpack_require__(/*! @phosphor/algorithm */ "rqNV");
var signaling_1 = __webpack_require__(/*! @phosphor/signaling */ "qUp9");
var widgets_1 = __webpack_require__(/*! @phosphor/widgets */ "pif5");
var currentselection_1 = __webpack_require__(/*! ./currentselection */ "XIYl");
/**
 * The class name added to Collapse instances.
 */
var COLLAPSE_CLASS = 'p-Collapse';
/**
 * The class name added to a Collapse's header.
 */
var COLLAPSE_HEADER_CLASS = 'p-Collapse-header';
/**
 * The class name added to a Collapse's contents.
 */
var COLLAPSE_CONTENTS_CLASS = 'p-Collapse-contents';
/**
 * The class name added to a Collapse when it is opened
 */
var COLLAPSE_CLASS_OPEN = 'p-Collapse-open';
/**
 * A panel that supports a collapsible header, made from the widget's title.
 * Clicking on the title expands or contracts the widget.
 */
var Collapse = /** @class */ (function (_super) {
    __extends(Collapse, _super);
    function Collapse(options) {
        var _this = _super.call(this, options) || this;
        _this._collapseChanged = new signaling_1.Signal(_this);
        _this.addClass(COLLAPSE_CLASS);
        _this._header = new widgets_1.Widget();
        _this._header.addClass(COLLAPSE_HEADER_CLASS);
        _this._header.node.addEventListener('click', _this);
        _this._content = new widgets_1.Panel();
        _this._content.addClass(COLLAPSE_CONTENTS_CLASS);
        var layout = new widgets_1.PanelLayout();
        _this.layout = layout;
        layout.addWidget(_this._header);
        layout.addWidget(_this._content);
        if (options.widget) {
            _this.widget = options.widget;
        }
        _this.collapsed = false;
        return _this;
    }
    Collapse.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        _super.prototype.dispose.call(this);
        this._header = null;
        this._widget = null;
        this._content = null;
    };
    Object.defineProperty(Collapse.prototype, "widget", {
        get: function () {
            return this._widget;
        },
        set: function (widget) {
            var oldWidget = this._widget;
            if (oldWidget) {
                oldWidget.disposed.disconnect(this._onChildDisposed, this);
                oldWidget.title.changed.disconnect(this._onTitleChanged, this);
                oldWidget.parent = null;
            }
            this._widget = widget;
            widget.disposed.connect(this._onChildDisposed, this);
            widget.title.changed.connect(this._onTitleChanged, this);
            this._onTitleChanged(widget.title);
            this._content.addWidget(widget);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Collapse.prototype, "collapsed", {
        get: function () {
            return this._collapsed;
        },
        set: function (value) {
            // TODO: should we have this check here?
            if (value === this._collapsed) {
                return;
            }
            if (value) {
                this._collapse();
            }
            else {
                this._uncollapse();
            }
        },
        enumerable: true,
        configurable: true
    });
    Collapse.prototype.toggle = function () {
        this.collapsed = !this.collapsed;
    };
    Object.defineProperty(Collapse.prototype, "collapseChanged", {
        get: function () {
            return this._collapseChanged;
        },
        enumerable: true,
        configurable: true
    });
    Collapse.prototype._collapse = function () {
        this._collapsed = true;
        if (this._content) {
            this._content.hide();
        }
        this.removeClass(COLLAPSE_CLASS_OPEN);
        this._collapseChanged.emit(void 0);
    };
    Collapse.prototype._uncollapse = function () {
        this._collapsed = false;
        if (this._content) {
            this._content.show();
        }
        this.addClass(COLLAPSE_CLASS_OPEN);
        this._collapseChanged.emit(void 0);
    };
    /**
     * Handle the DOM events for the Collapse widget.
     *
     * @param event - The DOM event sent to the panel.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the panel's DOM node. It should
     * not be called directly by user code.
     */
    Collapse.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'click':
                this._evtClick(event);
                break;
            default:
                break;
        }
    };
    Collapse.prototype._evtClick = function (event) {
        this.toggle();
    };
    /**
     * Handle the `changed` signal of a title object.
     */
    Collapse.prototype._onTitleChanged = function (sender) {
        this._header.node.textContent = this._widget.title.label;
    };
    Collapse.prototype._onChildDisposed = function (sender) {
        this.dispose();
    };
    return Collapse;
}(widgets_1.Widget));
exports.Collapse = Collapse;
/**
 * The class name added to Accordion instances.
 */
var ACCORDION_CLASS = 'p-Accordion';
/**
 * The class name added to an Accordion child.
 */
var ACCORDION_CHILD_CLASS = 'p-Accordion-child';
var ACCORDION_CHILD_ACTIVE_CLASS = 'p-Accordion-child-active';
/**
 * A panel that supports a collapsible header, made from the widget's title.
 * Clicking on the title expands or contracts the widget.
 */
var Accordion = /** @class */ (function (_super) {
    __extends(Accordion, _super);
    function Accordion(options) {
        var _this = _super.call(this, options) || this;
        _this._selection = new currentselection_1.Selection(_this.widgets);
        _this._selection.selectionChanged.connect(_this._onSelectionChanged, _this);
        _this.addClass(ACCORDION_CLASS);
        return _this;
    }
    Object.defineProperty(Accordion.prototype, "collapseWidgets", {
        /**
         * A read-only sequence of the widgets in the panel.
         *
         * #### Notes
         * This is a read-only property.
         */
        /*  get widgets(): ISequence<Widget> {
            return new ArraySequence(toArray(map((this.layout as PanelLayout).widgets, (w: Collapse) => w.widget)));
          }
        */
        get: function () {
            return this.layout.widgets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion.prototype, "selection", {
        get: function () {
            return this._selection;
        },
        enumerable: true,
        configurable: true
    });
    Accordion.prototype.indexOf = function (widget) {
        return algorithm_1.ArrayExt.findFirstIndex(this.collapseWidgets, function (w) { return w.widget === widget; });
    };
    /**
     * Add a widget to the end of the accordion.
     *
     * @param widget - The widget to add to the accordion.
     *
     * @returns The Collapse widget wrapping the added widget.
     *
     * #### Notes
     * The widget will be wrapped in a CollapsedWidget.
     */
    Accordion.prototype.addWidget = function (widget) {
        var collapse = this._wrapWidget(widget);
        collapse.collapsed = true;
        _super.prototype.addWidget.call(this, collapse);
        this._selection.adjustSelectionForInsert(this.widgets.length - 1, collapse);
        return collapse;
    };
    /**
     * Insert a widget at the specified index.
     *
     * @param index - The index at which to insert the widget.
     *
     * @param widget - The widget to insert into to the accordion.
     *
     * #### Notes
     * If the widget is already contained in the panel, it will be moved.
     */
    Accordion.prototype.insertWidget = function (index, widget) {
        var collapse = this._wrapWidget(widget);
        collapse.collapsed = true;
        _super.prototype.insertWidget.call(this, index, collapse);
        this._selection.adjustSelectionForInsert(index, collapse);
    };
    Accordion.prototype.removeWidget = function (widget) {
        var index = this.indexOf(widget);
        if (index >= 0) {
            var collapse = this.collapseWidgets[index];
            widget.parent = null;
            collapse.dispose();
            this._selection.adjustSelectionForRemove(index, null);
        }
    };
    Accordion.prototype._wrapWidget = function (widget) {
        var collapse = new Collapse({ widget: widget });
        collapse.addClass(ACCORDION_CHILD_CLASS);
        collapse.collapseChanged.connect(this._onCollapseChange, this);
        return collapse;
    };
    Accordion.prototype._onCollapseChange = function (sender) {
        if (!sender.collapsed) {
            this._selection.value = sender;
        }
        else if (this._selection.value === sender && sender.collapsed) {
            this._selection.value = null;
        }
    };
    Accordion.prototype._onSelectionChanged = function (sender, change) {
        // Collapse previous widget, open current widget
        var pv = change.previousValue;
        var cv = change.currentValue;
        if (pv) {
            pv.collapsed = true;
            pv.removeClass(ACCORDION_CHILD_ACTIVE_CLASS);
        }
        if (cv) {
            cv.collapsed = false;
            cv.addClass(ACCORDION_CHILD_ACTIVE_CLASS);
        }
    };
    return Accordion;
}(widgets_1.Panel));
exports.Accordion = Accordion;


/***/ }),

/***/ "JMIS":
/*!*********************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_button.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var version_1 = __webpack_require__(/*! ./version */ "VKie");
var _ = __webpack_require__(/*! underscore */ "F/us");
var ButtonStyleModel = /** @class */ (function (_super) {
    __extends(ButtonStyleModel, _super);
    function ButtonStyleModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonStyleModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'ButtonStyleModel',
            _model_module: '@jupyter-widgets/controls',
            _model_module_version: version_1.JUPYTER_CONTROLS_VERSION,
        });
    };
    ButtonStyleModel.styleProperties = {
        button_color: {
            selector: '',
            attribute: 'background-color',
            default: null
        },
        font_weight: {
            selector: '',
            attribute: 'font-weight',
            default: ''
        }
    };
    return ButtonStyleModel;
}(base_1.StyleModel));
exports.ButtonStyleModel = ButtonStyleModel;
var ButtonModel = /** @class */ (function (_super) {
    __extends(ButtonModel, _super);
    function ButtonModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            description: '',
            tooltip: '',
            disabled: false,
            icon: '',
            button_style: '',
            _view_name: 'ButtonView',
            _model_name: 'ButtonModel',
            style: null
        });
    };
    return ButtonModel;
}(widget_core_1.CoreDOMWidgetModel));
exports.ButtonModel = ButtonModel;
var ButtonView = /** @class */ (function (_super) {
    __extends(ButtonView, _super);
    function ButtonView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Called when view is rendered.
     */
    ButtonView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('jupyter-button');
        this.el.classList.add('widget-button');
        this.listenTo(this.model, 'change:button_style', this.update_button_style);
        this.set_button_style();
        this.update(); // Set defaults.
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed. The model may have been
     * changed by another view or by a state update from the back-end.
     */
    ButtonView.prototype.update = function () {
        this.el.disabled = this.model.get('disabled');
        this.el.setAttribute('title', this.model.get('tooltip'));
        var description = this.model.get('description');
        var icon = this.model.get('icon');
        if (description.length || icon.length) {
            this.el.textContent = '';
            if (icon.length) {
                var i = document.createElement('i');
                i.classList.add('fa');
                i.classList.add('fa-' + icon);
                if (description.length === 0) {
                    i.classList.add('center');
                }
                this.el.appendChild(i);
            }
            this.el.appendChild(document.createTextNode(description));
        }
        return _super.prototype.update.call(this);
    };
    ButtonView.prototype.update_button_style = function () {
        this.update_mapped_classes(ButtonView.class_map, 'button_style');
    };
    ButtonView.prototype.set_button_style = function () {
        this.set_mapped_classes(ButtonView.class_map, 'button_style');
    };
    /**
     * Dictionary of events and handlers
     */
    ButtonView.prototype.events = function () {
        // TODO: return typing not needed in Typescript later than 1.8.x
        // See http://stackoverflow.com/questions/22077023/why-cant-i-indirectly-return-an-object-literal-to-satisfy-an-index-signature-re and https://github.com/Microsoft/TypeScript/pull/7029
        return { 'click': '_handle_click' };
    };
    /**
     * Handles when the button is clicked.
     */
    ButtonView.prototype._handle_click = function (event) {
        event.preventDefault();
        this.send({ event: 'click' });
    };
    Object.defineProperty(ButtonView.prototype, "tagName", {
        /**
         * The default tag name.
         *
         * #### Notes
         * This is a read-only attribute.
         */
        get: function () {
            // We can't make this an attribute with a default value
            // since it would be set after it is needed in the
            // constructor.
            return 'button';
        },
        enumerable: true,
        configurable: true
    });
    ButtonView.class_map = {
        primary: ['mod-primary'],
        success: ['mod-success'],
        info: ['mod-info'],
        warning: ['mod-warning'],
        danger: ['mod-danger']
    };
    return ButtonView;
}(base_1.DOMWidgetView));
exports.ButtonView = ButtonView;


/***/ }),

/***/ "MIQu":
/*!*********************************************!*\
  !*** ./node_modules/jquery-ui/ui/widget.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Widget 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Widget
//>>group: Core
//>>description: Provides a factory for creating stateful widgets with a common API.
//>>docs: http://api.jqueryui.com/jQuery.widget/
//>>demos: http://jqueryui.com/widget/

( function( factory ) {
	if ( true ) {

		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(/*! jquery */ "EVdn"), __webpack_require__(/*! ./version */ "Qwlt") ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}( function( $ ) {

var widgetUuid = 0;
var widgetSlice = Array.prototype.slice;

$.cleanData = ( function( orig ) {
	return function( elems ) {
		var events, elem, i;
		for ( i = 0; ( elem = elems[ i ] ) != null; i++ ) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data( elem, "events" );
				if ( events && events.remove ) {
					$( elem ).triggerHandler( "remove" );
				}

			// Http://bugs.jquery.com/ticket/8235
			} catch ( e ) {}
		}
		orig( elems );
	};
} )( $.cleanData );

$.widget = function( name, base, prototype ) {
	var existingConstructor, constructor, basePrototype;

	// ProxiedPrototype allows the provided prototype to remain unmodified
	// so that it can be used as a mixin for multiple widgets (#8876)
	var proxiedPrototype = {};

	var namespace = name.split( "." )[ 0 ];
	name = name.split( "." )[ 1 ];
	var fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	if ( $.isArray( prototype ) ) {
		prototype = $.extend.apply( null, [ {} ].concat( prototype ) );
	}

	// Create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {

		// Allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// Allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};

	// Extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,

		// Copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),

		// Track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	} );

	basePrototype = new base();

	// We need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = ( function() {
			function _super() {
				return base.prototype[ prop ].apply( this, arguments );
			}

			function _superApply( args ) {
				return base.prototype[ prop ].apply( this, args );
			}

			return function() {
				var __super = this._super;
				var __superApply = this._superApply;
				var returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		} )();
	} );
	constructor.prototype = $.widget.extend( basePrototype, {

		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? ( basePrototype.widgetEventPrefix || name ) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	} );

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// Redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor,
				child._proto );
		} );

		// Remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );

	return constructor;
};

$.widget.extend = function( target ) {
	var input = widgetSlice.call( arguments, 1 );
	var inputIndex = 0;
	var inputLength = input.length;
	var key;
	var value;

	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {

				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :

						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );

				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string";
		var args = widgetSlice.call( arguments, 1 );
		var returnValue = this;

		if ( isMethodCall ) {

			// If this is an empty collection, we need to have the instance method
			// return undefined instead of the jQuery instance
			if ( !this.length && options === "instance" ) {
				returnValue = undefined;
			} else {
				this.each( function() {
					var methodValue;
					var instance = $.data( this, fullName );

					if ( options === "instance" ) {
						returnValue = instance;
						return false;
					}

					if ( !instance ) {
						return $.error( "cannot call methods on " + name +
							" prior to initialization; " +
							"attempted to call method '" + options + "'" );
					}

					if ( !$.isFunction( instance[ options ] ) || options.charAt( 0 ) === "_" ) {
						return $.error( "no such method '" + options + "' for " + name +
							" widget instance" );
					}

					methodValue = instance[ options ].apply( instance, args );

					if ( methodValue !== instance && methodValue !== undefined ) {
						returnValue = methodValue && methodValue.jquery ?
							returnValue.pushStack( methodValue.get() ) :
							methodValue;
						return false;
					}
				} );
			}
		} else {

			// Allow multiple hashes to be passed on init
			if ( args.length ) {
				options = $.widget.extend.apply( null, [ options ].concat( args ) );
			}

			this.each( function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} );
					if ( instance._init ) {
						instance._init();
					}
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			} );
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",

	options: {
		classes: {},
		disabled: false,

		// Callbacks
		create: null
	},

	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = widgetUuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();
		this.classesElementLookup = {};

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			} );
			this.document = $( element.style ?

				// Element within the document
				element.ownerDocument :

				// Element is window or document
				element.document || element );
			this.window = $( this.document[ 0 ].defaultView || this.document[ 0 ].parentWindow );
		}

		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this._create();

		if ( this.options.disabled ) {
			this._setOptionDisabled( this.options.disabled );
		}

		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},

	_getCreateOptions: function() {
		return {};
	},

	_getCreateEventData: $.noop,

	_create: $.noop,

	_init: $.noop,

	destroy: function() {
		var that = this;

		this._destroy();
		$.each( this.classesElementLookup, function( key, value ) {
			that._removeClass( value, key );
		} );

		// We can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.off( this.eventNamespace )
			.removeData( this.widgetFullName );
		this.widget()
			.off( this.eventNamespace )
			.removeAttr( "aria-disabled" );

		// Clean up events and states
		this.bindings.off( this.eventNamespace );
	},

	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key;
		var parts;
		var curOption;
		var i;

		if ( arguments.length === 0 ) {

			// Don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {

			// Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},

	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},

	_setOption: function( key, value ) {
		if ( key === "classes" ) {
			this._setOptionClasses( value );
		}

		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this._setOptionDisabled( value );
		}

		return this;
	},

	_setOptionClasses: function( value ) {
		var classKey, elements, currentElements;

		for ( classKey in value ) {
			currentElements = this.classesElementLookup[ classKey ];
			if ( value[ classKey ] === this.options.classes[ classKey ] ||
					!currentElements ||
					!currentElements.length ) {
				continue;
			}

			// We are doing this to create a new jQuery object because the _removeClass() call
			// on the next line is going to destroy the reference to the current elements being
			// tracked. We need to save a copy of this collection so that we can add the new classes
			// below.
			elements = $( currentElements.get() );
			this._removeClass( currentElements, classKey );

			// We don't use _addClass() here, because that uses this.options.classes
			// for generating the string of classes. We want to use the value passed in from
			// _setOption(), this is the new value of the classes option which was passed to
			// _setOption(). We pass this value directly to _classes().
			elements.addClass( this._classes( {
				element: elements,
				keys: classKey,
				classes: value,
				add: true
			} ) );
		}
	},

	_setOptionDisabled: function( value ) {
		this._toggleClass( this.widget(), this.widgetFullName + "-disabled", null, !!value );

		// If the widget is becoming disabled, then nothing is interactive
		if ( value ) {
			this._removeClass( this.hoverable, null, "ui-state-hover" );
			this._removeClass( this.focusable, null, "ui-state-focus" );
		}
	},

	enable: function() {
		return this._setOptions( { disabled: false } );
	},

	disable: function() {
		return this._setOptions( { disabled: true } );
	},

	_classes: function( options ) {
		var full = [];
		var that = this;

		options = $.extend( {
			element: this.element,
			classes: this.options.classes || {}
		}, options );

		function processClassString( classes, checkOption ) {
			var current, i;
			for ( i = 0; i < classes.length; i++ ) {
				current = that.classesElementLookup[ classes[ i ] ] || $();
				if ( options.add ) {
					current = $( $.unique( current.get().concat( options.element.get() ) ) );
				} else {
					current = $( current.not( options.element ).get() );
				}
				that.classesElementLookup[ classes[ i ] ] = current;
				full.push( classes[ i ] );
				if ( checkOption && options.classes[ classes[ i ] ] ) {
					full.push( options.classes[ classes[ i ] ] );
				}
			}
		}

		this._on( options.element, {
			"remove": "_untrackClassesElement"
		} );

		if ( options.keys ) {
			processClassString( options.keys.match( /\S+/g ) || [], true );
		}
		if ( options.extra ) {
			processClassString( options.extra.match( /\S+/g ) || [] );
		}

		return full.join( " " );
	},

	_untrackClassesElement: function( event ) {
		var that = this;
		$.each( that.classesElementLookup, function( key, value ) {
			if ( $.inArray( event.target, value ) !== -1 ) {
				that.classesElementLookup[ key ] = $( value.not( event.target ).get() );
			}
		} );
	},

	_removeClass: function( element, keys, extra ) {
		return this._toggleClass( element, keys, extra, false );
	},

	_addClass: function( element, keys, extra ) {
		return this._toggleClass( element, keys, extra, true );
	},

	_toggleClass: function( element, keys, extra, add ) {
		add = ( typeof add === "boolean" ) ? add : extra;
		var shift = ( typeof element === "string" || element === null ),
			options = {
				extra: shift ? keys : extra,
				keys: shift ? element : keys,
				element: shift ? this.element : element,
				add: add
			};
		options.element.toggleClass( this._classes( options ), add );
		return this;
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement;
		var instance = this;

		// No suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// No element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {

				// Allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
						$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// Copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^([\w:-]*)\s*(.*)$/ );
			var eventName = match[ 1 ] + instance.eventNamespace;
			var selector = match[ 2 ];

			if ( selector ) {
				delegateElement.on( eventName, selector, handlerProxy );
			} else {
				element.on( eventName, handlerProxy );
			}
		} );
	},

	_off: function( element, eventName ) {
		eventName = ( eventName || "" ).split( " " ).join( this.eventNamespace + " " ) +
			this.eventNamespace;
		element.off( eventName ).off( eventName );

		// Clear the stack to avoid memory leaks (#10056)
		this.bindings = $( this.bindings.not( element ).get() );
		this.focusable = $( this.focusable.not( element ).get() );
		this.hoverable = $( this.hoverable.not( element ).get() );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				this._addClass( $( event.currentTarget ), null, "ui-state-hover" );
			},
			mouseleave: function( event ) {
				this._removeClass( $( event.currentTarget ), null, "ui-state-hover" );
			}
		} );
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				this._addClass( $( event.currentTarget ), null, "ui-state-focus" );
			},
			focusout: function( event ) {
				this._removeClass( $( event.currentTarget ), null, "ui-state-focus" );
			}
		} );
	},

	_trigger: function( type, event, data ) {
		var prop, orig;
		var callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();

		// The original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// Copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[ 0 ], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}

		var hasOptions;
		var effectName = !options ?
			method :
			options === true || typeof options === "number" ?
				defaultEffect :
				options.effect || defaultEffect;

		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}

		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;

		if ( options.delay ) {
			element.delay( options.delay );
		}

		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue( function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			} );
		}
	};
} );

return $.widget;

} ) );


/***/ }),

/***/ "NHgk":
/*!*****************************************!*\
  !*** ./node_modules/jquery-ui/ui/ie.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;( function( factory ) {
	if ( true ) {

		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(/*! jquery */ "EVdn"), __webpack_require__(/*! ./version */ "Qwlt") ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
} ( function( $ ) {

// This file is deprecated
return $.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );
} ) );


/***/ }),

/***/ "QBwY":
/*!*****************************************************!*\
  !*** ./node_modules/jquery-ui/ui/widgets/slider.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Slider 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Slider
//>>group: Widgets
//>>description: Displays a flexible slider with ranges and accessibility via keyboard.
//>>docs: http://api.jqueryui.com/slider/
//>>demos: http://jqueryui.com/slider/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/slider.css
//>>css.theme: ../../themes/base/theme.css

( function( factory ) {
	if ( true ) {

		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
			__webpack_require__(/*! jquery */ "EVdn"),
			__webpack_require__(/*! ./mouse */ "iGnl"),
			__webpack_require__(/*! ../keycode */ "vBzC"),
			__webpack_require__(/*! ../version */ "Qwlt"),
			__webpack_require__(/*! ../widget */ "MIQu")
		], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}( function( $ ) {

return $.widget( "ui.slider", $.ui.mouse, {
	version: "1.12.1",
	widgetEventPrefix: "slide",

	options: {
		animate: false,
		classes: {
			"ui-slider": "ui-corner-all",
			"ui-slider-handle": "ui-corner-all",

			// Note: ui-widget-header isn't the most fittingly semantic framework class for this
			// element, but worked best visually with a variety of themes
			"ui-slider-range": "ui-corner-all ui-widget-header"
		},
		distance: 0,
		max: 100,
		min: 0,
		orientation: "horizontal",
		range: false,
		step: 1,
		value: 0,
		values: null,

		// Callbacks
		change: null,
		slide: null,
		start: null,
		stop: null
	},

	// Number of pages in a slider
	// (how many times can you page up/down to go through the whole range)
	numPages: 5,

	_create: function() {
		this._keySliding = false;
		this._mouseSliding = false;
		this._animateOff = true;
		this._handleIndex = null;
		this._detectOrientation();
		this._mouseInit();
		this._calculateNewMax();

		this._addClass( "ui-slider ui-slider-" + this.orientation,
			"ui-widget ui-widget-content" );

		this._refresh();

		this._animateOff = false;
	},

	_refresh: function() {
		this._createRange();
		this._createHandles();
		this._setupEvents();
		this._refreshValue();
	},

	_createHandles: function() {
		var i, handleCount,
			options = this.options,
			existingHandles = this.element.find( ".ui-slider-handle" ),
			handle = "<span tabindex='0'></span>",
			handles = [];

		handleCount = ( options.values && options.values.length ) || 1;

		if ( existingHandles.length > handleCount ) {
			existingHandles.slice( handleCount ).remove();
			existingHandles = existingHandles.slice( 0, handleCount );
		}

		for ( i = existingHandles.length; i < handleCount; i++ ) {
			handles.push( handle );
		}

		this.handles = existingHandles.add( $( handles.join( "" ) ).appendTo( this.element ) );

		this._addClass( this.handles, "ui-slider-handle", "ui-state-default" );

		this.handle = this.handles.eq( 0 );

		this.handles.each( function( i ) {
			$( this )
				.data( "ui-slider-handle-index", i )
				.attr( "tabIndex", 0 );
		} );
	},

	_createRange: function() {
		var options = this.options;

		if ( options.range ) {
			if ( options.range === true ) {
				if ( !options.values ) {
					options.values = [ this._valueMin(), this._valueMin() ];
				} else if ( options.values.length && options.values.length !== 2 ) {
					options.values = [ options.values[ 0 ], options.values[ 0 ] ];
				} else if ( $.isArray( options.values ) ) {
					options.values = options.values.slice( 0 );
				}
			}

			if ( !this.range || !this.range.length ) {
				this.range = $( "<div>" )
					.appendTo( this.element );

				this._addClass( this.range, "ui-slider-range" );
			} else {
				this._removeClass( this.range, "ui-slider-range-min ui-slider-range-max" );

				// Handle range switching from true to min/max
				this.range.css( {
					"left": "",
					"bottom": ""
				} );
			}
			if ( options.range === "min" || options.range === "max" ) {
				this._addClass( this.range, "ui-slider-range-" + options.range );
			}
		} else {
			if ( this.range ) {
				this.range.remove();
			}
			this.range = null;
		}
	},

	_setupEvents: function() {
		this._off( this.handles );
		this._on( this.handles, this._handleEvents );
		this._hoverable( this.handles );
		this._focusable( this.handles );
	},

	_destroy: function() {
		this.handles.remove();
		if ( this.range ) {
			this.range.remove();
		}

		this._mouseDestroy();
	},

	_mouseCapture: function( event ) {
		var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle,
			that = this,
			o = this.options;

		if ( o.disabled ) {
			return false;
		}

		this.elementSize = {
			width: this.element.outerWidth(),
			height: this.element.outerHeight()
		};
		this.elementOffset = this.element.offset();

		position = { x: event.pageX, y: event.pageY };
		normValue = this._normValueFromMouse( position );
		distance = this._valueMax() - this._valueMin() + 1;
		this.handles.each( function( i ) {
			var thisDistance = Math.abs( normValue - that.values( i ) );
			if ( ( distance > thisDistance ) ||
				( distance === thisDistance &&
					( i === that._lastChangedValue || that.values( i ) === o.min ) ) ) {
				distance = thisDistance;
				closestHandle = $( this );
				index = i;
			}
		} );

		allowed = this._start( event, index );
		if ( allowed === false ) {
			return false;
		}
		this._mouseSliding = true;

		this._handleIndex = index;

		this._addClass( closestHandle, null, "ui-state-active" );
		closestHandle.trigger( "focus" );

		offset = closestHandle.offset();
		mouseOverHandle = !$( event.target ).parents().addBack().is( ".ui-slider-handle" );
		this._clickOffset = mouseOverHandle ? { left: 0, top: 0 } : {
			left: event.pageX - offset.left - ( closestHandle.width() / 2 ),
			top: event.pageY - offset.top -
				( closestHandle.height() / 2 ) -
				( parseInt( closestHandle.css( "borderTopWidth" ), 10 ) || 0 ) -
				( parseInt( closestHandle.css( "borderBottomWidth" ), 10 ) || 0 ) +
				( parseInt( closestHandle.css( "marginTop" ), 10 ) || 0 )
		};

		if ( !this.handles.hasClass( "ui-state-hover" ) ) {
			this._slide( event, index, normValue );
		}
		this._animateOff = true;
		return true;
	},

	_mouseStart: function() {
		return true;
	},

	_mouseDrag: function( event ) {
		var position = { x: event.pageX, y: event.pageY },
			normValue = this._normValueFromMouse( position );

		this._slide( event, this._handleIndex, normValue );

		return false;
	},

	_mouseStop: function( event ) {
		this._removeClass( this.handles, null, "ui-state-active" );
		this._mouseSliding = false;

		this._stop( event, this._handleIndex );
		this._change( event, this._handleIndex );

		this._handleIndex = null;
		this._clickOffset = null;
		this._animateOff = false;

		return false;
	},

	_detectOrientation: function() {
		this.orientation = ( this.options.orientation === "vertical" ) ? "vertical" : "horizontal";
	},

	_normValueFromMouse: function( position ) {
		var pixelTotal,
			pixelMouse,
			percentMouse,
			valueTotal,
			valueMouse;

		if ( this.orientation === "horizontal" ) {
			pixelTotal = this.elementSize.width;
			pixelMouse = position.x - this.elementOffset.left -
				( this._clickOffset ? this._clickOffset.left : 0 );
		} else {
			pixelTotal = this.elementSize.height;
			pixelMouse = position.y - this.elementOffset.top -
				( this._clickOffset ? this._clickOffset.top : 0 );
		}

		percentMouse = ( pixelMouse / pixelTotal );
		if ( percentMouse > 1 ) {
			percentMouse = 1;
		}
		if ( percentMouse < 0 ) {
			percentMouse = 0;
		}
		if ( this.orientation === "vertical" ) {
			percentMouse = 1 - percentMouse;
		}

		valueTotal = this._valueMax() - this._valueMin();
		valueMouse = this._valueMin() + percentMouse * valueTotal;

		return this._trimAlignValue( valueMouse );
	},

	_uiHash: function( index, value, values ) {
		var uiHash = {
			handle: this.handles[ index ],
			handleIndex: index,
			value: value !== undefined ? value : this.value()
		};

		if ( this._hasMultipleValues() ) {
			uiHash.value = value !== undefined ? value : this.values( index );
			uiHash.values = values || this.values();
		}

		return uiHash;
	},

	_hasMultipleValues: function() {
		return this.options.values && this.options.values.length;
	},

	_start: function( event, index ) {
		return this._trigger( "start", event, this._uiHash( index ) );
	},

	_slide: function( event, index, newVal ) {
		var allowed, otherVal,
			currentValue = this.value(),
			newValues = this.values();

		if ( this._hasMultipleValues() ) {
			otherVal = this.values( index ? 0 : 1 );
			currentValue = this.values( index );

			if ( this.options.values.length === 2 && this.options.range === true ) {
				newVal =  index === 0 ? Math.min( otherVal, newVal ) : Math.max( otherVal, newVal );
			}

			newValues[ index ] = newVal;
		}

		if ( newVal === currentValue ) {
			return;
		}

		allowed = this._trigger( "slide", event, this._uiHash( index, newVal, newValues ) );

		// A slide can be canceled by returning false from the slide callback
		if ( allowed === false ) {
			return;
		}

		if ( this._hasMultipleValues() ) {
			this.values( index, newVal );
		} else {
			this.value( newVal );
		}
	},

	_stop: function( event, index ) {
		this._trigger( "stop", event, this._uiHash( index ) );
	},

	_change: function( event, index ) {
		if ( !this._keySliding && !this._mouseSliding ) {

			//store the last changed value index for reference when handles overlap
			this._lastChangedValue = index;
			this._trigger( "change", event, this._uiHash( index ) );
		}
	},

	value: function( newValue ) {
		if ( arguments.length ) {
			this.options.value = this._trimAlignValue( newValue );
			this._refreshValue();
			this._change( null, 0 );
			return;
		}

		return this._value();
	},

	values: function( index, newValue ) {
		var vals,
			newValues,
			i;

		if ( arguments.length > 1 ) {
			this.options.values[ index ] = this._trimAlignValue( newValue );
			this._refreshValue();
			this._change( null, index );
			return;
		}

		if ( arguments.length ) {
			if ( $.isArray( arguments[ 0 ] ) ) {
				vals = this.options.values;
				newValues = arguments[ 0 ];
				for ( i = 0; i < vals.length; i += 1 ) {
					vals[ i ] = this._trimAlignValue( newValues[ i ] );
					this._change( null, i );
				}
				this._refreshValue();
			} else {
				if ( this._hasMultipleValues() ) {
					return this._values( index );
				} else {
					return this.value();
				}
			}
		} else {
			return this._values();
		}
	},

	_setOption: function( key, value ) {
		var i,
			valsLength = 0;

		if ( key === "range" && this.options.range === true ) {
			if ( value === "min" ) {
				this.options.value = this._values( 0 );
				this.options.values = null;
			} else if ( value === "max" ) {
				this.options.value = this._values( this.options.values.length - 1 );
				this.options.values = null;
			}
		}

		if ( $.isArray( this.options.values ) ) {
			valsLength = this.options.values.length;
		}

		this._super( key, value );

		switch ( key ) {
			case "orientation":
				this._detectOrientation();
				this._removeClass( "ui-slider-horizontal ui-slider-vertical" )
					._addClass( "ui-slider-" + this.orientation );
				this._refreshValue();
				if ( this.options.range ) {
					this._refreshRange( value );
				}

				// Reset positioning from previous orientation
				this.handles.css( value === "horizontal" ? "bottom" : "left", "" );
				break;
			case "value":
				this._animateOff = true;
				this._refreshValue();
				this._change( null, 0 );
				this._animateOff = false;
				break;
			case "values":
				this._animateOff = true;
				this._refreshValue();

				// Start from the last handle to prevent unreachable handles (#9046)
				for ( i = valsLength - 1; i >= 0; i-- ) {
					this._change( null, i );
				}
				this._animateOff = false;
				break;
			case "step":
			case "min":
			case "max":
				this._animateOff = true;
				this._calculateNewMax();
				this._refreshValue();
				this._animateOff = false;
				break;
			case "range":
				this._animateOff = true;
				this._refresh();
				this._animateOff = false;
				break;
		}
	},

	_setOptionDisabled: function( value ) {
		this._super( value );

		this._toggleClass( null, "ui-state-disabled", !!value );
	},

	//internal value getter
	// _value() returns value trimmed by min and max, aligned by step
	_value: function() {
		var val = this.options.value;
		val = this._trimAlignValue( val );

		return val;
	},

	//internal values getter
	// _values() returns array of values trimmed by min and max, aligned by step
	// _values( index ) returns single value trimmed by min and max, aligned by step
	_values: function( index ) {
		var val,
			vals,
			i;

		if ( arguments.length ) {
			val = this.options.values[ index ];
			val = this._trimAlignValue( val );

			return val;
		} else if ( this._hasMultipleValues() ) {

			// .slice() creates a copy of the array
			// this copy gets trimmed by min and max and then returned
			vals = this.options.values.slice();
			for ( i = 0; i < vals.length; i += 1 ) {
				vals[ i ] = this._trimAlignValue( vals[ i ] );
			}

			return vals;
		} else {
			return [];
		}
	},

	// Returns the step-aligned value that val is closest to, between (inclusive) min and max
	_trimAlignValue: function( val ) {
		if ( val <= this._valueMin() ) {
			return this._valueMin();
		}
		if ( val >= this._valueMax() ) {
			return this._valueMax();
		}
		var step = ( this.options.step > 0 ) ? this.options.step : 1,
			valModStep = ( val - this._valueMin() ) % step,
			alignValue = val - valModStep;

		if ( Math.abs( valModStep ) * 2 >= step ) {
			alignValue += ( valModStep > 0 ) ? step : ( -step );
		}

		// Since JavaScript has problems with large floats, round
		// the final value to 5 digits after the decimal point (see #4124)
		return parseFloat( alignValue.toFixed( 5 ) );
	},

	_calculateNewMax: function() {
		var max = this.options.max,
			min = this._valueMin(),
			step = this.options.step,
			aboveMin = Math.round( ( max - min ) / step ) * step;
		max = aboveMin + min;
		if ( max > this.options.max ) {

			//If max is not divisible by step, rounding off may increase its value
			max -= step;
		}
		this.max = parseFloat( max.toFixed( this._precision() ) );
	},

	_precision: function() {
		var precision = this._precisionOf( this.options.step );
		if ( this.options.min !== null ) {
			precision = Math.max( precision, this._precisionOf( this.options.min ) );
		}
		return precision;
	},

	_precisionOf: function( num ) {
		var str = num.toString(),
			decimal = str.indexOf( "." );
		return decimal === -1 ? 0 : str.length - decimal - 1;
	},

	_valueMin: function() {
		return this.options.min;
	},

	_valueMax: function() {
		return this.max;
	},

	_refreshRange: function( orientation ) {
		if ( orientation === "vertical" ) {
			this.range.css( { "width": "", "left": "" } );
		}
		if ( orientation === "horizontal" ) {
			this.range.css( { "height": "", "bottom": "" } );
		}
	},

	_refreshValue: function() {
		var lastValPercent, valPercent, value, valueMin, valueMax,
			oRange = this.options.range,
			o = this.options,
			that = this,
			animate = ( !this._animateOff ) ? o.animate : false,
			_set = {};

		if ( this._hasMultipleValues() ) {
			this.handles.each( function( i ) {
				valPercent = ( that.values( i ) - that._valueMin() ) / ( that._valueMax() -
					that._valueMin() ) * 100;
				_set[ that.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
				$( this ).stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );
				if ( that.options.range === true ) {
					if ( that.orientation === "horizontal" ) {
						if ( i === 0 ) {
							that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( {
								left: valPercent + "%"
							}, o.animate );
						}
						if ( i === 1 ) {
							that.range[ animate ? "animate" : "css" ]( {
								width: ( valPercent - lastValPercent ) + "%"
							}, {
								queue: false,
								duration: o.animate
							} );
						}
					} else {
						if ( i === 0 ) {
							that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( {
								bottom: ( valPercent ) + "%"
							}, o.animate );
						}
						if ( i === 1 ) {
							that.range[ animate ? "animate" : "css" ]( {
								height: ( valPercent - lastValPercent ) + "%"
							}, {
								queue: false,
								duration: o.animate
							} );
						}
					}
				}
				lastValPercent = valPercent;
			} );
		} else {
			value = this.value();
			valueMin = this._valueMin();
			valueMax = this._valueMax();
			valPercent = ( valueMax !== valueMin ) ?
					( value - valueMin ) / ( valueMax - valueMin ) * 100 :
					0;
			_set[ this.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
			this.handle.stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );

			if ( oRange === "min" && this.orientation === "horizontal" ) {
				this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( {
					width: valPercent + "%"
				}, o.animate );
			}
			if ( oRange === "max" && this.orientation === "horizontal" ) {
				this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( {
					width: ( 100 - valPercent ) + "%"
				}, o.animate );
			}
			if ( oRange === "min" && this.orientation === "vertical" ) {
				this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( {
					height: valPercent + "%"
				}, o.animate );
			}
			if ( oRange === "max" && this.orientation === "vertical" ) {
				this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( {
					height: ( 100 - valPercent ) + "%"
				}, o.animate );
			}
		}
	},

	_handleEvents: {
		keydown: function( event ) {
			var allowed, curVal, newVal, step,
				index = $( event.target ).data( "ui-slider-handle-index" );

			switch ( event.keyCode ) {
				case $.ui.keyCode.HOME:
				case $.ui.keyCode.END:
				case $.ui.keyCode.PAGE_UP:
				case $.ui.keyCode.PAGE_DOWN:
				case $.ui.keyCode.UP:
				case $.ui.keyCode.RIGHT:
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.LEFT:
					event.preventDefault();
					if ( !this._keySliding ) {
						this._keySliding = true;
						this._addClass( $( event.target ), null, "ui-state-active" );
						allowed = this._start( event, index );
						if ( allowed === false ) {
							return;
						}
					}
					break;
			}

			step = this.options.step;
			if ( this._hasMultipleValues() ) {
				curVal = newVal = this.values( index );
			} else {
				curVal = newVal = this.value();
			}

			switch ( event.keyCode ) {
				case $.ui.keyCode.HOME:
					newVal = this._valueMin();
					break;
				case $.ui.keyCode.END:
					newVal = this._valueMax();
					break;
				case $.ui.keyCode.PAGE_UP:
					newVal = this._trimAlignValue(
						curVal + ( ( this._valueMax() - this._valueMin() ) / this.numPages )
					);
					break;
				case $.ui.keyCode.PAGE_DOWN:
					newVal = this._trimAlignValue(
						curVal - ( ( this._valueMax() - this._valueMin() ) / this.numPages ) );
					break;
				case $.ui.keyCode.UP:
				case $.ui.keyCode.RIGHT:
					if ( curVal === this._valueMax() ) {
						return;
					}
					newVal = this._trimAlignValue( curVal + step );
					break;
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.LEFT:
					if ( curVal === this._valueMin() ) {
						return;
					}
					newVal = this._trimAlignValue( curVal - step );
					break;
			}

			this._slide( event, index, newVal );
		},
		keyup: function( event ) {
			var index = $( event.target ).data( "ui-slider-handle-index" );

			if ( this._keySliding ) {
				this._keySliding = false;
				this._stop( event, index );
				this._change( event, index );
				this._removeClass( $( event.target ), null, "ui-state-active" );
			}
		}
	}
} );

} ) );


/***/ }),

/***/ "Qwlt":
/*!**********************************************!*\
  !*** ./node_modules/jquery-ui/ui/version.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;( function( factory ) {
	if ( true ) {

		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(/*! jquery */ "EVdn") ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
} ( function( $ ) {

$.ui = $.ui || {};

return $.ui.version = "1.12.1";

} ) );


/***/ }),

/***/ "SisM":
/*!*************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/utils.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
exports.uuid = base_1.uuid;
exports.WrappedError = base_1.WrappedError;
exports.resolvePromisesDict = base_1.resolvePromisesDict;
var base_2 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
/**
 * Creates a wrappable Promise rejection function.
 *
 * Creates a function that returns a Promise.reject with a new WrappedError
 * that has the provided message and wraps the original error that
 * caused the promise to reject.
 */
function reject(message, log) {
    return function promiseRejection(error) {
        var wrapped_error = new base_2.WrappedError(message, error);
        if (log) {
            console.error(wrapped_error);
        }
        return Promise.reject(wrapped_error);
    };
}
exports.reject = reject;
/**
 * Apply MathJax rendering to an element, and optionally set its text.
 *
 * If MathJax is not available, make no changes.
 *
 * Parameters
 * ----------
 * element: Node
 * text: optional string
 */
function typeset(element, text) {
    if (text !== void 0) {
        element.textContent = text;
    }
    if (window.MathJax !== void 0) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, element]);
    }
}
exports.typeset = typeset;
/**
 * escape text to HTML
 */
function escape_html(text) {
    var esc = document.createElement('div');
    esc.textContent = text;
    return esc.innerHTML;
}
exports.escape_html = escape_html;


/***/ }),

/***/ "TtYL":
/*!******************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_int.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var widget_description_1 = __webpack_require__(/*! ./widget_description */ "1OD8");
var base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
var utils_1 = __webpack_require__(/*! ./utils */ "SisM");
var d3_format_1 = __webpack_require__(/*! d3-format */ "rWgG");
var _ = __webpack_require__(/*! underscore */ "F/us");
var $ = __webpack_require__(/*! jquery */ "EVdn");
__webpack_require__(/*! jquery-ui/ui/widgets/slider */ "QBwY");
var IntModel = /** @class */ (function (_super) {
    __extends(IntModel, _super);
    function IntModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'IntModel',
            value: 0,
        });
    };
    return IntModel;
}(widget_core_1.CoreDescriptionModel));
exports.IntModel = IntModel;
var BoundedIntModel = /** @class */ (function (_super) {
    __extends(BoundedIntModel, _super);
    function BoundedIntModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoundedIntModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'BoundedIntModel',
            max: 100,
            min: 0
        });
    };
    return BoundedIntModel;
}(IntModel));
exports.BoundedIntModel = BoundedIntModel;
var SliderStyleModel = /** @class */ (function (_super) {
    __extends(SliderStyleModel, _super);
    function SliderStyleModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SliderStyleModel.prototype.defaults = function () {
        return __assign({}, _super.prototype.defaults.call(this), { _model_name: 'SliderStyleModel' });
    };
    SliderStyleModel.styleProperties = __assign({}, widget_description_1.DescriptionStyleModel.styleProperties, { handle_color: {
            selector: '.ui-slider-handle',
            attribute: 'background-color',
            default: null
        } });
    return SliderStyleModel;
}(widget_description_1.DescriptionStyleModel));
exports.SliderStyleModel = SliderStyleModel;
var IntSliderModel = /** @class */ (function (_super) {
    __extends(IntSliderModel, _super);
    function IntSliderModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntSliderModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'IntSliderModel',
            _view_name: 'IntSliderView',
            step: 1,
            orientation: 'horizontal',
            readout: true,
            readout_format: 'd',
            continuous_update: true,
            style: null,
            disabled: false,
        });
    };
    IntSliderModel.prototype.initialize = function (attributes, options) {
        _super.prototype.initialize.call(this, attributes, options);
        this.on('change:readout_format', this.update_readout_format, this);
        this.update_readout_format();
    };
    IntSliderModel.prototype.update_readout_format = function () {
        this.readout_formatter = d3_format_1.format(this.get('readout_format'));
    };
    return IntSliderModel;
}(BoundedIntModel));
exports.IntSliderModel = IntSliderModel;
var IntRangeSliderModel = /** @class */ (function (_super) {
    __extends(IntRangeSliderModel, _super);
    function IntRangeSliderModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IntRangeSliderModel;
}(IntSliderModel));
exports.IntRangeSliderModel = IntRangeSliderModel;
var BaseIntSliderView = /** @class */ (function (_super) {
    __extends(BaseIntSliderView, _super);
    function BaseIntSliderView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._parse_value = parseInt;
        return _this;
    }
    BaseIntSliderView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-slider');
        this.el.classList.add('widget-hslider');
        (this.$slider = $('<div />'))
            .slider({
            slide: this.handleSliderChange.bind(this),
            stop: this.handleSliderChanged.bind(this)
        })
            .addClass('slider');
        // Put the slider in a container
        this.slider_container = document.createElement('div');
        this.slider_container.classList.add('slider-container');
        this.slider_container.appendChild(this.$slider[0]);
        this.el.appendChild(this.slider_container);
        this.readout = document.createElement('div');
        this.el.appendChild(this.readout);
        this.readout.classList.add('widget-readout');
        this.readout.contentEditable = 'true';
        this.readout.style.display = 'none';
        // Set defaults.
        this.update();
    };
    BaseIntSliderView.prototype.update = function (options) {
        /**
         * Update the contents of this view
         *
         * Called when the model is changed.  The model may have been
         * changed by another view or by a state update from the back-end.
         */
        if (options === undefined || options.updated_view !== this) {
            // JQuery slider option keys.  These keys happen to have a
            // one-to-one mapping with the corresponding keys of the model.
            var jquery_slider_keys = ['step', 'disabled'];
            var that_1 = this;
            that_1.$slider.slider({});
            jquery_slider_keys.forEach(function (key) {
                var model_value = that_1.model.get(key);
                if (model_value !== undefined) {
                    that_1.$slider.slider('option', key, model_value);
                }
            });
            if (this.model.get('disabled')) {
                this.readout.contentEditable = 'false';
            }
            else {
                this.readout.contentEditable = 'true';
            }
            var max = this.model.get('max');
            var min = this.model.get('min');
            if (min <= max) {
                if (max !== undefined) {
                    this.$slider.slider('option', 'max', max);
                }
                if (min !== undefined) {
                    this.$slider.slider('option', 'min', min);
                }
            }
            // WORKAROUND FOR JQUERY SLIDER BUG.
            // The horizontal position of the slider handle
            // depends on the value of the slider at the time
            // of orientation change.  Before applying the new
            // workaround, we set the value to the minimum to
            // make sure that the horizontal placement of the
            // handle in the vertical slider is always
            // consistent.
            var orientation_1 = this.model.get('orientation');
            this.$slider.slider('option', 'orientation', orientation_1);
            // Use the right CSS classes for vertical & horizontal sliders
            if (orientation_1 === 'vertical') {
                this.el.classList.remove('widget-hslider');
                this.el.classList.add('widget-vslider');
                this.el.classList.remove('widget-inline-hbox');
                this.el.classList.add('widget-inline-vbox');
            }
            else {
                this.el.classList.remove('widget-vslider');
                this.el.classList.add('widget-hslider');
                this.el.classList.remove('widget-inline-vbox');
                this.el.classList.add('widget-inline-hbox');
            }
            var readout = this.model.get('readout');
            if (readout) {
                this.readout.style.display = '';
                this.displayed.then(function () {
                    if (that_1.readout_overflow()) {
                        that_1.readout.classList.add('overflow');
                    }
                    else {
                        that_1.readout.classList.remove('overflow');
                    }
                });
            }
            else {
                this.readout.style.display = 'none';
            }
        }
        return _super.prototype.update.call(this);
    };
    /**
     * Returns true if the readout box content overflows.
     */
    BaseIntSliderView.prototype.readout_overflow = function () {
        return this.readout.scrollWidth > this.readout.clientWidth;
    };
    BaseIntSliderView.prototype.events = function () {
        return {
            // Dictionary of events and their handlers.
            'slide': 'handleSliderChange',
            'slidestop': 'handleSliderChanged',
            'blur [contentEditable=true]': 'handleTextChange',
            'keydown [contentEditable=true]': 'handleKeyDown'
        };
    };
    BaseIntSliderView.prototype.handleKeyDown = function (e) {
        if (e.keyCode === 13) { /* keyboard keycodes `enter` */
            e.preventDefault();
            this.handleTextChange();
        }
    };
    /**
     * Validate the value of the slider before sending it to the back-end
     * and applying it to the other views on the page.
     */
    BaseIntSliderView.prototype._validate_slide_value = function (x) {
        return Math.floor(x);
    };
    return BaseIntSliderView;
}(widget_description_1.DescriptionView));
exports.BaseIntSliderView = BaseIntSliderView;
var IntRangeSliderView = /** @class */ (function (_super) {
    __extends(IntRangeSliderView, _super);
    function IntRangeSliderView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // range numbers can be separated by a hyphen, colon, or an en-dash
        _this._range_regex = /^\s*([+-]?\d+)\s*[-:–]\s*([+-]?\d+)/;
        return _this;
    }
    IntRangeSliderView.prototype.update = function (options) {
        _super.prototype.update.call(this, options);
        this.$slider.slider('option', 'range', true);
        // values for the range case are validated python-side in
        // _Bounded{Int,Float}RangeWidget._validate
        var value = this.model.get('value');
        this.$slider.slider('option', 'values', value.slice());
        this.readout.textContent = this.valueToString(value);
        if (this.model.get('value') !== value) {
            this.model.set('value', value, { updated_view: this });
            this.touch();
        }
    };
    /**
     * Write value to a string
     */
    IntRangeSliderView.prototype.valueToString = function (value) {
        var format = this.model.readout_formatter;
        return value.map(function (v) {
            return format(v);
        }).join(' – ');
    };
    /**
     * Parse value from a string
     */
    IntRangeSliderView.prototype.stringToValue = function (text) {
        // ranges can be expressed either 'val-val' or 'val:val' (+spaces)
        var match = this._range_regex.exec(text);
        if (match) {
            return [this._parse_value(match[1]), this._parse_value(match[2])];
        }
        else {
            return null;
        }
    };
    /**
     * this handles the entry of text into the contentEditable label first, the
     * value is checked if it contains a parseable value then it is clamped
     * within the min-max range of the slider finally, the model is updated if
     * the value is to be changed
     *
     * if any of these conditions are not met, the text is reset
     */
    IntRangeSliderView.prototype.handleTextChange = function () {
        var value = this.stringToValue(this.readout.textContent);
        var vmin = this.model.get('min');
        var vmax = this.model.get('max');
        // reject input where NaN or lower > upper
        if (value === null ||
            isNaN(value[0]) ||
            isNaN(value[1]) ||
            (value[0] > value[1])) {
            this.readout.textContent = this.valueToString(this.model.get('value'));
        }
        else {
            // clamp to range
            value = [Math.max(Math.min(value[0], vmax), vmin),
                Math.max(Math.min(value[1], vmax), vmin)];
            if ((value[0] !== this.model.get('value')[0]) ||
                (value[1] !== this.model.get('value')[1])) {
                this.readout.textContent = this.valueToString(value);
                this.model.set('value', value, { updated_view: this });
                this.touch();
            }
            else {
                this.readout.textContent = this.valueToString(this.model.get('value'));
            }
        }
    };
    /**
     * Called when the slider value is changing.
     */
    IntRangeSliderView.prototype.handleSliderChange = function (e, ui) {
        var actual_value = ui.values.map(this._validate_slide_value);
        this.readout.textContent = this.valueToString(actual_value);
        // Only persist the value while sliding if the continuous_update
        // trait is set to true.
        if (this.model.get('continuous_update')) {
            this.handleSliderChanged(e, ui);
        }
    };
    /**
     * Called when the slider value has changed.
     *
     * Calling model.set will trigger all of the other views of the
     * model to update.
     */
    IntRangeSliderView.prototype.handleSliderChanged = function (e, ui) {
        var actual_value = ui.values.map(this._validate_slide_value);
        this.model.set('value', actual_value, { updated_view: this });
        this.touch();
    };
    return IntRangeSliderView;
}(BaseIntSliderView));
exports.IntRangeSliderView = IntRangeSliderView;
var IntSliderView = /** @class */ (function (_super) {
    __extends(IntSliderView, _super);
    function IntSliderView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntSliderView.prototype.update = function (options) {
        _super.prototype.update.call(this, options);
        var min = this.model.get('min');
        var max = this.model.get('max');
        var value = this.model.get('value');
        if (value > max) {
            value = max;
        }
        else if (value < min) {
            value = min;
        }
        this.$slider.slider('option', 'value', value);
        this.readout.textContent = this.valueToString(value);
        if (this.model.get('value') !== value) {
            this.model.set('value', value, { updated_view: this });
            this.touch();
        }
    };
    /**
     * Write value to a string
     */
    IntSliderView.prototype.valueToString = function (value) {
        var format = this.model.readout_formatter;
        return format(value);
    };
    /**
     * Parse value from a string
     */
    IntSliderView.prototype.stringToValue = function (text) {
        return this._parse_value(text);
    };
    /**
     * this handles the entry of text into the contentEditable label first, the
     * value is checked if it contains a parseable value then it is clamped
     * within the min-max range of the slider finally, the model is updated if
     * the value is to be changed
     *
     * if any of these conditions are not met, the text is reset
     */
    IntSliderView.prototype.handleTextChange = function () {
        var value = this.stringToValue(this.readout.textContent);
        var vmin = this.model.get('min');
        var vmax = this.model.get('max');
        if (isNaN(value)) {
            this.readout.textContent = this.valueToString(this.model.get('value'));
        }
        else {
            value = Math.max(Math.min(value, vmax), vmin);
            if (value !== this.model.get('value')) {
                this.readout.textContent = this.valueToString(value);
                this.model.set('value', value, { updated_view: this });
                this.touch();
            }
            else {
                this.readout.textContent = this.valueToString(this.model.get('value'));
            }
        }
    };
    /**
     * Called when the slider value is changing.
     */
    IntSliderView.prototype.handleSliderChange = function (e, ui) {
        var actual_value = this._validate_slide_value(ui.value);
        this.readout.textContent = this.valueToString(actual_value);
        // Only persist the value while sliding if the continuous_update
        // trait is set to true.
        if (this.model.get('continuous_update')) {
            this.handleSliderChanged(e, ui);
        }
    };
    /**
     * Called when the slider value has changed.
     *
     * Calling model.set will trigger all of the other views of the
     * model to update.
     */
    IntSliderView.prototype.handleSliderChanged = function (e, ui) {
        var actual_value = this._validate_slide_value(ui.value);
        this.model.set('value', actual_value, { updated_view: this });
        this.touch();
    };
    return IntSliderView;
}(BaseIntSliderView));
exports.IntSliderView = IntSliderView;
var IntTextModel = /** @class */ (function (_super) {
    __extends(IntTextModel, _super);
    function IntTextModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntTextModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'IntTextModel',
            _view_name: 'IntTextView',
            disabled: false,
            continuous_update: false,
        });
    };
    return IntTextModel;
}(IntModel));
exports.IntTextModel = IntTextModel;
var BoundedIntTextModel = /** @class */ (function (_super) {
    __extends(BoundedIntTextModel, _super);
    function BoundedIntTextModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoundedIntTextModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'BoundedIntTextModel',
            _view_name: 'IntTextView',
            disabled: false,
            continuous_update: false,
            step: 1,
        });
    };
    return BoundedIntTextModel;
}(BoundedIntModel));
exports.BoundedIntTextModel = BoundedIntTextModel;
var IntTextView = /** @class */ (function (_super) {
    __extends(IntTextView, _super);
    function IntTextView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._parse_value = parseInt;
        _this._default_step = '1';
        return _this;
    }
    IntTextView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-text');
        this.textbox = document.createElement('input');
        this.textbox.type = 'number';
        this.textbox.required = true;
        this.textbox.id = this.label.htmlFor = utils_1.uuid();
        this.el.appendChild(this.textbox);
        this.update(); // Set defaults.
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed.  The model may have been
     * changed by another view or by a state update from the back-end.
     */
    IntTextView.prototype.update = function (options) {
        if (options === undefined || options.updated_view !== this) {
            var value = this.model.get('value');
            if (this._parse_value(this.textbox.value) !== value) {
                this.textbox.value = value.toString();
            }
            if (this.model.get('min') !== undefined) {
                this.textbox.min = this.model.get('min');
            }
            if (this.model.get('max') !== undefined) {
                this.textbox.max = this.model.get('max');
            }
            if (this.model.get('step') !== undefined
                && this.model.get('step') !== null) {
                this.textbox.step = this.model.get('step');
            }
            else {
                this.textbox.step = this._default_step;
            }
            this.textbox.disabled = this.model.get('disabled');
        }
        return _super.prototype.update.call(this);
    };
    IntTextView.prototype.events = function () {
        return {
            'keydown input': 'handleKeyDown',
            'keypress input': 'handleKeypress',
            'keyup input': 'handleKeyUp',
            'input input': 'handleChanging',
            'change input': 'handleChanged'
        };
    };
    /**
     * Handle key down
     *
     * Stop propagation so the event isn't sent to the application.
     */
    IntTextView.prototype.handleKeyDown = function (e) {
        e.stopPropagation();
    };
    /**
     * Handles key press
     */
    IntTextView.prototype.handleKeypress = function (e) {
        if (/[e,.\s]/.test(String.fromCharCode(e.keyCode))) {
            e.preventDefault();
        }
    };
    /**
     * Handle key up
     */
    IntTextView.prototype.handleKeyUp = function (e) {
        if (e.altKey || e.ctrlKey) {
            return;
        }
        /* remove invalid characters */
        var value = e.target.value;
        value = value.replace(/[e,.\s]/g, "");
        if (value.length >= 1) {
            var subvalue = value.substr(1);
            value = value[0] + subvalue.replace(/[+-]/g, "");
        }
        if (e.target.value != value) {
            e.preventDefault();
            e.target.value = value;
        }
    };
    /**
     * Call the submit handler if continuous update is true and we are not
     * obviously incomplete.
     */
    IntTextView.prototype.handleChanging = function (e) {
        var trimmed = e.target.value.trim();
        if (trimmed === '' || (['-', '-.', '.', '+.', '+'].indexOf(trimmed) >= 0)) {
            // incomplete number
            return;
        }
        if (this.model.get('continuous_update')) {
            this.handleChanged(e);
        }
    };
    /**
     * Applies validated input.
     */
    IntTextView.prototype.handleChanged = function (e) {
        var numericalValue = this._parse_value(e.target.value);
        // If parse failed, reset value to value stored in model.
        if (isNaN(numericalValue)) {
            e.target.value = this.model.get('value');
        }
        else {
            // Handle both the unbounded and bounded case by
            // checking to see if the max/min properties are defined
            var boundedValue = numericalValue;
            if (this.model.get('max') !== undefined) {
                boundedValue = Math.min(this.model.get('max'), boundedValue);
            }
            if (this.model.get('min') !== undefined) {
                boundedValue = Math.max(this.model.get('min'), boundedValue);
            }
            if (boundedValue !== numericalValue) {
                e.target.value = boundedValue;
                numericalValue = boundedValue;
            }
            // Apply the value if it has changed.
            if (numericalValue !== this.model.get('value')) {
                this.model.set('value', numericalValue, { updated_view: this });
                this.touch();
            }
        }
    };
    return IntTextView;
}(widget_description_1.DescriptionView));
exports.IntTextView = IntTextView;
var ProgressStyleModel = /** @class */ (function (_super) {
    __extends(ProgressStyleModel, _super);
    function ProgressStyleModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressStyleModel.prototype.defaults = function () {
        return __assign({}, _super.prototype.defaults.call(this), { _model_name: 'ProgressStyleModel' });
    };
    ProgressStyleModel.styleProperties = __assign({}, widget_description_1.DescriptionStyleModel.styleProperties, { bar_color: {
            selector: '.progress-bar',
            attribute: 'background-color',
            default: null
        } });
    return ProgressStyleModel;
}(widget_description_1.DescriptionStyleModel));
exports.ProgressStyleModel = ProgressStyleModel;
var IntProgressModel = /** @class */ (function (_super) {
    __extends(IntProgressModel, _super);
    function IntProgressModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntProgressModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'IntProgressModel',
            _view_name: 'ProgressView',
            orientation: 'horizontal',
            bar_style: '',
            style: null
        });
    };
    return IntProgressModel;
}(BoundedIntModel));
exports.IntProgressModel = IntProgressModel;
var ProgressView = /** @class */ (function (_super) {
    __extends(ProgressView, _super);
    function ProgressView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressView.prototype.initialize = function (parameters) {
        _super.prototype.initialize.call(this, parameters);
        this.listenTo(this.model, 'change:bar_style', this.update_bar_style);
        this.pWidget.addClass('jupyter-widgets');
    };
    ProgressView.prototype.render = function () {
        _super.prototype.render.call(this);
        var orientation = this.model.get('orientation');
        var className = orientation === 'horizontal' ?
            'widget-hprogress' : 'widget-vprogress';
        this.el.classList.add(className);
        this.progress = document.createElement('div');
        this.progress.classList.add('progress');
        this.progress.style.position = 'relative';
        this.el.appendChild(this.progress);
        this.bar = document.createElement('div');
        this.bar.classList.add('progress-bar');
        this.bar.style.position = 'absolute';
        this.bar.style.bottom = '0px';
        this.bar.style.left = '0px';
        this.progress.appendChild(this.bar);
        // Set defaults.
        this.update();
        this.set_bar_style();
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed.  The model may have been
     * changed by another view or by a state update from the back-end.
     */
    ProgressView.prototype.update = function () {
        var value = this.model.get('value');
        var max = this.model.get('max');
        var min = this.model.get('min');
        var orientation = this.model.get('orientation');
        var percent = 100.0 * (value - min) / (max - min);
        if (orientation === 'horizontal') {
            this.el.classList.remove('widget-inline-vbox');
            this.el.classList.remove('widget-vprogress');
            this.el.classList.add('widget-inline-hbox');
            this.el.classList.add('widget-hprogress');
            this.bar.style.width = percent + '%';
            this.bar.style.height = '100%';
        }
        else {
            this.el.classList.remove('widget-inline-hbox');
            this.el.classList.remove('widget-hprogress');
            this.el.classList.add('widget-inline-vbox');
            this.el.classList.add('widget-vprogress');
            this.bar.style.width = '100%';
            this.bar.style.height = percent + '%';
        }
        return _super.prototype.update.call(this);
    };
    ProgressView.prototype.update_bar_style = function () {
        this.update_mapped_classes(ProgressView.class_map, 'bar_style', this.bar);
    };
    ProgressView.prototype.set_bar_style = function () {
        this.set_mapped_classes(ProgressView.class_map, 'bar_style', this.bar);
    };
    ProgressView.class_map = {
        success: ['progress-bar-success'],
        info: ['progress-bar-info'],
        warning: ['progress-bar-warning'],
        danger: ['progress-bar-danger']
    };
    return ProgressView;
}(widget_description_1.DescriptionView));
exports.ProgressView = ProgressView;
var PlayModel = /** @class */ (function (_super) {
    __extends(PlayModel, _super);
    function PlayModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'PlayModel',
            _view_name: 'PlayView',
            _playing: false,
            _repeat: false,
            show_repeat: true,
            interval: 100,
            step: 1,
            disabled: false,
        });
    };
    PlayModel.prototype.initialize = function (attributes, options) {
        _super.prototype.initialize.call(this, attributes, options);
    };
    PlayModel.prototype.loop = function () {
        if (this.get('_playing')) {
            var next_value = this.get('value') + this.get('step');
            if (next_value <= this.get('max')) {
                this.set('value', next_value);
                this.schedule_next();
            }
            else {
                if (this.get('_repeat')) {
                    this.set('value', this.get('min'));
                    this.schedule_next();
                }
                else {
                    this.set('_playing', false);
                }
            }
            this.save_changes();
        }
    };
    PlayModel.prototype.schedule_next = function () {
        window.setTimeout(this.loop.bind(this), this.get('interval'));
    };
    PlayModel.prototype.stop = function () {
        this.set('_playing', false);
        this.set('value', this.get('min'));
        this.save_changes();
    };
    PlayModel.prototype.pause = function () {
        this.set('_playing', false);
        this.save_changes();
    };
    PlayModel.prototype.play = function () {
        this.set('_playing', true);
        if (this.get('value') == this.get('max')) {
            // if the value is at the end, reset if first, and then schedule the next
            this.set('value', this.get('min'));
            this.schedule_next();
            this.save_changes();
        }
        else {
            // otherwise directly start with the next value
            // loop will call save_changes in this case
            this.loop();
        }
    };
    PlayModel.prototype.repeat = function () {
        this.set('_repeat', !this.get('_repeat'));
        this.save_changes();
    };
    return PlayModel;
}(BoundedIntModel));
exports.PlayModel = PlayModel;
var PlayView = /** @class */ (function (_super) {
    __extends(PlayView, _super);
    function PlayView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-play');
        this.playButton = document.createElement('button');
        this.pauseButton = document.createElement('button');
        this.stopButton = document.createElement('button');
        this.repeatButton = document.createElement('button');
        this.playButton.className = 'jupyter-button';
        this.pauseButton.className = 'jupyter-button';
        this.stopButton.className = 'jupyter-button';
        this.repeatButton.className = 'jupyter-button';
        this.el.appendChild(this.playButton); // Toggle button with playing
        this.el.appendChild(this.pauseButton); // Disable if not playing
        this.el.appendChild(this.stopButton); // Disable if not playing
        this.el.appendChild(this.repeatButton); // Always enabled, but may be hidden
        var playIcon = document.createElement('i');
        playIcon.className = 'fa fa-play';
        this.playButton.appendChild(playIcon);
        var pauseIcon = document.createElement('i');
        pauseIcon.className = 'fa fa-pause';
        this.pauseButton.appendChild(pauseIcon);
        var stopIcon = document.createElement('i');
        stopIcon.className = 'fa fa-stop';
        this.stopButton.appendChild(stopIcon);
        var repeatIcon = document.createElement('i');
        repeatIcon.className = 'fa fa-retweet';
        this.repeatButton.appendChild(repeatIcon);
        this.playButton.onclick = this.model.play.bind(this.model);
        this.pauseButton.onclick = this.model.pause.bind(this.model);
        this.stopButton.onclick = this.model.stop.bind(this.model);
        this.repeatButton.onclick = this.model.repeat.bind(this.model);
        this.listenTo(this.model, 'change:_playing', this.update_playing);
        this.listenTo(this.model, 'change:_repeat', this.update_repeat);
        this.listenTo(this.model, 'change:show_repeat', this.update_repeat);
        this.update_playing();
        this.update_repeat();
        this.update();
    };
    PlayView.prototype.update = function () {
        var disabled = this.model.get('disabled');
        this.playButton.disabled = disabled;
        this.pauseButton.disabled = disabled;
        this.stopButton.disabled = disabled;
        this.repeatButton.disabled = disabled;
        this.update_playing();
    };
    PlayView.prototype.update_playing = function () {
        var playing = this.model.get('_playing');
        var disabled = this.model.get('disabled');
        if (playing) {
            if (!disabled) {
                this.pauseButton.disabled = false;
            }
            this.playButton.classList.add('mod-active');
        }
        else {
            if (!disabled) {
                this.pauseButton.disabled = true;
            }
            this.playButton.classList.remove('mod-active');
        }
    };
    PlayView.prototype.update_repeat = function () {
        var repeat = this.model.get('_repeat');
        this.repeatButton.style.display = this.model.get('show_repeat') ? this.playButton.style.display : 'none';
        if (repeat) {
            this.repeatButton.classList.add('mod-active');
        }
        else {
            this.repeatButton.classList.remove('mod-active');
        }
    };
    return PlayView;
}(base_1.DOMWidgetView));
exports.PlayView = PlayView;


/***/ }),

/***/ "WSRZ":
/*!*******************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_link.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var _ = __webpack_require__(/*! underscore */ "F/us");
var DirectionalLinkModel = /** @class */ (function (_super) {
    __extends(DirectionalLinkModel, _super);
    function DirectionalLinkModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DirectionalLinkModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            target: undefined,
            source: undefined,
            _model_name: 'DirectionalLinkModel'
        });
    };
    DirectionalLinkModel.prototype.initialize = function (attributes, options) {
        _super.prototype.initialize.call(this, attributes, options);
        this.on('change', this.updateBindings, this);
        this.updateBindings();
    };
    DirectionalLinkModel.prototype.updateValue = function (sourceModel, sourceAttr, targetModel, targetAttr) {
        if (this._updating) {
            return;
        }
        this._updating = true;
        try {
            if (targetModel) {
                targetModel.set(targetAttr, sourceModel.get(sourceAttr));
                targetModel.save_changes();
            }
        }
        finally {
            this._updating = false;
        }
    };
    DirectionalLinkModel.prototype.updateBindings = function () {
        var _this = this;
        var _a, _b;
        this.cleanup();
        _a = this.get('source') || [null, null], this.sourceModel = _a[0], this.sourceAttr = _a[1];
        _b = this.get('target') || [null, null], this.targetModel = _b[0], this.targetAttr = _b[1];
        if (this.sourceModel) {
            this.listenTo(this.sourceModel, 'change:' + this.sourceAttr, function () {
                _this.updateValue(_this.sourceModel, _this.sourceAttr, _this.targetModel, _this.targetAttr);
            });
            this.updateValue(this.sourceModel, this.sourceAttr, this.targetModel, this.targetAttr);
            this.listenToOnce(this.sourceModel, 'destroy', this.cleanup);
        }
        if (this.targetModel) {
            this.listenToOnce(this.targetModel, 'destroy', this.cleanup);
        }
    };
    DirectionalLinkModel.prototype.cleanup = function () {
        // Stop listening to 'change' and 'destroy' events of the source and target
        if (this.sourceModel) {
            this.stopListening(this.sourceModel, 'change:' + this.sourceAttr, null);
            this.stopListening(this.sourceModel, 'destroy', null);
        }
        if (this.targetModel) {
            this.stopListening(this.targetModel, 'destroy', null);
        }
    };
    DirectionalLinkModel.serializers = __assign({}, widget_core_1.CoreWidgetModel.serializers, { target: { deserialize: base_1.unpack_models }, source: { deserialize: base_1.unpack_models } });
    return DirectionalLinkModel;
}(widget_core_1.CoreWidgetModel));
exports.DirectionalLinkModel = DirectionalLinkModel;
var LinkModel = /** @class */ (function (_super) {
    __extends(LinkModel, _super);
    function LinkModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LinkModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'LinkModel'
        });
    };
    LinkModel.prototype.updateBindings = function () {
        var _this = this;
        _super.prototype.updateBindings.call(this);
        if (this.targetModel) {
            this.listenTo(this.targetModel, 'change:' + this.targetAttr, function () {
                _this.updateValue(_this.targetModel, _this.targetAttr, _this.sourceModel, _this.sourceAttr);
            });
        }
    };
    LinkModel.prototype.cleanup = function () {
        _super.prototype.cleanup.call(this);
        if (this.targetModel) {
            this.stopListening(this.targetModel, 'change:' + this.targetAttr, null);
        }
    };
    return LinkModel;
}(DirectionalLinkModel));
exports.LinkModel = LinkModel;


/***/ }),

/***/ "XIYl":
/*!*********************************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/phosphor/currentselection.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A variety of convenience methods for maintaining a current selection
 */
var algorithm_1 = __webpack_require__(/*! @phosphor/algorithm */ "rqNV");
var signaling_1 = __webpack_require__(/*! @phosphor/signaling */ "qUp9");
var Selection = /** @class */ (function () {
    function Selection(sequence, options) {
        if (options === void 0) { options = {}; }
        this._array = null;
        this._value = null;
        this._previousValue = null;
        this._selectionChanged = new signaling_1.Signal(this);
        this._array = sequence;
        this._insertBehavior = options.insertBehavior || 'select-item-if-needed';
        this._removeBehavior = options.removeBehavior || 'select-item-after';
    }
    Object.defineProperty(Selection.prototype, "selectionChanged", {
        /**
         * A signal emitted when the current item is changed.
         *
         * #### Notes
         * This signal is emitted when the currently selected item is changed either
         * through user or programmatic interaction.
         *
         * Notably, this signal is not emitted when the index of the current item
         * changes due to other items being inserted, removed, or moved, but the
         * current item remains the same. It is only emitted when the actual current
         * item is changed.
         */
        get: function () {
            return this._selectionChanged;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adjust for setting an item.
     *
     * This should be called *after* the set.
     *
     * @param index - The index set.
     * @param oldValue - The old value at the index.
     */
    Selection.prototype.adjustSelectionForSet = function (index) {
        // We just need to send a signal if the currentValue changed.
        // Get the current index and value.
        var pi = this.index;
        var pv = this.value;
        // Exit early if this doesn't affect the selection
        if (index !== pi) {
            return;
        }
        this._updateSelectedValue();
        var cv = this.value;
        // The previous item is now null, since it is no longer in the array.
        this._previousValue = null;
        // Send signal if there was a change
        if (pv !== cv) {
            // Emit the current changed signal.
            this._selectionChanged.emit({
                previousIndex: pi, previousValue: pv,
                currentIndex: pi, currentValue: cv
            });
        }
    };
    Object.defineProperty(Selection.prototype, "value", {
        /**
         * Get the currently selected item.
         *
         * #### Notes
         * This will be `null` if no item is selected.
         */
        get: function () {
            return this._value;
        },
        /**
         * Set the currently selected item.
         *
         * #### Notes
         * If the item does not exist in the vector, the currentValue will be set to
         * `null`. This selects the first entry equal to the desired item.
         */
        set: function (value) {
            if (value === null) {
                this.index = null;
            }
            else {
                this.index = algorithm_1.ArrayExt.firstIndexOf(this._array, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "index", {
        /**
         * Get the index of the currently selected item.
         *
         * #### Notes
         * This will be `null` if no item is selected.
         */
        get: function () {
            return this._index;
        },
        /**
         * Set the index of the currently selected tab.
         *
         * @param index - The index to select.
         *
         * #### Notes
         * If the value is out of range, the index will be set to `null`, which
         * indicates no item is selected.
         */
        set: function (index) {
            // Coerce the value to an index.
            var i;
            if (index !== null) {
                i = Math.floor(index);
                if (i < 0 || i >= this._array.length) {
                    i = null;
                }
            }
            else {
                i = null;
            }
            // Bail early if the index will not change.
            if (this._index === i) {
                return;
            }
            // Look up the previous index and item.
            var pi = this._index;
            var pv = this._value;
            // Update the state
            this._index = i;
            this._updateSelectedValue();
            this._previousValue = pv;
            // Emit the current changed signal.
            this._selectionChanged.emit({
                previousIndex: pi, previousValue: pv,
                currentIndex: i, currentValue: this._value
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "insertBehavior", {
        /**
         * Get the selection behavior when inserting a tab.
         */
        get: function () {
            return this._insertBehavior;
        },
        /**
         * Set the selection behavior when inserting a tab.
         */
        set: function (value) {
            this._insertBehavior = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "removeBehavior", {
        /**
         * Get the selection behavior when removing a tab.
         */
        get: function () {
            return this._removeBehavior;
        },
        /**
         * Set the selection behavior when removing a tab.
         */
        set: function (value) {
            this._removeBehavior = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adjust the current index for a tab insert operation.
     *
     * @param i - The new index of the inserted item.
     * @param j - The inserted item.
     *
     * #### Notes
     * This method accounts for the tab bar's insertion behavior when adjusting
     * the current index and emitting the changed signal. This should be called
     * after the insertion.
     */
    Selection.prototype.adjustSelectionForInsert = function (i, item) {
        // Lookup commonly used variables.
        var cv = this._value;
        var ci = this._index;
        var bh = this._insertBehavior;
        // Handle the behavior where the new item is always selected,
        // or the behavior where the new item is selected if needed.
        if (bh === 'select-item' || (bh === 'select-item-if-needed' && ci === null)) {
            this._index = i;
            this._value = item;
            this._previousValue = cv;
            this._selectionChanged.emit({
                previousIndex: ci, previousValue: cv,
                currentIndex: i, currentValue: item
            });
            return;
        }
        // Otherwise, silently adjust the current index if needed.
        if (ci >= i) {
            this._index++;
        }
    };
    /**
     * Adjust the current index for move operation.
     *
     * @param i - The previous index of the item.
     * @param j - The new index of the item.
     *
     * #### Notes
     * This method will not cause the actual current item to change. It silently
     * adjusts the current index to account for the given move.
     */
    Selection.prototype.adjustSelectionForMove = function (i, j) {
        if (this._index === i) {
            this._index = j;
        }
        else if (this._index < i && this._index >= j) {
            this._index++;
        }
        else if (this._index > i && this._index <= j) {
            this._index--;
        }
    };
    /**
     * Clear the selection and history.
     */
    Selection.prototype.clearSelection = function () {
        // Get the current index and item.
        var pi = this._index;
        var pv = this._value;
        // Reset the current index and previous item.
        this._index = null;
        this._value = null;
        this._previousValue = null;
        // If no item was selected, there's nothing else to do.
        if (pi === null) {
            return;
        }
        // Emit the current changed signal.
        this._selectionChanged.emit({
            previousIndex: pi, previousValue: pv,
            currentIndex: this._index, currentValue: this._value
        });
    };
    /**
     * Adjust the current index for an item remove operation.
     *
     * @param i - The former index of the removed item.
     * @param item - The removed item.
     *
     * #### Notes
     * This method accounts for the remove behavior when adjusting the current
     * index and emitting the changed signal. It should be called after the item
     * is removed.
     */
    Selection.prototype.adjustSelectionForRemove = function (i, item) {
        // Lookup commonly used variables.
        var ci = this._index;
        var bh = this._removeBehavior;
        // Silently adjust the index if the current item is not removed.
        if (ci !== i) {
            if (ci > i) {
                this._index--;
            }
            return;
        }
        // No item gets selected if the vector is empty.
        if (this._array.length === 0) {
            // Reset the current index and previous item.
            this._index = null;
            this._value = null;
            this._previousValue = null;
            this._selectionChanged.emit({
                previousIndex: i, previousValue: item,
                currentIndex: this._index, currentValue: this._value
            });
            return;
        }
        // Handle behavior where the next sibling item is selected.
        if (bh === 'select-item-after') {
            this._index = Math.min(i, this._array.length - 1);
            this._updateSelectedValue();
            this._previousValue = null;
            this._selectionChanged.emit({
                previousIndex: i, previousValue: item,
                currentIndex: this._index, currentValue: this._value
            });
            return;
        }
        // Handle behavior where the previous sibling item is selected.
        if (bh === 'select-item-before') {
            this._index = Math.max(0, i - 1);
            this._updateSelectedValue();
            this._previousValue = null;
            this._selectionChanged.emit({
                previousIndex: i, previousValue: item,
                currentIndex: this._index, currentValue: this._value
            });
            return;
        }
        // Handle behavior where the previous history item is selected.
        if (bh === 'select-previous-item') {
            if (this._previousValue) {
                this.value = this._previousValue;
            }
            else {
                this._index = Math.min(i, this._array.length - 1);
                this._updateSelectedValue();
            }
            this._previousValue = null;
            this._selectionChanged.emit({
                previousIndex: i, previousValue: item,
                currentIndex: this._index, currentValue: this.value
            });
            return;
        }
        // Otherwise, no item gets selected.
        this._index = null;
        this._value = null;
        this._previousValue = null;
        this._selectionChanged.emit({
            previousIndex: i, previousValue: item,
            currentIndex: this._index, currentValue: this._value
        });
    };
    /**
     * Set the current value based on the current index.
     */
    Selection.prototype._updateSelectedValue = function () {
        var i = this._index;
        this._value = i !== null ? this._array[i] : null;
    };
    return Selection;
}());
exports.Selection = Selection;


/***/ }),

/***/ "XPeQ":
/*!*************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./utils */ "SisM"));
__export(__webpack_require__(/*! ./version */ "VKie"));
__export(__webpack_require__(/*! ./widget_link */ "WSRZ"));
__export(__webpack_require__(/*! ./widget_bool */ "+RhG"));
__export(__webpack_require__(/*! ./widget_button */ "JMIS"));
__export(__webpack_require__(/*! ./widget_box */ "jSVB"));
__export(__webpack_require__(/*! ./widget_image */ "uhLQ"));
__export(__webpack_require__(/*! ./widget_video */ "abMj"));
__export(__webpack_require__(/*! ./widget_audio */ "iBkU"));
__export(__webpack_require__(/*! ./widget_color */ "lGQ9"));
__export(__webpack_require__(/*! ./widget_date */ "XZ5k"));
__export(__webpack_require__(/*! ./widget_int */ "TtYL"));
__export(__webpack_require__(/*! ./widget_float */ "xOfY"));
__export(__webpack_require__(/*! ./widget_controller */ "0pQw"));
__export(__webpack_require__(/*! ./widget_selection */ "d61g"));
__export(__webpack_require__(/*! ./widget_selectioncontainer */ "rCYf"));
__export(__webpack_require__(/*! ./widget_string */ "Y/0+"));
__export(__webpack_require__(/*! ./widget_description */ "1OD8"));
exports.version = __webpack_require__(/*! ../package.json */ "iPdL").version;


/***/ }),

/***/ "XZ5k":
/*!*******************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_date.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var widget_description_1 = __webpack_require__(/*! ./widget_description */ "1OD8");
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var utils_1 = __webpack_require__(/*! ./utils */ "SisM");
var _ = __webpack_require__(/*! underscore */ "F/us");
function serialize_date(value) {
    if (value === null) {
        return null;
    }
    else {
        return {
            year: value.getUTCFullYear(),
            month: value.getUTCMonth(),
            date: value.getUTCDate()
        };
    }
}
exports.serialize_date = serialize_date;
function deserialize_date(value) {
    if (value === null) {
        return null;
    }
    else {
        var date = new Date();
        date.setUTCFullYear(value.year, value.month, value.date);
        date.setUTCHours(0, 0, 0, 0);
        return date;
    }
}
exports.deserialize_date = deserialize_date;
var DatePickerModel = /** @class */ (function (_super) {
    __extends(DatePickerModel, _super);
    function DatePickerModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatePickerModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            value: null,
            _model_name: 'DatePickerModel',
            _view_name: 'DatePickerView'
        });
    };
    DatePickerModel.serializers = __assign({}, widget_core_1.CoreDescriptionModel.serializers, { value: {
            serialize: serialize_date,
            deserialize: deserialize_date
        } });
    return DatePickerModel;
}(widget_core_1.CoreDescriptionModel));
exports.DatePickerModel = DatePickerModel;
var DatePickerView = /** @class */ (function (_super) {
    __extends(DatePickerView, _super);
    function DatePickerView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatePickerView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-datepicker');
        this._datepicker = document.createElement('input');
        this._datepicker.setAttribute('type', 'date');
        this._datepicker.id = this.label.htmlFor = utils_1.uuid();
        this.el.appendChild(this._datepicker);
        this.listenTo(this.model, 'change:value', this._update_value);
        this._update_value();
        this.update();
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed. The model may have been
     * changed by another view or by a state update from the back-end.
     */
    DatePickerView.prototype.update = function (options) {
        if (options === undefined || options.updated_view != this) {
            this._datepicker.disabled = this.model.get('disabled');
        }
        return _super.prototype.update.call(this);
    };
    DatePickerView.prototype.events = function () {
        return {
            'change [type="date"]': '_picker_change',
            'focusout [type="date"]': '_picker_focusout'
        };
    };
    DatePickerView.prototype._update_value = function () {
        var value = this.model.get('value');
        this._datepicker.valueAsDate = value;
    };
    DatePickerView.prototype._picker_change = function () {
        if (!this._datepicker.validity.badInput) {
            this.model.set('value', this._datepicker.valueAsDate);
            this.touch();
        }
    };
    DatePickerView.prototype._picker_focusout = function () {
        if (this._datepicker.validity.badInput) {
            this.model.set('value', null);
            this.touch();
        }
    };
    return DatePickerView;
}(widget_description_1.DescriptionView));
exports.DatePickerView = DatePickerView;


/***/ }),

/***/ "Y/0+":
/*!*********************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_string.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var widget_description_1 = __webpack_require__(/*! ./widget_description */ "1OD8");
var utils_1 = __webpack_require__(/*! ./utils */ "SisM");
var _ = __webpack_require__(/*! underscore */ "F/us");
var StringModel = /** @class */ (function (_super) {
    __extends(StringModel, _super);
    function StringModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            value: '',
            disabled: false,
            placeholder: '\u200b',
            _model_name: 'StringModel'
        });
    };
    return StringModel;
}(widget_core_1.CoreDescriptionModel));
exports.StringModel = StringModel;
var HTMLModel = /** @class */ (function (_super) {
    __extends(HTMLModel, _super);
    function HTMLModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTMLModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _view_name: 'HTMLView',
            _model_name: 'HTMLModel'
        });
    };
    return HTMLModel;
}(StringModel));
exports.HTMLModel = HTMLModel;
var HTMLView = /** @class */ (function (_super) {
    __extends(HTMLView, _super);
    function HTMLView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Called when view is rendered.
     */
    HTMLView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-html');
        this.content = document.createElement('div');
        this.content.classList.add('widget-html-content');
        this.el.appendChild(this.content);
        this.update(); // Set defaults.
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed.  The model may have been
     * changed by another view or by a state update from the back-end.
     */
    HTMLView.prototype.update = function () {
        this.content.innerHTML = this.model.get('value');
        return _super.prototype.update.call(this);
    };
    return HTMLView;
}(widget_description_1.DescriptionView));
exports.HTMLView = HTMLView;
var HTMLMathModel = /** @class */ (function (_super) {
    __extends(HTMLMathModel, _super);
    function HTMLMathModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTMLMathModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _view_name: 'HTMLMathView',
            _model_name: 'HTMLMathModel'
        });
    };
    return HTMLMathModel;
}(StringModel));
exports.HTMLMathModel = HTMLMathModel;
var HTMLMathView = /** @class */ (function (_super) {
    __extends(HTMLMathView, _super);
    function HTMLMathView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Called when view is rendered.
     */
    HTMLMathView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-htmlmath');
        this.content = document.createElement('div');
        this.content.classList.add('widget-htmlmath-content');
        this.el.appendChild(this.content);
        this.update(); // Set defaults.
    };
    /**
     * Update the contents of this view
     */
    HTMLMathView.prototype.update = function () {
        this.content.innerHTML = this.model.get('value');
        this.typeset(this.content);
        return _super.prototype.update.call(this);
    };
    return HTMLMathView;
}(widget_description_1.DescriptionView));
exports.HTMLMathView = HTMLMathView;
var LabelModel = /** @class */ (function (_super) {
    __extends(LabelModel, _super);
    function LabelModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LabelModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _view_name: 'LabelView',
            _model_name: 'LabelModel'
        });
    };
    return LabelModel;
}(StringModel));
exports.LabelModel = LabelModel;
var LabelView = /** @class */ (function (_super) {
    __extends(LabelView, _super);
    function LabelView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Called when view is rendered.
     */
    LabelView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-label');
        this.update(); // Set defaults.
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed.  The model may have been
     * changed by another view or by a state update from the back-end.
     */
    LabelView.prototype.update = function () {
        this.typeset(this.el, this.model.get('value'));
        return _super.prototype.update.call(this);
    };
    return LabelView;
}(widget_description_1.DescriptionView));
exports.LabelView = LabelView;
var TextareaModel = /** @class */ (function (_super) {
    __extends(TextareaModel, _super);
    function TextareaModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextareaModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _view_name: 'TextareaView',
            _model_name: 'TextareaModel',
            rows: null,
            continuous_update: true,
        });
    };
    return TextareaModel;
}(StringModel));
exports.TextareaModel = TextareaModel;
var TextareaView = /** @class */ (function (_super) {
    __extends(TextareaView, _super);
    function TextareaView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Called when view is rendered.
     */
    TextareaView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-textarea');
        this.textbox = document.createElement('textarea');
        this.textbox.setAttribute('rows', '5');
        this.textbox.id = this.label.htmlFor = utils_1.uuid();
        this.el.appendChild(this.textbox);
        this.update(); // Set defaults.
        this.listenTo(this.model, 'change:placeholder', function (model, value, options) {
            this.update_placeholder(value);
        });
        this.update_placeholder();
    };
    TextareaView.prototype.update_placeholder = function (value) {
        value = value || this.model.get('placeholder');
        this.textbox.setAttribute('placeholder', value.toString());
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed.  The model may have been
     * changed by another view or by a state update from the back-end.
     */
    TextareaView.prototype.update = function (options) {
        if (options === undefined || options.updated_view != this) {
            this.textbox.value = this.model.get('value');
            var rows = this.model.get('rows');
            if (rows === null) {
                rows = '';
            }
            this.textbox.setAttribute('rows', rows);
            this.textbox.disabled = this.model.get('disabled');
        }
        return _super.prototype.update.call(this);
    };
    TextareaView.prototype.events = function () {
        return {
            'keydown input': 'handleKeyDown',
            'keypress input': 'handleKeypress',
            'input textarea': 'handleChanging',
            'change textarea': 'handleChanged'
        };
    };
    /**
     * Handle key down
     *
     * Stop propagation so the event isn't sent to the application.
     */
    TextareaView.prototype.handleKeyDown = function (e) {
        e.stopPropagation();
    };
    /**
     * Handles key press
     *
     * Stop propagation so the keypress isn't sent to the application.
     */
    TextareaView.prototype.handleKeypress = function (e) {
        e.stopPropagation();
    };
    /**
     * Triggered on input change
     */
    TextareaView.prototype.handleChanging = function (e) {
        if (this.model.get('continuous_update')) {
            this.handleChanged(e);
        }
    };
    /**
     * Sync the value with the kernel.
     *
     * @param e Event
     */
    TextareaView.prototype.handleChanged = function (e) {
        this.model.set('value', e.target.value, { updated_view: this });
        this.touch();
    };
    return TextareaView;
}(widget_description_1.DescriptionView));
exports.TextareaView = TextareaView;
var TextModel = /** @class */ (function (_super) {
    __extends(TextModel, _super);
    function TextModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _view_name: 'TextView',
            _model_name: 'TextModel',
            continuous_update: true,
        });
    };
    return TextModel;
}(StringModel));
exports.TextModel = TextModel;
var TextView = /** @class */ (function (_super) {
    __extends(TextView, _super);
    function TextView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'text';
        return _this;
    }
    /**
     * Called when view is rendered.
     */
    TextView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-text');
        this.textbox = document.createElement('input');
        this.textbox.setAttribute('type', this.inputType);
        this.textbox.id = this.label.htmlFor = utils_1.uuid();
        this.el.appendChild(this.textbox);
        this.update(); // Set defaults.
        this.listenTo(this.model, 'change:placeholder', function (model, value, options) {
            this.update_placeholder(value);
        });
        this.listenTo(this.model, 'change:description_tooltip', this.update_title);
        this.listenTo(this.model, 'change:description', this.update_title);
        this.update_placeholder();
        this.update_title();
    };
    TextView.prototype.update_placeholder = function (value) {
        if (!value) {
            value = this.model.get('placeholder');
        }
        this.textbox.setAttribute('placeholder', value);
    };
    TextView.prototype.update_title = function () {
        var title = this.model.get('description_tooltip');
        if (!title) {
            this.textbox.removeAttribute('title');
        }
        else if (this.model.get('description').length === 0) {
            this.textbox.setAttribute('title', title);
        }
    };
    TextView.prototype.update = function (options) {
        /**
         * Update the contents of this view
         *
         * Called when the model is changed.  The model may have been
         * changed by another view or by a state update from the back-end.
         */
        if (options === undefined || options.updated_view != this) {
            if (this.textbox.value != this.model.get('value')) {
                this.textbox.value = this.model.get('value');
            }
            this.textbox.disabled = this.model.get('disabled');
        }
        return _super.prototype.update.call(this);
    };
    TextView.prototype.events = function () {
        return {
            'keydown input': 'handleKeyDown',
            'keypress input': 'handleKeypress',
            'input input': 'handleChanging',
            'change input': 'handleChanged'
        };
    };
    /**
     * Handle key down
     *
     * Stop propagation so the keypress isn't sent to the application.
     */
    TextView.prototype.handleKeyDown = function (e) {
        e.stopPropagation();
    };
    /**
     * Handles text submission
     */
    TextView.prototype.handleKeypress = function (e) {
        e.stopPropagation();
        // The submit message is deprecated in widgets 7
        if (e.keyCode == 13) { // Return key
            this.send({ event: 'submit' });
        }
    };
    /**
     * Handles user input.
     *
     * Calling model.set will trigger all of the other views of the
     * model to update.
     */
    TextView.prototype.handleChanging = function (e) {
        if (this.model.get('continuous_update')) {
            this.handleChanged(e);
        }
    };
    /**
     * Handles user input.
     *
     * Calling model.set will trigger all of the other views of the
     * model to update.
     */
    TextView.prototype.handleChanged = function (e) {
        this.model.set('value', e.target.value, { updated_view: this });
        this.touch();
    };
    return TextView;
}(widget_description_1.DescriptionView));
exports.TextView = TextView;
var PasswordModel = /** @class */ (function (_super) {
    __extends(PasswordModel, _super);
    function PasswordModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasswordModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _view_name: 'PasswordView',
            _model_name: 'PasswordModel'
        });
    };
    return PasswordModel;
}(TextModel));
exports.PasswordModel = PasswordModel;
var PasswordView = /** @class */ (function (_super) {
    __extends(PasswordView, _super);
    function PasswordView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'password';
        return _this;
    }
    return PasswordView;
}(TextView));
exports.PasswordView = PasswordView;


/***/ }),

/***/ "abMj":
/*!********************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_video.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var _ = __webpack_require__(/*! underscore */ "F/us");
var VideoModel = /** @class */ (function (_super) {
    __extends(VideoModel, _super);
    function VideoModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VideoModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'VideoModel',
            _view_name: 'VideoView',
            format: 'mp4',
            width: '',
            height: '',
            autoplay: true,
            loop: true,
            controls: true,
            value: new DataView(new ArrayBuffer(0))
        });
    };
    VideoModel.serializers = __assign({}, widget_core_1.CoreDOMWidgetModel.serializers, { value: { serialize: function (value, manager) {
                return new DataView(value.buffer.slice(0));
            } } });
    return VideoModel;
}(widget_core_1.CoreDOMWidgetModel));
exports.VideoModel = VideoModel;
var VideoView = /** @class */ (function (_super) {
    __extends(VideoView, _super);
    function VideoView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VideoView.prototype.render = function () {
        /**
         * Called when view is rendered.
         */
        _super.prototype.render.call(this);
        this.pWidget.addClass('jupyter-widgets');
        this.pWidget.addClass('widget-image');
        this.update(); // Set defaults.
    };
    VideoView.prototype.update = function () {
        /**
         * Update the contents of this view
         *
         * Called when the model is changed.  The model may have been
         * changed by another view or by a state update from the back-end.
         */
        var url;
        var format = this.model.get('format');
        var value = this.model.get('value');
        if (format !== 'url') {
            var blob = new Blob([value], { type: "video/" + this.model.get('format') });
            url = URL.createObjectURL(blob);
        }
        else {
            url = (new TextDecoder('utf-8')).decode(value.buffer);
        }
        // Clean up the old objectURL
        var oldurl = this.el.src;
        this.el.src = url;
        if (oldurl && typeof oldurl !== 'string') {
            URL.revokeObjectURL(oldurl);
        }
        // Height and width
        var width = this.model.get('width');
        if (width !== undefined && width.length > 0) {
            this.el.setAttribute('width', width);
        }
        else {
            this.el.removeAttribute('width');
        }
        var height = this.model.get('height');
        if (height !== undefined && height.length > 0) {
            this.el.setAttribute('height', height);
        }
        else {
            this.el.removeAttribute('height');
        }
        // Video attributes
        this.el.loop = this.model.get('loop');
        this.el.autoplay = this.model.get('autoplay');
        this.el.controls = this.model.get('controls');
        return _super.prototype.update.call(this);
    };
    VideoView.prototype.remove = function () {
        if (this.el.src) {
            URL.revokeObjectURL(this.el.src);
        }
        _super.prototype.remove.call(this);
    };
    Object.defineProperty(VideoView.prototype, "tagName", {
        /**
         * The default tag name.
         *
         * #### Notes
         * This is a read-only attribute.
         */
        get: function () {
            // We can't make this an attribute with a default value
            // since it would be set after it is needed in the
            // constructor.
            return 'video';
        },
        enumerable: true,
        configurable: true
    });
    return VideoView;
}(base_1.DOMWidgetView));
exports.VideoView = VideoView;


/***/ }),

/***/ "d61g":
/*!************************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_selection.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var widget_description_1 = __webpack_require__(/*! ./widget_description */ "1OD8");
var utils_1 = __webpack_require__(/*! ./utils */ "SisM");
var _ = __webpack_require__(/*! underscore */ "F/us");
var utils = __webpack_require__(/*! ./utils */ "SisM");
var $ = __webpack_require__(/*! jquery */ "EVdn");
var SelectionModel = /** @class */ (function (_super) {
    __extends(SelectionModel, _super);
    function SelectionModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionModel.prototype.defaults = function () {
        return __assign({}, _super.prototype.defaults.call(this), { _model_name: 'SelectionModel', index: '', _options_labels: [], disabled: false });
    };
    return SelectionModel;
}(widget_core_1.CoreDescriptionModel));
exports.SelectionModel = SelectionModel;
var DropdownModel = /** @class */ (function (_super) {
    __extends(DropdownModel, _super);
    function DropdownModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DropdownModel.prototype.defaults = function () {
        return __assign({}, _super.prototype.defaults.call(this), { _model_name: 'DropdownModel', _view_name: 'DropdownView', button_style: '' });
    };
    return DropdownModel;
}(SelectionModel));
exports.DropdownModel = DropdownModel;
// TODO: Make a phosphor dropdown control, wrapped in DropdownView. Also, fix
// bugs in keyboard handling. See
// https://github.com/jupyter-widgets/ipywidgets/issues/1055 and
// https://github.com/jupyter-widgets/ipywidgets/issues/1049
// For now, we subclass SelectView to provide DropdownView
// For the old code, see commit f68bfbc566f3a78a8f3350b438db8ed523ce3642
var DropdownView = /** @class */ (function (_super) {
    __extends(DropdownView, _super);
    function DropdownView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Public constructor.
     */
    DropdownView.prototype.initialize = function (parameters) {
        var _this = this;
        _super.prototype.initialize.call(this, parameters);
        this.listenTo(this.model, 'change:_options_labels', function () { return _this._updateOptions(); });
    };
    /**
     * Called when view is rendered.
     */
    DropdownView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-dropdown');
        this.listbox = document.createElement('select');
        this.listbox.id = this.label.htmlFor = utils_1.uuid();
        this.el.appendChild(this.listbox);
        this._updateOptions();
        this.update();
    };
    /**
     * Update the contents of this view
     */
    DropdownView.prototype.update = function () {
        // Disable listbox if needed
        this.listbox.disabled = this.model.get('disabled');
        // Select the correct element
        var index = this.model.get('index');
        this.listbox.selectedIndex = index === null ? -1 : index;
        return _super.prototype.update.call(this);
    };
    DropdownView.prototype._updateOptions = function () {
        this.listbox.textContent = '';
        var items = this.model.get('_options_labels');
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var option = document.createElement('option');
            option.textContent = item.replace(/ /g, '\xa0'); // space -> &nbsp;
            option.setAttribute('data-value', encodeURIComponent(item));
            option.value = item;
            this.listbox.appendChild(option);
        }
    };
    DropdownView.prototype.events = function () {
        return {
            'change select': '_handle_change'
        };
    };
    /**
     * Handle when a new value is selected.
     */
    DropdownView.prototype._handle_change = function () {
        this.model.set('index', this.listbox.selectedIndex === -1 ? null : this.listbox.selectedIndex);
        this.touch();
    };
    return DropdownView;
}(widget_description_1.DescriptionView));
exports.DropdownView = DropdownView;
var SelectModel = /** @class */ (function (_super) {
    __extends(SelectModel, _super);
    function SelectModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectModel.prototype.defaults = function () {
        return __assign({}, _super.prototype.defaults.call(this), { _model_name: 'SelectModel', _view_name: 'SelectView', rows: 5 });
    };
    return SelectModel;
}(SelectionModel));
exports.SelectModel = SelectModel;
var SelectView = /** @class */ (function (_super) {
    __extends(SelectView, _super);
    function SelectView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Public constructor.
     */
    SelectView.prototype.initialize = function (parameters) {
        var _this = this;
        _super.prototype.initialize.call(this, parameters);
        this.listenTo(this.model, 'change:_options_labels', function () { return _this._updateOptions(); });
        this.listenTo(this.model, 'change:index', function (model, value, options) { return _this.updateSelection(options); });
        // Create listbox here so that subclasses can modify it before it is populated in render()
        this.listbox = document.createElement('select');
    };
    /**
     * Called when view is rendered.
     */
    SelectView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-select');
        this.listbox.id = this.label.htmlFor = utils_1.uuid();
        this.el.appendChild(this.listbox);
        this._updateOptions();
        this.update();
        this.updateSelection();
    };
    /**
     * Update the contents of this view
     */
    SelectView.prototype.update = function () {
        _super.prototype.update.call(this);
        this.listbox.disabled = this.model.get('disabled');
        var rows = this.model.get('rows');
        if (rows === null) {
            rows = '';
        }
        this.listbox.setAttribute('size', rows);
    };
    SelectView.prototype.updateSelection = function (options) {
        if (options === void 0) { options = {}; }
        if (options.updated_view === this) {
            return;
        }
        var index = this.model.get('index');
        this.listbox.selectedIndex = index === null ? -1 : index;
    };
    SelectView.prototype._updateOptions = function () {
        this.listbox.textContent = '';
        var items = this.model.get('_options_labels');
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var option = document.createElement('option');
            option.textContent = item.replace(/ /g, '\xa0'); // space -> &nbsp;
            option.setAttribute('data-value', encodeURIComponent(item));
            option.value = item;
            this.listbox.appendChild(option);
        }
    };
    SelectView.prototype.events = function () {
        return {
            'change select': '_handle_change'
        };
    };
    /**
     * Handle when a new value is selected.
     */
    SelectView.prototype._handle_change = function () {
        this.model.set('index', this.listbox.selectedIndex, { updated_view: this });
        this.touch();
    };
    return SelectView;
}(widget_description_1.DescriptionView));
exports.SelectView = SelectView;
var RadioButtonsModel = /** @class */ (function (_super) {
    __extends(RadioButtonsModel, _super);
    function RadioButtonsModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioButtonsModel.prototype.defaults = function () {
        return __assign({}, _super.prototype.defaults.call(this), { _model_name: 'RadioButtonsModel', _view_name: 'RadioButtonsView', tooltips: [], icons: [], button_style: '' });
    };
    return RadioButtonsModel;
}(SelectionModel));
exports.RadioButtonsModel = RadioButtonsModel;
var RadioButtonsView = /** @class */ (function (_super) {
    __extends(RadioButtonsView, _super);
    function RadioButtonsView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Called when view is rendered.
     */
    RadioButtonsView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-radio');
        this.container = document.createElement('div');
        this.el.appendChild(this.container);
        this.container.classList.add('widget-radio-box');
        this.update();
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed.  The model may have been
     * changed by another view or by a state update from the back-end.
     */
    RadioButtonsView.prototype.update = function (options) {
        var view = this;
        var items = this.model.get('_options_labels');
        var radios = _.pluck(this.container.querySelectorAll('input[type="radio"]'), 'value');
        var stale = items.length != radios.length;
        if (!stale) {
            for (var i = 0, len = items.length; i < len; ++i) {
                if (radios[i] !== items[i]) {
                    stale = true;
                    break;
                }
            }
        }
        if (stale && (options === undefined || options.updated_view !== this)) {
            // Add items to the DOM.
            this.container.textContent = '';
            items.forEach(function (item, index) {
                var label = document.createElement('label');
                label.textContent = item;
                view.container.appendChild(label);
                var radio = document.createElement('input');
                radio.setAttribute('type', 'radio');
                radio.value = index.toString();
                radio.setAttribute('data-value', encodeURIComponent(item));
                label.appendChild(radio);
            });
        }
        items.forEach(function (item, index) {
            var item_query = 'input[data-value="' +
                encodeURIComponent(item) + '"]';
            var radio = view.container.querySelectorAll(item_query);
            if (radio.length > 0) {
                var radio_el = radio[0];
                radio_el.checked = view.model.get('index') === index;
                radio_el.disabled = view.model.get('disabled');
            }
        });
        // Schedule adjustPadding asynchronously to
        // allow dom elements to be created properly
        setTimeout(this.adjustPadding, 0, this);
        return _super.prototype.update.call(this, options);
    };
    /**
     * Adjust Padding to Multiple of Line Height
     *
     * Adjust margins so that the overall height
     * is a multiple of a single line height.
     *
     * This widget needs it because radio options
     * are spaced tighter than individual widgets
     * yet we would like the full widget line up properly
     * when displayed side-by-side with other widgets.
     */
    RadioButtonsView.prototype.adjustPadding = function (e) {
        // Vertical margins on a widget
        var elStyles = window.getComputedStyle(e.el);
        var margins = parseInt(elStyles.marginTop) + parseInt(elStyles.marginBottom);
        // Total spaces taken by a single-line widget
        var lineHeight = e.label.offsetHeight + margins;
        // Current adjustment value on this widget
        var cStyles = window.getComputedStyle(e.container);
        var containerMargin = parseInt(cStyles.marginBottom);
        // How far we are off from a multiple of single windget lines
        var diff = (e.el.offsetHeight + margins - containerMargin) % lineHeight;
        // Apply the new adjustment
        var extraMargin = diff == 0 ? 0 : (lineHeight - diff);
        e.container.style.marginBottom = extraMargin + 'px';
    };
    RadioButtonsView.prototype.events = function () {
        return {
            'click input[type="radio"]': '_handle_click'
        };
    };
    /**
     * Handle when a value is clicked.
     *
     * Calling model.set will trigger all of the other views of the
     * model to update.
     */
    RadioButtonsView.prototype._handle_click = function (event) {
        this.model.set('index', parseInt(event.target.value), { updated_view: this });
        this.touch();
    };
    return RadioButtonsView;
}(widget_description_1.DescriptionView));
exports.RadioButtonsView = RadioButtonsView;
var ToggleButtonsStyleModel = /** @class */ (function (_super) {
    __extends(ToggleButtonsStyleModel, _super);
    function ToggleButtonsStyleModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleButtonsStyleModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'ToggleButtonsStyleModel',
        });
    };
    ToggleButtonsStyleModel.styleProperties = __assign({}, widget_description_1.DescriptionStyleModel.styleProperties, { button_width: {
            selector: '.widget-toggle-button',
            attribute: 'width',
            default: null
        }, font_weight: {
            selector: '.widget-toggle-button',
            attribute: 'font-weight',
            default: ''
        } });
    return ToggleButtonsStyleModel;
}(widget_description_1.DescriptionStyleModel));
exports.ToggleButtonsStyleModel = ToggleButtonsStyleModel;
var ToggleButtonsModel = /** @class */ (function (_super) {
    __extends(ToggleButtonsModel, _super);
    function ToggleButtonsModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleButtonsModel.prototype.defaults = function () {
        return __assign({}, _super.prototype.defaults.call(this), { _model_name: 'ToggleButtonsModel', _view_name: 'ToggleButtonsView' });
    };
    return ToggleButtonsModel;
}(SelectionModel));
exports.ToggleButtonsModel = ToggleButtonsModel;
var ToggleButtonsView = /** @class */ (function (_super) {
    __extends(ToggleButtonsView, _super);
    function ToggleButtonsView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleButtonsView.prototype.initialize = function (options) {
        this._css_state = {};
        _super.prototype.initialize.call(this, options);
        this.listenTo(this.model, 'change:button_style', this.update_button_style);
    };
    /**
     * Called when view is rendered.
     */
    ToggleButtonsView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-toggle-buttons');
        this.buttongroup = document.createElement('div');
        this.el.appendChild(this.buttongroup);
        this.update();
        this.set_button_style();
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed.  The model may have been
     * changed by another view or by a state update from the back-end.
     */
    ToggleButtonsView.prototype.update = function (options) {
        var view = this;
        var items = this.model.get('_options_labels');
        var icons = this.model.get('icons') || [];
        var previous_icons = this.model.previous('icons') || [];
        var previous_bstyle = ToggleButtonsView.classMap[this.model.previous('button_style')] || '';
        var tooltips = view.model.get('tooltips') || [];
        var disabled = this.model.get('disabled');
        var buttons = this.buttongroup.querySelectorAll('button');
        var values = _.pluck(buttons, 'value');
        var stale = false;
        for (var i = 0, len = items.length; i < len; ++i) {
            if (values[i] !== items[i] || icons[i] !== previous_icons[i]) {
                stale = true;
                break;
            }
        }
        if (stale && (options === undefined || options.updated_view !== this)) {
            // Add items to the DOM.
            this.buttongroup.textContent = '';
            items.forEach(function (item, index) {
                var item_html;
                var empty = item.trim().length === 0 &&
                    (!icons[index] || icons[index].trim().length === 0);
                if (empty) {
                    item_html = '&nbsp;';
                }
                else {
                    item_html = utils.escape_html(item);
                }
                var icon = document.createElement('i');
                var button = document.createElement('button');
                if (icons[index]) {
                    icon.className = 'fa fa-' + icons[index];
                }
                button.setAttribute('type', 'button');
                button.className = 'widget-toggle-button jupyter-button';
                if (previous_bstyle) {
                    button.classList.add(previous_bstyle);
                }
                button.innerHTML = item_html;
                button.setAttribute('data-value', encodeURIComponent(item));
                button.setAttribute('value', index.toString());
                button.appendChild(icon);
                button.disabled = disabled;
                if (tooltips[index]) {
                    button.setAttribute('title', tooltips[index]);
                }
                view.update_style_traits(button);
                view.buttongroup.appendChild(button);
            });
        }
        // Select active button.
        items.forEach(function (item, index) {
            var item_query = '[data-value="' + encodeURIComponent(item) + '"]';
            var button = view.buttongroup.querySelector(item_query);
            if (view.model.get('index') === index) {
                button.classList.add('mod-active');
            }
            else {
                button.classList.remove('mod-active');
            }
        });
        this.stylePromise.then(function (style) {
            if (style) {
                style.style();
            }
        });
        return _super.prototype.update.call(this, options);
    };
    ToggleButtonsView.prototype.update_style_traits = function (button) {
        for (var name_1 in this._css_state) {
            if (this._css_state.hasOwnProperty(name_1)) {
                if (name_1 === 'margin') {
                    this.buttongroup.style[name_1] = this._css_state[name_1];
                }
                else if (name_1 !== 'width') {
                    if (button) {
                        button.style[name_1] = this._css_state[name_1];
                    }
                    else {
                        var buttons = this.buttongroup
                            .querySelectorAll('button');
                        if (buttons.length) {
                            (buttons[0]).style[name_1] = this._css_state[name_1];
                        }
                    }
                }
            }
        }
    };
    ToggleButtonsView.prototype.update_button_style = function () {
        var buttons = this.buttongroup.querySelectorAll('button');
        for (var i = 0; i < buttons.length; i++) {
            this.update_mapped_classes(ToggleButtonsView.classMap, 'button_style', buttons[i]);
        }
    };
    ToggleButtonsView.prototype.set_button_style = function () {
        var buttons = this.buttongroup.querySelectorAll('button');
        for (var i = 0; i < buttons.length; i++) {
            this.set_mapped_classes(ToggleButtonsView.classMap, 'button_style', buttons[i]);
        }
    };
    ToggleButtonsView.prototype.events = function () {
        return {
            'click button': '_handle_click'
        };
    };
    /**
     * Handle when a value is clicked.
     *
     * Calling model.set will trigger all of the other views of the
     * model to update.
     */
    ToggleButtonsView.prototype._handle_click = function (event) {
        this.model.set('index', parseInt(event.target.value), { updated_view: this });
        this.touch();
        // We also send a clicked event, since the value is only set if it changed.
        // See https://github.com/jupyter-widgets/ipywidgets/issues/763
        this.send({ event: 'click' });
    };
    return ToggleButtonsView;
}(widget_description_1.DescriptionView));
exports.ToggleButtonsView = ToggleButtonsView;
(function (ToggleButtonsView) {
    ToggleButtonsView.classMap = {
        primary: ['mod-primary'],
        success: ['mod-success'],
        info: ['mod-info'],
        warning: ['mod-warning'],
        danger: ['mod-danger']
    };
})(ToggleButtonsView = exports.ToggleButtonsView || (exports.ToggleButtonsView = {}));
exports.ToggleButtonsView = ToggleButtonsView;
var SelectionSliderModel = /** @class */ (function (_super) {
    __extends(SelectionSliderModel, _super);
    function SelectionSliderModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionSliderModel.prototype.defaults = function () {
        return __assign({}, _super.prototype.defaults.call(this), { _model_name: 'SelectionSliderModel', _view_name: 'SelectionSliderView', orientation: 'horizontal', readout: true, continuous_update: true });
    };
    return SelectionSliderModel;
}(SelectionModel));
exports.SelectionSliderModel = SelectionSliderModel;
var SelectionSliderView = /** @class */ (function (_super) {
    __extends(SelectionSliderView, _super);
    function SelectionSliderView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Called when view is rendered.
     */
    SelectionSliderView.prototype.render = function () {
        var _this = this;
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-hslider');
        this.el.classList.add('widget-slider');
        (this.$slider = $('<div />'))
            .slider({
            slide: this.handleSliderChange.bind(this),
            stop: this.handleSliderChanged.bind(this)
        })
            .addClass('slider');
        // Put the slider in a container
        this.slider_container = document.createElement('div');
        this.slider_container.classList.add('slider-container');
        this.slider_container.appendChild(this.$slider[0]);
        this.el.appendChild(this.slider_container);
        this.readout = document.createElement('div');
        this.el.appendChild(this.readout);
        this.readout.classList.add('widget-readout');
        this.readout.style.display = 'none';
        this.listenTo(this.model, 'change:slider_color', function (sender, value) {
            _this.$slider.find('a').css('background', value);
        });
        this.$slider.find('a').css('background', this.model.get('slider_color'));
        // Set defaults.
        this.update();
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed.  The model may have been
     * changed by another view or by a state update from the back-end.
     */
    SelectionSliderView.prototype.update = function (options) {
        if (options === undefined || options.updated_view !== this) {
            var labels = this.model.get('_options_labels');
            var max = labels.length - 1;
            var min = 0;
            this.$slider.slider('option', 'step', 1);
            this.$slider.slider('option', 'max', max);
            this.$slider.slider('option', 'min', min);
            // WORKAROUND FOR JQUERY SLIDER BUG.
            // The horizontal position of the slider handle
            // depends on the value of the slider at the time
            // of orientation change.  Before applying the new
            // workaround, we set the value to the minimum to
            // make sure that the horizontal placement of the
            // handle in the vertical slider is always
            // consistent.
            var orientation_1 = this.model.get('orientation');
            this.$slider.slider('option', 'value', min);
            this.$slider.slider('option', 'orientation', orientation_1);
            var disabled = this.model.get('disabled');
            this.$slider.slider('option', 'disabled', disabled);
            if (disabled) {
                this.readout.contentEditable = 'false';
            }
            else {
                this.readout.contentEditable = 'true';
            }
            // Use the right CSS classes for vertical & horizontal sliders
            if (orientation_1 === 'vertical') {
                this.el.classList.remove('widget-hslider');
                this.el.classList.remove('widget-inline-hbox');
                this.el.classList.add('widget-vslider');
                this.el.classList.add('widget-inline-vbox');
            }
            else {
                this.el.classList.remove('widget-vslider');
                this.el.classList.remove('widget-inline-vbox');
                this.el.classList.add('widget-hslider');
                this.el.classList.add('widget-inline-hbox');
            }
            var readout = this.model.get('readout');
            if (readout) {
                // this.$readout.show();
                this.readout.style.display = '';
            }
            else {
                // this.$readout.hide();
                this.readout.style.display = 'none';
            }
            this.updateSelection();
        }
        return _super.prototype.update.call(this, options);
    };
    SelectionSliderView.prototype.events = function () {
        return {
            'slide': 'handleSliderChange',
            'slidestop': 'handleSliderChanged'
        };
    };
    SelectionSliderView.prototype.updateSelection = function () {
        var index = this.model.get('index');
        this.$slider.slider('option', 'value', index);
        this.updateReadout(index);
    };
    SelectionSliderView.prototype.updateReadout = function (index) {
        var value = this.model.get('_options_labels')[index];
        this.readout.textContent = value;
    };
    /**
     * Called when the slider value is changing.
     */
    SelectionSliderView.prototype.handleSliderChange = function (e, ui) {
        this.updateReadout(ui.value);
        // Only persist the value while sliding if the continuous_update
        // trait is set to true.
        if (this.model.get('continuous_update')) {
            this.handleSliderChanged(e, ui);
        }
    };
    /**
     * Called when the slider value has changed.
     *
     * Calling model.set will trigger all of the other views of the
     * model to update.
     */
    SelectionSliderView.prototype.handleSliderChanged = function (e, ui) {
        this.updateReadout(ui.value);
        this.model.set('index', ui.value, { updated_view: this });
        this.touch();
    };
    return SelectionSliderView;
}(widget_description_1.DescriptionView));
exports.SelectionSliderView = SelectionSliderView;
var MultipleSelectionModel = /** @class */ (function (_super) {
    __extends(MultipleSelectionModel, _super);
    function MultipleSelectionModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultipleSelectionModel.prototype.defaults = function () {
        return __assign({}, _super.prototype.defaults.call(this), { _model_name: 'MultipleSelectionModel' });
    };
    return MultipleSelectionModel;
}(SelectionModel));
exports.MultipleSelectionModel = MultipleSelectionModel;
var SelectMultipleModel = /** @class */ (function (_super) {
    __extends(SelectMultipleModel, _super);
    function SelectMultipleModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectMultipleModel.prototype.defaults = function () {
        return __assign({}, _super.prototype.defaults.call(this), { _model_name: 'SelectMultipleModel', _view_name: 'SelectMultipleView', rows: null });
    };
    return SelectMultipleModel;
}(MultipleSelectionModel));
exports.SelectMultipleModel = SelectMultipleModel;
var SelectMultipleView = /** @class */ (function (_super) {
    __extends(SelectMultipleView, _super);
    function SelectMultipleView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Public constructor.
     */
    SelectMultipleView.prototype.initialize = function (parameters) {
        _super.prototype.initialize.call(this, parameters);
        this.listbox.multiple = true;
    };
    /**
     * Called when view is rendered.
     */
    SelectMultipleView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('widget-select-multiple');
    };
    SelectMultipleView.prototype.updateSelection = function (options) {
        if (options === void 0) { options = {}; }
        if (options.updated_view === this) {
            return;
        }
        var selected = this.model.get('index') || [];
        var listboxOptions = this.listbox.options;
        // Clear the selection
        this.listbox.selectedIndex = -1;
        // Select the appropriate options
        selected.forEach(function (i) {
            listboxOptions[i].selected = true;
        });
    };
    /**
     * Handle when a new value is selected.
     */
    SelectMultipleView.prototype._handle_change = function () {
        var index = Array.prototype.map
            .call(this.listbox.selectedOptions || [], function (option) {
            return option.index;
        });
        this.model.set('index', index, { updated_view: this });
        this.touch();
    };
    return SelectMultipleView;
}(SelectView));
exports.SelectMultipleView = SelectMultipleView;
var SelectionRangeSliderModel = /** @class */ (function (_super) {
    __extends(SelectionRangeSliderModel, _super);
    function SelectionRangeSliderModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionRangeSliderModel.prototype.defaults = function () {
        return __assign({}, _super.prototype.defaults.call(this), { _model_name: 'SelectionSliderModel', _view_name: 'SelectionSliderView', orientation: 'horizontal', readout: true, continuous_update: true });
    };
    return SelectionRangeSliderModel;
}(MultipleSelectionModel));
exports.SelectionRangeSliderModel = SelectionRangeSliderModel;
var SelectionRangeSliderView = /** @class */ (function (_super) {
    __extends(SelectionRangeSliderView, _super);
    function SelectionRangeSliderView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Called when view is rendered.
     */
    SelectionRangeSliderView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.$slider.slider('option', 'range', true);
    };
    SelectionRangeSliderView.prototype.updateSelection = function () {
        var index = this.model.get('index');
        this.$slider.slider('option', 'values', index.slice());
        this.updateReadout(index);
    };
    SelectionRangeSliderView.prototype.updateReadout = function (index) {
        var labels = this.model.get('_options_labels');
        var minValue = labels[index[0]];
        var maxValue = labels[index[1]];
        this.readout.textContent = minValue + "-" + maxValue;
    };
    /**
     * Called when the slider value is changing.
     */
    SelectionRangeSliderView.prototype.handleSliderChange = function (e, ui) {
        this.updateReadout(ui.values);
        // Only persist the value while sliding if the continuous_update
        // trait is set to true.
        if (this.model.get('continuous_update')) {
            this.handleSliderChanged(e, ui);
        }
    };
    /**
     * Called when the slider value has changed.
     *
     * Calling model.set will trigger all of the other views of the
     * model to update.
     */
    SelectionRangeSliderView.prototype.handleSliderChanged = function (e, ui) {
        // The jqueryui documentation indicates ui.values doesn't exist on the slidestop event,
        // but it appears that it actually does: https://github.com/jquery/jquery-ui/blob/ae31f2b3b478975f70526bdf3299464b9afa8bb1/ui/widgets/slider.js#L313
        this.updateReadout(ui.values);
        this.model.set('index', ui.values.slice(), { updated_view: this });
        this.touch();
    };
    return SelectionRangeSliderView;
}(SelectionSliderView));
exports.SelectionRangeSliderView = SelectionRangeSliderView;


/***/ }),

/***/ "dpys":
/*!*************************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/phosphor/tabpanel.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* This file has code derived from PhosphorJS. The license for this PhosphorJS code is:

Copyright (c) 2014-2017, PhosphorJS Contributors
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var messaging_1 = __webpack_require__(/*! @phosphor/messaging */ "hpl1");
var signaling_1 = __webpack_require__(/*! @phosphor/signaling */ "qUp9");
var domutils_1 = __webpack_require__(/*! @phosphor/domutils */ "XWTc");
var widgets_1 = __webpack_require__(/*! @phosphor/widgets */ "pif5");
/**
 * A panel where visible widgets are stacked atop one another.
 *
 * #### Notes
 * This class provides a convenience wrapper around a [[PanelLayout]].
 */
var EventedPanel = /** @class */ (function (_super) {
    __extends(EventedPanel, _super);
    function EventedPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._widgetRemoved = new signaling_1.Signal(_this);
        return _this;
    }
    Object.defineProperty(EventedPanel.prototype, "widgetRemoved", {
        /**
         * A signal emitted when a widget is removed from the panel.
         */
        get: function () {
            return this._widgetRemoved;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    EventedPanel.prototype.onChildRemoved = function (msg) {
        this._widgetRemoved.emit(msg.child);
    };
    return EventedPanel;
}(widgets_1.Panel));
exports.EventedPanel = EventedPanel;
/**
 * A widget which combines a `TabBar` and a `EventedPanel`.
 *
 * #### Notes
 * This is a simple panel which handles the common case of a tab bar
 * placed next to a content area. The selected tab controls the widget
 * which is shown in the content area.
 *
 * For use cases which require more control than is provided by this
 * panel, the `TabBar` widget may be used independently.
 *
 * TODO: Support setting the direction??
 */
var TabPanel = /** @class */ (function (_super) {
    __extends(TabPanel, _super);
    /**
     * Construct a new tab panel.
     *
     * @param options - The options for initializing the tab panel.
     */
    function TabPanel(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this._currentChanged = new signaling_1.Signal(_this);
        _this.addClass('p-TabPanel');
        // Create the tab bar and contents panel.
        _this.tabBar = new widgets_1.TabBar(options);
        _this.tabBar.addClass('p-TabPanel-tabBar');
        _this.tabContents = new EventedPanel();
        _this.tabContents.addClass('p-TabPanel-tabContents');
        // Connect the tab bar signal handlers.
        _this.tabBar.tabMoved.connect(_this._onTabMoved, _this);
        _this.tabBar.currentChanged.connect(_this._onCurrentChanged, _this);
        _this.tabBar.tabCloseRequested.connect(_this._onTabCloseRequested, _this);
        _this.tabBar.tabActivateRequested.connect(_this._onTabActivateRequested, _this);
        // Connect the evented panel signal handlers.
        _this.tabContents.widgetRemoved.connect(_this._onWidgetRemoved, _this);
        // Create the layout.
        var layout = new widgets_1.PanelLayout();
        // Add the child widgets to the layout.
        layout.addWidget(_this.tabBar);
        layout.addWidget(_this.tabContents);
        // Install the layout on the tab panel.
        _this.layout = layout;
        return _this;
    }
    Object.defineProperty(TabPanel.prototype, "currentChanged", {
        /**
         * A signal emitted when the current tab is changed.
         *
         * #### Notes
         * This signal is emitted when the currently selected tab is changed
         * either through user or programmatic interaction.
         *
         * Notably, this signal is not emitted when the index of the current
         * tab changes due to tabs being inserted, removed, or moved. It is
         * only emitted when the actual current tab node is changed.
         */
        get: function () {
            return this._currentChanged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "currentIndex", {
        /**
         * Get the index of the currently selected tab.
         *
         * #### Notes
         * This will be `null` if no tab is selected.
         */
        get: function () {
            var currentIndex = this.tabBar.currentIndex;
            // Phosphor tab bars have an index of -1 if no tab is selected
            return (currentIndex === -1 ? null : currentIndex);
        },
        /**
         * Set the index of the currently selected tab.
         *
         * #### Notes
         * If the index is out of range, it will be set to `null`.
         */
        set: function (value) {
            this.tabBar.currentIndex = (value === null ? -1 : value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "currentWidget", {
        /**
         * Get the currently selected widget.
         *
         * #### Notes
         * This will be `null` if there is no selected tab.
         */
        get: function () {
            var title = this.tabBar.currentTitle;
            return title ? title.owner : null;
        },
        /**
         * Set the currently selected widget.
         *
         * #### Notes
         * If the widget is not in the panel, it will be set to `null`.
         */
        set: function (value) {
            this.tabBar.currentTitle = value ? value.title : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "tabsMovable", {
        /**
         * Get the whether the tabs are movable by the user.
         *
         * #### Notes
         * Tabs can always be moved programmatically.
         */
        get: function () {
            return this.tabBar.tabsMovable;
        },
        /**
         * Set the whether the tabs are movable by the user.
         *
         * #### Notes
         * Tabs can always be moved programmatically.
         */
        set: function (value) {
            this.tabBar.tabsMovable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabPanel.prototype, "widgets", {
        /**
         * A read-only array of the widgets in the panel.
         */
        get: function () {
            return this.tabContents.widgets;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a widget to the end of the tab panel.
     *
     * @param widget - The widget to add to the tab panel.
     *
     * #### Notes
     * If the widget is already contained in the panel, it will be moved.
     *
     * The widget's `title` is used to populate the tab.
     */
    TabPanel.prototype.addWidget = function (widget) {
        this.insertWidget(this.widgets.length, widget);
    };
    /**
     * Insert a widget into the tab panel at a specified index.
     *
     * @param index - The index at which to insert the widget.
     *
     * @param widget - The widget to insert into to the tab panel.
     *
     * #### Notes
     * If the widget is already contained in the panel, it will be moved.
     *
     * The widget's `title` is used to populate the tab.
     */
    TabPanel.prototype.insertWidget = function (index, widget) {
        if (widget !== this.currentWidget) {
            widget.hide();
        }
        this.tabContents.insertWidget(index, widget);
        this.tabBar.insertTab(index, widget.title);
    };
    /**
     * Handle the `currentChanged` signal from the tab bar.
     */
    TabPanel.prototype._onCurrentChanged = function (sender, args) {
        // Extract the previous and current title from the args.
        var previousIndex = args.previousIndex, previousTitle = args.previousTitle, currentIndex = args.currentIndex, currentTitle = args.currentTitle;
        // Extract the widgets from the titles.
        var previousWidget = previousTitle ? previousTitle.owner : null;
        var currentWidget = currentTitle ? currentTitle.owner : null;
        // Hide the previous widget.
        if (previousWidget) {
            previousWidget.hide();
        }
        // Show the current widget.
        if (currentWidget) {
            currentWidget.show();
        }
        // Emit the `currentChanged` signal for the tab panel.
        this._currentChanged.emit({
            previousIndex: previousIndex, previousWidget: previousWidget, currentIndex: currentIndex, currentWidget: currentWidget
        });
        // Flush the message loop on IE and Edge to prevent flicker.
        if (domutils_1.Platform.IS_EDGE || domutils_1.Platform.IS_IE) {
            messaging_1.MessageLoop.flush();
        }
    };
    /**
     * Handle the `tabActivateRequested` signal from the tab bar.
     */
    TabPanel.prototype._onTabActivateRequested = function (sender, args) {
        args.title.owner.activate();
    };
    /**
     * Handle the `tabCloseRequested` signal from the tab bar.
     */
    TabPanel.prototype._onTabCloseRequested = function (sender, args) {
        args.title.owner.close();
    };
    /**
     * Handle the `tabMoved` signal from the tab bar.
     */
    TabPanel.prototype._onTabMoved = function (sender, args) {
        this.tabContents.insertWidget(args.toIndex, args.title.owner);
    };
    /**
     * Handle the `widgetRemoved` signal from the stacked panel.
     */
    TabPanel.prototype._onWidgetRemoved = function (sender, widget) {
        this.tabBar.removeTab(widget.title);
    };
    return TabPanel;
}(widgets_1.Widget));
exports.TabPanel = TabPanel;


/***/ }),

/***/ "iBkU":
/*!********************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_audio.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var _ = __webpack_require__(/*! underscore */ "F/us");
var AudioModel = /** @class */ (function (_super) {
    __extends(AudioModel, _super);
    function AudioModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AudioModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'AudioModel',
            _view_name: 'AudioView',
            format: 'mp3',
            autoplay: true,
            loop: true,
            controls: true,
            value: new DataView(new ArrayBuffer(0))
        });
    };
    AudioModel.serializers = __assign({}, widget_core_1.CoreDOMWidgetModel.serializers, { value: { serialize: function (value, manager) {
                return new DataView(value.buffer.slice(0));
            } } });
    return AudioModel;
}(widget_core_1.CoreDOMWidgetModel));
exports.AudioModel = AudioModel;
var AudioView = /** @class */ (function (_super) {
    __extends(AudioView, _super);
    function AudioView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AudioView.prototype.render = function () {
        /**
         * Called when view is rendered.
         */
        _super.prototype.render.call(this);
        this.pWidget.addClass('jupyter-widgets');
        this.update(); // Set defaults.
    };
    AudioView.prototype.update = function () {
        /**
         * Update the contents of this view
         *
         * Called when the model is changed.  The model may have been
         * changed by another view or by a state update from the back-end.
         */
        var url;
        var format = this.model.get('format');
        var value = this.model.get('value');
        if (format !== 'url') {
            var blob = new Blob([value], { type: "audio/" + this.model.get('format') });
            url = URL.createObjectURL(blob);
        }
        else {
            url = (new TextDecoder('utf-8')).decode(value.buffer);
        }
        // Clean up the old objectURL
        var oldurl = this.el.src;
        this.el.src = url;
        if (oldurl && typeof oldurl !== 'string') {
            URL.revokeObjectURL(oldurl);
        }
        // Audio attributes
        this.el.loop = this.model.get('loop');
        this.el.autoplay = this.model.get('autoplay');
        this.el.controls = this.model.get('controls');
        return _super.prototype.update.call(this);
    };
    AudioView.prototype.remove = function () {
        if (this.el.src) {
            URL.revokeObjectURL(this.el.src);
        }
        _super.prototype.remove.call(this);
    };
    Object.defineProperty(AudioView.prototype, "tagName", {
        /**
         * The default tag name.
         *
         * #### Notes
         * This is a read-only attribute.
         */
        get: function () {
            // We can't make this an attribute with a default value
            // since it would be set after it is needed in the
            // constructor.
            return 'audio';
        },
        enumerable: true,
        configurable: true
    });
    return AudioView;
}(base_1.DOMWidgetView));
exports.AudioView = AudioView;


/***/ }),

/***/ "iGnl":
/*!****************************************************!*\
  !*** ./node_modules/jquery-ui/ui/widgets/mouse.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Mouse 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Mouse
//>>group: Widgets
//>>description: Abstracts mouse-based interactions to assist in creating certain widgets.
//>>docs: http://api.jqueryui.com/mouse/

( function( factory ) {
	if ( true ) {

		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
			__webpack_require__(/*! jquery */ "EVdn"),
			__webpack_require__(/*! ../ie */ "NHgk"),
			__webpack_require__(/*! ../version */ "Qwlt"),
			__webpack_require__(/*! ../widget */ "MIQu")
		], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}( function( $ ) {

var mouseHandled = false;
$( document ).on( "mouseup", function() {
	mouseHandled = false;
} );

return $.widget( "ui.mouse", {
	version: "1.12.1",
	options: {
		cancel: "input, textarea, button, select, option",
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var that = this;

		this.element
			.on( "mousedown." + this.widgetName, function( event ) {
				return that._mouseDown( event );
			} )
			.on( "click." + this.widgetName, function( event ) {
				if ( true === $.data( event.target, that.widgetName + ".preventClickEvent" ) ) {
					$.removeData( event.target, that.widgetName + ".preventClickEvent" );
					event.stopImmediatePropagation();
					return false;
				}
			} );

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.off( "." + this.widgetName );
		if ( this._mouseMoveDelegate ) {
			this.document
				.off( "mousemove." + this.widgetName, this._mouseMoveDelegate )
				.off( "mouseup." + this.widgetName, this._mouseUpDelegate );
		}
	},

	_mouseDown: function( event ) {

		// don't let more than one widget handle mouseStart
		if ( mouseHandled ) {
			return;
		}

		this._mouseMoved = false;

		// We may have missed mouseup (out of window)
		( this._mouseStarted && this._mouseUp( event ) );

		this._mouseDownEvent = event;

		var that = this,
			btnIsLeft = ( event.which === 1 ),

			// event.target.nodeName works around a bug in IE 8 with
			// disabled inputs (#7620)
			elIsCancel = ( typeof this.options.cancel === "string" && event.target.nodeName ?
				$( event.target ).closest( this.options.cancel ).length : false );
		if ( !btnIsLeft || elIsCancel || !this._mouseCapture( event ) ) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if ( !this.mouseDelayMet ) {
			this._mouseDelayTimer = setTimeout( function() {
				that.mouseDelayMet = true;
			}, this.options.delay );
		}

		if ( this._mouseDistanceMet( event ) && this._mouseDelayMet( event ) ) {
			this._mouseStarted = ( this._mouseStart( event ) !== false );
			if ( !this._mouseStarted ) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if ( true === $.data( event.target, this.widgetName + ".preventClickEvent" ) ) {
			$.removeData( event.target, this.widgetName + ".preventClickEvent" );
		}

		// These delegates are required to keep context
		this._mouseMoveDelegate = function( event ) {
			return that._mouseMove( event );
		};
		this._mouseUpDelegate = function( event ) {
			return that._mouseUp( event );
		};

		this.document
			.on( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.on( "mouseup." + this.widgetName, this._mouseUpDelegate );

		event.preventDefault();

		mouseHandled = true;
		return true;
	},

	_mouseMove: function( event ) {

		// Only check for mouseups outside the document if you've moved inside the document
		// at least once. This prevents the firing of mouseup in the case of IE<9, which will
		// fire a mousemove event if content is placed under the cursor. See #7778
		// Support: IE <9
		if ( this._mouseMoved ) {

			// IE mouseup check - mouseup happened when mouse was out of window
			if ( $.ui.ie && ( !document.documentMode || document.documentMode < 9 ) &&
					!event.button ) {
				return this._mouseUp( event );

			// Iframe mouseup check - mouseup occurred in another document
			} else if ( !event.which ) {

				// Support: Safari <=8 - 9
				// Safari sets which to 0 if you press any of the following keys
				// during a drag (#14461)
				if ( event.originalEvent.altKey || event.originalEvent.ctrlKey ||
						event.originalEvent.metaKey || event.originalEvent.shiftKey ) {
					this.ignoreMissingWhich = true;
				} else if ( !this.ignoreMissingWhich ) {
					return this._mouseUp( event );
				}
			}
		}

		if ( event.which || event.button ) {
			this._mouseMoved = true;
		}

		if ( this._mouseStarted ) {
			this._mouseDrag( event );
			return event.preventDefault();
		}

		if ( this._mouseDistanceMet( event ) && this._mouseDelayMet( event ) ) {
			this._mouseStarted =
				( this._mouseStart( this._mouseDownEvent, event ) !== false );
			( this._mouseStarted ? this._mouseDrag( event ) : this._mouseUp( event ) );
		}

		return !this._mouseStarted;
	},

	_mouseUp: function( event ) {
		this.document
			.off( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.off( "mouseup." + this.widgetName, this._mouseUpDelegate );

		if ( this._mouseStarted ) {
			this._mouseStarted = false;

			if ( event.target === this._mouseDownEvent.target ) {
				$.data( event.target, this.widgetName + ".preventClickEvent", true );
			}

			this._mouseStop( event );
		}

		if ( this._mouseDelayTimer ) {
			clearTimeout( this._mouseDelayTimer );
			delete this._mouseDelayTimer;
		}

		this.ignoreMissingWhich = false;
		mouseHandled = false;
		event.preventDefault();
	},

	_mouseDistanceMet: function( event ) {
		return ( Math.max(
				Math.abs( this._mouseDownEvent.pageX - event.pageX ),
				Math.abs( this._mouseDownEvent.pageY - event.pageY )
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function( /* event */ ) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function( /* event */ ) {},
	_mouseDrag: function( /* event */ ) {},
	_mouseStop: function( /* event */ ) {},
	_mouseCapture: function( /* event */ ) { return true; }
} );

} ) );


/***/ }),

/***/ "iPdL":
/*!*************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/package.json ***!
  \*************************************************************/
/*! exports provided: name, version, description, license, author, files, main, typings, repository, scripts, dependencies, devDependencies, gitHead, default */
/***/ (function(module) {

module.exports = {"name":"@jupyter-widgets/controls","version":"1.4.5","description":"Jupyter interactive widgets","license":"BSD-3-Clause","author":"Project Jupyter","files":["lib/**/*.d.ts","lib/**/*.js","css/*.css","dist/"],"main":"lib/index.js","typings":"lib/index.d.ts","repository":{"type":"git","url":"https://github.com/jupyter-widgets/ipywidgets.git"},"scripts":{"build":"npm run build:src && npm run build:css","build:css":"postcss --use postcss-import --use postcss-cssnext -o css/widgets.built.css css/widgets.css","build:src":"tsc --project src","build:test":"tsc --project test/src && webpack --config test/webpack.conf.js","clean":"npm run clean:src","clean:src":"rimraf lib","lint":"tslint --project tslint.json --format stylish","prepublish":"npm run clean && npm run build","test":"npm run test:unit","test:coverage":"npm run build:test && webpack --config test/webpack-cov.conf.js && karma start test/karma-cov.conf.js","test:unit":"npm run test:unit:firefox && npm run test:unit:chrome","test:unit:chrome":"npm run test:unit:default -- --browsers=Chrome","test:unit:default":"npm run build:test && karma start test/karma.conf.js --log-level debug","test:unit:firefox":"npm run test:unit:default -- --browsers=Firefox","test:unit:ie":"npm run test:unit:default -- --browsers=IE"},"dependencies":{"@jupyter-widgets/base":"^1.2.5","@phosphor/algorithm":"^1.1.0","@phosphor/domutils":"^1.1.0","@phosphor/messaging":"^1.2.1","@phosphor/signaling":"^1.2.0","@phosphor/widgets":"^1.3.0","d3-format":"^1.3.0","jquery":"^3.1.1","jquery-ui":"^1.12.1","underscore":"^1.8.3"},"devDependencies":{"@jupyterlab/services":"^2.0.0 || ^3.0.0 || 4.0.0-alpha.3 || 4.0.0-alpha.6 || 4.0.0-alpha.8","@types/expect.js":"^0.3.29","@types/mathjax":"0.0.31","@types/mocha":"^2.2.41","@types/node":"^8.0.1","chai":"^4.0.0","css-loader":"^0.28.4","expect.js":"^0.3.1","file-loader":"^0.11.2","istanbul-instrumenter-loader":"^2.0.0","json-loader":"^0.5.4","karma":"^1.6.0","karma-chrome-launcher":"^2.0.0","karma-coverage":"^1.0.0","karma-firefox-launcher":"^1.0.1","karma-ie-launcher":"^1.0.0","karma-mocha":"^1.3.0","karma-mocha-reporter":"^2.2.3","karma-webpack":"^2.0.3","mocha":"^3.3.0","npm-run-all":"^1.5.1","postcss-cli":"^4.1.0","postcss-cssnext":"^3.0.2","postcss-import":"^10.0.0","postcss-loader":"^2.0.6","rimraf":"^2.6.1","sinon":"^2.1.0","sinon-chai":"^2.11.0","style-loader":"^0.18.1","tslint":"^5.8.0","typescript":"~3.3.1","url-loader":"^0.5.9","webpack":"^3.5.5"},"gitHead":"34060411e6cd6398d697acb27611343d1133e8a0"};

/***/ }),

/***/ "jSVB":
/*!******************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_box.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var utils_1 = __webpack_require__(/*! ./utils */ "SisM");
var algorithm_1 = __webpack_require__(/*! @phosphor/algorithm */ "rqNV");
var messaging_1 = __webpack_require__(/*! @phosphor/messaging */ "hpl1");
var widgets_1 = __webpack_require__(/*! @phosphor/widgets */ "pif5");
var _ = __webpack_require__(/*! underscore */ "F/us");
var $ = __webpack_require__(/*! jquery */ "EVdn");
var JupyterPhosphorPanelWidget = /** @class */ (function (_super) {
    __extends(JupyterPhosphorPanelWidget, _super);
    function JupyterPhosphorPanelWidget(options) {
        var _this = this;
        var view = options.view;
        delete options.view;
        _this = _super.call(this, options) || this;
        _this._view = view;
        return _this;
    }
    /**
     * Process the phosphor message.
     *
     * Any custom phosphor widget used inside a Jupyter widget should override
     * the processMessage function like this.
     */
    JupyterPhosphorPanelWidget.prototype.processMessage = function (msg) {
        _super.prototype.processMessage.call(this, msg);
        this._view.processPhosphorMessage(msg);
    };
    /**
     * Dispose the widget.
     *
     * This causes the view to be destroyed as well with 'remove'
     */
    JupyterPhosphorPanelWidget.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        _super.prototype.dispose.call(this);
        if (this._view) {
            this._view.remove();
        }
        this._view = null;
    };
    return JupyterPhosphorPanelWidget;
}(widgets_1.Panel));
exports.JupyterPhosphorPanelWidget = JupyterPhosphorPanelWidget;
var BoxModel = /** @class */ (function (_super) {
    __extends(BoxModel, _super);
    function BoxModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoxModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _view_name: 'BoxView',
            _model_name: 'BoxModel',
            children: [],
            box_style: ''
        });
    };
    BoxModel.serializers = __assign({}, widget_core_1.CoreDOMWidgetModel.serializers, { children: { deserialize: base_1.unpack_models } });
    return BoxModel;
}(widget_core_1.CoreDOMWidgetModel));
exports.BoxModel = BoxModel;
var HBoxModel = /** @class */ (function (_super) {
    __extends(HBoxModel, _super);
    function HBoxModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HBoxModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _view_name: 'HBoxView',
            _model_name: 'HBoxModel',
        });
    };
    return HBoxModel;
}(BoxModel));
exports.HBoxModel = HBoxModel;
var VBoxModel = /** @class */ (function (_super) {
    __extends(VBoxModel, _super);
    function VBoxModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VBoxModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _view_name: 'VBoxView',
            _model_name: 'VBoxModel',
        });
    };
    return VBoxModel;
}(BoxModel));
exports.VBoxModel = VBoxModel;
var BoxView = /** @class */ (function (_super) {
    __extends(BoxView, _super);
    function BoxView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoxView.prototype._createElement = function (tagName) {
        this.pWidget = new JupyterPhosphorPanelWidget({ view: this });
        return this.pWidget.node;
    };
    BoxView.prototype._setElement = function (el) {
        if (this.el || el !== this.pWidget.node) {
            // Boxes don't allow setting the element beyond the initial creation.
            throw new Error('Cannot reset the DOM element.');
        }
        this.el = this.pWidget.node;
        this.$el = $(this.pWidget.node);
    };
    /**
     * Public constructor
     */
    BoxView.prototype.initialize = function (parameters) {
        _super.prototype.initialize.call(this, parameters);
        this.children_views = new base_1.ViewList(this.add_child_model, null, this);
        this.listenTo(this.model, 'change:children', this.update_children);
        this.listenTo(this.model, 'change:box_style', this.update_box_style);
        this.pWidget.addClass('jupyter-widgets');
        this.pWidget.addClass('widget-container');
        this.pWidget.addClass('widget-box');
    };
    /**
     * Called when view is rendered.
     */
    BoxView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.update_children();
        this.set_box_style();
    };
    BoxView.prototype.update_children = function () {
        this.children_views.update(this.model.get('children')).then(function (views) {
            // Notify all children that their sizes may have changed.
            views.forEach(function (view) {
                messaging_1.MessageLoop.postMessage(view.pWidget, widgets_1.Widget.ResizeMessage.UnknownSize);
            });
        });
    };
    BoxView.prototype.update_box_style = function () {
        this.update_mapped_classes(BoxView.class_map, 'box_style');
    };
    BoxView.prototype.set_box_style = function () {
        this.set_mapped_classes(BoxView.class_map, 'box_style');
    };
    BoxView.prototype.add_child_model = function (model) {
        var _this = this;
        // we insert a dummy element so the order is preserved when we add
        // the rendered content later.
        var dummy = new widgets_1.Widget();
        this.pWidget.addWidget(dummy);
        return this.create_child_view(model).then(function (view) {
            // replace the dummy widget with the new one.
            var i = algorithm_1.ArrayExt.firstIndexOf(_this.pWidget.widgets, dummy);
            _this.pWidget.insertWidget(i, view.pWidget);
            dummy.dispose();
            return view;
        }).catch(utils_1.reject('Could not add child view to box', true));
    };
    BoxView.prototype.remove = function () {
        this.children_views = null;
        _super.prototype.remove.call(this);
    };
    BoxView.class_map = {
        success: ['alert', 'alert-success'],
        info: ['alert', 'alert-info'],
        warning: ['alert', 'alert-warning'],
        danger: ['alert', 'alert-danger']
    };
    return BoxView;
}(base_1.DOMWidgetView));
exports.BoxView = BoxView;
var HBoxView = /** @class */ (function (_super) {
    __extends(HBoxView, _super);
    function HBoxView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Public constructor
     */
    HBoxView.prototype.initialize = function (parameters) {
        _super.prototype.initialize.call(this, parameters);
        this.pWidget.addClass('widget-hbox');
    };
    return HBoxView;
}(BoxView));
exports.HBoxView = HBoxView;
var VBoxView = /** @class */ (function (_super) {
    __extends(VBoxView, _super);
    function VBoxView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Public constructor
     */
    VBoxView.prototype.initialize = function (parameters) {
        _super.prototype.initialize.call(this, parameters);
        this.pWidget.addClass('widget-vbox');
    };
    return VBoxView;
}(BoxView));
exports.VBoxView = VBoxView;
var GridBoxView = /** @class */ (function (_super) {
    __extends(GridBoxView, _super);
    function GridBoxView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Public constructor
     */
    GridBoxView.prototype.initialize = function (parameters) {
        _super.prototype.initialize.call(this, parameters);
        this.pWidget.addClass('widget-gridbox');
        // display needn't be set to flex and grid 
        this.pWidget.removeClass('widget-box');
    };
    return GridBoxView;
}(BoxView));
exports.GridBoxView = GridBoxView;
var GridBoxModel = /** @class */ (function (_super) {
    __extends(GridBoxModel, _super);
    function GridBoxModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridBoxModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _view_name: 'GridBoxView',
            _model_name: 'GridBoxModel',
        });
    };
    return GridBoxModel;
}(BoxModel));
exports.GridBoxModel = GridBoxModel;


/***/ }),

/***/ "lGQ9":
/*!********************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_color.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var widget_description_1 = __webpack_require__(/*! ./widget_description */ "1OD8");
var utils_1 = __webpack_require__(/*! ./utils */ "SisM");
var _ = __webpack_require__(/*! underscore */ "F/us");
var ColorPickerModel = /** @class */ (function (_super) {
    __extends(ColorPickerModel, _super);
    function ColorPickerModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorPickerModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            value: 'black',
            concise: false,
            _model_name: 'ColorPickerModel',
            _view_name: 'ColorPickerView'
        });
    };
    return ColorPickerModel;
}(widget_core_1.CoreDescriptionModel));
exports.ColorPickerModel = ColorPickerModel;
var ColorPickerView = /** @class */ (function (_super) {
    __extends(ColorPickerView, _super);
    function ColorPickerView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorPickerView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-colorpicker');
        this._color_container = document.createElement('div');
        this._color_container.className = 'widget-inline-hbox widget-colorpicker-input';
        this.el.appendChild(this._color_container);
        this._textbox = document.createElement('input');
        this._textbox.setAttribute('type', 'text');
        this._textbox.id = this.label.htmlFor = utils_1.uuid();
        this._color_container.appendChild(this._textbox);
        this._textbox.value = this.model.get('value');
        this._colorpicker = document.createElement('input');
        this._colorpicker.setAttribute('type', 'color');
        this._color_container.appendChild(this._colorpicker);
        this.listenTo(this.model, 'change:value', this._update_value);
        this.listenTo(this.model, 'change:concise', this._update_concise);
        this._update_concise();
        this._update_value();
        this.update();
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed. The model may have been
     * changed by another view or by a state update from the back-end.
     */
    ColorPickerView.prototype.update = function (options) {
        if (options === undefined || options.updated_view != this) {
            var disabled = this.model.get('disabled');
            this._textbox.disabled = disabled;
            this._colorpicker.disabled = disabled;
        }
        return _super.prototype.update.call(this);
    };
    ColorPickerView.prototype.events = function () {
        return {
            'change [type="color"]': '_picker_change',
            'change [type="text"]': '_text_change'
        };
    };
    ColorPickerView.prototype._update_value = function () {
        var value = this.model.get('value');
        this._colorpicker.value = color2hex(value);
        this._textbox.value = value;
    };
    ColorPickerView.prototype._update_concise = function () {
        var concise = this.model.get('concise');
        if (concise) {
            this.el.classList.add('concise');
            this._textbox.style.display = 'none';
        }
        else {
            this.el.classList.remove('concise');
            this._textbox.style.display = '';
        }
    };
    ColorPickerView.prototype._picker_change = function () {
        this.model.set('value', this._colorpicker.value);
        this.touch();
    };
    ColorPickerView.prototype._text_change = function () {
        var value = this._validate_color(this._textbox.value, this.model.get('value'));
        this.model.set('value', value);
        this.touch();
    };
    ColorPickerView.prototype._validate_color = function (color, fallback) {
        return color.match(/#[a-fA-F0-9]{3}(?:[a-fA-F0-9]{3})?$/) ||
            named_colors[color.toLowerCase()] ? color : fallback;
    };
    return ColorPickerView;
}(widget_description_1.DescriptionView));
exports.ColorPickerView = ColorPickerView;
var named_colors = { aliceblue: '#f0f8ff', antiquewhite: '#faebd7', aqua: '#00ffff', aquamarine: '#7fffd4', azure: '#f0ffff', beige: '#f5f5dc', bisque: '#ffe4c4', black: '#000000', blanchedalmond: '#ffebcd', blue: '#0000ff', blueviolet: '#8a2be2', brown: '#a52a2a', burlywood: '#deb887', cadetblue: '#5f9ea0', chartreuse: '#7fff00', chocolate: '#d2691e', coral: '#ff7f50', cornflowerblue: '#6495ed', cornsilk: '#fff8dc', crimson: '#dc143c', cyan: '#00ffff', darkblue: '#00008b', darkcyan: '#008b8b', darkgoldenrod: '#b8860b', darkgray: '#a9a9a9', darkgrey: '#a9a9a9', darkgreen: '#006400', darkkhaki: '#bdb76b', darkmagenta: '#8b008b', darkolivegreen: '#556b2f', darkorange: '#ff8c00', darkorchid: '#9932cc', darkred: '#8b0000', darksalmon: '#e9967a', darkseagreen: '#8fbc8f', darkslateblue: '#483d8b', darkslategray: '#2f4f4f', darkslategrey: '#2f4f4f', darkturquoise: '#00ced1', darkviolet: '#9400d3', deeppink: '#ff1493', deepskyblue: '#00bfff', dimgray: '#696969', dimgrey: '#696969', dodgerblue: '#1e90ff', firebrick: '#b22222', floralwhite: '#fffaf0', forestgreen: '#228b22', fuchsia: '#ff00ff', gainsboro: '#dcdcdc', ghostwhite: '#f8f8ff', gold: '#ffd700', goldenrod: '#daa520', gray: '#808080', grey: '#808080', green: '#008000', greenyellow: '#adff2f', honeydew: '#f0fff0', hotpink: '#ff69b4', indianred: '#cd5c5c', indigo: '#4b0082', ivory: '#fffff0', khaki: '#f0e68c', lavender: '#e6e6fa', lavenderblush: '#fff0f5', lawngreen: '#7cfc00', lemonchiffon: '#fffacd', lightblue: '#add8e6', lightcoral: '#f08080', lightcyan: '#e0ffff', lightgoldenrodyellow: '#fafad2', lightgreen: '#90ee90', lightgray: '#d3d3d3', lightgrey: '#d3d3d3', lightpink: '#ffb6c1', lightsalmon: '#ffa07a', lightseagreen: '#20b2aa', lightskyblue: '#87cefa', lightslategray: '#778899', lightslategrey: '#778899', lightsteelblue: '#b0c4de', lightyellow: '#ffffe0', lime: '#00ff00', limegreen: '#32cd32', linen: '#faf0e6', magenta: '#ff00ff', maroon: '#800000', mediumaquamarine: '#66cdaa', mediumblue: '#0000cd', mediumorchid: '#ba55d3', mediumpurple: '#9370db', mediumseagreen: '#3cb371', mediumslateblue: '#7b68ee', mediumspringgreen: '#00fa9a', mediumturquoise: '#48d1cc', mediumvioletred: '#c71585', midnightblue: '#191970', mintcream: '#f5fffa', mistyrose: '#ffe4e1', moccasin: '#ffe4b5', navajowhite: '#ffdead', navy: '#000080', oldlace: '#fdf5e6', olive: '#808000', olivedrab: '#6b8e23', orange: '#ffa500', orangered: '#ff4500', orchid: '#da70d6', palegoldenrod: '#eee8aa', palegreen: '#98fb98', paleturquoise: '#afeeee', palevioletred: '#db7093', papayawhip: '#ffefd5', peachpuff: '#ffdab9', peru: '#cd853f', pink: '#ffc0cb', plum: '#dda0dd', powderblue: '#b0e0e6', purple: '#800080', red: '#ff0000', rosybrown: '#bc8f8f', royalblue: '#4169e1', saddlebrown: '#8b4513', salmon: '#fa8072', sandybrown: '#f4a460', seagreen: '#2e8b57', seashell: '#fff5ee', sienna: '#a0522d', silver: '#c0c0c0', skyblue: '#87ceeb', slateblue: '#6a5acd', slategray: '#708090', slategrey: '#708090', snow: '#fffafa', springgreen: '#00ff7f', steelblue: '#4682b4', tan: '#d2b48c', teal: '#008080', thistle: '#d8bfd8', tomato: '#ff6347', turquoise: '#40e0d0', violet: '#ee82ee', wheat: '#f5deb3', white: '#ffffff', whitesmoke: '#f5f5f5', yellow: '#ffff00', yellowgreen: '#9acd32', };
/*
 * From a valid html color (named color, 6-digits or 3-digits hex format)
 * return a 6-digits hexadecimal color #rrggbb.
 */
function color2hex(color) {
    return named_colors[color.toLowerCase()] || rgb3_to_rgb6(color);
}
function rgb3_to_rgb6(rgb) {
    if (rgb.length === 7) {
        return rgb;
    }
    else {
        return '#' + rgb.charAt(1) + rgb.charAt(1) +
            rgb.charAt(2) + rgb.charAt(2) +
            rgb.charAt(3) + rgb.charAt(3);
    }
}


/***/ }),

/***/ "rCYf":
/*!*********************************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_selectioncontainer.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
var widget_box_1 = __webpack_require__(/*! ./widget_box */ "jSVB");
var tabpanel_1 = __webpack_require__(/*! ./phosphor/tabpanel */ "dpys");
var accordion_1 = __webpack_require__(/*! ./phosphor/accordion */ "4IhH");
var widgets_1 = __webpack_require__(/*! @phosphor/widgets */ "pif5");
var algorithm_1 = __webpack_require__(/*! @phosphor/algorithm */ "rqNV");
var messaging_1 = __webpack_require__(/*! @phosphor/messaging */ "hpl1");
var _ = __webpack_require__(/*! underscore */ "F/us");
var utils = __webpack_require__(/*! ./utils */ "SisM");
var $ = __webpack_require__(/*! jquery */ "EVdn");
var SelectionContainerModel = /** @class */ (function (_super) {
    __extends(SelectionContainerModel, _super);
    function SelectionContainerModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionContainerModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'SelectionContainerModel',
            selected_index: 0,
            _titles: {}
        });
    };
    return SelectionContainerModel;
}(widget_box_1.BoxModel));
exports.SelectionContainerModel = SelectionContainerModel;
var AccordionModel = /** @class */ (function (_super) {
    __extends(AccordionModel, _super);
    function AccordionModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccordionModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'AccordionModel',
            _view_name: 'AccordionView'
        });
    };
    return AccordionModel;
}(SelectionContainerModel));
exports.AccordionModel = AccordionModel;
// We implement our own tab widget since Phoshpor's TabPanel uses an absolute
// positioning BoxLayout, but we want a more an html/css-based Panel layout.
var JupyterPhosphorAccordionWidget = /** @class */ (function (_super) {
    __extends(JupyterPhosphorAccordionWidget, _super);
    function JupyterPhosphorAccordionWidget(options) {
        var _this = this;
        var view = options.view;
        delete options.view;
        _this = _super.call(this, options) || this;
        _this._view = view;
        return _this;
    }
    /**
     * Process the phosphor message.
     *
     * Any custom phosphor widget used inside a Jupyter widget should override
     * the processMessage function like this.
     */
    JupyterPhosphorAccordionWidget.prototype.processMessage = function (msg) {
        _super.prototype.processMessage.call(this, msg);
        this._view.processPhosphorMessage(msg);
    };
    /**
     * Dispose the widget.
     *
     * This causes the view to be destroyed as well with 'remove'
     */
    JupyterPhosphorAccordionWidget.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        _super.prototype.dispose.call(this);
        if (this._view) {
            this._view.remove();
        }
        this._view = null;
    };
    return JupyterPhosphorAccordionWidget;
}(accordion_1.Accordion));
exports.JupyterPhosphorAccordionWidget = JupyterPhosphorAccordionWidget;
var AccordionView = /** @class */ (function (_super) {
    __extends(AccordionView, _super);
    function AccordionView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccordionView.prototype._createElement = function (tagName) {
        this.pWidget = new JupyterPhosphorAccordionWidget({ view: this });
        return this.pWidget.node;
    };
    AccordionView.prototype._setElement = function (el) {
        if (this.el || el !== this.pWidget.node) {
            // Accordions don't allow setting the element beyond the initial creation.
            throw new Error('Cannot reset the DOM element.');
        }
        this.el = this.pWidget.node;
        this.$el = $(this.pWidget.node);
    };
    AccordionView.prototype.initialize = function (parameters) {
        var _this = this;
        _super.prototype.initialize.call(this, parameters);
        this.children_views = new base_1.ViewList(this.add_child_view, this.remove_child_view, this);
        this.listenTo(this.model, 'change:children', function () { return _this.updateChildren(); });
        this.listenTo(this.model, 'change:selected_index', function () { return _this.update_selected_index(); });
        this.listenTo(this.model, 'change:_titles', function () { return _this.update_titles(); });
    };
    /**
     * Called when view is rendered.
     */
    AccordionView.prototype.render = function () {
        var _this = this;
        _super.prototype.render.call(this);
        var accordion = this.pWidget;
        accordion.addClass('jupyter-widgets');
        accordion.addClass('widget-accordion');
        accordion.addClass('widget-container');
        accordion.selection.selectionChanged.connect(function (sender) {
            if (!_this.updatingChildren) {
                _this.model.set('selected_index', accordion.selection.index);
                _this.touch();
            }
        });
        this.children_views.update(this.model.get('children'));
        this.update_titles();
        this.update_selected_index();
    };
    /**
     * Update children
     */
    AccordionView.prototype.updateChildren = function () {
        // While we are updating, the index may not be valid, so deselect the
        // tabs before updating so we don't get spurious changes in the index,
        // which would then set off another sync cycle.
        this.updatingChildren = true;
        this.pWidget.selection.index = null;
        this.children_views.update(this.model.get('children'));
        this.update_selected_index();
        this.updatingChildren = false;
    };
    /**
     * Set header titles
     */
    AccordionView.prototype.update_titles = function () {
        var collapsed = this.pWidget.collapseWidgets;
        var titles = this.model.get('_titles');
        for (var i = 0; i < collapsed.length; i++) {
            if (titles[i] !== void 0) {
                collapsed[i].widget.title.label = titles[i];
            }
        }
    };
    /**
     * Make the rendering and selected index consistent.
     */
    AccordionView.prototype.update_selected_index = function () {
        this.pWidget.selection.index = this.model.get('selected_index');
    };
    /**
     * Called when a child is removed from children list.
     */
    AccordionView.prototype.remove_child_view = function (view) {
        this.pWidget.removeWidget(view.pWidget);
        view.remove();
    };
    /**
     * Called when a child is added to children list.
     */
    AccordionView.prototype.add_child_view = function (model, index) {
        // Placeholder widget to keep our position in the tab panel while we create the view.
        var accordion = this.pWidget;
        var placeholder = new widgets_1.Widget();
        placeholder.title.label = this.model.get('_titles')[index] || '';
        accordion.addWidget(placeholder);
        return this.create_child_view(model).then(function (view) {
            var widget = view.pWidget;
            widget.title.label = placeholder.title.label;
            var collapse = accordion.collapseWidgets[accordion.indexOf(placeholder)];
            collapse.widget = widget;
            placeholder.dispose();
            return view;
        }).catch(utils.reject('Could not add child view to box', true));
    };
    AccordionView.prototype.remove = function () {
        this.children_views = null;
        _super.prototype.remove.call(this);
    };
    return AccordionView;
}(base_1.DOMWidgetView));
exports.AccordionView = AccordionView;
var TabModel = /** @class */ (function (_super) {
    __extends(TabModel, _super);
    function TabModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'TabModel',
            _view_name: 'TabView'
        });
    };
    return TabModel;
}(SelectionContainerModel));
exports.TabModel = TabModel;
// We implement our own tab widget since Phoshpor's TabPanel uses an absolute
// positioning BoxLayout, but we want a more an html/css-based Panel layout.
var JupyterPhosphorTabPanelWidget = /** @class */ (function (_super) {
    __extends(JupyterPhosphorTabPanelWidget, _super);
    function JupyterPhosphorTabPanelWidget(options) {
        var _this = this;
        var view = options.view;
        delete options.view;
        _this = _super.call(this, options) || this;
        _this._view = view;
        // We want the view's messages to be the messages the tabContents panel
        // gets.
        messaging_1.MessageLoop.installMessageHook(_this.tabContents, function (handler, msg) {
            // There may be times when we want the view's handler to be called
            // *after* the message has been processed by the widget, in which
            // case we'll need to revisit using a message hook.
            _this._view.processPhosphorMessage(msg);
            return true;
        });
        return _this;
    }
    /**
     * Dispose the widget.
     *
     * This causes the view to be destroyed as well with 'remove'
     */
    JupyterPhosphorTabPanelWidget.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        _super.prototype.dispose.call(this);
        if (this._view) {
            this._view.remove();
        }
        this._view = null;
    };
    return JupyterPhosphorTabPanelWidget;
}(tabpanel_1.TabPanel));
exports.JupyterPhosphorTabPanelWidget = JupyterPhosphorTabPanelWidget;
var TabView = /** @class */ (function (_super) {
    __extends(TabView, _super);
    function TabView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.updatingTabs = false;
        return _this;
    }
    TabView.prototype._createElement = function (tagName) {
        this.pWidget = new JupyterPhosphorTabPanelWidget({
            view: this,
        });
        return this.pWidget.node;
    };
    TabView.prototype._setElement = function (el) {
        if (this.el || el !== this.pWidget.node) {
            // TabViews don't allow setting the element beyond the initial creation.
            throw new Error('Cannot reset the DOM element.');
        }
        this.el = this.pWidget.node;
        this.$el = $(this.pWidget.node);
    };
    /**
     * Public constructor.
     */
    TabView.prototype.initialize = function (parameters) {
        var _this = this;
        _super.prototype.initialize.call(this, parameters);
        this.childrenViews = new base_1.ViewList(this.addChildView, function (view) { view.remove(); }, this);
        this.listenTo(this.model, 'change:children', function () { return _this.updateTabs(); });
        this.listenTo(this.model, 'change:_titles', function () { return _this.updateTitles(); });
    };
    /**
     * Called when view is rendered.
     */
    TabView.prototype.render = function () {
        _super.prototype.render.call(this);
        var tabs = this.pWidget;
        tabs.addClass('jupyter-widgets');
        tabs.addClass('widget-container');
        tabs.addClass('widget-tab');
        tabs.tabsMovable = true;
        tabs.tabBar.insertBehavior = 'none'; // needed for insert behavior, see below.
        tabs.tabBar.currentChanged.connect(this._onTabChanged, this);
        tabs.tabBar.tabMoved.connect(this._onTabMoved, this);
        tabs.tabBar.addClass('widget-tab-bar');
        tabs.tabContents.addClass('widget-tab-contents');
        // TODO: expose this option in python
        tabs.tabBar.tabsMovable = false;
        this.updateTabs();
        this.update();
    };
    /**
     * Render tab views based on the current model's children.
     */
    TabView.prototype.updateTabs = function () {
        // While we are updating, the index may not be valid, so deselect the
        // tabs before updating so we don't get spurious changes in the index,
        // which would then set off another sync cycle.
        this.updatingTabs = true;
        this.pWidget.currentIndex = null;
        this.childrenViews.update(this.model.get('children'));
        this.pWidget.currentIndex = this.model.get('selected_index');
        this.updatingTabs = false;
    };
    /**
     * Called when a child is added to children list.
     */
    TabView.prototype.addChildView = function (model, index) {
        // Placeholder widget to keep our position in the tab panel while we create the view.
        var label = this.model.get('_titles')[index] || '';
        var tabs = this.pWidget;
        var placeholder = new widgets_1.Widget();
        placeholder.title.label = label;
        tabs.addWidget(placeholder);
        return this.create_child_view(model).then(function (view) {
            var widget = view.pWidget;
            widget.title.label = placeholder.title.label;
            widget.title.closable = false;
            var i = algorithm_1.ArrayExt.firstIndexOf(tabs.widgets, placeholder);
            // insert after placeholder so that if placholder is selected, the
            // real widget will be selected now (this depends on the tab bar
            // insert behavior)
            tabs.insertWidget(i + 1, widget);
            placeholder.dispose();
            return view;
        }).catch(utils.reject('Could not add child view to box', true));
    };
    /**
     * Update the contents of this view
     *
     * Called when the model is changed.  The model may have been
     * changed by another view or by a state update from the back-end.
     */
    TabView.prototype.update = function () {
        // Update the selected index in the overall update method because it
        // should be run after the tabs have been updated. Otherwise the
        // selected index may not be a valid tab in the tab bar.
        this.updateSelectedIndex();
        return _super.prototype.update.call(this);
    };
    /**
     * Updates the tab page titles.
     */
    TabView.prototype.updateTitles = function () {
        var titles = this.model.get('_titles') || {};
        algorithm_1.each(this.pWidget.widgets, function (widget, i) {
            widget.title.label = titles[i] || '';
        });
    };
    /**
     * Updates the selected index.
     */
    TabView.prototype.updateSelectedIndex = function () {
        this.pWidget.currentIndex = this.model.get('selected_index');
    };
    TabView.prototype.remove = function () {
        this.childrenViews = null;
        _super.prototype.remove.call(this);
    };
    TabView.prototype._onTabChanged = function (sender, args) {
        if (!this.updatingTabs) {
            var i = args.currentIndex;
            this.model.set('selected_index', i === -1 ? null : i);
            this.touch();
        }
    };
    /**
     * Handle the `tabMoved` signal from the tab bar.
     */
    TabView.prototype._onTabMoved = function (sender, args) {
        var children = this.model.get('children').slice();
        algorithm_1.ArrayExt.move(children, args.fromIndex, args.toIndex);
        this.model.set('children', children);
        this.touch();
    };
    return TabView;
}(base_1.DOMWidgetView));
exports.TabView = TabView;


/***/ }),

/***/ "uhLQ":
/*!********************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_image.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "Rtm6");
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var _ = __webpack_require__(/*! underscore */ "F/us");
var ImageModel = /** @class */ (function (_super) {
    __extends(ImageModel, _super);
    function ImageModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'ImageModel',
            _view_name: 'ImageView',
            format: 'png',
            width: '',
            height: '',
            value: new DataView(new ArrayBuffer(0))
        });
    };
    ImageModel.serializers = __assign({}, widget_core_1.CoreDOMWidgetModel.serializers, { value: { serialize: function (value, manager) {
                return new DataView(value.buffer.slice(0));
            } } });
    return ImageModel;
}(widget_core_1.CoreDOMWidgetModel));
exports.ImageModel = ImageModel;
var ImageView = /** @class */ (function (_super) {
    __extends(ImageView, _super);
    function ImageView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageView.prototype.render = function () {
        /**
         * Called when view is rendered.
         */
        _super.prototype.render.call(this);
        this.pWidget.addClass('jupyter-widgets');
        this.pWidget.addClass('widget-image');
        this.update(); // Set defaults.
    };
    ImageView.prototype.update = function () {
        /**
         * Update the contents of this view
         *
         * Called when the model is changed.  The model may have been
         * changed by another view or by a state update from the back-end.
         */
        var url;
        var format = this.model.get('format');
        var value = this.model.get('value');
        if (format !== 'url') {
            var blob = new Blob([value], { type: "image/" + this.model.get('format') });
            url = URL.createObjectURL(blob);
        }
        else {
            url = (new TextDecoder('utf-8')).decode(value.buffer);
        }
        // Clean up the old objectURL
        var oldurl = this.el.src;
        this.el.src = url;
        if (oldurl && typeof oldurl !== 'string') {
            URL.revokeObjectURL(oldurl);
        }
        var width = this.model.get('width');
        if (width !== undefined && width.length > 0) {
            this.el.setAttribute('width', width);
        }
        else {
            this.el.removeAttribute('width');
        }
        var height = this.model.get('height');
        if (height !== undefined && height.length > 0) {
            this.el.setAttribute('height', height);
        }
        else {
            this.el.removeAttribute('height');
        }
        return _super.prototype.update.call(this);
    };
    ImageView.prototype.remove = function () {
        if (this.el.src) {
            URL.revokeObjectURL(this.el.src);
        }
        _super.prototype.remove.call(this);
    };
    Object.defineProperty(ImageView.prototype, "tagName", {
        /**
         * The default tag name.
         *
         * #### Notes
         * This is a read-only attribute.
         */
        get: function () {
            // We can't make this an attribute with a default value
            // since it would be set after it is needed in the
            // constructor.
            return 'img';
        },
        enumerable: true,
        configurable: true
    });
    return ImageView;
}(base_1.DOMWidgetView));
exports.ImageView = ImageView;


/***/ }),

/***/ "vBzC":
/*!**********************************************!*\
  !*** ./node_modules/jquery-ui/ui/keycode.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery UI Keycode 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Keycode
//>>group: Core
//>>description: Provide keycodes as keynames
//>>docs: http://api.jqueryui.com/jQuery.ui.keyCode/

( function( factory ) {
	if ( true ) {

		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(/*! jquery */ "EVdn"), __webpack_require__(/*! ./version */ "Qwlt") ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
} ( function( $ ) {
return $.ui.keyCode = {
	BACKSPACE: 8,
	COMMA: 188,
	DELETE: 46,
	DOWN: 40,
	END: 35,
	ENTER: 13,
	ESCAPE: 27,
	HOME: 36,
	LEFT: 37,
	PAGE_DOWN: 34,
	PAGE_UP: 33,
	PERIOD: 190,
	RIGHT: 39,
	SPACE: 32,
	TAB: 9,
	UP: 38
};

} ) );


/***/ }),

/***/ "xOfY":
/*!********************************************************************!*\
  !*** ./node_modules/@jupyter-widgets/controls/lib/widget_float.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var widget_core_1 = __webpack_require__(/*! ./widget_core */ "0c3I");
var _ = __webpack_require__(/*! underscore */ "F/us");
var widget_int_1 = __webpack_require__(/*! ./widget_int */ "TtYL");
var d3_format_1 = __webpack_require__(/*! d3-format */ "rWgG");
var FloatModel = /** @class */ (function (_super) {
    __extends(FloatModel, _super);
    function FloatModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FloatModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'FloatModel',
            value: 0,
        });
    };
    return FloatModel;
}(widget_core_1.CoreDescriptionModel));
exports.FloatModel = FloatModel;
var BoundedFloatModel = /** @class */ (function (_super) {
    __extends(BoundedFloatModel, _super);
    function BoundedFloatModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoundedFloatModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'BoundedFloatModel',
            max: 100.0,
            min: 0.0
        });
    };
    return BoundedFloatModel;
}(FloatModel));
exports.BoundedFloatModel = BoundedFloatModel;
var FloatSliderModel = /** @class */ (function (_super) {
    __extends(FloatSliderModel, _super);
    function FloatSliderModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FloatSliderModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'FloatSliderModel',
            _view_name: 'FloatSliderView',
            step: 1.0,
            orientation: 'horizontal',
            _range: false,
            readout: true,
            readout_format: '.2f',
            slider_color: null,
            continuous_update: true,
            disabled: false,
        });
    };
    FloatSliderModel.prototype.initialize = function (attributes, options) {
        _super.prototype.initialize.call(this, attributes, options);
        this.on('change:readout_format', this.update_readout_format, this);
        this.update_readout_format();
    };
    FloatSliderModel.prototype.update_readout_format = function () {
        this.readout_formatter = d3_format_1.format(this.get('readout_format'));
    };
    return FloatSliderModel;
}(BoundedFloatModel));
exports.FloatSliderModel = FloatSliderModel;
var FloatLogSliderModel = /** @class */ (function (_super) {
    __extends(FloatLogSliderModel, _super);
    function FloatLogSliderModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FloatLogSliderModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'FloatLogSliderModel',
            _view_name: 'FloatLogSliderView',
            step: 0.1,
            orientation: 'horizontal',
            _range: false,
            readout: true,
            readout_format: '.3g',
            slider_color: null,
            continuous_update: true,
            disabled: false,
            base: 10.,
            value: 1.0,
            min: 0,
            max: 4
        });
    };
    FloatLogSliderModel.prototype.initialize = function (attributes, options) {
        _super.prototype.initialize.call(this, attributes, options);
        this.on('change:readout_format', this.update_readout_format, this);
        this.update_readout_format();
    };
    FloatLogSliderModel.prototype.update_readout_format = function () {
        this.readout_formatter = d3_format_1.format(this.get('readout_format'));
    };
    return FloatLogSliderModel;
}(BoundedFloatModel));
exports.FloatLogSliderModel = FloatLogSliderModel;
var FloatRangeSliderModel = /** @class */ (function (_super) {
    __extends(FloatRangeSliderModel, _super);
    function FloatRangeSliderModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FloatRangeSliderModel;
}(FloatSliderModel));
exports.FloatRangeSliderModel = FloatRangeSliderModel;
var FloatSliderView = /** @class */ (function (_super) {
    __extends(FloatSliderView, _super);
    function FloatSliderView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._parse_value = parseFloat;
        return _this;
    }
    /**
     * Validate the value of the slider before sending it to the back-end
     * and applying it to the other views on the page.
     */
    FloatSliderView.prototype._validate_slide_value = function (x) {
        return x;
    };
    return FloatSliderView;
}(widget_int_1.IntSliderView));
exports.FloatSliderView = FloatSliderView;
var FloatLogSliderView = /** @class */ (function (_super) {
    __extends(FloatLogSliderView, _super);
    function FloatLogSliderView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._parse_value = parseFloat;
        return _this;
    }
    FloatLogSliderView.prototype.update = function (options) {
        _super.prototype.update.call(this, options);
        var min = this.model.get('min');
        var max = this.model.get('max');
        var value = this.model.get('value');
        var base = this.model.get('base');
        var log_value = Math.log(value) / Math.log(base);
        if (log_value > max) {
            log_value = max;
        }
        else if (log_value < min) {
            log_value = min;
        }
        this.$slider.slider('option', 'value', log_value);
        this.readout.textContent = this.valueToString(value);
        if (this.model.get('value') !== value) {
            this.model.set('value', value, { updated_view: this });
            this.touch();
        }
    };
    /**
     * Write value to a string
     */
    FloatLogSliderView.prototype.valueToString = function (value) {
        var format = this.model.readout_formatter;
        return format(value);
    };
    /**
     * Parse value from a string
     */
    FloatLogSliderView.prototype.stringToValue = function (text) {
        return this._parse_value(text);
    };
    /**
     * this handles the entry of text into the contentEditable label first, the
     * value is checked if it contains a parseable value then it is clamped
     * within the min-max range of the slider finally, the model is updated if
     * the value is to be changed
     *
     * if any of these conditions are not met, the text is reset
     */
    FloatLogSliderView.prototype.handleTextChange = function () {
        var value = this.stringToValue(this.readout.textContent);
        var vmin = this.model.get('min');
        var vmax = this.model.get('max');
        var base = this.model.get('base');
        if (isNaN(value)) {
            this.readout.textContent = this.valueToString(this.model.get('value'));
        }
        else {
            value = Math.max(Math.min(value, Math.pow(base, vmax)), Math.pow(base, vmin));
            if (value !== this.model.get('value')) {
                this.readout.textContent = this.valueToString(value);
                this.model.set('value', value, { updated_view: this });
                this.touch();
            }
            else {
                this.readout.textContent = this.valueToString(this.model.get('value'));
            }
        }
    };
    /**
     * Called when the slider value is changing.
     */
    FloatLogSliderView.prototype.handleSliderChange = function (e, ui) {
        var base = this.model.get('base');
        var actual_value = Math.pow(base, this._validate_slide_value(ui.value));
        this.readout.textContent = this.valueToString(actual_value);
        // Only persist the value while sliding if the continuous_update
        // trait is set to true.
        if (this.model.get('continuous_update')) {
            this.handleSliderChanged(e, ui);
        }
    };
    /**
     * Called when the slider value has changed.
     *
     * Calling model.set will trigger all of the other views of the
     * model to update.
     */
    FloatLogSliderView.prototype.handleSliderChanged = function (e, ui) {
        var base = this.model.get('base');
        var actual_value = Math.pow(base, this._validate_slide_value(ui.value));
        this.model.set('value', actual_value, { updated_view: this });
        this.touch();
    };
    FloatLogSliderView.prototype._validate_slide_value = function (x) {
        return x;
    };
    return FloatLogSliderView;
}(widget_int_1.BaseIntSliderView));
exports.FloatLogSliderView = FloatLogSliderView;
var FloatRangeSliderView = /** @class */ (function (_super) {
    __extends(FloatRangeSliderView, _super);
    function FloatRangeSliderView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._parse_value = parseFloat;
        // matches: whitespace?, float, whitespace?, (hyphen, colon, or en-dash), whitespace?, float
        _this._range_regex = /^\s*([+-]?(?:\d*\.?\d+|\d+\.)(?:[eE][-:]?\d+)?)\s*[-:–]\s*([+-]?(?:\d*\.?\d+|\d+\.)(?:[eE][+-]?\d+)?)/;
        return _this;
    }
    /**
     * Validate the value of the slider before sending it to the back-end
     * and applying it to the other views on the page.
     */
    FloatRangeSliderView.prototype._validate_slide_value = function (x) {
        return x;
    };
    return FloatRangeSliderView;
}(widget_int_1.IntRangeSliderView));
exports.FloatRangeSliderView = FloatRangeSliderView;
var FloatTextModel = /** @class */ (function (_super) {
    __extends(FloatTextModel, _super);
    function FloatTextModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FloatTextModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'FloatTextModel',
            _view_name: 'FloatTextView',
            disabled: false,
            continuous_update: false,
        });
    };
    return FloatTextModel;
}(FloatModel));
exports.FloatTextModel = FloatTextModel;
var BoundedFloatTextModel = /** @class */ (function (_super) {
    __extends(BoundedFloatTextModel, _super);
    function BoundedFloatTextModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoundedFloatTextModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'BoundedFloatTextModel',
            _view_name: 'FloatTextView',
            disabled: false,
            continuous_update: false,
            step: 0.1
        });
    };
    return BoundedFloatTextModel;
}(BoundedFloatModel));
exports.BoundedFloatTextModel = BoundedFloatTextModel;
var FloatTextView = /** @class */ (function (_super) {
    __extends(FloatTextView, _super);
    function FloatTextView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._parse_value = parseFloat;
        _this._default_step = 'any';
        return _this;
    }
    return FloatTextView;
}(widget_int_1.IntTextView));
exports.FloatTextView = FloatTextView;
var FloatProgressModel = /** @class */ (function (_super) {
    __extends(FloatProgressModel, _super);
    function FloatProgressModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FloatProgressModel.prototype.defaults = function () {
        return _.extend(_super.prototype.defaults.call(this), {
            _model_name: 'FloatProgressModel',
            _view_name: 'ProgressView',
            orientation: 'horizontal',
            bar_style: '',
            style: null
        });
    };
    return FloatProgressModel;
}(BoundedFloatModel));
exports.FloatProgressModel = FloatProgressModel;


/***/ })

}]);
//# sourceMappingURL=controls.cdb41212bcbe4355518b.js.map
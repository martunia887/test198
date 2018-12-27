"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("../cjs/components/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var BulletListIcon = function BulletListIcon(props) {
  return _react.default.createElement(_Icon.default, _extends({
    dangerouslySetGlyph: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\"><g fill=\"currentColor\" fill-rule=\"evenodd\"><rect x=\"10\" y=\"15\" width=\"8\" height=\"2\" rx=\"1\"/><rect x=\"6\" y=\"15\" width=\"2\" height=\"2\" rx=\"1\"/><rect x=\"10\" y=\"11\" width=\"8\" height=\"2\" rx=\"1\"/><rect x=\"6\" y=\"11\" width=\"2\" height=\"2\" rx=\"1\"/><rect x=\"10\" y=\"7\" width=\"8\" height=\"2\" rx=\"1\"/><rect x=\"6\" y=\"7\" width=\"2\" height=\"2\" rx=\"1\"/></g></svg>"
  }, props));
};

BulletListIcon.displayName = 'BulletListIcon';
var _default = BulletListIcon;
exports.default = _default;
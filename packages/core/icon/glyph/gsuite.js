"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("../src/components/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var GsuiteIcon = function GsuiteIcon(props) {
  return _react.default.createElement(_Icon.default, _extends({
    dangerouslySetGlyph: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\"><path d=\"M16.83 7.662a7.075 7.075 0 0 0-2.033-1.474c-.723-.34-1.637-.505-2.688-.505-.846 0-1.65.15-2.401.45a5.94 5.94 0 0 0-1.964 1.27 5.851 5.851 0 0 0-1.351 1.991c-.328.778-.491 1.637-.491 2.592 0 .955.163 1.815.49 2.592a5.794 5.794 0 0 0 1.352 1.979 6.24 6.24 0 0 0 1.991 1.282c.75.3 1.57.45 2.429.45.914 0 1.719-.123 2.4-.382a5.64 5.64 0 0 0 1.76-1.05c.328-.3.628-.669.887-1.105.26-.45.464-.942.614-1.487h-5.77V10.99h9.413c.055.219.095.478.136.805.041.328.055.628.055.942 0 1.296-.191 2.469-.573 3.547a8.259 8.259 0 0 1-1.733 2.851c-.86.914-1.882 1.61-3.083 2.115-1.2.504-2.578.75-4.12.75-1.391 0-2.701-.246-3.929-.75a10.296 10.296 0 0 1-3.233-2.088 10.103 10.103 0 0 1-2.183-3.151C2.259 14.797 2 13.446 2 12c0-1.446.273-2.783.805-4.01a9.584 9.584 0 0 1 2.183-3.166C5.902 3.937 6.98 3.255 8.22 2.75A10.326 10.326 0 0 1 12.15 2c1.582 0 2.987.273 4.201.819a9.65 9.65 0 0 1 3.151 2.25L16.83 7.663z\" fill=\"currentColor\"/></svg>"
  }, props));
};

GsuiteIcon.displayName = 'GsuiteIcon';
var _default = GsuiteIcon;
exports.default = _default;
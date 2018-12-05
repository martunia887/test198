"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("../../cjs/components/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Gif16Icon = function Gif16Icon(props) {
  return _react.default.createElement(_Icon.default, _extends({
    dangerouslySetGlyph: "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" focusable=\"false\" role=\"presentation\"><path fill=\"#FFAB00\" fill-rule=\"evenodd\" d=\"M2 0h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm7.042 11.09H7.755a.162.162 0 0 1-.162-.161v-5.34c0-.09.072-.162.162-.162h1.287c.09 0 .163.072.163.163v5.339c0 .09-.073.162-.163.162m2.528 0h-1.288a.162.162 0 0 1-.162-.162v-5.34c0-.09.072-.162.162-.162h3.556c.089 0 .162.072.162.163v1.048c0 .09-.073.162-.162.162h-2.106v.947h1.898c.09 0 .162.073.162.162v1.013c0 .09-.072.162-.162.162h-1.898v1.845c0 .09-.074.162-.162.162m-7.045.097C2.944 11.188 2 10.207 2 8.562v-.641c0-1.597.968-2.588 2.528-2.588 1.544 0 2.291.978 2.349 1.948a.161.161 0 0 1-.162.172H5.463a.162.162 0 0 1-.16-.133c-.066-.367-.368-.595-.786-.595-.74 0-.894.657-.894 1.207v.626c0 .822.312 1.238.929 1.238.59 0 .8-.359.8-.667v-.06h-.77a.162.162 0 0 1-.161-.163v-.915c0-.09.072-.162.162-.162h2.144c.09 0 .162.072.162.162v1.036c0 .997-.62 2.161-2.364 2.161\"/></svg>"
  }, props, {
    size: "small"
  }));
};

Gif16Icon.displayName = 'Gif16Icon';
var _default = Gif16Icon;
exports.default = _default;
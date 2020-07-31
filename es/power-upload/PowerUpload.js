import "antd/es/upload/style";
import _Upload from "antd/es/upload";
import "antd/es/message/style";
import _message from "antd/es/message";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';
import _ from 'lodash';
export function PowerUpload(props) {
  var _useState = useState(new Array()),
      _useState2 = _slicedToArray(_useState, 2),
      uploadFileList = _useState2[0],
      setUploadFileList = _useState2[1];

  var beforeUpload = function beforeUpload(file, FileList) {
    if (_.isNumber(props.maxCount) && props.maxCount > 0) {
      if (_.toInteger(_.get(uploadFileList, 'length')) < _.toInteger(props.maxCount)) {
        return true;
      } // message.error(intl.formatMessage({ id: 'tooltip.upload_over' }));


      return false;
    }

    if (_.isFunction(props.beforeUpload)) {
      return props.beforeUpload(file, FileList);
    }

    return true;
  };

  var onChange = function onChange(info) {
    var enableStatus = ['uploading', 'done', 'removed', 'error'];

    if (_.includes(enableStatus, info.file.status)) {
      setUploadFileList(info.fileList);
    }

    if (info.file.status === 'error') {
      var msg = _.get(info.file.response, 'message');

      var firstError = _.get(info.file.response, "errors.".concat(props.name, "[0]"));

      _message.error(firstError || msg);
    }

    if (_.isFunction(props.onChange)) {
      props.onChange(info);
    }
  };

  return React.createElement(_Upload, Object.assign({}, props, {
    beforeUpload: beforeUpload,
    fileList: uploadFileList,
    onChange: onChange
  }));
}
export default PowerUpload;
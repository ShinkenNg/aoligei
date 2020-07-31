function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// eslint-disable-next-line import/no-extraneous-dependencies
import { createContainer } from 'unstated-next';
import { useState, useRef } from 'react';
import useMergeValue from 'use-merge-value';

function useCounter() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var actionRef = useRef();

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      columns = _useState2[0],
      setColumns = _useState2[1]; // 用于排序的数组


  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      sortKeyColumns = _useState4[0],
      setSortKeyColumns = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      powerColumns = _useState6[0],
      setPowerColumns = _useState6[1];

  var _useMergeValue = useMergeValue(props.size || 'middle', {
    value: props.size,
    onChange: props.onSizeChange
  }),
      _useMergeValue2 = _slicedToArray(_useMergeValue, 2),
      tableSize = _useMergeValue2[0],
      setTableSize = _useMergeValue2[1];

  var _useMergeValue3 = useMergeValue(props.columnsStateMap || {}, {
    value: props.columnsStateMap,
    onChange: props.onColumnsStateChange
  }),
      _useMergeValue4 = _slicedToArray(_useMergeValue3, 2),
      columnsMap = _useMergeValue4[0],
      setColumnsMap = _useMergeValue4[1];

  return {
    action: actionRef,
    setAction: function setAction(newAction) {
      actionRef.current = newAction;
    },
    sortKeyColumns: sortKeyColumns,
    setSortKeyColumns: setSortKeyColumns,
    columns: columns,
    setColumns: setColumns,
    columnsMap: columnsMap,
    setTableSize: setTableSize,
    tableSize: tableSize,
    setColumnsMap: setColumnsMap,
    powerColumns: powerColumns,
    setPowerColumns: setPowerColumns
  };
}

var Counter = createContainer(useCounter);
export default Counter;
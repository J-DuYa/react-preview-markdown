import { BabelStandOne } from './babel';
import React from 'react';
import ReactDOM from 'react-dom';
import requireModuleDefault from './requireModuleDefault';
import {
Button,
Affix,
Anchor,
AutoComplete,
Alert,
Avatar,
BackTop,
Badge,
Breadcrumb,
Calendar,
Card,
Collapse,
Carousel,
Cascader,
Checkbox,
Col,
Comment,
ConfigProvider,
DatePicker,
Descriptions,
Divider,
Dropdown,
Drawer,
Empty,
Form,
Grid,
Input,
Image,
InputNumber,
Layout,
List,
message,
Menu,
Mentions,
Modal,
Statistic,
notification,
PageHeader,
Pagination,
Popconfirm,
Popover,
Progress,
Radio,
Rate,
Result,
Row,
Select,
Skeleton,
Slider,
Space,
Spin,
Steps,
Switch,
Table,
Transfer,
Tree,
TreeSelect,
Tabs,
Tag,
TimePicker,
Timeline,
Tooltip,
Typography,
Upload
} from 'antd';

const babelConfig = {
  presets: [
    'es2015',
		'react'
  ]
};

const importMapPlugin = ({ types }) => ({
	visitor: {
	  Program(path) {
	    let lastExpr;
	    for (let i = path.node.body.length - 1; i >= 0; i--) {
              if (types.isExpressionStatement(path.node.body[i])) {
                lastExpr = path.get(`body.${i}`);
                break;
              }
	  }
			
        if (lastExpr) {
          // ... and turn it into a return statement
          lastExpr.replaceWith(types.returnStatement(lastExpr.node.expression));
        }
    }
  }
});

export default function parser (code: string) {
	const output = BabelStandOne.transform(code, {
		compact: true,
		...babelConfig,
		plugins: [importMapPlugin]
	});

	const antd = {
		Button,
		Affix,
		Anchor,
		AutoComplete,
		Alert,
		Avatar,
		BackTop,
		Badge,
		Breadcrumb,
		Calendar,
		Card,
		Collapse,
		Carousel,
		Cascader,
		Checkbox,
		Col,
		Comment,
		ConfigProvider,
		DatePicker,
		Descriptions,
		Divider,
		Dropdown,
		Drawer,
		Empty,
		Form,
		Grid,
		Input,
		Image,
		InputNumber,
		Layout,
		List,
		message,
		Menu,
		Mentions,
		Modal,
		Statistic,
		notification,
		PageHeader,
		Pagination,
		Popconfirm,
		Popover,
		Progress,
		Radio,
		Rate,
		Result,
		Row,
		Select,
		Skeleton,
		Slider,
		Space,
		Spin,
		Steps,
		Switch,
		Table,
		Transfer,
		Tree,
		TreeSelect,
		Tabs,
		Tag,
		TimePicker,
		Timeline,
		Tooltip,
		Typography,
		Upload
	};

	const imports = {
		'ReactDOM': ReactDOM,
		'require': require,
		'_antd': antd,
		...antd
	};

	const importKeys = Object.keys(imports).filter(k => imports[k])
	const importModules = importKeys.map(k => requireModuleDefault(imports[k]));
	let element;
	console.log('output.code', output.code);
	const previewCode = output.code.replace('var _antd=require("antd");', '');
	element = new Function("React", ...importKeys, previewCode)(
		React,
		...importModules
	);

	return element;
}

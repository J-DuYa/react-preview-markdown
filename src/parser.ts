import { BabelStandOne } from './babel';
import React from 'react';
import ReactDOM from 'react-dom';
import requireModuleDefault from './requireModuleDefault';
import { Button } from 'antd';

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
		Button
	};

	const imports = {
		'ReactDOM': ReactDOM,
		'Button': Button,
		'require': require
	};

	const importKeys = Object.keys(imports).filter(k => imports[k])
	const importModules = importKeys.map(k => requireModuleDefault(imports[k]));
	let element;
	try {
		element = new Function("React", ...importKeys, output.code)(
			React,
			...importModules
		);
	} catch(e) {
		throw new Error('不符合规范');
	}

	return element;
}
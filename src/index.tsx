/**
 * @description 主入口
 * 
 * hook
 * 
 * 2021-03-01
*/
import React, { useEffect, useState } from 'react';
import { parser } from './utils';
import marked from 'marked';
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import './index.less';

function genID(length){
	return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}

let list: any = [];

marked.setOptions({
	renderer: new marked.Renderer(),
	highlight: function (code, lang) {
		let mockId = genID(10);
		const previewCode = code.replace('mountNode', 'document.getElementById("'+ mockId +'")');
		list.push(previewCode);
		if (lang === 'jsx') {
			return `
				<div id=${mockId}>demo</div>
				<div class='codePreview'>${hljs.highlightAuto(code).value}</div>
			`;
		};
		return hljs.highlightAuto(code).value;
	},
	gfm: true, // 允许 Git Hub标准的markdown.
	pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
	sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
	tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
	breaks: false, // 允许回车换行（该选项要求 gfm 为true）
	smartLists: true, // 使用比原生markdown更时髦的列表
	smartypants: false, // 使用更为时髦的标点
});

const DyMarkdownPreview = function (props: any) {
	const { values } = props;
	const [html, setHtml] = useState<any>('');
	const [preview, setPreview] = useState<any>();

	useEffect(() => {
		setHtml(marked(values));
	}, [])

	useEffect(() => {
		if (html) {
			setPreview(list.map((node, idx) => (<div key={idx}>{parser(node)}</div>)));
		}
	}, [html]);

	return (
		<div className='dy-markdown-editor'>
			{ preview }
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	)
}

export default DyMarkdownPreview;
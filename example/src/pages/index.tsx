import styles from './index.less';
import DyMarkdownPreview from 'react-code-preview';

export default function IndexPage() {
	// const code = 'import { Button } from "antd"\nconst element = <Button className="foo">demo</Button>;\nReactDOM.render(element, document.getElementById("root"));';
	const values = "# demo\n ```jsx\n const element = <Button className='foo'>demo</Button>;\nReactDOM.render(element, mountNode); \n```";
	return (
    <div>
      <DyMarkdownPreview values={values} className={styles.title} />
    </div>
  );
}

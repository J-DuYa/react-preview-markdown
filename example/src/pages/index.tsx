import styles from './index.less';
import DyMarkdownPreview from 'react-code-preview';

export default function IndexPage() {
  return (
    <div>
      <DyMarkdownPreview className={styles.title} />
    </div>
  );
}

import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './BlogContent.module.scss';
import HeaderH2 from '../HeaderH2/HeaderH2';
import { useTranslation } from 'next-i18next';

interface BlogContentProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const BlogContent: FC<BlogContentProps> = ({ className, ...props }) => {
	const { t } = useTranslation('blog');

	return (
		<div className={cn(className, styles.blogContent)} {...props}>
			<div className={styles.container}>
				<HeaderH2
					className={styles.sectionHeaderH2}
					text={t('headerText')}
					description={t('headerDesc')}
				/>
			</div>
		</div>
	);
};

export default BlogContent;

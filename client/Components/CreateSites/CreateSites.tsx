import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './CreateSites.module.scss';
import HeaderH2 from '../HeaderH2/HeaderH2';
import { useTranslation } from 'next-i18next';
import { ITextItem } from '../../types/common';

interface CreateSitesProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const CreateSites: FC<CreateSitesProps> = ({ className, ...props }) => {
	const { t } = useTranslation('services');

	return (
		<div className={cn(className, styles.createSites)} {...props}>
			<div className={styles.container}>
				<HeaderH2
					className={styles.sectionHeaderH2}
					text={t('website.headerText')}
					description={t('website.headerDesc')}
				/>
				<span className={styles.subHeader}>
					{t('website.subHeader')}
				</span>
				<span className={styles.textHeader}>
					{t('website.textHeader')}
				</span>
				<span className={styles.textHeader2}>
					{t('website.textHeader2')}
				</span>
				<span className={styles.textHeader3}>
					{t('website.textHeader3')}
				</span>
				<div className={styles.textContainer}>
					{/* 
					// @ts-ignore */}
					{t<ITextItem[]>('website.texts', {
						returnObjects: true,
						// @ts-ignore
					}).map((item: ITextItem) => (
						<div className={styles.content} key={item.id}>
							<span className={styles.text1}>
								<span className={styles.line}>
									{`\u276F`}
									{'\u00a0'}
								</span>
								<span className={styles.mainText}>
									{item.text1}
								</span>
							</span>
							<span className={styles.text2}>{item.text2}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CreateSites;

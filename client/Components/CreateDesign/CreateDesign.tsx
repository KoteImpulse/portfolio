import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './CreateDesign.module.scss';
import HeaderH2 from '../HeaderH2/HeaderH2';
import { useTranslation } from 'next-i18next';
import { ITextItem } from '../../types/common';

interface CreateDesignProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const CreateDesign: FC<CreateDesignProps> = ({ className, ...props }) => {
	const { t } = useTranslation('services');
	
	return (
		<div className={cn(className, styles.createDesign)} {...props}>
			<div className={styles.container}>
				<HeaderH2
					className={styles.sectionHeaderH2}
					text={t('design.headerText')}
					description={t('design.headerDesc')}
				/>
				<span className={styles.subHeader}>
					{t('design.subHeader')}
				</span>
				<div className={styles.textContainer}>
					{/* 
					// @ts-ignore */}
					{t<ITextItem[]>('design.texts', {
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

export default CreateDesign;

import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Benefits.module.scss';
import { useTranslation } from 'next-i18next';
import { ITextItem } from '../../types/common';

interface BenefitsProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Benefits: FC<BenefitsProps> = ({ className, ...props }) => {
	const { t } = useTranslation('common');

	return (
		<div className={cn(className, styles.benefits)} {...props}>
			<div className={styles.container}>
				<span className={styles.headerBlock}>
					{t('benefits.headerText')}
				</span>
				<div className={styles.textContainer}>
					{/* 
					// @ts-ignore */}
					{t<ITextItem[]>('benefits.texts', {
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
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Benefits;

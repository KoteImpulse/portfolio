import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './CreateEcommerces.module.scss';
import HeaderH2 from '../HeaderH2/HeaderH2';
import { useTranslation } from 'next-i18next';
import { ITextItem } from '../../types/common';

interface CreateEcommercesProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const CreateEcommerces: FC<CreateEcommercesProps> = ({
	className,
	...props
}) => {
	const { t } = useTranslation('services');

	return (
		<div className={cn(className, styles.createEcommerces)} {...props}>
			<div className={styles.container}>
				<HeaderH2
					className={styles.sectionHeaderH2}
					text={t('ecommerce.headerText')}
					description={t('ecommerce.headerDesc')}
				/>
				<span className={styles.subHeader}>
					{t('ecommerce.subHeader')}
				</span>
				<div className={styles.textContainer}>
					{/* 
					// @ts-ignore */}
					{t<ITextItem[]>('ecommerce.texts', {
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

export default CreateEcommerces;

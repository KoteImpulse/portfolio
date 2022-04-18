import React, { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import styles from './DefaultContent.module.scss';
import { HTMLMotionProps, motion } from 'framer-motion';
import HeaderH2 from '../HeaderH2/HeaderH2';
import WhatsAppTelegramLinks from '../WhatsAppTelegramLinks/WhatsAppTelegramLinks';
import { useTranslation } from 'next-i18next';

interface DefaultContentProps extends HTMLMotionProps<'div'> {}

const DefaultContent = (
	{ className, ...props }: DefaultContentProps,
	ref: ForwardedRef<HTMLDivElement>
): JSX.Element => {
	const { t } = useTranslation('common');

	return (
		<motion.div
			className={cn(className, styles.defaultContent)}
			{...props}
			ref={ref}
		>
			<HeaderH2
				text={t('menuDefaultContent.headerText')}
				description={t('menuDefaultContent.headerDesc')}
				className={styles.tabHeader}
				shouldAnimate={false}
			/>
			<span className={styles.listHeader}>{t('menuDefaultContent.listHeader')}</span>
			<ol className={styles.list}>
				{/* 
					// @ts-ignore */}
				{t<string[]>('menuDefaultContent.listItems', {
					returnObjects: true,
					// @ts-ignore
				}).map((item: string[], index: number) => (
					<li key={index} className={styles.listItem}>
						{item}
					</li>
				))}
			</ol>

			<WhatsAppTelegramLinks className={styles.linkContainer} />
		</motion.div>
	);
};

export default motion(forwardRef(DefaultContent));

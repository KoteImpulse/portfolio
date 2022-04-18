import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './About.module.scss';
import HeaderH2 from '../HeaderH2/HeaderH2';
import { textVariants } from '../../data';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { ITextItem } from '../../types/common';

interface AboutProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const containerVariants1: Variants = {
	hidden: {},
	shown: {
		transition: {
			staggerChildren: 0,
		},
	},
};
const containerVariants2: Variants = {
	hidden: {},
	shown: {
		transition: {
			staggerChildren: 0,
		},
	},
};
const containerVariants3: Variants = {
	hidden: {},
	shown: {
		transition: {
			staggerChildren: 0,
		},
	},
};

const About: FC<AboutProps> = ({ className, ...props }) => {
	const { t } = useTranslation('about');
	return (
		<div className={cn(className, styles.about)} {...props}>
			<motion.div
				className={styles.container}
				variants={containerVariants1}
				animate='shown'
				initial='hidden'
			>
				<HeaderH2
					className={styles.sectionHeaderH2}
					text={t('headerText')}
					description={t('headerDesc')}
				/>
				<motion.span
					className={styles.paragraph}
					variants={textVariants}
				>
					{t('text1')}
				</motion.span>
				<motion.span
					className={styles.sectionHeaderH21}
					variants={textVariants}
				>
					{t('text2')}
				</motion.span>
				<motion.div
					className={styles.textsContainer}
					variants={containerVariants2}
				>
					{/* 
					// @ts-ignore */}
					{t<ITextItem[]>('texts', { returnObjects: true }).map(
						(item: ITextItem) => (
							<motion.div
								className={styles.textContent}
								key={item.id}
								variants={containerVariants3}
							>
								<motion.span
									className={styles.text1}
									variants={textVariants}
								>
									<span className={styles.line}>
										{`\u276F`}
										{'\u00a0'}
									</span>
									{item.text1}
								</motion.span>
								<motion.span
									className={styles.text2}
									variants={textVariants}
								>
									{item.text2}
								</motion.span>
							</motion.div>
						)
					)}
				</motion.div>
			</motion.div>
		</div>
	);
};

export default About;

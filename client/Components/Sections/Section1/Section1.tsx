import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Section1.module.scss';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'next-i18next';

interface Section1Props
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const motionVariantsContainer: Variants = {
	hidden: { opacity: 0 },
	shown: {
		opacity: 1,
		transition: {
			delay: 2,
		},
	},
};

const motionVariants: Variants = {
	line: {
		y: ['-100%', '100%'],
		originY: 0,
		transition: {
			repeat: Infinity,
			repeatType: 'loop',
			duration: 2,
			ease: 'easeOut',
		},
	},
};

const containerVariants: Variants = {
	hidden: {},
	shown: {
		transition: {
			staggerChildren: 0.5,
		},
	},
};

const containerVariants2: Variants = {
	hidden: {},
	shown: {
		transition: {
			delayChildren: 1.5,
		},
	},
};

const textVariants: Variants = {
	hidden: { opacity: 0, y: '150%' },
	shown: {
		opacity: 1,
		y: '0%',
		transition: {
			ease: [0.38, 0.28, 0.39, 0.91],
			duration: 0.5,
		},
	},
};

const Section1: FC<Section1Props> = ({ className, ...props }) => {
	const { t } = useTranslation('homepage');
	return (
		<div className={cn(className, styles.section1)} {...props}>
			<div className={styles.container}>
				<motion.h1
					className={styles.headerH1}
					initial='hidden'
					animate='shown'
					variants={containerVariants}
				>
					<motion.span
						className={styles.headerRow1}
						variants={textVariants}
					>
						{t('section1.row1')}
					</motion.span>
					<motion.span
						className={styles.headerRow2}
						variants={textVariants}
					>
						{t('section1.row2')}
					</motion.span>
					<motion.span
						className={styles.headerRow3}
						variants={textVariants}
					>
						{t('section1.row3')}
					</motion.span>
				</motion.h1>
				<motion.div
					className={styles.sectionText}
					initial='hidden'
					animate='shown'
					variants={containerVariants2}
				>
					<motion.span
						className={styles.description}
						variants={textVariants}
					>
						{t('section1.subHeader')}
					</motion.span>
				</motion.div>
			</div>
			<motion.div
				className={styles.headerLine}
				initial='hidden'
				animate='shown'
				variants={motionVariantsContainer}
			>
				<motion.span
					className={styles.line}
					variants={motionVariants}
					animate={'line'}
				></motion.span>
			</motion.div>
		</div>
	);
};

export default Section1;

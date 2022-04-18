import React, { FC } from 'react';
import cn from 'classnames';
import styles from './Ticker.module.scss';
import { HTMLMotionProps, motion, Variants } from 'framer-motion';
import Link from 'next/link';

interface TickerProps extends HTMLMotionProps<'div'> {
	text: string;
}

const motionVariants: Variants = {
	line1: {
		x: ['0%', '-100%'],
		transition: {
			repeat: Infinity,
			// repeatType: 'loop',
			duration: 45,
			ease: 'linear',
		},
	},
	line2: {
		x: ['0%', '-100%'],
		transition: {
			repeat: Infinity,
			// repeatType: 'loop',
			duration: 45,
			ease: 'linear',
		},
	},
};

const Ticker: FC<TickerProps> = ({ text, className, ...props }) => {
	return (
		<motion.div className={cn(className, styles.ticker)} {...props}>
			<div className={styles.container}>
				<motion.div
					className={styles.inner}
					variants={motionVariants}
					animate='line1'
				>
					{[...Array(4).keys()].map((index) => (
						<Link
							key={index}
							href={'/category/all'}
							shallow={true}
							passHref
						>
							<span key={index} className={styles.item}>
								{text}
							</span>
						</Link>
					))}
				</motion.div>
				<motion.div
					className={styles.inner}
					variants={motionVariants}
					animate='line2'
				>
					{[...Array(4).keys()].map((index) => (
						<Link key={index} href={'/category/all'} passHref>
							<span className={styles.item}>{text}</span>
						</Link>
					))}
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Ticker;

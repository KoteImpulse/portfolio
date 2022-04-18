import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Section3.module.scss';
import HeaderH2 from '../../HeaderH2/HeaderH2';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'next-i18next';

interface Section3Props
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const underLineVariants: Variants = {
	rest: {
		x: '-90%',
		transition: { duration: 0.5, delay: 0.1, ease: 'easeOut' },
	},
	hover: {
		x: '-10%',
		transition: { duration: 0.5, delay: 0.1, ease: 'easeOut' },
	},
};

interface itemProps {
	id: number;
	text1: string;
	text2: string;
	link: string;
}

const Section3: FC<Section3Props> = ({ className, ...props }) => {
	const { t } = useTranslation('homepage');

	return (
		<div className={cn(className, styles.section3)} {...props}>
			<div className={styles.container}>
				<HeaderH2
					className={styles.sectionHeaderH2}
					text={t('section3.headerText')}
					description={t('section3.headerDesc')}
				/>
				<div className={styles.textContainer}>
					{/* 
					// @ts-ignore */}
					{t<itemProps[]>('section3.texts', {returnObjects: true}).map(
						(item: itemProps) => (
						<Link href={item.link} key={item.id} passHref>
							<motion.div
								className={styles.content}
								whileHover='hover'
								animate='rest'
								initial='rest'
							>
								<span className={styles.text1}>
									<span className={styles.line}>
										{`\u276F`}
										{'\u00a0'}
									</span>
									<span className={styles.mainText}>
										{item.text1}
										<span
											className={
												styles.underLineContainer
											}
										>
											<motion.span
												className={styles.underLine}
												variants={underLineVariants}
											></motion.span>
										</span>
									</span>
								</span>
								<span className={styles.text2}>
									{item.text2}
								</span>
							</motion.div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Section3;

import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './HeaderH2.module.scss';
import { motion } from 'framer-motion';
import { textVariants } from '../../data';

interface HeaderH2Props
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	text?: string;
	description?: string;
	shouldAnimate?: boolean;
}

const HeaderH2: FC<HeaderH2Props> = ({
	shouldAnimate = true,
	text,
	description,
	className,
	...props
}) => {
	return (
		<div className={cn(className, styles.headerH2)} {...props}>
			<div className={styles.headerBlock}>
				{shouldAnimate ? (
					<>
						{text && <motion.h2
							className={styles.headerText}
							initial='hidden'
							variants={textVariants}
							viewport={{ margin: '300% 0% 0% 0%' }}
							whileInView='shown'
						>
							{text}
						</motion.h2>}
						{description && (
							<motion.p
								className={styles.description}
								initial='hidden'
								variants={textVariants}
								viewport={{ margin: '300% 0% 0% 0%' }}
								whileInView='shown'
							>
								{description}
							</motion.p>
						)}
					</>
				) : (
					<>
						{text && <h2 className={styles.headerText}>{text}</h2>}
						{description && (
							<p className={styles.description}>{description}</p>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default HeaderH2;

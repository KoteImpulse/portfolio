import React, {
	DetailedHTMLProps,
	FC,
	ForwardedRef,
	forwardRef,
	HTMLAttributes,
} from 'react';
import cn from 'classnames';
import styles from './StyledLink.module.scss';
import { motion, Variants } from 'framer-motion';
import { IoIosArrowForward } from 'react-icons/io';
interface StyledLinkProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	text: string;
}

const hoverVariants: Variants = {
	rest: { x: '0%' },
	hover: { x: '20%' },
};
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

const StyledLink = (
	{ text, className, ...props }: StyledLinkProps,
	ref: ForwardedRef<HTMLDivElement>
): JSX.Element => {
	return (
		<div className={cn(className, styles.styledLink)} {...props} ref={ref}>
			<motion.div
				className={styles.textContainer}
				whileHover='hover'
				animate='rest'
				initial='rest'
			>
				<span className={styles.linkText}>
					{text}
					<motion.span
						className={styles.linkArrow}
						variants={hoverVariants}
					>
						<IoIosArrowForward />
					</motion.span>
					<span className={styles.underLineContainer}>
						<motion.span
							className={styles.underLine}
							variants={underLineVariants}
						></motion.span>
					</span>
				</span>
			</motion.div>
		</div>
	);
};

export default forwardRef(StyledLink);

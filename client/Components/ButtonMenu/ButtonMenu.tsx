import React, {
	DetailedHTMLProps,
	FC,
	forwardRef,
	HTMLAttributes,
	useEffect,
} from 'react';
import cn from 'classnames';
import styles from './ButtonMenu.module.scss';
import { HTMLMotionProps, motion, useAnimation, Variants } from 'framer-motion';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

interface ButtonMenuProps extends HTMLMotionProps<'button'> {}

const variants1: Variants = {
	open: {
		width: '26px',
		transform: `rotate(45deg)`,
		transition: { duration: 0.5 },
	},
	close: {
		width: '16px',
		transform: `rotate(0deg)`,
		transition: { duration: 0.5 },
	},
};
const variants2: Variants = {
	open: {
		width: '26px',
		transform: `rotate(-45deg)`,
		transition: { duration: 0.5 },
		marginTop: '-2px',
	},
	close: {
		width: '22px',
		transform: `rotate(0deg)`,
		transition: { duration: 0.5 },
		marginTop: '4px',
	},
};

const ButtonMenu: FC<ButtonMenuProps> = ({ className, ...props }) => {
	const { isOpen, isLoading } = useTypedSelector((state) => state.client);

	const { setHeaderOpen, setHeaderClose } = useActions();

	const animContr = useAnimation();
	const animContr2 = useAnimation();

	useEffect(() => {
		(async () => {
			isOpen ? animContr.start('open') : animContr.start('close');
			isOpen
				? await animContr2.start('open')
				: await animContr2.start('close');
		})();
	}, [isOpen]);

	return (
		<motion.button
			className={cn(className, styles.buttonMenu)}
			{...props}
			disabled={isLoading}
			onClick={isOpen ? setHeaderClose : setHeaderOpen}
			aria-label='меню'
		>
			<motion.div className={styles.containerSpan}>
				<motion.span
					initial={'close'}
					animate={animContr}
					variants={variants1}
					className={styles.line1}
				></motion.span>
				<motion.span
					initial={'close'}
					animate={animContr2}
					variants={variants2}
					className={styles.line2}
				></motion.span>
			</motion.div>
		</motion.button>
	);
};

export default ButtonMenu;

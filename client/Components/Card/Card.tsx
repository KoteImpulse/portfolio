import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import styles from './Card.module.scss';
import Image from 'next/image';
import { HTMLMotionProps, motion, useAnimation, Variants } from 'framer-motion';
import { IPortfolioWork } from '../../types/portfolioWork';
import { baseUrl } from '../../utils/api';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useWindowSize } from '../../hooks/useWindowSize';
import Link from 'next/link';

interface CardProps extends HTMLMotionProps<'div'> {
	portfolioWork: IPortfolioWork;
}

const hoverVariants: Variants = {
	hoverImage: {
		backgroundColor: 'rgba(0, 0, 0, 0)',
		transition: { duration: 0.2 },
	},
	hoverImageZoom: {
		scale: 1.2,
		transition: {
			duration: 1,
		},
	},
	hoverTaglineText: {
		y: 50,
		opacity: 0,
		transition: {
			duration: 1,
			delay: 0.2,
			ease: 'easeOut',
		},
	},
	hoverCategoryText: {
		y: 50,
		opacity: 0,
		transition: {
			duration: 1,
			ease: 'easeOut',
		},
	},
	restImage: {
		backgroundColor: 'var(--colorB)',
		transition: { duration: 0.2 },
	},
	restImageZoom: {
		scale: 1,
		transition: {
			duration: 0.5,
		},
	},
	restTaglineText: {
		y: 0,
		opacity: 1,
		transition: {
			ease: 'easeOut',
			duration: 1,
		},
	},
	restCategoryText: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 1,
			ease: 'easeOut',
			delay: 0.2,
		},
	},
};

const Card: FC<CardProps> = ({ portfolioWork, className, ...props }) => {
	const hoverTextTaglineControls = useAnimation();
	const hoverTextCategoryControls = useAnimation();
	const hoverImageControls = useAnimation();
	const hoverImageZoomControls = useAnimation();

	const size = useWindowSize();

	useEffect(() => {
		if (size.width && size.width < 991) {
			resetHover();
		} else {
			resetRest();
		}
	}, [size]);

	const handleHoverOn = async (): Promise<void> => {
		if (size.width && size.width > 991) {
			hoverTextTaglineControls.start('hoverTaglineText');
			hoverTextCategoryControls.start('hoverCategoryText');
			hoverImageControls.start('hoverImage');
			hoverImageZoomControls.start('hoverImageZoom');
		}
	};
	const handleHoverOff = async (): Promise<void> => {
		if (size.width && size.width > 991) {
			hoverImageZoomControls.start('restImageZoom');
			hoverImageControls.start('restImage');
			hoverTextCategoryControls.start('restCategoryText');
			hoverTextTaglineControls.start('restTaglineText');
		}
	};
	const resetHover = async (): Promise<void> => {
		hoverImageControls.start('hoverImage');
	};
	const resetRest = async (): Promise<void> => {
		hoverImageControls.start('restImage');
	};

	const { brand, tagline, category, cardPic, id } = portfolioWork;
	const { portfolio } = useTypedSelector((state) => state.server);

	return (
		<Link href={`/portfolio/${id}`} passHref>
			<motion.div
				className={cn(className, styles.card)}
				{...props}
				variants={hoverVariants}
				animate={hoverImageControls}
				onMouseEnter={handleHoverOn}
				onMouseLeave={handleHoverOff}
				onClick={() => hoverImageControls.start('hoverImage')}
			>
				<div className={styles.brandContainer}>
					<span className={styles.cardBrand}>{brand}</span>
				</div>
				<motion.div
					className={styles.taglineContainer}
					variants={hoverVariants}
					animate={hoverTextTaglineControls}
				>
					<span className={styles.cardTagline}>{tagline}</span>
				</motion.div>
				<motion.div
					className={styles.categoryContainer}
					variants={hoverVariants}
					animate={hoverTextCategoryControls}
				>
					{category.map((item, index) => (
						<span key={index} className={styles.cardCategory}>
							{index === category.length - 1
								? `${item}`
								: `${item}${'\u00a0'}|${'\u00a0'}`}
						</span>
					))}
				</motion.div>
				<div className={styles.imageContainer}>
					<motion.div
						className={styles.image}
						variants={hoverVariants}
						animate={hoverImageZoomControls}
					>
						<Image
							alt='card image'
							src={
								portfolio.length != 0 && cardPic
									? `${baseUrl}/${cardPic}`
									: `/mountains.jpg`
							}
							layout='fill'
							objectFit='cover'
							quality={65}
							priority
						/>
					</motion.div>
				</div>
			</motion.div>
		</Link>
	);
};

export default Card;

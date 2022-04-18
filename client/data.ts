import { Variants } from 'framer-motion';

export const categoryList = [
	'all',
	'design',
	'website',
	'brand',
	'ecommerce',
	'maintenance',
];

export const textVariants: Variants = {
	hidden: { opacity: 0, y: '130%' },
	shown: {
		opacity: 1,
		y: '0%',
		transition: {
			ease: [0.38, 0.28, 0.39, 0.91],
			duration: 0.5,
		},
	},
};

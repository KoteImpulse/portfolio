import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './TabNavItem.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useRouter } from 'next/router';
import { IMenuTab } from '../../types/common';

interface TabNavItemProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	tabContent: IMenuTab;
}

const TabNavItem: FC<TabNavItemProps> = ({
	tabContent,
	className,
	...props
}) => {
	const { activeTab } = useTypedSelector((state) => state.client);
	const router = useRouter();
	return (
		<div className={cn(className, styles.tabItem)} {...props}>
			{!tabContent.link ? (
				<motion.span
					className={styles.itemLink}
					style={
						activeTab === tabContent.title ? { color: 'var(--colorImg)' } : {}
					}
				>
					{tabContent.alias}
				</motion.span>
			) : (
				<Link href={`/${tabContent.title}`} passHref>
					<motion.span
						className={styles.itemLink}
						style={
							router.asPath.split('/')[1] === tabContent.title
								? { color: 'var(--colorImg)' }
								: {}
						}
					>
						{tabContent.alias}
					</motion.span>
				</Link>
			)}
		</div>
	);
};

export default TabNavItem;

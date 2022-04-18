import React, { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import styles from './TabNav.module.scss';
import TabNavItem from '../TabNavItem/TabNavItem';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { HTMLMotionProps, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { IMenuTab } from '../HeaderMenu/HeaderMenu';

interface TabNavProps extends HTMLMotionProps<'div'> {}

const TabNav = (
	{ className, ...props }: TabNavProps,
	ref: ForwardedRef<HTMLDivElement>
): JSX.Element => {
	const { setActiveTab, setHeaderClose, setTabOpen, setTabClose } =
		useActions();
	const { activeTab } = useTypedSelector((state) => state.client);
	const { t } = useTranslation('common');

	const clickHandle = (id: number, link: boolean) => {
		if (!link) {
			if (activeTab === id) {
				setActiveTab(0);
				setTabClose();
			} else {
				setActiveTab(id);
				setTabOpen();
			}
		} else {
			setHeaderClose();
			return;
		}
	};

	return (
		<motion.div
			className={cn(className, styles.tabNav)}
			{...props}
			ref={ref}
		>
			<nav className={styles.navItems}>
				{/* 
					// @ts-ignore */}
				{t<IMenuTab[]>('menu', { returnObjects: true }).map(
					(item: IMenuTab) => (
						<TabNavItem
							key={item.alias + item.id}
							className={styles.navItem}
							tabContent={item}
							onClick={() => clickHandle(item.id, item.link)}
						/>
					)
				)}
			</nav>
		</motion.div>
	);
};

export default motion(forwardRef(TabNav));

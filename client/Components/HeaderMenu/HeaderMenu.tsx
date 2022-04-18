import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import styles from './HeaderMenu.module.scss';
import TabNav from '../TabNav/TabNav';
import TabContentItem from '../TabContentItem/TabContentItem';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import DefaultContent from '../DefaultContent/DefaultContent';
import {
	AnimatePresence,
	HTMLMotionProps,
	motion,
	useAnimation,
	Variants,
} from 'framer-motion';
import { useWindowSize } from '../../hooks/useWindowSize';
import { IoIosArrowForward } from 'react-icons/io';
import { useActions } from '../../hooks/useActions';
import WhatsAppTelegramLinks from '../WhatsAppTelegramLinks/WhatsAppTelegramLinks';
import HeaderH2 from '../HeaderH2/HeaderH2';
import { useTranslation } from 'next-i18next';
import { IMenuTab, ITabContent } from '../../types/common';

interface HeaderMenuProps extends HTMLMotionProps<'div'> {}

const motionVariants: Variants = {
	openMenu: {
		display: 'grid',
		backgroundColor: 'var(--colorB)',
		x: '0%',
		transition: { duration: 0, backgroundColor: { delay: 1 } },
	},
	closeMenu: {
		x: '100%',
		backgroundColor: 'rgb(0,0,0,0)',
		transition: { backgroundColor: { duration: 0 }, x: { duration: 0 } },
		transitionEnd: {
			display: 'none',
		},
	},
	closeMenuColor: {
		backgroundColor: 'rgb(0,0,0,0)',
		transition: { backgroundColor: { duration: 0 } },
	},
	openNav: { x: '0%', transition: { duration: 1 } },
	closeNav: { x: '100%', transition: { duration: 1 } },
	closeNavMob: { x: '100%', transition: { duration: 1, delay: 0.5 } },
	openTab: { x: '0%', transition: { duration: 1 } },
	closeTab: { x: '160%', transition: { duration: 1 } },
	openDef: { x: '0%', transition: { duration: 1 } },
	closeDef: { x: '160%', transition: { duration: 1 } },
};

const HeaderMenu: FC<HeaderMenuProps> = ({ className, ...props }) => {
	const { activeTab, isOpen, tabIsOpen } = useTypedSelector(
		(state) => state.client
	);
	const { setTabClose, setActiveTab } = useActions();
	const menuControl = useAnimation();
	const navControl = useAnimation();
	const tabControl = useAnimation();
	const defaultContentControl = useAnimation();
	const size = useWindowSize();

	const { t } = useTranslation('common');

	useEffect(() => {
		sque();
	}, [isOpen]);

	useEffect(() => {
		sque2();
	}, [tabIsOpen]);

	const sque = async () => {
		if (size.width && size.width > 991) {
			if (isOpen) {
				menuControl.start('openMenu');
				navControl.start('openNav');
				await defaultContentControl.start('openDef');
			} else {
				defaultContentControl.start('closeDef');
				menuControl.start('closeMenuColor');
				await navControl.start('closeNav');
				menuControl.start('closeMenu');
			}
		} else {
			if (isOpen) {
				menuControl.start('openMenu');
				navControl.start('openNav');
				await defaultContentControl.start('openDef');
			} else {
				menuControl.start('closeMenuColor');
				await navControl.start('closeNavMob');
				menuControl.start('closeMenu');
			}
		}
	};

	const sque2 = async () => {
		if (tabIsOpen) {
			await tabControl.start('openTab');
			defaultContentControl.start('closeDef');
		} else {
			await tabControl.start('closeTab');
			defaultContentControl.start(isOpen ? 'openDef' : 'closeDef');
		}
	};

	const closeButtonHandler = async () => {
		setTabClose();
		setActiveTab(0);
	};

	return (
		<motion.div
			className={cn(className, styles.headerMenu)}
			{...props}
			animate={menuControl}
			variants={motionVariants}
			initial='closeMenu'
		>
			<TabNav
				className={styles.tabNav}
				animate={navControl}
				variants={motionVariants}
				initial='closeNav'
			/>
			<AnimatePresence exitBeforeEnter>
				{/* 
					// @ts-ignore */}
				{t<IMenuTab[]>('menu', { returnObjects: true }).map(
					(item: IMenuTab, index: number) => {
						return (
							activeTab === item.id &&
							item.content && (
								<motion.div
									key={index}
									className={styles.tabContent}
									animate={
										activeTab === item.id
											? 'openTab'
											: 'closeTab'
									}
									variants={motionVariants}
									initial={'closeTab'}
									exit={'closeTab'}
								>
									<HeaderH2
										text={item.header}
										className={styles.tabHeader}
										description={item.description}
										shouldAnimate={false}
									/>
									<div className={styles.itemsContainer}>
										{item.content &&
											item.content.map(
												(item: ITabContent) => {
													return (
														<TabContentItem
															key={
																item.title +
																item.id
															}
															alias={item.alias}
															title={item.title}
															link={item.link}
														/>
													);
												}
											)}
									</div>
									<WhatsAppTelegramLinks
										className={styles.linkContainer}
									/>
									<div
										className={styles.closeButton}
										onClick={closeButtonHandler}
									>
										<IoIosArrowForward />
									</div>
								</motion.div>
							)
						);
					}
				)}
			</AnimatePresence>
			<AnimatePresence exitBeforeEnter>
				{activeTab === 0 && (
					<DefaultContent
						className={styles.defaultContent}
						animate={defaultContentControl}
						variants={motionVariants}
						initial='closeDef'
						exit='closeDef'
					/>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default HeaderMenu;

import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './TabContentItem.module.scss';
import { useActions } from '../../hooks/useActions';
import Link from 'next/link';
import StyledLink from '../StyledLink/StyledLink';

interface TabContentItemProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	alias: string;
	title: string;
	link: boolean;
}

const TabContentItem: FC<TabContentItemProps> = ({
	alias,
	title,
	link,
	className,
	...props
}) => {
	const { setHeaderClose } = useActions();

	const clickHandle = (link: boolean) => {
		if (link) {
			setHeaderClose();
		} else {
			return;
		}
	};

	return (
		<div className={cn(className, styles.tabContentItem)} {...props}>
			{!link ? (
				<StyledLink className={styles.itemLink} text={alias} />
			) : (
				<Link href={`/${title}`} passHref>
					<StyledLink
						className={styles.itemLink}
						onClick={() => clickHandle(link)}
						text={alias}
					/>
				</Link>
			)}
		</div>
	);
};

export default TabContentItem;

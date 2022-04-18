import React, { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import styles from './MainLayout.module.scss';
import Head from 'next/head';

interface MainLayoutProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
	title?: string;
	description?: string;
	keywords?: string;
}

const MainLayout: FC<MainLayoutProps> = ({
	keywords,
	description,
	title,
	className,
	children,
	...props
}) => {
	return (
		<>
			<Head>
				<title>{title || 'Our Project'}</title>
				<meta name='description' content={`${description}`} />
				<meta
					name='keywords'
					content={keywords || 'site, develop, studio, design'}
				/>
			</Head>
			<div className={cn(className, styles.mainLayout)} {...props}>
				<div className={cn(styles.content)}>{children}</div>
			</div>
		</>
	);
};

export default MainLayout;

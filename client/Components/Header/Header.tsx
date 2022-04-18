import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Header.module.scss';
import Link from 'next/link';
import ButtonMenu from '../ButtonMenu/ButtonMenu';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useRouter } from 'next/router';

interface HeaderProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Header: FC<HeaderProps> = ({ className, ...props }) => {
	const { isOpen } = useTypedSelector((state) => state.client);
	const { setHeaderClose } = useActions();
	const { push, locale, asPath } = useRouter();

	const changeLocale = () => {
		isOpen ? setHeaderClose() : undefined;
		push(asPath, asPath, {
			locale: locale === 'ru' ? 'en' : 'ru',
			scroll: false,
		});
	};

	return (
		<div className={cn(className, styles.header)} {...props}>
			<div className={styles.headerContainer}>
				<div className={styles.logoContainer}>
					<Link href={'/'} shallow={true}>
						<a className={styles.logoLink}>
							<span
								className={styles.logoText}
								onClick={() =>
									isOpen ? setHeaderClose() : undefined
								}
							>
								vsion
							</span>
						</a>
					</Link>
				</div>
				<div className={styles.languageButtonsContainer}>
					<span className={styles.languageButton}>
						<span
							className={styles.buttonText}
							onClick={changeLocale}
						>
							{locale === 'ru' ? 'EN' : 'RU'}
						</span>
					</span>
				</div>
				<div className={styles.menuButton}>
					<ButtonMenu />
				</div>
			</div>
		</div>
	);
};

export default Header;

import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './ErrorPageContent.module.scss';
import HeaderH2 from '../HeaderH2/HeaderH2';
import WhatsAppTelegramLinks from '../WhatsAppTelegramLinks/WhatsAppTelegramLinks';
import StyledLink from '../StyledLink/StyledLink';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface ErrorPageContentProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const ErrorPageContent: FC<ErrorPageContentProps> = ({
	className,
	...props
}) => {
	const { t } = useTranslation('404');

	return (
		<div className={cn(className, styles.errorPageContent)} {...props}>
			<div className={styles.container}>
				<HeaderH2
					className={styles.sectionHeaderH2}
					text={t('headerText')}
					description={t('headerDesc')}
				/>
				<div className={styles.paragraph}>{t('text')}</div>
				<div className={styles.button}>
					<Link href={'/'} passHref>
						<StyledLink text={t('btnText')} />
					</Link>
				</div>
				<WhatsAppTelegramLinks className={styles.linkContainer} />
			</div>
		</div>
	);
};

export default ErrorPageContent;

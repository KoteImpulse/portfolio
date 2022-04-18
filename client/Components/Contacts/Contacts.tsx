import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Contacts.module.scss';
import HeaderH2 from '../HeaderH2/HeaderH2';
import StyledLink from '../StyledLink/StyledLink';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

interface ContactsProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Contacts: FC<ContactsProps> = ({ className, ...props }) => {
	const { t } = useTranslation('contacts');

	return (
		<div className={cn(className, styles.contacts)} {...props}>
			<div className={styles.container}>
				<HeaderH2
					className={styles.sectionHeaderH2}
					text={t('headerText')}
					description={t('headerDesc')}
				/>
				<Link href={'tg://resolve?domain=ux_max'} passHref>
					<div className={cn(styles.telegtam, styles.messenger)}>
						<StyledLink text={`Telegram`} />
						<div className={styles.imageContainer}>
							<div className={styles.image}>
								<Image
									src={'/telegram.svg'}
									alt='image'
									layout='fill'
									quality={100}
								/>
							</div>
						</div>
					</div>
				</Link>
				{/* <Link href={'tg://resolve?domain=ux_max'} passHref>
					<div className={cn(styles.whatsapp, styles.messenger)}>
						<StyledLink text={`WhatsApp`} />
						<div className={styles.imageContainer}>
							<div className={styles.image}>
								<Image
									src={'/whatsapp.svg'}
									alt='image'
									layout='fill'
									quality={100}
								/>
							</div>
						</div>
					</div>
				</Link> */}
			</div>
		</div>
	);
};

export default Contacts;

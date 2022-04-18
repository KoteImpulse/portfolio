import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './WhatsAppTelegramLinks.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface WhatsAppTelegramLinksProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const WhatsAppTelegramLinks: FC<WhatsAppTelegramLinksProps> = ({
	className,
	...props
}) => {
	const { locale } = useRouter();
	return (
		<div className={cn(className, styles.whatsAppTelegramLinks)} {...props}>
			<div className={styles.description}>
				{locale === 'ru' ? 'Связаться с нами' : 'Contact us'}
			</div>
			<div className={styles.links}>
				<Link href={'#'} passHref>
					<div className={styles.contentBox}>
						<div className={styles.image}>
							<Image
								src={'/telegram.svg'}
								alt='image'
								layout='fill'
								quality={100}
							/>
						</div>
						<span className={styles.text}>Telegram</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default WhatsAppTelegramLinks;

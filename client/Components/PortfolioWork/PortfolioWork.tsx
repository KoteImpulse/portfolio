import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './PortfolioWork.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import HeaderH2 from '../HeaderH2/HeaderH2';
import Image from 'next/image';
import Link from 'next/link';
import { baseUrl } from '../../utils/api';
import StyledLink from '../StyledLink/StyledLink';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface PortfolioWorkProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	fetching: boolean;
}

const PortfolioWork: FC<PortfolioWorkProps> = ({
	fetching,
	className,
	...props
}) => {
	const { portfolioWork } = useTypedSelector((state) => state.server);
	const { t } = useTranslation('portfolioWork');
	const { locale } = useRouter();
	const { brand } = portfolioWork;
	return (
		<div className={cn(className, styles.portfolioWork)} {...props}>
			<div className={styles.imageContainer}>
				<div className={styles.image}>
					<Image
						alt='image cover'
						src={`${baseUrl}/${portfolioWork.collagePic}`}
						layout='fill'
						objectFit='cover'
						quality={100}
						priority
					/>
				</div>
			</div>
			<div className={styles.container}>
				<HeaderH2
					className={styles.sectionHeaderH2}
					text={t('headerText', { brand })}
				/>
				<div className={styles.categoryBlock}>
					<div className={styles.textContainer}>
						<h3 className={styles.blockHeader}>
							{locale === 'ru' ? 'Категория' : 'Category'}
						</h3>
						<p className={styles.blockText}>
							{portfolioWork.maincategory}
						</p>
					</div>
				</div>
				<div className={styles.taskBlock}>
					<div className={styles.textContainer}>
						<h3 className={styles.blockHeader}>
							{locale === 'ru' ? 'Задача' : 'Task'}
						</h3>
						<p className={styles.blockText}>{portfolioWork.task}</p>
					</div>
				</div>
				<div className={styles.resultBlock}>
					<div className={styles.textContainer}>
						<h3 className={styles.blockHeader}>
							{locale === 'ru' ? 'Результат' : 'Result'}
						</h3>
						<p className={styles.blockText}>
							{portfolioWork.result}
						</p>
					</div>
				</div>
				<div className={styles.linkToWebSite}>
					<Link href={`/portfolio/${portfolioWork.link}`} passHref>
						<StyledLink text={portfolioWork.link} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PortfolioWork;

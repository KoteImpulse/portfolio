import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Portfolio.module.scss';
import HeaderH2 from '../HeaderH2/HeaderH2';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { categoryList } from '../../data';
import { IPortfolioWork } from '../../types/portfolioWork';
import Card from '../Card/Card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface PortfolioProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	fetching: boolean;
}

const Portfolio: FC<PortfolioProps> = ({ fetching, className, ...props }) => {
	const { portfolio } = useTypedSelector((state) => state.server);
	const { t } = useTranslation('portfolio');
	const { t:tc } = useTranslation('common');
	const router = useRouter();

	return (
		<div className={cn(className, styles.portfolio)} {...props}>
			<div className={styles.container}>
				<HeaderH2
					className={styles.sectionHeaderH2}
					text={t('headerText')}
					description={t('headerDesc')}
				/>
				<div className={styles.categoryList}>
					{categoryList.map((item: string, index: number) =>
						item !== router.asPath.split('/')[2] ? (
							<Link key={index + item} href={`/category/${item}`}>
								<a className={styles.linkCategory}>
									<motion.h5
										className={styles.categoryItem}
										style={
											item === router.asPath.split('/')[2]
												? {
														fontWeight: '600',
														textDecorationLine:
															'underline',
												  }
												: undefined
										}
									>
										{item}
									</motion.h5>
								</a>
							</Link>
						) : (
							<span
								className={styles.linkCategory}
								key={index + item}
							>
								<motion.h5
									className={styles.categoryItem}
									style={
										item === router.asPath.split('/')[2]
											? {
													fontWeight: '600',
													textDecorationLine:
														'underline',
											  }
											: undefined
									}
								>
									{item}
								</motion.h5>
							</span>
						)
					)}
				</div>
			</div>
			<div className={styles.cardContainer}>
				{portfolio &&
					portfolio.map(
						(portfolioWork: IPortfolioWork, index: number) => (
							<Card
								key={index}
								className={styles.card}
								portfolioWork={portfolioWork}
							/>
						)
					)}
				{fetching && (
					<p style={{ color: 'white' }}>{tc('loader.loaderText')}</p>
				)}
				{!portfolio && <p>{tc('loader.worksNotLoaded')}</p>}
			</div>
		</div>
	);
};

export default Portfolio;

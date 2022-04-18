import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './PortfolioWorkCards.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Ticker from '../Ticker/Ticker';
import { IPortfolioWork } from '../../types/portfolioWork';
import Card from '../Card/Card';
import { useTranslation } from 'next-i18next';

interface PortfolioWorkCardsProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	fetching: boolean;
}

const PortfolioWorkCards: FC<PortfolioWorkCardsProps> = ({
	fetching,
	className,
	...props
}) => {
	const { portfolio, portfolioWork: work } = useTypedSelector(
		(state) => state.server
	);
	const { t } = useTranslation('portfolioWork');
	const { t: tc } = useTranslation('common');
	return (
		<div className={cn(className, styles.portfolioWorkCards)} {...props}>
			<div className={styles.container}>
				<Ticker className={styles.ticker} text={t('tickerText')} />
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
						<p style={{ color: 'white' }}>
							{tc('loader.loaderText')}
						</p>
					)}
					{!portfolio && <p>{tc('loader.worksNotLoaded')}</p>}
				</div>
			</div>
		</div>
	);
};

export default PortfolioWorkCards;

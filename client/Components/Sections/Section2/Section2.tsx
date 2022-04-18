import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Section2.module.scss';
import HeaderH2 from '../../HeaderH2/HeaderH2';
import Ticker from '../../Ticker/Ticker';
import Card from '../../Card/Card';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IPortfolioWork } from '../../../types/portfolioWork';
import { useTranslation } from 'next-i18next';

interface Section2Props
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Section2: FC<Section2Props> = ({ className, ...props }) => {
	const { portfolio } = useTypedSelector((state) => state.server);
	const { t } = useTranslation('homepage');

	return (
		<div className={cn(className, styles.section2)} {...props}>
			<div className={styles.container}>
				<HeaderH2
					className={styles.sectionHeaderH2}
					text={t('section2.headerText')}
					description={t('section2.headerDesc')}
				/>
				<Ticker
					className={styles.ticker}
					text={t('section2.tickerText')}
				/>
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
				</div>
			</div>
		</div>
	);
};

export default Section2;

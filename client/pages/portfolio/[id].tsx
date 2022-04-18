import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import PortfolioWork from '../../Components/PortfolioWork/PortfolioWork';
import PortfolioWorkCards from '../../Components/PortfolioWorkCards/PortfolioWorkCards';
import MainLayout from '../../layout/MainLayout';
import { wrapper } from '../../store';
import {
	setPortfolio,
	setPortfolioLeft,
	setPortfolioWork,
} from '../../store/action-creators/portfolio';
import { Api } from '../../utils/api';

interface PortfolioWorkPageProps {
	brand: string;
}

const PortfolioWorkPage = ({ brand }: PortfolioWorkPageProps) => {
	const [fetching, setFetching] = useState(false);
	const { t } = useTranslation('portfolioWork');
	return (
		<MainLayout title={t('seoTitle', { brand })} description={t('seoDesc')}>
			<PortfolioWork fetching={fetching} />
			<PortfolioWorkCards fetching={fetching} />
		</MainLayout>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async (context: any): Promise<any> => {
			const id = context?.params.id;
			const dispatch = store.dispatch;
			try {
				const data = await Api().portfolio.getOnePortfolioWork(+id);
				dispatch(setPortfolioWork(data));
				const data1 = await Api().portfolio.getPortfolio(
					'DESC',
					4,
					undefined,
					[data.maincategory],
					data.id
				);
				dispatch(setPortfolio(data1.works));
				dispatch(setPortfolioLeft(data1.left - 4));
				return {
					props: {
						...(await serverSideTranslations(context.locale, [
							'common',
							'portfolioWork',
						])),
						brand: data.brand,
					},
				};
			} catch (e: any) {
				console.log(e?.response?.data?.message);
				return {
					props: {},
					redirect: {
						destination: '/404',
						permanent: false,
					},
				};
			}
		}
);

export default PortfolioWorkPage;

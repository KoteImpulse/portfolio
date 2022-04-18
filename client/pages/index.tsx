import type { NextPage } from 'next';
import Contacts from '../Components/Contacts/Contacts';
import Section1 from '../Components/Sections/Section1/Section1';
import Section2 from '../Components/Sections/Section2/Section2';
import Section3 from '../Components/Sections/Section3/Section3';
import MainLayout from '../layout/MainLayout';
import { wrapper } from '../store';
import {
	setPortfolio,
	setPortfolioLeft,
} from '../store/action-creators/portfolio';
import { Api } from '../utils/api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Home: NextPage = () => {
	const { t } = useTranslation('homepage');
	return (
		<MainLayout title={t('seoTitle')} description={t('seoDesc')}>
			<Section1 />
			<Section2 />
			<Section3 />
			<Contacts />
		</MainLayout>
	);
};

export const getStaticProps = wrapper.getStaticProps(
	(store) =>
		async (context: any): Promise<any> => {
			const dispatch = store.dispatch;
			try {
				const data = await Api().portfolio.getPortfolio(
					'DESC',
					4,
					undefined,
					undefined
				);
				dispatch(setPortfolio(data.works));
				dispatch(setPortfolioLeft(data.left));
			} catch (e: any) {
				console.log(e?.response?.data?.message);
				return {
					props: {
						...(await serverSideTranslations(context.locale, [
							'common',
							'homepage',
							'contacts',
						])),
					},
				};
			}
			return {
				props: {
					...(await serverSideTranslations(context.locale, [
						'common',
						'homepage',
						'contacts',
					])),
				},
			};
		}
);

export default Home;

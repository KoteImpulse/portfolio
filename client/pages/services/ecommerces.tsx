import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import Benefits from '../../Components/Benefits/Benefits';
import Contacts from '../../Components/Contacts/Contacts';
import CreateEcommerces from '../../Components/CreateEcommerces/CreateEcommerces';
import Questions from '../../Components/Questions/Questions';
import MainLayout from '../../layout/MainLayout';
import { wrapper } from '../../store';

const Ecommerces: NextPage = () => {
	const { t } = useTranslation('services');
	return (
		<MainLayout
			title={t('ecommerce.seoTitle')}
			description={t('ecommerce.seoDesc')}
		>
			<CreateEcommerces />
			<Benefits />
			<Questions />
			<Contacts />
		</MainLayout>
	);
};

export const getStaticProps = wrapper.getStaticProps(
	(store) =>
		async (context: any): Promise<any> => {
			return {
				props: {
					sectionIndex: 1,
					...(await serverSideTranslations(context.locale, [
						'common',
						'services',
						'contacts',
					])),
				},
			};
		}
);

export default Ecommerces;

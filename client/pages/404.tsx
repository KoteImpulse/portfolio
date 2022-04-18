import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { FC } from 'react';
import ErrorPageContent from '../Components/ErrorPageContent/ErrorPageContent';
import MainLayout from '../layout/MainLayout';
import { wrapper } from '../store';

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = () => {
	const { t } = useTranslation('404');

	return (
		<MainLayout title={t('seoTitle')} description={t('seoDesc')}>
			<ErrorPageContent />
		</MainLayout>
	);
};

export const getStaticProps = wrapper.getStaticProps(
	(store) =>
		async (context: any): Promise<any> => {
			return {
				props: {
					...(await serverSideTranslations(context.locale, [
						'common',
						'404',
					])),
				},
			};
		}
);

export default NotFound;

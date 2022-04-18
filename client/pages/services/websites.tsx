import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CreateSites from '../../Components/CreateSites/CreateSites';
import MainLayout from '../../layout/MainLayout';
import { wrapper } from '../../store';

const WebSites: NextPage = () => {
	const { t } = useTranslation('services');
	return (
		<MainLayout
			title={t('website.seoTitle')}
			description={t('website.seoDesc')}
		>
			<CreateSites />
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
						'services',
					])),
				},
			};
		}
);

export default WebSites;

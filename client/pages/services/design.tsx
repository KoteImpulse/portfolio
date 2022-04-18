import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CreateDesign from '../../Components/CreateDesign/CreateDesign';
import MainLayout from '../../layout/MainLayout';
import { wrapper } from '../../store';

const Design: NextPage = () => {
	const { t } = useTranslation('services');

	return (
		<MainLayout
			title={t('design.seoTitle')}
			description={t('design.seoDesc')}
		>
			<CreateDesign />
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

export default Design;

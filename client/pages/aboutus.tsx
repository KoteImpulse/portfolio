import type { NextPage } from 'next';
import About from '../Components/About/About';
import MainLayout from '../layout/MainLayout';
import { wrapper } from '../store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const AboutUs: NextPage = () => {
	const { t } = useTranslation('about');
	return (
		<MainLayout title={t('seoTitle')} description={t('seoDesc')}>
			<About />
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
						'about',
					])),
				},
			};
		}
);

export default AboutUs;

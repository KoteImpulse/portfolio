import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Contacts from '../Components/Contacts/Contacts';
import MainLayout from '../layout/MainLayout';
import { wrapper } from '../store';

const ContactUs: NextPage = () => {
	const { t } = useTranslation('contacts');
	return (
		<MainLayout title={t('seoTitle')} description={t('seoDesc')}>
			<Contacts />
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
						'contacts',
					])),
				},
			};
		}
);

export default ContactUs;

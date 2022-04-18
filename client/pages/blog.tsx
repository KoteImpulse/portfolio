import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BlogContent from '../Components/BlogContent/BlogContent';
import MainLayout from '../layout/MainLayout';
import { wrapper } from '../store';

const Blog: NextPage = () => {
	const { t } = useTranslation('blog');

	return (
		<MainLayout title={t('seoTitle')} description={t('seoDesc')}>
			<BlogContent/>
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
						'blog',
					])),
				},
			};
		}
);

export default Blog;

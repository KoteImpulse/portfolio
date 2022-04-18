import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import Portfolio from '../../Components/Portfolio/Portfolio';
import { categoryList } from '../../data';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layout/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import {
	setPortfolio,
	setPortfolioLeft,
} from '../../store/action-creators/portfolio';
import { Api } from '../../utils/api';

interface CategoryPagePageProps {
	category: string;
}

const CategoryPage: NextPage<CategoryPagePageProps> = ({ category }) => {
	const [fetching, setFetching] = useState(false);
	const { portfolio, portfolioLeft } = useTypedSelector(
		(state) => state.server
	);
	const { setPortfolio, setPortfolioLeft } = useActions();
	const { t } = useTranslation('portfolio');

	useEffect(() => {}, [portfolio, category]);

	useEffect(() => {
		(async () => {
			if (fetching === true) {
				try {
					const { works, left } = await Api()
						.portfolio.getPortfolio(
							'DESC',
							8,
							portfolio[portfolio.length - 1].id,
							[category]
						)
						.finally(() => setFetching(false));
					setPortfolio([...portfolio, ...works]);
					setPortfolioLeft(left - 8);
				} catch (e: any) {
					console.log(e?.response?.data?.message);
				}
			}
		})();
	}, [fetching]);

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler);
		return () => {
			document.removeEventListener('scroll', scrollHandler);
		};
	}, [portfolio, portfolioLeft]);

	const scrollHandler = (e: any) => {
		if (
			e?.target?.documentElement?.scrollHeight -
				(e?.target?.documentElement?.scrollTop + window.innerHeight) <
				100 &&
			portfolioLeft > 0
		) {
			setFetching(true);
		}
	};
	return (
		<MainLayout
			title={t('seoTitle', { category })}
			description={t('seoDesc')}
		>
			<Portfolio fetching={fetching} />
		</MainLayout>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async (context: any): Promise<any> => {
			const slug = context?.params.Slug;
			if (!categoryList.includes(slug)) {
				return {
					props: {},
					redirect: {
						destination: '/404',
						permanent: false,
					},
				};
			}
			const dispatch: NextThunkDispatch = store.dispatch;
			try {
				const data = await Api().portfolio.getPortfolio(
					'DESC',
					8,
					undefined,
					[slug]
				);
				dispatch(setPortfolio(data.works));
				dispatch(setPortfolioLeft(data.left - 8));
				return {
					props: {
						...(await serverSideTranslations(context.locale, [
							'common',
							'portfolio',
						])),
						category: slug,
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

export default CategoryPage;

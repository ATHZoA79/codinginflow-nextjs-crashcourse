import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

interface CategoryNewsPageProps {
  newsArticles: NewsArticle[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];
  const paths = categorySlugs.map(slug => ({ params: {category: slug} }));
  console.log('static path', paths);
  
  return {
    paths,
    fallback: false,  
    // return 404 if the slug is not match above options
  }
}

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({params}) => {
  // params is destructure from "context", and is equal to the route name
  // see next.js context for more info
  const category = params?.category?.toString();
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API}`);
  const newsResponse: NewsResponse = await response.json();
  return {
    props: { newsArticles: newsResponse.articles },
    revalidate: 5 * 60  // refetch data every 5 minute in production
    // which we can approach ISR
  }
}

const CategoryNewsPage = ({newsArticles}: CategoryNewsPageProps) => {
  const router = useRouter();
  const categoryName = router.query.category?.toString();
  const title = "Category:" + categoryName;
  return (
    <>
      <Head>
        <title key={title}>{`${title} | NextJS News App`}</title>
      </Head>
      <main>
        <div className="text-2xl font-bold">{title}</div>
        <NewsArticlesGrid articles={newsArticles}/>
      </main>
    </>
  )
}

export default CategoryNewsPage;
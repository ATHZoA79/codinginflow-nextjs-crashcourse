import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { NewsArticle, NewsResponse } from '@/models/NewsArticles'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticlesGrid from '@/components/NewsArticlesGrid'

const inter = Inter({ subsets: ['latin'] })

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[],
}

export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  const response = await fetch('https://newsapi.org/v2/everything?q=keyword&apiKey='+process.env.NEWS_API);
  const newsResponse: NewsResponse = await response.json();
  return {
    props: { newsArticles: newsResponse.articles }
  }
};

export default function BreakingNewsPage({ newsArticles } : BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title>Breaking News | NextJs News App</title>
      </Head>
      <main>
        <NewsArticlesGrid articles={newsArticles}/>
      </main>
    </>
  )
}

import NewsArticlesGrid from '@/components/NewsArticlesGrid';
import { NewsArticle, NewsResponse } from '@/models/NewsArticles';
import Head from 'next/head';
import React, { FormEvent, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap';

const SearchNewsPage = () => {
  const [searchNews, setSearchNews] = useState<NewsArticle[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery")?.toString().trim();

    if (searchQuery) {
      try {
        // reset state
        setSearchNews(null);
        setSearchError(false);
        setLoading(true);
        const response = await fetch(`/api/search-news?q=${searchQuery}`);
        const articles: NewsArticle[] = await response.json();
        setSearchNews(articles);
        console.log(response);
        
      } catch (error) {
        console.log(error);
        setSearchError(true);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title key="title">Search News | NextJS News App</title>
      </Head>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-2'>
          <Form.Label>Search query</Form.Label>
          <Form.Control 
            name='searchQuery'
            placeholder='E.G. politics, sports ...'
          />
        </Form.Group>
        <Button type='submit' className='mb-3' disabled={loading}>
          {loading ? 
          (<span><Spinner animation='border' size='sm'/>Loading...</span>) : 
          (<span>Search</span>)}
        </Button>
      </Form>
      <div className="d-flex flex-column align-items-center">
        {loading && <Spinner animation='border'/>}
        {searchError && <p className='text-warning'>Search Error</p>}
        {searchNews?.length === 0 ? 
        <p>Nothing Found. Please try a different query.</p> : 
        <NewsArticlesGrid articles={searchNews}/>}
      </div>
    </>
  )
}

export default SearchNewsPage
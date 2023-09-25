import { NewsArticle } from '@/models/NewsArticles'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import NewsArticleEntry from './NewsArticleEntry'

interface NewsArticlesGridProps {
  articles: NewsArticle[] | null
}

const NewsArticlesGrid = ({articles}: NewsArticlesGridProps) => {
  // console.log(articles);
  return (
    <Row xs={1} sm={2} xl={3} className='g-2'>
      {articles ? articles.map(article => (
        <Col key={article.url}>
          <NewsArticleEntry article={article}/>
        </Col>
      )) :
      <></>}
    </Row>
  )
}

export default NewsArticlesGrid
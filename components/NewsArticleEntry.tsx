import { NewsArticle } from '@/models/NewsArticles'
import Image from 'next/image';
import { Card } from 'react-bootstrap';
import placeholderImg from '@/assets/images/news_placeholder.jpg';
import styles from "@/styles/newsEntry.module.css";

interface NewsArticleEntryProps {
  article: NewsArticle,
}

const NewsArticleEntry = ({ article: {title, description, url, urlToImage, publishedAt} }: NewsArticleEntryProps) => {
  const validImageUrl = (urlToImage?.startsWith('http://') || urlToImage?.startsWith('https://')) ? urlToImage:undefined;
  return (
    <>
      <a href={url}>
        <Card className='h-100' bg='dark' text='light'>
          {/* <Card.Img 
            variant='top'
            src={validImageUrl}
          /> */}
          <Image src={validImageUrl ? validImageUrl : placeholderImg}
            width={500}
            height={200}
            alt='This is the cover of news'
            className='h-40 object-cover'
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
          <Card.Footer>publish at {publishedAt.slice(0,10)}</Card.Footer>
        </Card>
      </a>
    </>
  )
}

export default NewsArticleEntry
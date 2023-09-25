export interface NewsArticle {
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage?: string,
  publishedAt: string,
  content: string,
}

// api response a array of news article
export interface NewsResponse {
  articles: NewsArticle[]
}
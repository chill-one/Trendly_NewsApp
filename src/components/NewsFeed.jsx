import React from 'react'
import { useNewsContext } from '../context/Context'
import NewsCard from './NewsCard'


const NewsFeed = () => {
  const { articles, loading, error} = useNewsContext()

  return (
    <div className='news-feed'>
      {articles.length === 0 
        ? (<p className='no-news-message'>No news available</p>) 
        : (
          <>
            <div className='news-grid'>
              {articles.map((article, index) => (
                <NewsCard key={index} article={article}/>
              ))}
            </div>
          </>
          )}
    </div>
  )
}

export default NewsFeed
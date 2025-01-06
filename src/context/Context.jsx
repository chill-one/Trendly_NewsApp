import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const NewsContext = createContext();

// Custom Hook to Access Context
export const useNewsContext = () => useContext(NewsContext);

// NewsProvider Component
export const NewsProvider = ({ children }) => {
    const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
    const BASE_URL = 'https://newsapi.org/v2';

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("");


    const fetchNews = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${BASE_URL}/top-headlines`, {
                params: {
                    apiKey: API_KEY,
                    country: 'us',
                    category
                }
            });
            console.log(response.data.articles);

            setArticles(response.data.articles);
            setTotalResults(response.data.totalResults);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [category]);

    const changeCategory = (newCategory) => {
        setCategory(newCategory)
    }

    return (
        <NewsContext.Provider value={{ 
            articles, 
            loading, 
            error, 
            fetchNews,  
            changeCategory,
            category,
            }}>
            {children}
        </NewsContext.Provider>
    );
};

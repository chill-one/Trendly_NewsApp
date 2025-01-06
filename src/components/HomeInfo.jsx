import React from 'react';
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';
import { useNewsContext } from '../context/Context';

const categories = [
    'Science',
    'Sports',
    'Technology',
];

const InfoBox = ({ index, text, link, btnText }) => {
    const { category, changeCategory } = useNewsContext(); 

    return (
        <div className='info-box'>
            <p className='font-medium sm:text-xl blue-gradient_text text-center'>{text}</p>
            <Link to={link} className='neo-brutalism-white neo-btn' onClick={() => changeCategory(categories[index])}>
                {btnText}
                <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
            </Link>
        </div>
    );
};

const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center py-4 px-8 border-2 border-x-sky-950 rounded-lg blue-gradient_text mx-5
        bg-transparent'>
            <span className='font-semibold'>WELCOME TO MY NEWS WEBAPP</span>
        </h1>
    ),
    2: (
        <InfoBox
            index={0}
            text='"Unveil the secrets of the universe, where curiosity meets discovery and every question sparks a journey into the unknown."'
            link="/science"
            btnText="Learn More"
        />
    ),
    3: (
        <InfoBox
            index={1}
            text='"Step into the arena where passion fuels every moment, and legends are forged with every heartbeat and every play."'
            link="/sports"
            btnText="Learn More"
        />
    ),
    4: (
        <InfoBox
            index={2}
            text='"Enter a world where innovation shapes the future, and every line of code holds the power to redefine reality."'
            link="/technology"
            btnText="Learn More"
        />
    ),
};

const HomeInfo = ({ currentStage }) => {
    return renderContent[currentStage] || null;
};

export default HomeInfo;

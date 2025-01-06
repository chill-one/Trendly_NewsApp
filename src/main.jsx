import ReactDOM from 'react-dom/client';
import App from './App';



// React is going to hook into the root element of the HTML file and render the App component like the navbar, the footer, and the main content.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
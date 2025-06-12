import React, { useState, useCallback } from 'react'
import './App.css'

function App() {
  const [activeDropdown, setActiveDropdown] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState({});
  const [error, setError] = useState(null);
  const [visibleItems, setVisibleItems] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);

  // Your existing dropdownOptions and newsList data stay exactly the same
  const newsList = [
    // AWS Services
    {
      id: 1,
      title: "AWS Lambda Advanced Features",
      description: "New serverless computing capabilities with enhanced performance and cost optimization.",
      date: "2024-01-11",
      provider: "AWS",
      service: "Serverless",
      labels: [
        { text: "SERVERLESS", color: "#FF9900" },
        { text: "LAMBDA", color: "#4B73FF" }
      ]
    },
    {
      id: 2,
      title: "Amazon EKS Updates",
      description: "Enhanced container orchestration with new Kubernetes features and integrations.",
      date: "2024-01-11",
      provider: "AWS",
      service: "Containers",
      labels: [
        { text: "CONTAINERS", color: "#FF9900" },
        { text: "KUBERNETES", color: "#4B73FF" }
      ]
    },
    // Azure Services
    {
      id: 3,
      title: "Azure Functions Enhancements",
      description: "New serverless capabilities with improved integration and development features.",
      date: "2024-01-11",
      provider: "Azure",
      service: "Serverless",
      labels: [
        { text: "SERVERLESS", color: "#008AD7" },
        { text: "FUNCTIONS", color: "#FF7EB0" }
      ]
    },
    {
      id: 4,
      title: "Azure Kubernetes Service",
      description: "Advanced container management with enhanced security and scalability.",
      date: "2024-01-11",
      provider: "Azure",
      service: "Containers",
      labels: [
        { text: "CONTAINERS", color: "#008AD7" },
        { text: "AKS", color: "#FF7EB0" }
      ]
    },
    // Google Cloud Services
    {
      id: 5,
      title: "Google Cloud Run Updates",
      description: "New features for serverless container execution and management.",
      date: "2024-01-11",
      provider: "Google Cloud",
      service: "Serverless",
      labels: [
        { text: "SERVERLESS", color: "#4285F4" },
        { text: "CLOUD RUN", color: "#34A853" }
      ]
    },
    {
      id: 6,
      title: "Google Kubernetes Engine",
      description: "Enhanced container orchestration with automated operations.",
      date: "2024-01-11",
      provider: "Google Cloud",
      service: "Containers",
      labels: [
        { text: "CONTAINERS", color: "#4285F4" },
        { text: "GKE", color: "#34A853" }
      ]
    },
    // Oracle Cloud Services
    {
      id: 7,
      title: "Oracle Functions",
      description: "Serverless compute platform with enhanced enterprise features.",
      date: "2024-01-11",
      provider: "Oracle Cloud",
      service: "Serverless",
      labels: [
        { text: "SERVERLESS", color: "#C74634" },
        { text: "FUNCTIONS", color: "#4B73FF" }
      ]
    },
    {
      id: 8,
      title: "Oracle Container Engine",
      description: "Enterprise container platform with integrated security features.",
      date: "2024-01-11",
      provider: "Oracle Cloud",
      service: "Containers",
      labels: [
        { text: "CONTAINERS", color: "#C74634" },
        { text: "KUBERNETES", color: "#4B73FF" }
      ]
    },
    // IBM Cloud Services
    {
      id: 9,
      title: "IBM Cloud Functions",
      description: "Advanced serverless platform with Watson AI integration.",
      date: "2024-01-11",
      provider: "IBM Cloud",
      service: "Serverless",
      labels: [
        { text: "SERVERLESS", color: "#1F70C1" },
        { text: "FUNCTIONS", color: "#FF7EB0" }
      ]
    },
    {
      id: 10,
      title: "IBM Cloud Kubernetes",
      description: "Enterprise container management with advanced security features.",
      date: "2024-01-11",
      provider: "IBM Cloud",
      service: "Containers",
      labels: [
        { text: "CONTAINERS", color: "#1F70C1" },
        { text: "KUBERNETES", color: "#FF7EB0" }
      ]
    }
  ];

  const handleDropdown = (type, value) => {
    try {
      if (value.startsWith('All')) {
        if (type === 'service') {
          setSelectedService('');
        } else if (type === 'provider') {
          setSelectedProvider('');
        }
      } else {
        if (type === 'service') {
          setSelectedService(value);
        } else if (type === 'provider') {
          setSelectedProvider(value);
        }
      }
      setTimeout(() => setActiveDropdown(''), 100);
    } catch (error) {
      console.error('Dropdown error:', error);
    }
  };

  const handleReadMore = useCallback(async (articleId) => {
    try {
      setIsLoading(prev => ({ ...prev, [articleId]: true }));
      console.log(`Clicked article ${articleId}`);
      // Backend API call will go here
    } catch (err) {
      setError(`Failed to load article: ${err.message}`);
      console.error('Error loading article:', err);
    } finally {
      setIsLoading(prev => ({ ...prev, [articleId]: false }));
    }
  }, []);

  const handleLoadMore = () => {
    if (isExpanded) {
      setVisibleItems(6);
      setIsExpanded(false);
    } else {
      setVisibleItems(filteredNews.length);
      setIsExpanded(true);
    }
  };

  const filteredNews = newsList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = !selectedService || item.service === selectedService;
    const matchesProvider = !selectedProvider || item.provider === selectedProvider;
    
    return matchesSearch && matchesService && matchesProvider;
  });

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <header className="header">
          <h1>CloudPulse</h1>
          <p className="subtitle">Latest Cloud & Tech News</p>
        </header>

        <div className="controls-container">
          <div className="search-and-filters">
            <div className="search-section">
              <input 
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <nav className="nav-section">
              <div className="dropdown-container">
                <button 
                  className={`dropdown-button ${activeDropdown === 'articles' ? 'active' : ''}`}
                  onClick={() => setActiveDropdown(activeDropdown === 'articles' ? '' : 'articles')}
                >
                  {selectedProvider || 'All Articles'}
                  <span className="arrow">▾</span>
                </button>
                {activeDropdown === 'articles' && (
                  <div className="dropdown-content">
                    {dropdownOptions.articles.map(provider => (
                      <button 
                        key={provider}
                        className={`dropdown-item ${provider === selectedProvider ? 'active' : ''}`}
                        onClick={() => handleDropdown('provider', provider)}
                      >
                        {provider}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="dropdown-container">
                <button 
                  className={`dropdown-button ${activeDropdown === 'sources' ? 'active' : ''}`}
                  onClick={() => setActiveDropdown(activeDropdown === 'sources' ? '' : 'sources')}
                >
                  {selectedProvider || 'All Sources'}
                  <span className="arrow">▾</span>
                </button>
                {activeDropdown === 'sources' && (
                  <div className="dropdown-content">
                    {dropdownOptions.sources.map(source => (
                      <button 
                        key={source}
                        className={`dropdown-item ${source === selectedProvider ? 'active' : ''}`}
                        onClick={() => handleDropdown('provider', source.split(' ')[0])}
                      >
                        {source}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="dropdown-container">
                <button 
                  className={`dropdown-button ${activeDropdown === 'services' ? 'active' : ''}`}
                  onClick={() => setActiveDropdown(activeDropdown === 'services' ? '' : 'services')}
                >
                  {selectedService || 'All Services'}
                  <span className="arrow">▾</span>
                </button>
                {activeDropdown === 'services' && (
                  <div className="dropdown-content">
                    {dropdownOptions.services.map(service => (
                      <button 
                        key={service}
                        className={`dropdown-item ${service === selectedService ? 'active' : ''}`}
                        onClick={() => handleDropdown('service', service)}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="filter-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7Z" fill="currentColor"/>
                  <path d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z" fill="currentColor"/>
                  <path d="M9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z" fill="currentColor"/>
                </svg>
              </button>
            </nav>
          </div>
          
          <div className="results-count">
            {filteredNews.length} {filteredNews.length === 1 ? 'article' : 'articles'} found
          </div>
        </div>

        <div className="cards-grid">
          {filteredNews.slice(0, visibleItems).map(item => (
            <div key={item.id} className="card">
              <div className="provider-tag">{item.provider}</div>
              <div className="labels">
                {item.labels.map((label, index) => (
                  <span 
                    key={index}
                    className="label"
                    style={{ backgroundColor: label.color }}
                  >
                    {label.text}
                  </span>
                ))}
              </div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <div className="card-footer">
                <span className="date">{item.date}</span>
                <button 
                  className={`read-more ${isLoading[item.id] ? 'loading' : ''}`}
                  onClick={() => handleReadMore(item.id)}
                  disabled={isLoading[item.id]}
                >
                  {isLoading[item.id] ? 'Loading...' : 'Read More →'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length > 6 && (
          <div className="load-more-container">
            <button 
              className="load-more-button"
              onClick={handleLoadMore}
            >
              {isExpanded ? 'Show Less' : 'Load More'}
            </button>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
// frontend/src/components/analysis/NewsResultsTable.tsx
import React, { useState, useMemo } from 'react';
import { 
  Eye, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Heart, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  MoreHorizontal,
  Clock,
  Globe
} from 'lucide-react';
import { newsTableStyles } from '../../styles/analysisStyles';

interface NewsResultsTableProps {
  newsResults: any[];
  isMobile: boolean;
}

type SortField = 'date' | 'sentiment' | 'country';
type SortOrder = 'asc' | 'desc';

const NewsResultsTable: React.FC<NewsResultsTableProps> = ({ 
  newsResults, 
  isMobile 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterSentiment, setFilterSentiment] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  
  const itemsPerPage = isMobile ? 8 : 10;

  // Get unique countries for filter
  const countries = useMemo(() => 
    [...new Set(newsResults.map(item => item.country).filter(Boolean))].sort()
  , [newsResults]);

  // Helper functions
  const getSentimentColor = (sentiment: number): string => {
    if (sentiment > 0.2) return '#10b981';
    if (sentiment > -0.2) return '#f59e0b';
    return '#ef4444';
  };

  const getSentimentLabel = (sentiment: number): string => {
    if (sentiment > 0.3) return 'Muy Positivo';
    if (sentiment > 0.1) return 'Positivo';
    if (sentiment > -0.1) return 'Neutral';
    if (sentiment > -0.3) return 'Negativo';
    return 'Muy Negativo';
  };

  const formatDate = (dateStr: string): string => {
    try {
      return new Date(dateStr).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getTimeAgo = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 24) return `Hace ${diffInHours}h`;
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `Hace ${diffInDays}d`;
      return formatDate(dateStr);
    } catch {
      return dateStr;
    }
  };

  // Filter and sort data
  const filteredResults = useMemo(() => {
    return newsResults.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.snippet.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = filterCountry === 'all' || item.country === filterCountry;
      const matchesSentiment = filterSentiment === 'all' || 
                              (filterSentiment === 'positive' && item.sentiment > 0.1) ||
                              (filterSentiment === 'negative' && item.sentiment < -0.1) ||
                              (filterSentiment === 'neutral' && Math.abs(item.sentiment) <= 0.1);
      
      return matchesSearch && matchesCountry && matchesSentiment;
    }).sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'sentiment':
          comparison = a.sentiment - b.sentiment;
          break;
        case 'country':
          comparison = (a.country || '').localeCompare(b.country || '');
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [newsResults, searchTerm, filterCountry, filterSentiment, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const paginatedResults = useMemo(() => 
    filteredResults.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
  , [filteredResults, currentPage, itemsPerPage]);

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCountry('all');
    setFilterSentiment('all');
    setCurrentPage(1);
  };

  const handleExpandToggle = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <div style={newsTableStyles.container}>
      <h3 style={newsTableStyles.title}>
        <Eye size={20} />
        Artículos Analizados ({newsResults.length})
      </h3>
      
      {/* Filtros */}
      <div style={newsTableStyles.filtersCard}>
        <div style={newsTableStyles.filtersGrid(isMobile)}>
          {/* Search */}
          <div>
            <label style={newsTableStyles.filterLabel}>
              Buscar
            </label>
            <div style={newsTableStyles.searchInputContainer}>
              <Search size={16} style={newsTableStyles.searchIcon} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Título o contenido..."
                style={newsTableStyles.searchInput}
              />
            </div>
          </div>
          
          {/* Country Filter */}
          <div>
            <label style={newsTableStyles.filterLabel}>
              País
            </label>
            <select
              value={filterCountry}
              onChange={(e) => {
                setFilterCountry(e.target.value);
                setCurrentPage(1);
              }}
              style={newsTableStyles.selectInput}
            >
              <option value="all">Todos</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          
          {/* Sentiment Filter */}
          <div>
            <label style={newsTableStyles.filterLabel}>
              Sentiment
            </label>
            <select
              value={filterSentiment}
              onChange={(e) => {
                setFilterSentiment(e.target.value);
                setCurrentPage(1);
              }}
              style={newsTableStyles.selectInput}
            >
              <option value="all">Todos</option>
              <option value="positive">Positivo</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negativo</option>
            </select>
          </div>
          
          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            style={newsTableStyles.clearButton}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
          >
            <Filter size={16} />
            {isMobile ? 'Limpiar' : 'Limpiar Filtros'}
          </button>
        </div>
      </div>
      
      {/* Results */}
      <div style={newsTableStyles.resultsCard}>
        {/* Sort Headers - Solo Desktop */}
        {!isMobile && (
          <div style={newsTableStyles.sortHeader}>
            <div style={{fontWeight: '600', color: '#374151'}}>Artículo</div>
            <button
              onClick={() => handleSort('date')}
              style={newsTableStyles.sortButton}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Calendar size={14} />
              Fecha
              {sortBy === 'date' && (
                sortOrder === 'desc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />
              )}
            </button>
            <button
              onClick={() => handleSort('country')}
              style={newsTableStyles.sortButton}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <MapPin size={14} />
              País
              {sortBy === 'country' && (
                sortOrder === 'desc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />
              )}
            </button>
            <button
              onClick={() => handleSort('sentiment')}
              style={newsTableStyles.sortButton}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Heart size={14} />
              Sentiment
              {sortBy === 'sentiment' && (
                sortOrder === 'desc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />
              )}
            </button>
            <div></div>
          </div>
        )}
        
        {/* Items */}
        {paginatedResults.map((item, index) => (
          <div
            key={index}
            style={newsTableStyles.newsItem(isMobile, index === paginatedResults.length - 1)}
            onMouseEnter={(e) => {
              if (!isMobile) e.currentTarget.style.background = '#f8fafc';
            }}
            onMouseLeave={(e) => {
              if (!isMobile) e.currentTarget.style.background = 'white';
            }}
          >
            <div style={newsTableStyles.newsItemContent(isMobile)}>
              {/* Article Info */}
              <div style={newsTableStyles.articleInfo}>
                <h4 style={newsTableStyles.articleTitle(isMobile)}>
                  {item.title}
                </h4>
                <p style={newsTableStyles.articleSnippet(isMobile)}>
                  {item.snippet}
                </p>
                <div style={newsTableStyles.articleSource}>
                  Fuente: {item.source}
                </div>
              </div>
              
              {/* Mobile Layout */}
              {isMobile ? (
                <div style={newsTableStyles.mobileMetaGrid}>
                  <div style={newsTableStyles.metaItem}>
                    <Clock size={14} />
                    {getTimeAgo(item.date)}
                  </div>
                  <div style={newsTableStyles.metaItem}>
                    <Globe size={14} />
                    {item.country || 'N/A'}
                  </div>
                  <div style={newsTableStyles.metaItem}>
                    <Heart size={14} color={getSentimentColor(item.sentiment)} />
                    <span style={{color: getSentimentColor(item.sentiment), fontWeight: '500'}}>
                      {getSentimentLabel(item.sentiment)}
                    </span>
                  </div>
                  <div style={newsTableStyles.mobileActions}>
                    <button
                      onClick={() => window.open(item.link, '_blank')}
                      style={newsTableStyles.actionButton('primary')}
                    >
                      <ExternalLink size={12} />
                      Ver
                    </button>
                    {item.snippet.length > 150 && (
                      <button
                        onClick={() => handleExpandToggle(index)}
                        style={newsTableStyles.actionButton('secondary')}
                      >
                        <MoreHorizontal size={12} />
                        {expandedItem === index ? 'Menos' : 'Más'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                // Desktop Layout
                <>
                  <div style={newsTableStyles.desktopMeta}>
                    {formatDate(item.date)}
                  </div>
                  
                  <div style={newsTableStyles.desktopMeta}>
                    {item.country || 'N/A'}
                  </div>
                  
                  <div style={newsTableStyles.sentimentContainer}>
                    <div style={newsTableStyles.sentimentDot(getSentimentColor(item.sentiment))} />
                    <span style={newsTableStyles.sentimentValue(getSentimentColor(item.sentiment))}>
                      {item.sentiment.toFixed(2)}
                    </span>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => window.open(item.link, '_blank')}
                      style={newsTableStyles.actionButton('primary')}
                      title="Ver artículo completo"
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
            
            {/* Expanded Content for Mobile */}
            {isMobile && expandedItem === index && (
              <div style={newsTableStyles.expandedContent}>
                <p style={newsTableStyles.expandedText}>
                  {item.snippet}
                </p>
                {item.keywords && item.keywords.length > 0 && (
                  <div>
                    <span style={{
                      fontSize: '0.8rem',
                      color: '#64748b',
                      marginBottom: '0.5rem',
                      display: 'block'
                    }}>
                      Keywords:
                    </span>
                    <div style={newsTableStyles.keywordsContainer}>
                      {item.keywords.slice(0, 5).map((keyword: string, i: number) => (
                        <span key={i} style={newsTableStyles.keywordTag}>
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        
        {/* No Results */}
        {filteredResults.length === 0 && (
          <div style={newsTableStyles.emptyState}>
            <div style={newsTableStyles.emptyIcon}>🔍</div>
            <h4 style={newsTableStyles.emptyTitle}>
              No se encontraron resultados
            </h4>
            <p style={newsTableStyles.emptyDescription}>
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div style={newsTableStyles.paginationContainer}>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={newsTableStyles.paginationButton(false, currentPage === 1)}
          >
            Anterior
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={newsTableStyles.paginationButton(currentPage === page, false)}
              >
                {page}
              </button>
            );
          })}
          
          {totalPages > 5 && (
            <>
              <span style={{ color: '#9ca3af' }}>...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                style={newsTableStyles.paginationButton(currentPage === totalPages, false)}
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={newsTableStyles.paginationButton(false, currentPage === totalPages)}
          >
            Siguiente
          </button>
        </div>
      )}
      
      {/* Results Summary */}
      <div style={newsTableStyles.resultsSummary}>
        Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredResults.length)} de {filteredResults.length} resultados
        {filteredResults.length !== newsResults.length && (
          <span> (filtrado de {newsResults.length} total)</span>
        )}
      </div>
    </div>
  );
};

export default NewsResultsTable;
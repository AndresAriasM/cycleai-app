// frontend/src/components/analysis/NewsResultsTable.tsx
import React, { useState } from 'react';
import { Eye, ExternalLink, Calendar, MapPin, Heart, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface NewsResultsTableProps {
  newsResults: any[];
  isMobile: boolean;
}

const NewsResultsTable: React.FC<NewsResultsTableProps> = ({ 
  newsResults, 
  isMobile 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'sentiment' | 'country'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterSentiment, setFilterSentiment] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  
  const itemsPerPage = isMobile ? 5 : 10;

  // Get unique countries for filter
  const countries = [...new Set(newsResults.map(item => item.country).filter(Boolean))].sort();

  // Filter and sort data
  const filteredResults = newsResults.filter(item => {
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

  // Pagination
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const handleSort = (field: 'date' | 'sentiment' | 'country') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  return (
    <div>
      <h3 style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Eye size={20} />
        Artículos Analizados ({newsResults.length})
      </h3>
      
      {/* Filters */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid #e2e8f0',
        marginBottom: '1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr',
          gap: '1rem',
          alignItems: 'end'
        }}>
          {/* Search */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Buscar
            </label>
            <div style={{position: 'relative'}}>
              <Search size={16} style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Título o contenido..."
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>
          
          {/* Country Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              País
            </label>
            <select
              value={filterCountry}
              onChange={(e) => {
                setFilterCountry(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            >
              <option value="all">Todos</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          
          {/* Sentiment Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Sentiment
            </label>
            <select
              value={filterSentiment}
              onChange={(e) => {
                setFilterSentiment(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            >
              <option value="all">Todos</option>
              <option value="positive">Positivo</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negativo</option>
            </select>
          </div>
          
          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterCountry('all');
              setFilterSentiment('all');
              setCurrentPage(1);
            }}
            style={{
              background: '#f3f4f6',
              border: '1px solid #d1d5db',
              color: '#374151',
              padding: '0.75rem',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Filter size={16} />
            Limpiar
          </button>
        </div>
      </div>
      
      {/* Results */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        {/* Sort Headers */}
        {!isMobile && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '3fr 1fr 1fr 1fr 80px',
            gap: '1rem',
            padding: '1rem 1.5rem',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <div style={{fontWeight: '600', color: '#374151'}}>Artículo</div>
            <button
              onClick={() => handleSort('date')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontWeight: '600',
                color: '#374151'
              }}
            >
              <Calendar size={14} />
              Fecha
              {sortBy === 'date' && (
                sortOrder === 'desc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />
              )}
            </button>
            <button
              onClick={() => handleSort('country')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontWeight: '600',
                color: '#374151'
              }}
            >
              <MapPin size={14} />
              País
              {sortBy === 'country' && (
                sortOrder === 'desc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />
              )}
            </button>
            <button
              onClick={() => handleSort('sentiment')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontWeight: '600',
                color: '#374151'
              }}
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
            style={{
              borderBottom: index < paginatedResults.length - 1 ? '1px solid #f1f5f9' : 'none'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '3fr 1fr 1fr 1fr 80px',
                gap: '1rem',
                padding: '1.5rem',
                alignItems: 'flex-start'
              }}
            >
              {/* Article Info */}
              <div>
                <h4 style={{
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#64748b',
                  marginBottom: '0.75rem',
                  lineHeight: '1.5'
                }}>
                  {item.snippet.substring(0, isMobile ? 100 : 150)}...
                </p>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#9ca3af'
                }}>
                  Fuente: {item.source}
                </div>
              </div>
              
              {/* Mobile Layout for Meta Info */}
              {isMobile ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  marginTop: '0.75rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    color: '#64748b'
                  }}>
                    <Calendar size={14} />
                    {formatDate(item.date)}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    color: '#64748b'
                  }}>
                    <MapPin size={14} />
                    {item.country || 'N/A'}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem'
                  }}>
                    <Heart size={14} color={getSentimentColor(item.sentiment)} />
                    <span style={{color: getSentimentColor(item.sentiment)}}>
                      {getSentimentLabel(item.sentiment)}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <button
                      onClick={() => window.open(item.link, '_blank')}
                      style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.8rem'
                      }}
                    >
                      <ExternalLink size={12} />
                      Ver
                    </button>
                    {item.snippet.length > 100 && (
                      <button
                        onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                        style={{
                          background: '#f3f4f6',
                          border: '1px solid #d1d5db',
                          color: '#374151',
                          padding: '0.5rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        {expandedItem === index ? 'Menos' : 'Más'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                // Desktop Layout
                <>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#64748b'
                  }}>
                    {formatDate(item.date)}
                  </div>
                  
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#64748b'
                  }}>
                    {item.country || 'N/A'}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: getSentimentColor(item.sentiment)
                      }}
                    ></div>
                    <span style={{
                      fontSize: '0.85rem',
                      color: getSentimentColor(item.sentiment),
                      fontWeight: '500'
                    }}>
                      {item.sentiment.toFixed(2)}
                    </span>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => window.open(item.link, '_blank')}
                      style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
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
              <div style={{
                padding: '1rem 1.5rem 1.5rem',
                background: '#f8fafc',
                borderTop: '1px solid #f1f5f9'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#374151',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  {item.snippet}
                </p>
                {item.keywords && item.keywords.length > 0 && (
                  <div style={{
                    marginTop: '1rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '0.8rem',
                      color: '#64748b',
                      marginRight: '0.5rem'
                    }}>
                      Keywords:
                    </span>
                    {item.keywords.slice(0, 5).map((keyword: string, i: number) => (
                      <span
                        key={i}
                        style={{
                          background: '#e2e8f0',
                          color: '#475569',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem'
                        }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        
        {/* No Results */}
        {filteredResults.length === 0 && (
          <div style={{
            padding: '3rem',
            textAlign: 'center',
            color: '#64748b'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              opacity: 0.5
            }}>
              🔍
            </div>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              No se encontraron resultados
            </h4>
            <p style={{fontSize: '0.9rem'}}>
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '1.5rem'
        }}>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              background: currentPage === 1 ? '#f3f4f6' : 'white',
              border: '1px solid #d1d5db',
              color: currentPage === 1 ? '#9ca3af' : '#374151',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Anterior
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  background: currentPage === page ? '#3b82f6' : 'white',
                  border: '1px solid #d1d5db',
                  color: currentPage === page ? 'white' : '#374151',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  minWidth: '40px'
                }}
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
                style={{
                  background: currentPage === totalPages ? '#3b82f6' : 'white',
                  border: '1px solid #d1d5db',
                  color: currentPage === totalPages ? 'white' : '#374151',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  minWidth: '40px'
                }}
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{
              background: currentPage === totalPages ? '#f3f4f6' : 'white',
              border: '1px solid #d1d5db',
              color: currentPage === totalPages ? '#9ca3af' : '#374151',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Siguiente
          </button>
        </div>
      )}
      
      {/* Results Summary */}
      <div style={{
        textAlign: 'center',
        marginTop: '1rem',
        fontSize: '0.9rem',
        color: '#64748b'
      }}>
        Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredResults.length)} de {filteredResults.length} resultados
        {filteredResults.length !== newsResults.length && (
          <span> (filtrado de {newsResults.length} total)</span>
        )}
      </div>
    </div>
  );
};

export default NewsResultsTable;
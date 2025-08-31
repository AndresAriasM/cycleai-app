# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import requests
import re
from datetime import datetime
import os
from dotenv import load_dotenv
import time
from collections import Counter
import numpy as np

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],  # Ambos puertos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos Pydantic
class SearchTerm(BaseModel):
    value: str
    operator: str = "AND"
    exact_match: bool = False

class HypeCycleRequest(BaseModel):
    search_terms: List[SearchTerm]
    min_year: int = 2015

class NewsResult(BaseModel):
    title: str
    link: str
    snippet: str
    source: str
    date: str
    year: int
    sentiment: float
    country: Optional[str] = None
    keywords: List[str] = []

class InflectionPoint(BaseModel):
    year: int
    mentions: int
    sentiment: float

class HypeCycleAnalysis(BaseModel):
    phase: str
    confidence: float
    yearly_stats: List[Dict[str, Any]]
    inflection_points: Dict[str, Optional[InflectionPoint]]
    metrics: Dict[str, Any]

# Modelos para Test de Innovación
class InnovationAnswer(BaseModel):
    question_id: str
    score: int  # 1-4 scale

class InnovationTestRequest(BaseModel):
    company_name: str
    answers: List[InnovationAnswer]

class ModuleScore(BaseModel):
    module_name: str
    score: float
    max_score: float
    percentage: float

class InnovationLevel(BaseModel):
    level: str
    description: str
    recommendations: List[str]

class InnovationTestResponse(BaseModel):
    success: bool
    company_name: str
    total_score: float
    max_total_score: float
    overall_percentage: float
    module_scores: List[ModuleScore]
    innovation_level: InnovationLevel
    chart_data: Dict[str, Any]
    success: bool
    phase: str
    confidence: float
    total_mentions: int
    insights: List[str]
    chart_data: Dict[str, Any]
    news_results: List[NewsResult]
    analysis: Optional[HypeCycleAnalysis] = None

# Clases de análisis migradas
class QueryBuilder:
    @staticmethod
    def build_google_query(topics: List[SearchTerm], min_year: Optional[int] = None) -> str:
        """Construye la consulta para Google Custom Search"""
        if not topics:
            return ""
            
        query_parts = []
        
        for i, topic in enumerate(topics):
            if not topic.value.strip():
                continue
                
            term = topic.value.strip()
            
            # Aplicar coincidencia exacta
            if topic.exact_match and not (term.startswith('"') and term.endswith('"')):
                term = f'"{term}"'
            
            # Solo añadimos el operador si no es el último término
            if i == len(topics) - 1:
                query_parts.append(term)
            else:
                query_parts.append(f"{term} {topic.operator}")
        
        # Unir todas las partes
        base_query = " ".join(query_parts)
        
        # Añadir filtros adicionales
        filters = []
        if min_year:
            filters.append(f"after:{min_year}")
        
        # Combinar query base con filtros
        final_query = base_query
        if filters:
            final_query += " " + " ".join(filters)
        
        return final_query

class ResultAnalyzer:
    def __init__(self):
        self.common_words = {
            'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
            'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
            'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her',
            'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there',
            'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get',
            'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no',
            'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your',
            'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then',
            'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
            'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first',
            'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these',
            'give', 'day', 'most', 'us', 'was', 'is', 'are', 'were', 'been',
            'based', 'using', 'since', 'more', 'has', 'been', 'such', 'may',
            'very', 'both', 'each', 'between', 'under', 'same', 'through',
            'until'
        }

    def extract_year(self, text: str) -> int:
        """Extrae el año del texto con validación estricta"""
        current_year = datetime.now().year
        MAX_VALID_YEAR = min(current_year, 2025)
        MIN_VALID_YEAR = 1970
        
        def is_valid_year(year_str: str) -> bool:
            try:
                year_num = int(year_str)
                return MIN_VALID_YEAR <= year_num <= MAX_VALID_YEAR
            except ValueError:
                return False
        
        # Limpiar el texto
        cleaned_text = text.lower()
        cleaned_text = re.sub(r'\d+\s*(?:kb|mb|gb|kib|mib|gib|bytes?)', '', cleaned_text)
        
        # Buscar fechas explícitas
        date_patterns = [
            r'published.*?in\s*(20\d{2})',
            r'publication\s*date:?\s*(20\d{2})',
            r'©\s*(20\d{2})',
            r'\d{1,2}\s*(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*(20\d{2})'
        ]
        
        for pattern in date_patterns:
            matches = re.findall(pattern, cleaned_text)
            for match in matches:
                if is_valid_year(match):
                    return int(match)
        
        # Buscar años válidos
        year_pattern = r'\b(19[7-9]\d|20[0-2]\d)\b'
        years = re.findall(year_pattern, cleaned_text)
        if years:
            valid_years = [int(y) for y in years if is_valid_year(y)]
            if valid_years:
                return max(valid_years)
        
        return min(current_year, MAX_VALID_YEAR)

    def extract_country(self, text: str) -> Optional[str]:
        """Extrae menciones de países del texto"""
        countries = {
            'USA': ['united states', 'usa', 'u.s.', 'america'],
            'UK': ['united kingdom', 'uk', 'britain', 'england'],
            'China': ['china', 'chinese'], 'Japan': ['japan', 'japanese'],
            'Germany': ['germany', 'german'], 'France': ['france', 'french'],
            'Spain': ['spain', 'spanish'], 'Italy': ['italy', 'italian'],
            'India': ['india', 'indian'], 'Brazil': ['brazil', 'brazilian'],
            'Canada': ['canada', 'canadian'], 'Australia': ['australia', 'australian'],
            'South Korea': ['south korea', 'korea'], 'Russia': ['russia', 'russian'],
            'Netherlands': ['netherlands', 'dutch'], 'Sweden': ['sweden', 'swedish'],
            'Switzerland': ['switzerland', 'swiss'], 'Singapore': ['singapore'],
            'Israel': ['israel', 'israeli'], 'Norway': ['norway', 'norwegian'],
            'Denmark': ['denmark', 'danish'], 'Finland': ['finland', 'finnish'],
            'Belgium': ['belgium', 'belgian'], 'Austria': ['austria', 'austrian'],
            'Ireland': ['ireland', 'irish'], 'Portugal': ['portugal', 'portuguese'],
            'Greece': ['greece', 'greek'], 'Poland': ['poland', 'polish'],
            'Turkey': ['turkey', 'turkish'], 'Mexico': ['mexico', 'mexican'],
            'Argentina': ['argentina'], 'Chile': ['chile'], 'Colombia': ['colombia'],
            'Egypt': ['egypt'], 'Nigeria': ['nigeria'], 'South Africa': ['south africa']
        }
        
        text_lower = text.lower()
        for country, patterns in countries.items():
            if any(pattern in text_lower for pattern in patterns):
                return country
        return None

    def extract_keywords(self, text: str, search_terms: List[SearchTerm]) -> List[str]:
        """Extrae keywords relevantes excluyendo términos de búsqueda"""
        # Obtener palabras de búsqueda para filtrarlas
        search_words = set()
        for term in search_terms:
            words = re.sub(r'[^\w\s]', ' ', term.value.lower()).split()
            search_words.update(words)
        
        # Procesar texto
        text = re.sub(r'[^\w\s]', ' ', text.lower())
        words = text.split()
        
        # Filtrar palabras
        keywords = [
            word for word in words 
            if (
                word not in self.common_words 
                and word not in search_words
                and len(word) > 3 
                and word.isalpha()
                and not word.isdigit()
                and not re.match(r'.*\d+.*', word)
                and not re.match(r'20\d{2}', word)
            )
        ]
        
        return keywords

class NewsAnalyzer:
    def __init__(self):
        self.SERP_API_BASE_URL = "https://serpapi.com/search"
        self.result_analyzer = ResultAnalyzer()

    def _analyze_query_complexity(self, query: str) -> Dict[str, Any]:
        """Analiza la complejidad de una consulta"""
        complexity_score = 0
        reasons = []
        
        # Detectar operadores booleanos
        boolean_operators = ['AND', 'OR', 'NOT', '&', '|', '-']
        for operator in boolean_operators:
            if operator in query.upper():
                complexity_score += 2
                reasons.append(f"operador {operator}")
        
        # Detectar términos entre comillas
        quoted_terms = re.findall(r'"[^"]+"', query)
        if len(quoted_terms) > 1:
            complexity_score += len(quoted_terms)
            reasons.append(f"{len(quoted_terms)} términos exactos")
        
        # Contar palabras
        words_outside_quotes = re.sub(r'"[^"]+"', '', query).strip()
        word_count = len([w for w in words_outside_quotes.split() if len(w) > 2])
        if word_count > 2:
            complexity_score += word_count - 2
            reasons.append(f"{word_count} palabras separadas")
        
        # Determinar nivel
        if complexity_score == 0:
            level = 'SIMPLE'
            reason = "término único sin operadores"
        elif complexity_score <= 2:
            level = 'SIMPLE'
            reason = "complejidad baja: " + ", ".join(reasons[:2])
        else:
            level = 'COMPLEX'
            reason = "complejidad alta: " + ", ".join(reasons[:3])
        
        return {
            'level': level,
            'reason': reason,
            'score': complexity_score
        }

    def _calculate_sentiment(self, text: str) -> float:
        """Análisis básico de sentimiento sin VADER"""
        positive_words = [
            'breakthrough', 'innovative', 'revolutionary', 'success', 'leading',
            'advanced', 'improved', 'better', 'growth', 'increase', 'promising',
            'potential', 'opportunity', 'advantage', 'benefit', 'progress',
            'development', 'achievement', 'excellent', 'outstanding', 'superior'
        ]
        
        negative_words = [
            'decline', 'failure', 'problem', 'issue', 'challenge', 'difficult',
            'decrease', 'drop', 'fall', 'crisis', 'concern', 'risk', 'threat',
            'limitation', 'obstacle', 'setback', 'disappointment', 'weak',
            'poor', 'negative', 'loss', 'reduce', 'cut', 'eliminate'
        ]
        
        text_lower = text.lower()
        positive_count = sum(1 for word in positive_words if word in text_lower)
        negative_count = sum(1 for word in negative_words if word in text_lower)
        
        total_words = len(text.split())
        if total_words == 0:
            return 0.0
        
        sentiment_score = (positive_count - negative_count) / max(total_words / 10, 1)
        return max(-1.0, min(1.0, sentiment_score))

    def perform_news_search(self, query: str, serp_api_key: str, search_terms: List[SearchTerm]) -> tuple[bool, Any]:
        """Realiza búsqueda híbrida con SERPAPI"""
        try:
            all_results = []
            current_year = datetime.now().year
            start_year = current_year - 12
            
            # Limpiar query
            clean_query = re.sub(r'\s*(?:after|before):\d{4}(?:-\d{2}-\d{2})?\s*', '', query).strip()
            
            # Analizar complejidad
            query_complexity = self._analyze_query_complexity(clean_query)
            print(f"Query complexity: {query_complexity['level']} - {query_complexity['reason']}")
            
            # Configuración base
            base_params = {
                "api_key": serp_api_key,
                "tbm": "nws",
                "num": 100,
                "safe": "off",
                "gl": "us",
                "hl": "en",
                "filter": "0"
            }
            
            total_api_calls = 0
            
            # Estrategia según complejidad
            if query_complexity['level'] == 'SIMPLE':
                # Estrategia exploratoria
                exploratory_query = f"{clean_query} after:{start_year}-01-01 before:{current_year}-12-31"
                
                # Primera consulta exploratoria
                response = requests.get(
                    self.SERP_API_BASE_URL, 
                    params={**base_params, "q": exploratory_query, "start": 0}
                )
                response.raise_for_status()
                data = response.json()
                total_api_calls += 1
                
                if "news_results" in data and data["news_results"]:
                    exploratory_results = data["news_results"]
                    exploratory_count = len(exploratory_results)
                    
                    # Procesar resultados
                    for item in exploratory_results:
                        if self._is_valid_result(item):
                            processed = self._process_news_item(item, search_terms)
                            if processed:
                                all_results.append(processed)
                    
                    # Si hay muchos resultados, buscar por rangos
                    if exploratory_count >= 100 and total_api_calls < 10:
                        range_size = 2 if exploratory_count >= 200 else 3
                        date_ranges = []
                        current_start = start_year
                        
                        while current_start <= current_year and len(date_ranges) < 6:
                            range_end = min(current_start + range_size - 1, current_year)
                            date_ranges.append((current_start, range_end))
                            current_start = range_end + 1
                        
                        # Buscar por rangos con límite de API calls
                        for start_date, end_date in date_ranges:
                            if total_api_calls >= 10:
                                break
                                
                            try:
                                date_query = f"{clean_query} after:{start_date}-01-01 before:{end_date}-12-31"
                                response = requests.get(
                                    self.SERP_API_BASE_URL,
                                    params={**base_params, "q": date_query, "start": 0}
                                )
                                response.raise_for_status()
                                data = response.json()
                                total_api_calls += 1
                                
                                if "news_results" in data:
                                    for item in data["news_results"]:
                                        if self._is_valid_result(item):
                                            processed = self._process_news_item(item, search_terms)
                                            if processed:
                                                all_results.append(processed)
                                
                                time.sleep(0.1)  # Rate limiting
                                
                            except Exception as e:
                                print(f"Error en rango {start_date}-{end_date}: {str(e)}")
                                continue
                
            else:
                # Estrategia directa para consultas complejas
                date_ranges = [
                    (start_year, start_year + 3),
                    (start_year + 4, start_year + 7),
                    (start_year + 8, current_year)
                ]
                
                for start_date, end_date in date_ranges:
                    if total_api_calls >= 6:
                        break
                        
                    try:
                        date_query = f"{clean_query} after:{start_date}-01-01 before:{end_date}-12-31"
                        response = requests.get(
                            self.SERP_API_BASE_URL,
                            params={**base_params, "q": date_query, "start": 0}
                        )
                        response.raise_for_status()
                        data = response.json()
                        total_api_calls += 1
                        
                        if "news_results" in data:
                            for item in data["news_results"]:
                                if self._is_valid_result(item):
                                    processed = self._process_news_item(item, search_terms)
                                    if processed:
                                        all_results.append(processed)
                        
                        time.sleep(0.1)
                        
                    except Exception as e:
                        print(f"Error en rango complejo: {str(e)}")
                        continue
            
            # Eliminar duplicados
            unique_results = self._remove_duplicates(all_results)
            print(f"Total API calls: {total_api_calls}, Unique results: {len(unique_results)}")
            
            return True, unique_results
            
        except Exception as e:
            print(f"Error en búsqueda: {str(e)}")
            return False, str(e)

    def _is_valid_result(self, item: Dict[str, Any]) -> bool:
        """Valida si un resultado debe ser incluido"""
        try:
            if not all(key in item for key in ['title', 'link', 'snippet']):
                return False
            
            if len(item['snippet']) < 50:
                return False
            
            blocked_domains = ['pinterest', 'facebook.com', 'twitter.com', 'instagram.com']
            if any(domain in item['link'].lower() for domain in blocked_domains):
                return False
            
            return True
        except Exception:
            return False

    def _process_news_item(self, item: Dict[str, Any], search_terms: List[SearchTerm]) -> Optional[NewsResult]:
        """Procesa un resultado de noticia"""
        try:
            text = f"{item.get('title', '')} {item.get('snippet', '')}"
            
            processed = NewsResult(
                title=str(item.get('title', '')),
                link=str(item.get('link', '')),
                snippet=str(item.get('snippet', '')),
                source=str(item.get('source', '')),
                date=str(item.get('date', '')),
                year=self._extract_year_from_date(item.get('date', '')),
                sentiment=self._calculate_sentiment(text),
                country=self.result_analyzer.extract_country(text),
                keywords=self.result_analyzer.extract_keywords(text, search_terms)[:5]
            )
            
            return processed
            
        except Exception as e:
            print(f"Error procesando noticia: {str(e)}")
            return None

    def _extract_year_from_date(self, date_str: str) -> int:
        """Extrae el año de una fecha"""
        try:
            if not date_str:
                return datetime.now().year
            
            # Intentar diferentes formatos
            for fmt in ['%Y-%m-%d', '%Y-%m-%dT%H:%M:%S', '%b %d, %Y', '%Y']:
                try:
                    return datetime.strptime(date_str.split('T')[0], fmt).year
                except ValueError:
                    continue
            
            # Buscar año en el string
            match = re.search(r'20\d{2}|19\d{2}', date_str)
            if match:
                year = int(match.group())
                if 1970 <= year <= datetime.now().year:
                    return year
            
            return datetime.now().year
            
        except Exception:
            return datetime.now().year

    def _remove_duplicates(self, results: List[NewsResult]) -> List[NewsResult]:
        """Elimina duplicados basándose en URL y título"""
        unique_results = []
        seen_urls = set()
        seen_titles = set()
        
        for result in results:
            url = result.link
            title = result.title.lower().strip()
            
            if url not in seen_urls and title not in seen_titles:
                seen_urls.add(url)
                seen_titles.add(title)
                unique_results.append(result)
        
        return unique_results

    def analyze_hype_cycle(self, news_results: List[NewsResult]) -> Optional[HypeCycleAnalysis]:
        """Análisis completo del Hype Cycle"""
        try:
            if len(news_results) < 3:
                return None
            
            # Crear datos anuales
            yearly_data = {}
            for result in news_results:
                year = result.year
                if year not in yearly_data:
                    yearly_data[year] = {'mentions': 0, 'sentiments': []}
                
                yearly_data[year]['mentions'] += 1
                yearly_data[year]['sentiments'].append(result.sentiment)
            
            # Calcular estadísticas anuales
            yearly_stats = []
            for year in sorted(yearly_data.keys()):
                data = yearly_data[year]
                sentiment_mean = np.mean(data['sentiments']) if data['sentiments'] else 0
                sentiment_std = np.std(data['sentiments']) if len(data['sentiments']) > 1 else 0
                
                yearly_stats.append({
                    'year': year,
                    'mention_count': data['mentions'],
                    'sentiment_mean': sentiment_mean,
                    'sentiment_std': sentiment_std
                })
            
            # Calcular cambios
            for i in range(1, len(yearly_stats)):
                prev_mentions = yearly_stats[i-1]['mention_count']
                current_mentions = yearly_stats[i]['mention_count']
                
                if prev_mentions > 0:
                    yearly_stats[i]['mention_change'] = (current_mentions - prev_mentions) / prev_mentions
                else:
                    yearly_stats[i]['mention_change'] = 0
                
                yearly_stats[i]['sentiment_change'] = (
                    yearly_stats[i]['sentiment_mean'] - yearly_stats[i-1]['sentiment_mean']
                )
            
            # Detectar puntos de inflexión
            inflection_points = self._analyze_gartner_points(yearly_stats)
            
            # Determinar fase actual
            phase, confidence = self._determine_current_phase(yearly_stats, inflection_points)
            
            return HypeCycleAnalysis(
                phase=phase,
                confidence=confidence,
                yearly_stats=yearly_stats,
                inflection_points=inflection_points,
                metrics={
                    'total_mentions': len(news_results),
                    'years_analyzed': len(yearly_stats),
                    'peak_mentions': max([stat['mention_count'] for stat in yearly_stats]),
                    'avg_sentiment': np.mean([result.sentiment for result in news_results])
                }
            )
            
        except Exception as e:
            print(f"Error en análisis del Hype Cycle: {str(e)}")
            return None

    def _analyze_gartner_points(self, yearly_stats: List[Dict[str, Any]]) -> Dict[str, Optional[InflectionPoint]]:
        """Detecta puntos de inflexión del Hype Cycle"""
        try:
            inflection_points = {
                'innovation_trigger': None,
                'peak': None,
                'trough': None
            }
            
            if not yearly_stats:
                return inflection_points
            
            # Encontrar punto de innovación (primer año con menciones significativas)
            mentions = [stat['mention_count'] for stat in yearly_stats]
            threshold = np.mean(mentions) * 0.1
            
            for stat in yearly_stats:
                if stat['mention_count'] >= threshold:
                    inflection_points['innovation_trigger'] = InflectionPoint(
                        year=stat['year'],
                        mentions=stat['mention_count'],
                        sentiment=stat['sentiment_mean']
                    )
                    break
            
            # Encontrar pico (máximo de menciones)
            max_mentions_stat = max(yearly_stats, key=lambda x: x['mention_count'])
            inflection_points['peak'] = InflectionPoint(
                year=max_mentions_stat['year'],
                mentions=max_mentions_stat['mention_count'],
                sentiment=max_mentions_stat['sentiment_mean']
            )
            
            # Encontrar valle (mínimo después del pico)
            peak_year = max_mentions_stat['year']
            post_peak_stats = [stat for stat in yearly_stats if stat['year'] > peak_year]
            
            if post_peak_stats:
                min_mentions_stat = min(post_peak_stats, key=lambda x: x['mention_count'])
                inflection_points['trough'] = InflectionPoint(
                    year=min_mentions_stat['year'],
                    mentions=min_mentions_stat['mention_count'],
                    sentiment=min_mentions_stat['sentiment_mean']
                )
            
            return inflection_points
            
        except Exception as e:
            print(f"Error analizando puntos de inflexión: {str(e)}")
            return {
                'innovation_trigger': None,
                'peak': None,
                'trough': None
            }

    def _determine_current_phase(self, yearly_stats: List[Dict[str, Any]], inflection_points: Dict[str, Optional[InflectionPoint]]) -> tuple[str, float]:
        """Determina la fase actual del Hype Cycle"""
        current_year = datetime.now().year
        
        # Verificar puntos de inflexión
        innovation_point = inflection_points.get('innovation_trigger')
        peak_point = inflection_points.get('peak')
        trough_point = inflection_points.get('trough')
        
        if innovation_point:
            years_since_innovation = current_year - innovation_point.year
            
            if years_since_innovation <= 1:
                return "Innovation Trigger", 0.85
            
            if peak_point:
                years_since_peak = current_year - peak_point.year
                
                if years_since_peak <= 1 and peak_point.sentiment > 0.2:
                    return "Peak of Inflated Expectations", 0.9
                
                if trough_point:
                    years_since_trough = current_year - trough_point.year
                    
                    if years_since_trough <= 1:
                        return "Trough of Disillusionment", 0.85
                    elif 1 < years_since_trough <= 4:
                        # Verificar tendencia de recuperación
                        recent_stats = [stat for stat in yearly_stats if stat['year'] >= trough_point.year]
                        if len(recent_stats) > 1:
                            recent_trend = np.mean([stat.get('mention_change', 0) for stat in recent_stats[-2:]])
                            if recent_trend > 0:
                                return "Slope of Enlightenment", 0.8
                        return "Trough of Disillusionment", 0.75
                    else:
                        return "Plateau of Productivity", 0.85
                else:
                    if years_since_peak > 2:
                        return "Trough of Disillusionment", 0.7
                    else:
                        return "Peak of Inflated Expectations", 0.65
            else:
                if years_since_innovation > 1:
                    return "Innovation Trigger", 0.6
        
        # Análisis de respaldo si no hay puntos claros
        if yearly_stats:
            latest_stat = yearly_stats[-1]
            recent_growth = yearly_stats[-1].get('mention_change', 0) if len(yearly_stats) > 1 else 0
            
            if recent_growth > 0.3 and latest_stat['sentiment_mean'] > 0.1:
                return "Innovation Trigger", 0.6
            elif recent_growth < -0.3:
                return "Trough of Disillusionment", 0.55
        
        return "Pre-Innovation Trigger", 0.5

# Instancias globales
news_analyzer = NewsAnalyzer()
query_builder = QueryBuilder()

def generate_insights(analysis: HypeCycleAnalysis) -> List[str]:
    """Genera insights basados en el análisis"""
    insights = []
    phase = analysis.phase
    confidence = analysis.confidence
    metrics = analysis.metrics
    
    # Insights según la fase
    phase_insights = {
        "Innovation Trigger": [
            "🚀 Tecnología emergente con potencial de crecimiento",
            "⚠️ Alto riesgo - Pocos casos de uso demostrados",
            "💡 Momento ideal para investigación y experimentación"
        ],
        "Peak of Inflated Expectations": [
            "📈 Máximo nivel de expectativas en medios",
            "⏳ Probable declive en próximos 2-3 años",
            "🎯 Cuidado con inversiones especulativas"
        ],
        "Trough of Disillusionment": [
            "📉 Fase de desilusión - Expectativas más realistas",
            "💡 Buen momento para inversión a largo plazo",
            "🔍 Enfoque en casos de uso prácticos y viables"
        ],
        "Slope of Enlightenment": [
            "📊 Maduración gradual de la tecnología",
            "✅ Casos de uso más claros y beneficios demostrados",
            "⬆️ Incremento sostenido en adopción empresarial"
        ],
        "Plateau of Productivity": [
            "🏆 Tecnología madura y ampliamente adoptada",
            "💼 ROI demostrado y riesgos controlados",
            "🎯 Enfoque en optimización y eficiencia"
        ]
    }
    
    # Añadir insights específicos de la fase
    if phase in phase_insights:
        insights.extend(phase_insights[phase])
    
    # Insights basados en confianza
    if confidence > 0.8:
        insights.append("✅ Alta confianza en el análisis")
    elif confidence > 0.6:
        insights.append("📊 Confianza moderada en el análisis")
    else:
        insights.append("⚠️ Confianza limitada - Se requieren más datos")
    
    # Insights basados en métricas
    total_mentions = metrics.get('total_mentions', 0)
    if total_mentions > 200:
        insights.append(f"📈 Alta actividad mediática: {total_mentions} menciones")
    elif total_mentions > 50:
        insights.append(f"📊 Actividad moderada: {total_mentions} menciones")
    else:
        insights.append(f"📉 Baja actividad mediática: {total_mentions} menciones")
    
    avg_sentiment = metrics.get('avg_sentiment', 0)
    if avg_sentiment > 0.3:
        insights.append("😊 Sentimiento general positivo en medios")
    elif avg_sentiment < -0.3:
        insights.append("😔 Sentimiento general negativo en medios")
    else:
        insights.append("😐 Sentimiento neutral en medios")
    
    return insights

# Endpoints principales
@app.post("/api/hypecycle/analyze", response_model=HypeCycleResponse)
async def analyze_hypecycle(request: HypeCycleRequest):
    """Endpoint principal para análisis del Hype Cycle"""
    serp_api_key = os.getenv("SERP_API_KEY")
    
    if not serp_api_key:
        raise HTTPException(status_code=500, detail="SERP_API_KEY no configurada")
    
    # Validar términos de búsqueda
    valid_terms = [term for term in request.search_terms if term.value.strip()]
    if not valid_terms:
        raise HTTPException(status_code=400, detail="Se requiere al menos un término de búsqueda válido")
    
    try:
        # Construir query
        google_query = query_builder.build_google_query(valid_terms, request.min_year)
        print(f"Searching for: {google_query}")
        
        # Realizar búsqueda
        success, results = news_analyzer.perform_news_search(google_query, serp_api_key, valid_terms)
        
        if not success:
            raise HTTPException(status_code=400, detail=f"Error en búsqueda: {results}")
        
        if not results:
            raise HTTPException(status_code=404, detail="No se encontraron resultados")
        
        print(f"Found {len(results)} results")
        
        # Analizar Hype Cycle
        analysis = news_analyzer.analyze_hype_cycle(results)
        
        if not analysis:
            raise HTTPException(status_code=400, detail="No se pudieron analizar los resultados")
        
        # Generar insights
        insights = generate_insights(analysis)
        
        # Preparar datos del gráfico
        chart_data = {
            "yearly_mentions": {str(stat['year']): stat['mention_count'] for stat in analysis.yearly_stats},
            "yearly_sentiment": {str(stat['year']): stat['sentiment_mean'] for stat in analysis.yearly_stats},
            "phase_position": get_phase_position(analysis.phase),
            "total_mentions": analysis.metrics['total_mentions'],
            "inflection_points": {
                key: {
                    "year": point.year,
                    "mentions": point.mentions,
                    "sentiment": point.sentiment
                } if point else None
                for key, point in analysis.inflection_points.items()
            }
        }
        
        return HypeCycleResponse(
            success=True,
            phase=analysis.phase,
            confidence=analysis.confidence,
            total_mentions=analysis.metrics['total_mentions'],
            insights=insights,
            chart_data=chart_data,
            news_results=results,
            analysis=analysis
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")

def get_phase_position(phase: str) -> Dict[str, float]:
    """Obtiene la posición de una fase en la curva del Hype Cycle"""
    positions = {
        "Pre-Innovation Trigger": {"x": 5, "y": 10},
        "Innovation Trigger": {"x": 15, "y": 30},
        "Peak of Inflated Expectations": {"x": 30, "y": 85},
        "Trough of Disillusionment": {"x": 55, "y": 20},
        "Slope of Enlightenment": {"x": 75, "y": 50},
        "Plateau of Productivity": {"x": 90, "y": 65}
    }
    return positions.get(phase, {"x": 50, "y": 50})

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "CycleAI Backend is running"}

@app.get("/api/test")
async def test_endpoint():
    """Endpoint de prueba sin API key"""
    return HypeCycleResponse(
        success=True,
        phase="Innovation Trigger",
        confidence=0.75,
        total_mentions=42,
        insights=[
            "🚀 Tecnología emergente con potencial de crecimiento",
            "⚠️ Alto riesgo - Pocos casos de uso demostrados",
            "📊 Actividad moderada: 42 menciones",
            "😐 Sentimiento neutral en medios"
        ],
        chart_data={
            "yearly_mentions": {"2020": 5, "2021": 12, "2022": 15, "2023": 10},
            "yearly_sentiment": {"2020": 0.1, "2021": 0.3, "2022": 0.2, "2023": -0.1},
            "phase_position": {"x": 15, "y": 30},
            "total_mentions": 42,
            "inflection_points": {
                "innovation_trigger": {"year": 2021, "mentions": 12, "sentiment": 0.3},
                "peak": {"year": 2022, "mentions": 15, "sentiment": 0.2},
                "trough": None
            }
        },
        news_results=[
            NewsResult(
                title="AI Technology Shows Promise in Agriculture",
                link="https://example.com/news/1",
                snippet="Artificial intelligence applications in agriculture are gaining traction...",
                source="TechNews",
                date="2023-06-15",
                year=2023,
                sentiment=0.2,
                country="USA",
                keywords=["agriculture", "applications", "technology"]
            )
        ]
    )

# Definiciones del Test de Innovación
INNOVATION_TEST_MODULES = {
    "modulo1": {
        "name": "Alineamiento Estratégico",
        "description": "Estudios de futuro, estrategia de innovación, modelo de gestión",
        "questions": [
            {
                "id": "m1_q1",
                "text": "¿Su empresa ha realizado estudios de vigilancia tecnológica?",
                "category": "vigilancia"
            },
            {
                "id": "m1_q2", 
                "text": "¿Su empresa ha desarrollado o participado en procesos de innovación abierta?",
                "category": "innovacion_abierta"
            },
            {
                "id": "m1_q3",
                "text": "¿Su empresa cuenta con una unidad de I+D o I+D+i?",
                "category": "unidad_id"
            },
            {
                "id": "m1_q4",
                "text": "¿Su empresa ha realizado estudios de futuro? (MICMAC - Escenarios, Delphi - Consulta anónima a expertos)",
                "category": "estudios_futuro"
            },
            {
                "id": "m1_q5",
                "text": "¿Su empresa ha formulado o implementado una estrategia de innovación?",
                "category": "estrategia_innovacion"
            },
            {
                "id": "m1_q6",
                "text": "Desde el punto de vista de la gestión de la Innovación su empresa cuenta con: Modelo de innovación, Modelo de gestión de innovación, Sistema de gestión de innovación",
                "category": "modelo_gestion"
            }
        ]
    },
    "modulo2": {
        "name": "Capacidades de Absorción",
        "description": "Desarrollo de capacidades para adquirir y aplicar conocimiento externo",
        "questions": [
            {
                "id": "m2_q1",
                "text": "¿Su empresa tiene establecido un plan para el desarrollo de las capacidades de absorción?",
                "category": "plan_absorcion"
            },
            {
                "id": "m2_q2",
                "text": "¿Su empresa tiene un plan sistemático para identificar y adquirir conocimiento generado en el exterior?",
                "category": "adquisicion_conocimiento"
            },
            {
                "id": "m2_q3",
                "text": "¿Su empresa tiene un plan sistemático para analizar, procesar, interpretar y comprender la información obtenida de fuentes externas?",
                "category": "asimilacion_conocimiento"
            },
            {
                "id": "m2_q4",
                "text": "¿Su empresa tiene un plan sistemático para hacer la transferencia y la combinación del conocimiento previo con el nuevo conocimiento adquirido y asimilado?",
                "category": "transformacion_conocimiento"
            },
            {
                "id": "m2_q5",
                "text": "¿Su empresa tiene un plan sistemático para la aplicación del nuevo conocimiento adquirido del medio?",
                "category": "explotacion_conocimiento"
            }
        ]
    },
    "modulo3": {
        "name": "Innovación Sostenible y Regenerativa", 
        "description": "Innovación orientada a sostenibilidad y regeneratividad",
        "questions": [
            {
                "id": "m3_q1",
                "text": "¿Su organización ha generado innovaciones sostenibles/sustentables/ecoinnovaciones?",
                "category": "innovacion_sostenible"
            },
            {
                "id": "m3_q2",
                "text": "¿Su organización ha generado innovaciones regenerativas?",
                "category": "innovacion_regenerativa"
            },
            {
                "id": "m3_q3",
                "text": "¿Su organización busca alinear innovaciones sostenibles y/o regenerativas con tecnologías convergentes (nano, bio, info, cogno)?",
                "category": "tecnologias_convergentes"
            },
            {
                "id": "m3_q4",
                "text": "¿Su organización busca alinear innovaciones sostenibles y/o regenerativas a partir de Key Enabling Technologies - KET's?",
                "category": "tecnologias_habilitadoras"
            },
            {
                "id": "m3_q5",
                "text": "¿Su organización busca alinear innovaciones sostenibles y/o regenerativas a partir de Tecnologías Transformativas?",
                "category": "tecnologias_transformativas"
            },
            {
                "id": "m3_q6",
                "text": "¿Su organización participa en Innovación en la transformación urbana con fines de regeneratividad?",
                "category": "transformacion_urbana"
            },
            {
                "id": "m3_q7",
                "text": "¿Su organización aplica, participa o promueve Innovación tecnológica para la regeneratividad?",
                "category": "innovacion_tecnologica_regenerativa"
            },
            {
                "id": "m3_q8",
                "text": "¿Su organización participa con procesos de Innovación responsable para la regeneratividad?",
                "category": "innovacion_responsable"
            },
            {
                "id": "m3_q9",
                "text": "¿Su organización genera, promueve la Innovación en modelos de negocio orientados a regeneratividad?",
                "category": "modelos_negocio_regenerativos"
            }
        ]
    }
}

def analyze_innovation_test(answers: List[InnovationAnswer], company_name: str) -> InnovationTestResponse:
    """Analiza las respuestas del test de innovación empresarial"""
    try:
        # Organizar respuestas por módulo
        answers_by_module = {}
        for answer in answers:
            module_id = answer.question_id.split('_')[0]  # m1, m2, m3
            module_key = f"modulo{module_id[1]}"  # modulo1, modulo2, modulo3
            
            if module_key not in answers_by_module:
                answers_by_module[module_key] = []
            answers_by_module[module_key].append(answer.score)
        
        # Calcular scores por módulo
        module_scores = []
        total_score = 0
        max_total_score = 0
        
        for module_key, module_data in INNOVATION_TEST_MODULES.items():
            if module_key in answers_by_module:
                scores = answers_by_module[module_key]
                module_score = sum(scores)
                module_max_score = len(module_data['questions']) * 4
                module_percentage = (module_score / module_max_score) * 100
                
                module_scores.append(ModuleScore(
                    module_name=module_data['name'],
                    score=module_score,
                    max_score=module_max_score,
                    percentage=module_percentage
                ))
                
                total_score += module_score
                max_total_score += module_max_score
        
        # Calcular porcentaje general
        overall_percentage = (total_score / max_total_score) * 100 if max_total_score > 0 else 0
        
        # Determinar nivel de innovación
        innovation_level = determine_innovation_level(overall_percentage, module_scores)
        
        # Preparar datos del gráfico de araña
        chart_data = {
            "modules": [score.module_name for score in module_scores],
            "scores": [score.percentage for score in module_scores],
            "company_name": company_name,
            "overall_percentage": overall_percentage
        }
        
        return InnovationTestResponse(
            success=True,
            company_name=company_name,
            total_score=total_score,
            max_total_score=max_total_score,
            overall_percentage=overall_percentage,
            module_scores=module_scores,
            innovation_level=innovation_level,
            chart_data=chart_data
        )
        
    except Exception as e:
        print(f"Error analyzing innovation test: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error en análisis: {str(e)}")

def determine_innovation_level(overall_percentage: float, module_scores: List[ModuleScore]) -> InnovationLevel:
    """Determina el nivel de innovación basado en los scores"""
    
    if overall_percentage >= 85:
        return InnovationLevel(
            level="Empresa Altamente Innovadora",
            description="Su empresa demuestra un excelente nivel de madurez en innovación con capacidades avanzadas en todos los aspectos evaluados.",
            recommendations=[
                "Mantener el liderazgo en innovación mediante inversión continua en I+D+i",
                "Desarrollar programas de mentoría para otras empresas del sector",
                "Explorar tecnologías emergentes y disruptivas",
                "Fortalecer alianzas estratégicas internacionales para innovación"
            ]
        )
    elif overall_percentage >= 70:
        return InnovationLevel(
            level="Empresa Innovadora Sólida",
            description="Su empresa tiene una base sólida de innovación con buenas prácticas implementadas, aunque con oportunidades de mejora específicas.",
            recommendations=[
                "Identificar y fortalecer las áreas con menor puntuación",
                "Implementar sistemas de gestión de conocimiento más robustos",
                "Aumentar la colaboración con centros de investigación",
                "Desarrollar capacidades en tecnologías sostenibles y regenerativas"
            ]
        )
    elif overall_percentage >= 55:
        return InnovationLevel(
            level="Empresa con Potencial de Innovación",
            description="Su empresa muestra potencial innovador pero necesita desarrollar capacidades más estructuradas y sistemáticas.",
            recommendations=[
                "Establecer una unidad formal de I+D+i",
                "Desarrollar una estrategia de innovación clara y documentada",
                "Implementar procesos de vigilancia tecnológica",
                "Capacitar al personal en metodologías de innovación",
                "Establecer alianzas con universidades y centros de investigación"
            ]
        )
    elif overall_percentage >= 40:
        return InnovationLevel(
            level="Empresa en Desarrollo Innovador",
            description="Su empresa está en las etapas iniciales del desarrollo de capacidades de innovación y requiere inversión significativa en este aspecto.",
            recommendations=[
                "Crear un plan estratégico de innovación a mediano plazo",
                "Designar recursos específicos para actividades de I+D",
                "Realizar estudios de vigilancia tecnológica básicos",
                "Establecer procesos para capturar ideas de empleados",
                "Participar en redes de innovación del sector"
            ]
        )
    else:
        return InnovationLevel(
            level="Empresa con Necesidad Crítica de Innovación",
            description="Su empresa requiere una transformación fundamental en sus capacidades de innovación para mantenerse competitiva.",
            recommendations=[
                "Realizar un diagnóstico completo de capacidades actuales",
                "Desarrollar una cultura organizacional que fomente la innovación",
                "Establecer metas específicas y medibles para innovación",
                "Buscar asesoría externa especializada en gestión de innovación",
                "Considerar alianzas estratégicas para acceder a capacidades de innovación",
                "Implementar programas de formación en innovación para todo el personal"
            ]
        )
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
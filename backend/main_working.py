# backend/main_working.py
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

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos básicos
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

class HypeCycleResponse(BaseModel):
    success: bool
    phase: str
    confidence: float
    total_mentions: int
    insights: List[str]
    chart_data: Dict[str, Any]
    news_results: List[NewsResult]

# Funciones auxiliares simples
def build_google_query(topics: List[SearchTerm], min_year: Optional[int] = None) -> str:
    """Construye query básica"""
    if not topics:
        return ""
        
    query_parts = []
    for i, topic in enumerate(topics):
        if not topic.value.strip():
            continue
            
        term = topic.value.strip()
        if topic.exact_match:
            term = f'"{term}"'
        
        if i == len(topics) - 1:
            query_parts.append(term)
        else:
            query_parts.append(f"{term} {topic.operator}")
    
    base_query = " ".join(query_parts)
    
    if min_year:
        base_query += f" after:{min_year}"
    
    return base_query

def extract_year_simple(text: str) -> int:
    """Extrae año del texto de forma simple"""
    current_year = datetime.now().year
    years = re.findall(r'\b(20\d{2})\b', text)
    if years:
        return int(years[0])
    return current_year

def calculate_basic_sentiment(text: str) -> float:
    """Análisis básico de sentimiento"""
    positive_words = ['good', 'great', 'excellent', 'amazing', 'breakthrough', 'success', 'improvement']
    negative_words = ['bad', 'poor', 'failure', 'problem', 'decline', 'crisis', 'risk']
    
    text_lower = text.lower()
    pos_count = sum(1 for word in positive_words if word in text_lower)
    neg_count = sum(1 for word in negative_words if word in text_lower)
    
    return (pos_count - neg_count) * 0.1

def perform_basic_search(query: str, serp_api_key: str) -> tuple[bool, Any]:
    """Búsqueda básica con SERPAPI"""
    try:
        url = "https://serpapi.com/search"
        params = {
            "api_key": serp_api_key,
            "q": query,
            "tbm": "nws",
            "num": 50,
            "gl": "us",
            "hl": "en"
        }
        
        response = requests.get(url, params=params, timeout=30)
        response.raise_for_status()
        data = response.json()
        
        results = []
        for item in data.get("news_results", []):
            try:
                result = NewsResult(
                    title=str(item.get("title", "")),
                    link=str(item.get("link", "")),
                    snippet=str(item.get("snippet", "")),
                    source=str(item.get("source", "")),
                    date=str(item.get("date", "")),
                    year=extract_year_simple(item.get("date", "")),
                    sentiment=calculate_basic_sentiment(f"{item.get('title', '')} {item.get('snippet', '')}"),
                    country="USA",  # Default por ahora
                    keywords=[]
                )
                results.append(result)
            except Exception as e:
                print(f"Error processing item: {e}")
                continue
        
        return True, results
        
    except Exception as e:
        return False, str(e)

def analyze_basic_hype_cycle(news_results: List[NewsResult]) -> Dict[str, Any]:
    """Análisis básico del Hype Cycle"""
    if not news_results:
        return {
            "phase": "Pre-Innovation Trigger",
            "confidence": 0.3,
            "total_mentions": 0
        }
    
    # Análisis simple por cantidad y sentimiento
    total_mentions = len(news_results)
    avg_sentiment = sum(r.sentiment for r in news_results) / len(news_results)
    recent_count = len([r for r in news_results if r.year >= datetime.now().year - 2])
    
    # Lógica básica de clasificación
    if total_mentions < 10:
        phase = "Pre-Innovation Trigger"
        confidence = 0.4
    elif recent_count > total_mentions * 0.6 and avg_sentiment > 0:
        phase = "Innovation Trigger"
        confidence = 0.7
    elif avg_sentiment > 0.2:
        phase = "Peak of Inflated Expectations"
        confidence = 0.6
    elif avg_sentiment < -0.1:
        phase = "Trough of Disillusionment"
        confidence = 0.6
    else:
        phase = "Slope of Enlightenment"
        confidence = 0.5
    
    return {
        "phase": phase,
        "confidence": confidence,
        "total_mentions": total_mentions,
        "avg_sentiment": avg_sentiment
    }

# Endpoints
@app.get("/")
async def root():
    return {
        "message": "CycleAI Backend API",
        "endpoints": ["/api/health", "/api/test", "/api/hypecycle/analyze"],
        "status": "running"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "CycleAI Backend is running"}

@app.post("/api/hypecycle/analyze", response_model=HypeCycleResponse)
async def analyze_hypecycle(request: HypeCycleRequest):
    """Endpoint principal para análisis del Hype Cycle"""
    serp_api_key = os.getenv("SERP_API_KEY")
    
    if not serp_api_key:
        raise HTTPException(status_code=500, detail="SERP_API_KEY no configurada")
    
    # Validar términos
    valid_terms = [term for term in request.search_terms if term.value.strip()]
    if not valid_terms:
        raise HTTPException(status_code=400, detail="Se requiere al menos un término válido")
    
    try:
        # Construir query
        google_query = build_google_query(valid_terms, request.min_year)
        print(f"Searching for: {google_query}")
        
        # Realizar búsqueda
        success, results = perform_basic_search(google_query, serp_api_key)
        
        if not success:
            raise HTTPException(status_code=400, detail=f"Error en búsqueda: {results}")
        
        if not results:
            raise HTTPException(status_code=404, detail="No se encontraron resultados")
        
        print(f"Found {len(results)} results")
        
        # Analizar Hype Cycle
        analysis = analyze_basic_hype_cycle(results)
        
        # Generar insights
        insights = [
            f"Se encontraron {len(results)} menciones en medios",
            f"Fase identificada: {analysis['phase']}",
            f"Confianza del análisis: {analysis['confidence']:.0%}",
            f"Sentimiento promedio: {analysis.get('avg_sentiment', 0):.2f}"
        ]
        
        # Datos del gráfico
        yearly_data = {}
        for result in results:
            year = str(result.year)
            if year not in yearly_data:
                yearly_data[year] = 0
            yearly_data[year] += 1
        
        chart_data = {
            "yearly_mentions": yearly_data,
            "phase_position": {"x": 20, "y": 50},  # Posición por defecto
            "total_mentions": len(results)
        }
        
        return HypeCycleResponse(
            success=True,
            phase=analysis["phase"],
            confidence=analysis["confidence"],
            total_mentions=len(results),
            insights=insights,
            chart_data=chart_data,
            news_results=results
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")

@app.get("/api/test")
async def test_endpoint():
    """Endpoint de prueba sin API key"""
    mock_results = [
        NewsResult(
            title="AI Technology Shows Promise in Agriculture",
            link="https://example.com/news/1",
            snippet="Artificial intelligence applications in agriculture are gaining traction...",
            source="TechNews",
            date="2023-06-15",
            year=2023,
            sentiment=0.2,
            country="USA",
            keywords=["agriculture", "technology", "artificial", "intelligence"]
        ),
        NewsResult(
            title="Machine Learning Transforms Farming Practices",
            link="https://example.com/news/2",
            snippet="New machine learning algorithms help farmers optimize crop yields...",
            source="AgriTech Today",
            date="2023-05-20",
            year=2023,
            sentiment=0.3,
            country="USA",
            keywords=["machine", "learning", "farming", "agriculture"]
        )
    ]
    
    return HypeCycleResponse(
        success=True,
        phase="Innovation Trigger",
        confidence=0.75,
        total_mentions=42,
        insights=[
            "Se encontraron 42 menciones en medios",
            "Fase identificada: Innovation Trigger",
            "Confianza del análisis: 75%",
            "Sentimiento promedio: 0.25"
        ],
        chart_data={
            "yearly_mentions": {"2020": 5, "2021": 12, "2022": 15, "2023": 10},
            "phase_position": {"x": 15, "y": 30},
            "total_mentions": 42
        },
        news_results=mock_results
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # ✅ Ubicación correcta
from pydantic import BaseModel
from typing import List
import requests
import re
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"], # ✅ Puerto correcto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SearchTerm(BaseModel):
    value: str
    operator: str = "AND"
    exact_match: bool = False

class HypeCycleRequest(BaseModel):
    search_terms: List[SearchTerm]
    min_year: int = 2015

class HypeCycleResponse(BaseModel):
    success: bool
    phase: str
    confidence: float
    total_mentions: int
    insights: List[str]
    chart_data: dict

def build_google_query(topics, min_year=None):
    """Construye query de búsqueda"""
    if not topics:
        return ""
    
    parts = []
    for i, topic in enumerate(topics):
        value = topic.value.strip()
        if not value:
            continue
            
        if topic.exact_match:
            term = f'"{value}"'
        else:
            term = value
        
        parts.append(term)
        
        # Añadir operador si no es el último
        if i < len(topics) - 1:
            parts.append(f" {topic.operator} ")
    
    query = "".join(parts)
    
    if min_year:
        query += f" after:{min_year}"
    
    return query

def perform_news_search(query, serp_api_key):
    """Búsqueda básica con SerpAPI"""
    try:
        url = "https://serpapi.com/search"
        params = {
            "api_key": serp_api_key,
            "q": query,
            "tbm": "nws",
            "num": 100,
            "gl": "us",
            "hl": "en"
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        results = []
        for item in data.get("news_results", []):
            # Extraer año de la fecha
            year = extract_year(item.get("date", ""))
            
            results.append({
                "title": item.get("title", ""),
                "snippet": item.get("snippet", ""),
                "date": item.get("date", ""),
                "year": year,
                "source": item.get("source", ""),
                "sentiment": 0.1  # Placeholder - en MVP no calculamos sentiment real
            })
        
        return True, results
        
    except Exception as e:
        print(f"Error in search: {str(e)}")  # Debug
        return False, str(e)

def extract_year(date_str):
    """Extrae año de string de fecha"""
    if not date_str:
        return datetime.now().year
    
    # Buscar año en el string
    year_match = re.search(r'20\d{2}', date_str)
    if year_match:
        return int(year_match.group())
    
    return datetime.now().year

def analyze_hype_cycle(news_results):
    """Análisis básico del Hype Cycle"""
    if not news_results:
        return None
    
    # Agrupar por año y contar menciones
    yearly_mentions = {}
    for result in news_results:
        year = result["year"]
        if year not in yearly_mentions:
            yearly_mentions[year] = 0
        yearly_mentions[year] += 1
    
    # Determinar fase básica
    total_mentions = len(news_results)
    recent_years = [year for year in yearly_mentions.keys() if year >= 2020]
    recent_mentions = sum(yearly_mentions.get(year, 0) for year in recent_years)
    
    # Lógica simple para determinar fase
    if total_mentions < 20:
        phase = "Pre-Innovation Trigger"
        confidence = 0.4
    elif recent_mentions > total_mentions * 0.6:
        if total_mentions > 100:
            phase = "Peak of Inflated Expectations"
            confidence = 0.8
        else:
            phase = "Innovation Trigger"
            confidence = 0.7
    elif recent_mentions < total_mentions * 0.3:
        phase = "Trough of Disillusionment"
        confidence = 0.6
    else:
        phase = "Slope of Enlightenment"
        confidence = 0.5
    
    # Datos para el gráfico
    chart_data = {
        "yearly_mentions": yearly_mentions,
        "phase_position": get_phase_position(phase),
        "total_mentions": total_mentions
    }
    
    return {
        "phase": phase,
        "confidence": confidence,
        "total_mentions": total_mentions,
        "chart_data": chart_data
    }

def get_phase_position(phase):
    """Posiciones en la curva del Hype Cycle"""
    positions = {
        "Pre-Innovation Trigger": {"x": 5, "y": 10},
        "Innovation Trigger": {"x": 15, "y": 30},
        "Peak of Inflated Expectations": {"x": 30, "y": 85},
        "Trough of Disillusionment": {"x": 55, "y": 20},
        "Slope of Enlightenment": {"x": 75, "y": 50},
        "Plateau of Productivity": {"x": 90, "y": 65}
    }
    return positions.get(phase, {"x": 50, "y": 50})

def generate_insights(hype_data):
    """Genera insights básicos"""
    phase = hype_data["phase"]
    confidence = hype_data["confidence"]
    total_mentions = hype_data["total_mentions"]
    
    insights = []
    
    if phase == "Innovation Trigger":
        insights.append("🚀 Tecnología emergente con potencial de crecimiento")
        insights.append("⚠️ Alto riesgo - Pocos casos de uso demostrados")
    elif phase == "Peak of Inflated Expectations":
        insights.append("📈 Máximo nivel de expectativas en medios")
        insights.append("⏳ Probable declive en próximos 2-3 años")
    elif phase == "Trough of Disillusionment":
        insights.append("📉 Fase de desilusión - Expectativas más realistas")
        insights.append("💡 Buen momento para inversión a largo plazo")
    elif phase == "Slope of Enlightenment":
        insights.append("📊 Maduración gradual de la tecnología")
        insights.append("✅ Casos de uso más claros y beneficios demostrados")
    elif phase == "Plateau of Productivity":
        insights.append("🏆 Tecnología madura y ampliamente adoptada")
        insights.append("💼 ROI demostrado y riesgos controlados")
    
    if confidence > 0.7:
        insights.append("✅ Alta confianza en el análisis")
    elif confidence < 0.5:
        insights.append("⚠️ Confianza limitada - Se requieren más datos")
    
    insights.append(f"📊 Total de menciones analizadas: {total_mentions}")
    
    return insights

@app.post("/api/hypecycle/analyze", response_model=HypeCycleResponse)
async def analyze_hypecycle(request: HypeCycleRequest):
    serp_api_key = os.getenv("SERP_API_KEY")
    
    if not serp_api_key:
        raise HTTPException(status_code=500, detail="SERP_API_KEY no configurada")
    
    # Construir query
    google_query = build_google_query(request.search_terms, request.min_year)
    
    if not google_query:
        raise HTTPException(status_code=400, detail="Query vacía")
    
    print(f"Searching for: {google_query}")  # Debug
    
    # Realizar búsqueda
    success, results = perform_news_search(google_query, serp_api_key)
    
    if not success:
        raise HTTPException(status_code=400, detail=f"Error en búsqueda: {results}")
    
    print(f"Found {len(results) if isinstance(results, list) else 0} results")  # Debug
    
    # Analizar Hype Cycle
    hype_data = analyze_hype_cycle(results)
    
    if not hype_data:
        raise HTTPException(status_code=400, detail="No se pudieron procesar los resultados")
    
    # Generar insights
    insights = generate_insights(hype_data)
    
    return HypeCycleResponse(
        success=True,
        phase=hype_data["phase"],
        confidence=hype_data["confidence"],
        total_mentions=hype_data["total_mentions"],
        insights=insights,
        chart_data=hype_data["chart_data"]
    )

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "CycleAI Backend is running"}

# ✅ Endpoint de prueba sin API key
@app.get("/api/test")
async def test_endpoint():
    return {
        "success": True,
        "phase": "Innovation Trigger",
        "confidence": 0.75,
        "total_mentions": 42,
        "insights": [
            "🚀 Tecnología emergente con potencial de crecimiento",
            "⚠️ Alto riesgo - Pocos casos de uso demostrados",
            "📊 Total de menciones analizadas: 42"
        ],
        "chart_data": {
            "yearly_mentions": {"2020": 5, "2021": 12, "2022": 15, "2023": 10},
            "phase_position": {"x": 15, "y": 30},
            "total_mentions": 42
        }
    }
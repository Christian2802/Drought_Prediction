from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PredictionRequest(BaseModel):
    """Request body untuk prediksi"""
    station_id: str = Field(..., description="ID stasiun")
    station_name: str = Field(..., description="Nama stasiun")
    region_name: str = Field(..., description="Nama region")
    
    tn: float = Field(..., description="Temperatur minimum (°C)")
    tx: float = Field(..., description="Temperatur maksimum (°C)")
    tavg: float = Field(..., description="Temperatur rata-rata (°C)")
    rh_avg: float = Field(..., description="Kelembaban rata-rata (%)")
    precipitation: float = Field(..., description="Curah hujan (mm)")
    ss: float = Field(..., description="Durasi sinar matahari (jam)")
    ff_x: float = Field(..., description="Kecepatan angin maksimum (m/s)")
    ddd_car: str = Field(..., description="Arah angin dominan (N, S, E, W, etc)")
    
    latitude: Optional[float] = Field(None, description="Latitude stasiun")
    longitude: Optional[float] = Field(None, description="Longitude stasiun")

class PredictionResponse(BaseModel):
    """Response body untuk hasil prediksi"""
    id: Optional[int] = None
    station_id: str
    station_name: str
    region_name: str
    
    # Input features
    tn: float
    tx: float
    tavg: float
    rh_avg: float
    precipitation: float
    ss: float
    ff_x: float
    ddd_car: str
    
    # Predictions
    spi: float = Field(..., description="Standardized Precipitation Index")
    risk: str = Field(..., description="Tingkat risiko: low, medium, high")
    risk_score: float = Field(..., description="Confidence score (0-1)")
    
    # Metadata
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    created_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class HistoryResponse(BaseModel):
    """Response untuk history prediksi"""
    total: int = Field(..., description="Total prediksi dalam history")
    data: list[PredictionResponse]
    
class StationInfo(BaseModel):
    """Info stasiun"""
    station_id: str
    station_name: str
    region_name: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    model_loaded: bool
    database_connected: bool
    message: str

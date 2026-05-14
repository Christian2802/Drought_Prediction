import os
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# Database setup
DATABASE_URL = "sqlite:///./predictions.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class PredictionHistory(Base):
    """Model untuk menyimpan history prediksi"""
    __tablename__ = "prediction_history"
    
    id = Column(Integer, primary_key=True, index=True)
    station_id = Column(String, index=True)
    station_name = Column(String)
    region_name = Column(String)
    
    # Input features
    tn = Column(Float)  # Min temperature
    tx = Column(Float)  # Max temperature
    tavg = Column(Float)  # Avg temperature
    rh_avg = Column(Float)  # Relative humidity
    precipitation = Column(Float)  # Curah hujan
    ss = Column(Float)  # Sunshine duration
    ff_x = Column(Float)  # Max wind speed
    ddd_car = Column(String)  # Wind direction
    
    # Predictions
    spi = Column(Float)  # Standardized Precipitation Index
    risk = Column(String)  # Risk level: low, medium, high
    risk_score = Column(Float)  # Model confidence (0-1)
    
    # Metadata
    latitude = Column(Float)
    longitude = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    class Config:
        from_attributes = True

# Create tables
Base.metadata.create_all(bind=engine)

def get_db():
    """Dependency untuk mendapatkan database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

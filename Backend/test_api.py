"""
Test script untuk Drought Risk Prediction API
Jalankan backend dulu: python main_api.py
Kemudian jalankan ini: python test_api.py
"""

import requests
import json
from datetime import datetime
import time

BASE_URL = "http://localhost:8000"

def print_header(text):
    """Print formatted header"""
    print("\n" + "=" * 60)
    print(f"  {text}")
    print("=" * 60)

def print_result(response, title="Result"):
    """Print API response dengan format rapi"""
    print(f"\n{title}:")
    if response.status_code in [200, 201]:
        print(json.dumps(response.json(), indent=2, default=str))
    else:
        print(f"Status Code: {response.status_code}")
        print(json.dumps(response.json(), indent=2))

def test_health_check():
    """Test 1: Health Check"""
    print_header("TEST 1: HEALTH CHECK")
    
    response = requests.get(f"{BASE_URL}/health")
    print_result(response, "Health Status")
    
    if response.status_code != 200:
        print("\n❌ Health check failed! Backend mungkin belum ready.")
        return False
    
    data = response.json()
    if data['model_loaded'] and data['database_connected']:
        print("\n✅ Backend ready untuk testing!")
        return True
    else:
        print("\n⚠️ Ada komponen yang belum siap")
        return False

def test_prediction():
    """Test 2: Make Prediction"""
    print_header("TEST 2: MAKE PREDICTION")
    
    # Test data dari Jakarta
    test_data = {
        "station_id": "STN001",
        "station_name": "Jakarta-Kemayoran",
        "region_name": "DKI Jakarta",
        "tn": 23.5,           # Min temperature
        "tx": 32.1,           # Max temperature
        "tavg": 27.8,         # Avg temperature
        "rh_avg": 75.5,       # Humidity
        "precipitation": 125.5,  # Rainfall (mm)
        "ss": 6.2,            # Sunshine hours
        "ff_x": 8.5,          # Max wind speed
        "ddd_car": "N",       # Wind direction
        "latitude": -6.1751,
        "longitude": 106.8650
    }
    
    print("\nPrediksi input:")
    print(json.dumps(test_data, indent=2))
    
    response = requests.post(f"{BASE_URL}/predict", json=test_data)
    print_result(response, "Prediction Result")
    
    if response.status_code == 200:
        result = response.json()
        print(f"\n✅ Prediksi berhasil!")
        print(f"   Risk Level: {result['risk'].upper()}")
        print(f"   SPI: {result['spi']}")
        print(f"   Confidence: {result['risk_score']*100:.1f}%")
        return True
    else:
        print(f"\n❌ Prediksi gagal!")
        return False

def test_multiple_predictions():
    """Test 3: Multiple Predictions (Batch)"""
    print_header("TEST 3: MULTIPLE PREDICTIONS (BATCH)")
    
    stations = [
        {
            "station_id": "STN001",
            "station_name": "Jakarta-Kemayoran",
            "region_name": "DKI Jakarta",
            "tn": 23.5, "tx": 32.1, "tavg": 27.8,
            "rh_avg": 75.5, "precipitation": 125.5,
            "ss": 6.2, "ff_x": 8.5, "ddd_car": "N",
            "latitude": -6.1751, "longitude": 106.8650
        },
        {
            "station_id": "STN002",
            "station_name": "Bandung-Kemayoran",
            "region_name": "Jawa Barat",
            "tn": 19.2, "tx": 28.5, "tavg": 23.9,
            "rh_avg": 82.0, "precipitation": 45.0,
            "ss": 4.5, "ff_x": 5.2, "ddd_car": "SE",
            "latitude": -6.9147, "longitude": 107.6062
        },
        {
            "station_id": "STN003",
            "station_name": "Yogyakarta-Adisumarmo",
            "region_name": "DI Yogyakarta",
            "tn": 21.8, "tx": 30.2, "tavg": 26.0,
            "rh_avg": 70.0, "precipitation": 10.5,
            "ss": 8.5, "ff_x": 6.8, "ddd_car": "E",
            "latitude": -7.7956, "longitude": 110.4158
        }
    ]
    
    results = []
    for i, station in enumerate(stations, 1):
        print(f"\n[{i}/{len(stations)}] Prediksi {station['station_name']}...", end=" ")
        response = requests.post(f"{BASE_URL}/predict", json=station)
        
        if response.status_code == 200:
            result = response.json()
            results.append(result)
            print(f"✅ Risk: {result['risk'].upper()}")
        else:
            print(f"❌ Gagal")
        
        time.sleep(0.5)  # Delay untuk avoid rate limiting
    
    print(f"\n✅ Total prediksi berhasil: {len(results)}/{len(stations)}")
    return len(results) > 0

def test_get_history():
    """Test 4: Get Prediction History"""
    print_header("TEST 4: GET PREDICTION HISTORY")
    
    print("\nMengambil history dari STN001...")
    response = requests.get(
        f"{BASE_URL}/predict/history/STN001",
        params={"days": 30, "limit": 10}
    )
    print_result(response, "History Result")
    
    if response.status_code == 200:
        data = response.json()
        print(f"\n✅ Total records: {data['total']}")
        return data['total'] > 0
    else:
        print(f"\n❌ Gagal mengambil history")
        return False

def test_statistics():
    """Test 5: Get Statistics"""
    print_header("TEST 5: GET STATISTICS")
    
    # Risk distribution
    print("\n1. Risk Distribution:")
    response = requests.get(f"{BASE_URL}/stats/risk-distribution?days=30")
    print_result(response)
    
    # Average SPI
    print("\n2. Average SPI:")
    response = requests.get(f"{BASE_URL}/stats/average-spi?days=30")
    print_result(response)
    
    return True

def test_filter_history():
    """Test 6: Filter History"""
    print_header("TEST 6: FILTER HISTORY BY RISK LEVEL")
    
    print("\nMengambil prediksi dengan risk level 'high'...")
    response = requests.get(
        f"{BASE_URL}/predict/history",
        params={"risk": "high", "days": 30, "limit": 5}
    )
    print_result(response, "High Risk Predictions")
    
    if response.status_code == 200:
        data = response.json()
        print(f"\n✅ Total high-risk predictions: {data['total']}")
    
    return True

def main():
    """Run all tests"""
    print("\n")
    print("╔" + "=" * 58 + "╗")
    print("║" + " " * 58 + "║")
    print("║" + "  DROUGHT RISK PREDICTION API - TEST SUITE".center(58) + "║")
    print("║" + " " * 58 + "║")
    print("╚" + "=" * 58 + "╝")
    
    print("\n📝 Pastikan backend sudah running di http://localhost:8000")
    print("   Jalankan: python main_api.py (di terminal lain)\n")
    
    try:
        # Test 1
        if not test_health_check():
            print("\n❌ Backend tidak siap. Silakan jalankan backend terlebih dahulu!")
            print("   Command: python main_api.py")
            return
        
        # Test 2
        test_prediction()
        
        # Test 3
        time.sleep(1)
        test_multiple_predictions()
        
        # Test 4
        time.sleep(1)
        test_get_history()
        
        # Test 5
        time.sleep(1)
        test_statistics()
        
        # Test 6
        time.sleep(1)
        test_filter_history()
        
        # Summary
        print_header("TEST SUITE COMPLETED ✅")
        print("\n🎉 Semua test berhasil dijalankan!")
        print("\n📍 API Documentation: http://localhost:8000/docs")
        print("📍 ReDoc: http://localhost:8000/redoc")
        print("📍 Base URL: http://localhost:8000")
        
    except requests.exceptions.ConnectionError:
        print("\n❌ Tidak bisa connect ke backend!")
        print("   Pastikan backend sudah running: python main_api.py")
    except Exception as e:
        print(f"\n❌ Error: {e}")

if __name__ == "__main__":
    main()

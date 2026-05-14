#!/usr/bin/env python
"""
QUICK START SCRIPT
Jalankan script ini untuk setup dan test backend dengan sekali klik!

Usage:
    python quick_start.py

Atau langsung:
    1. pip install -r requirements.txt
    2. python main_api.py
    3. Buka http://localhost:8000/docs di browser
"""

import subprocess
import sys
import os
import time

def print_title(text):
    print("\n" + "=" * 70)
    print(f"  {text}")
    print("=" * 70 + "\n")

def check_python_version():
    """Check Python version"""
    print_title("✓ Checking Python Version")
    version = sys.version_info
    print(f"Python {version.major}.{version.minor}.{version.micro}")
    
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8+ required!")
        return False
    
    print("✅ Python version OK\n")
    return True

def check_model_files():
    """Check apakah model files exist"""
    print_title("✓ Checking Model Files")
    
    model_file = os.path.join('models', 'rf_drought_model.pkl')
    encoder_file = os.path.join('models', 'label_encoder_ddd_car.pkl')
    
    model_exists = os.path.exists(model_file)
    encoder_exists = os.path.exists(encoder_file)
    
    print(f"Model file: {'✅' if model_exists else '❌'} {model_file}")
    print(f"Encoder file: {'✅' if encoder_exists else '❌'} {encoder_file}")
    
    if not model_exists or not encoder_exists:
        print("\n⚠️  Model files tidak ditemukan!")
        print("   Jalankan Main.ipynb terlebih dahulu untuk generate model.")
        return False
    
    print("\n✅ Model files OK\n")
    return True

def install_dependencies():
    """Install dependencies"""
    print_title("📦 Installing Dependencies")
    
    print("Ini mungkin memakan waktu beberapa menit...\n")
    
    try:
        subprocess.check_call([
            sys.executable, "-m", "pip", "install", "-q", "-r", "requirements.txt"
        ])
        print("\n✅ Dependencies installed successfully\n")
        return True
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Installation failed: {e}")
        return False

def main():
    """Main setup flow"""
    print("""
    ╔════════════════════════════════════════════════════════════════════╗
    ║                                                                    ║
    ║         🌧️  DROUGHT RISK PREDICTION - BACKEND SETUP  🌧️          ║
    ║                                                                    ║
    ╚════════════════════════════════════════════════════════════════════╝
    """)
    
    # Step 1: Check Python
    if not check_python_version():
        return False
    
    # Step 2: Check Model Files
    if not check_model_files():
        return False
    
    # Step 3: Install Dependencies
    if not install_dependencies():
        return False
    
    # Success!
    print_title("🎉 SETUP COMPLETE!")
    
    print("""
    Next Steps:
    
    1️⃣  START BACKEND
        python main_api.py
    
    2️⃣  OPEN IN BROWSER
        http://localhost:8000/docs
        
    3️⃣  USE WEB UI
        Open: frontend_example.html
        
    4️⃣  TEST API
        python test_api.py
    
    ─────────────────────────────────────────────────────────────────
    
    📚 Documentation:
       - Backend Guide: BACKEND_README.md
       - Full Setup: SETUP_GUIDE.md
    
    ─────────────────────────────────────────────────────────────────
    """)
    
    print("\n✅ Ready to use! 🚀\n")
    
    # Ask if user wants to start backend
    response = input("Start backend now? (y/n): ").strip().lower()
    
    if response == 'y':
        print("\n" + "=" * 70)
        print("  Starting Backend...")
        print("=" * 70)
        print("\n📍 API will run at: http://localhost:8000")
        print("📍 Documentation: http://localhost:8000/docs")
        print("\nPress Ctrl+C to stop\n")
        time.sleep(2)
        
        try:
            subprocess.call([sys.executable, "main_api.py"])
        except KeyboardInterrupt:
            print("\n\n✅ Backend stopped\n")
    
    return True

if __name__ == "__main__":
    try:
        success = main()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)

import google.generativeai as genai

# PASTE YOUR KEY HERE
API_KEY = "AIzaSyA0wuoFbB6gDjeFUTRgJAMelxufrwjVRnk" 

genai.configure(api_key=API_KEY)

print("🔍 Searching for available models...")
try:
    found = False
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"✅ AVAILABLE: {m.name}")
            found = True
    
    if not found:
        print("❌ No chat models found. Check API Key permissions.")
        
except Exception as e:
    print(f"❌ Error: {e}")
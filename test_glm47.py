#!/usr/bin/env python3
"""
GLM-4.7 Test Script for Boss Rizwan
Test GLM-4.7 API integration
"""

import requests
import json

def test_glm47():
    """Test GLM-4.7 API connection"""
    print("🧪 Testing GLM-4.7 API...")
    
    # You need to set your actual API key here
    api_key = "your_glm_api_key_here"
    
    if api_key == "your_glm_api_key_here":
        print("⚠️  Please set your actual GLM API key first!")
        print("Get API key from: https://open.bigmodel.cn/")
        return False
    
    url = "https://open.bigmodel.cn/api/paas/v4/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "glm-4.7",
        "messages": [
            {"role": "user", "content": "Hello, I'm Boss Rizwan. Test GLM-4.7 in Chinese: 你好，请用中文回复"}
        ],
        "temperature": 0.7,
        "max_tokens": 100
    }
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ GLM-4.7 API Connection Successful!")
            print("🤖 Response:", result['choices'][0]['message']['content'])
            return True
        else:
            print(f"❌ API Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Connection Error: {e}")
        return False

if __name__ == "__main__":
    test_glm47()

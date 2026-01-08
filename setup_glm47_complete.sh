#!/bin/bash

# Complete GLM-4.7 Setup Script for Boss Rizwan
# This script configures GLM-4.7 integration with VS Code

echo "🌟 Complete GLM-4.7 Setup for Boss Rizwan"
echo "=========================================="
echo ""

# Function to check if VS Code is running
check_vscode() {
    if pgrep -f "code" > /dev/null; then
        echo "⚠️  VS Code is running. Please close VS Code first."
        echo "Press Enter to continue anyway..."
        read -r
    fi
}

# Function to create GLM API test script
create_glm_test() {
    cat > "/home/farah-yumman-zahid/test_glm47.py" << 'EOF'
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
EOF

    chmod +x "/home/farah-yumman-zahid/test_glm47.py"
    echo "✅ GLM-4.7 test script created"
}

# Function to setup API key configuration
setup_api_key() {
    echo ""
    echo "🔑 GLM-4.7 API Key Setup"
    echo "========================"
    echo ""
    echo "1. Visit: https://open.bigmodel.cn/"
    echo "2. Register/Login"
    echo "3. Get your API key"
    echo "4. Enter API key below (or press Enter to skip):"
    echo ""
    read -p "GLM API Key: " api_key
    
    if [ -n "$api_key" ]; then
        # Update VS Code settings with actual API key
        sed -i "s/your_glm_api_key_here/$api_key/g" /home/farah-yumman-zahid/.vscode/settings.json
        echo "✅ API key updated in VS Code settings"
        
        # Also create .env file
        cat > "/home/farah-yumman-zahid/.vscode/.env" << EOF
# GLM-4.7 Configuration for Boss Rizwan
GLM_API_KEY=$api_key
GLM_MODEL=glm-4.7
GLM_ENDPOINT=https://open.bigmodel.cn/api/paas/v4/chat/completions
EOF
        echo "✅ .env file created with API key"
    else
        echo "⚠️  API key setup skipped. You can configure it later."
    fi
}

# Function to verify setup
verify_setup() {
    echo ""
    echo "🔍 Verifying GLM-4.7 Setup"
    echo "=========================="
    
    # Check VS Code settings
    if grep -q "glm-4.7" /home/farah-yumman-zahid/.vscode/settings.json; then
        echo "✅ GLM-4.7 model configured in VS Code"
    else
        echo "❌ GLM-4.7 not found in VS Code settings"
    fi
    
    # Check Continue extension
    if code --list-extensions | grep -q "Continue.continue"; then
        echo "✅ Continue extension installed"
    else
        echo "❌ Continue extension missing"
    fi
    
    # Check Claude Code
    if code --list-extensions | grep -q "anthropic.claude-code"; then
        echo "✅ Claude Code extension installed"
    else
        echo "❌ Claude Code extension missing"
    fi
    
    # Check API key
    if ! grep -q "your_glm_api_key_here" /home/farah-yumman-zahid/.vscode/settings.json; then
        echo "✅ API key configured"
    else
        echo "⚠️  API key needs to be set"
    fi
}

# Function to open VS Code with instructions
open_vscode() {
    echo ""
    echo "🚀 Opening VS Code with GLM-4.7"
    echo "==============================="
    echo ""
    echo "📋 Usage Instructions for Boss Rizwan:"
    echo ""
    echo "🤖 Claude Code: Ctrl+Shift+C"
    echo "   - Complex problem solving"
    echo "   - Code explanations"
    echo "   - Debugging assistance"
    echo ""
    echo "🇨🇳 GLM-4.7: Ctrl+Shift+G"
    echo "   - Chinese language support"
    echo "   - Advanced reasoning"
    echo "   - Specific AI tasks"
    echo ""
    echo "⚡ GitHub Copilot: Ctrl+Shift+L"
    echo "   - Code completion"
    echo "   - Auto suggestions"
    echo "   - Daily coding assistance"
    echo ""
    echo "🧪 Test GLM-4.7: python3 ~/test_glm47.py"
    echo ""
    echo "🎯 Ready for Boss Rizwan's AI-Powered Development!"
    echo ""
    
    # Open VS Code
    cd /home/farah-yumman-zahid
    code .
}

# Main execution
main() {
    check_vscode
    create_glm_test
    setup_api_key
    verify_setup
    open_vscode
}

# Run main function
main
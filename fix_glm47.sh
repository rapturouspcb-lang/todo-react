# 🔧 GLM-4.7 DIAGNOSTIC & FIX SCRIPT for Boss Rizwan

echo "🔍 GLM-4.7 Diagnostic for Boss Rizwan"
echo "======================================="

# Check VS Code status
echo "📊 VS Code Status:"
if pgrep -f "code" > /dev/null; then
    echo "✅ VS Code is running"
    echo "📋 Active Extensions:"
    code --list-extensions | grep -E "(claude|continue|copilot)" | nl
else
    echo "❌ VS Code is not running"
    echo "🚀 Starting VS Code..."
    code . &
    sleep 3
fi

echo ""
echo "🔧 GLM-4.7 Configuration Check:"

# Check VS Code settings
if [ -f "/home/farah-yumman-zahid/.vscode/settings.json" ]; then
    echo "✅ VS Code settings file exists"
    echo "📋 GLM-4.7 Configuration:"
    grep -E "(continue|glm|zhipuai)" /home/farah-yumman-zahid/.vscode/settings.json | nl
else
    echo "❌ VS Code settings file missing"
fi

# Check API key status
echo ""
echo "🔑 API Key Status:"
if grep -q "your_glm_api_key_here" /home/farah-yumman-zahid/.vscode/settings.json; then
    echo "⚠️  GLM API key needs to be set"
    echo "📋 To fix:"
    echo "   1. Get API key from: https://open.bigmodel.cn/"
    echo "   2. Open VS Code: Ctrl+,"
    echo "   3. Search: continue.customAPIKey"
    echo "   4. Enter your API key"
else
    echo "✅ GLM API key appears to be configured"
fi

echo ""
echo "🧪 Test GLM-4.7 Connection:"

# Create simple test
cat > "/tmp/glm_test.py" << 'EOF'
import subprocess
import sys

# Test basic GLM-4.7 setup
def test_setup():
    print("🧪 Testing GLM-4.7 Setup...")
    
    # Check if requests is available
    try:
        import requests
        print("✅ requests module available")
    except ImportError:
        print("❌ requests module missing")
        try:
            subprocess.run([sys.executable, "-m", "pip", "install", "requests"], check=True)
            print("✅ requests installed")
            import requests
        except:
            print("❌ Cannot install requests")
            return False
    
    # Test API connectivity (without key)
    try:
        response = requests.get("https://open.bigmodel.cn/", timeout=5)
        if response.status_code == 200:
            print("✅ GLM API endpoint reachable")
        else:
            print("❌ GLM API endpoint unreachable")
    except Exception as e:
        print(f"❌ Network error: {e}")
    
    print("📋 GLM-4.7 Test Complete")
    return True

if __name__ == "__main__":
    test_setup()
EOF

python3 /tmp/glm_test.py

echo ""
echo "🎯 Quick Fix Commands for Boss Rizwan:"
echo "====================================="
echo ""
echo "🔧 Restart VS Code Extensions:"
echo "   Ctrl+Shift+P → 'Developer: Reload Window'"
echo ""
echo "🔑 Set GLM API Key:"
echo "   Ctrl+, → Search: continue.customAPIKey → Enter key"
echo ""
echo "🧪 Test GLM-4.7:"
echo "   Ctrl+Shift+G → Try GLM-4.7 in VS Code"
echo ""
echo "🤖 Test Claude Code:"
echo "   Ctrl+Shift+C → Try Claude Code"
echo ""
echo "⚡ Test GitHub Copilot:"
echo "   Ctrl+Shift+L → Try Copilot suggestion"
echo ""

echo "🌟 GLM-4.7 Status Summary:"
if code --list-extensions | grep -q "Continue.continue"; then
    echo "✅ Continue Extension: Installed"
else
    echo "❌ Continue Extension: Missing"
fi

if grep -q "glm-4.7" /home/farah-yumman-zahid/.vscode/settings.json; then
    echo "✅ GLM-4.7 Model: Configured"
else
    echo "❌ GLM-4.7 Model: Not configured"
fi

if ! grep -q "your_glm_api_key_here" /home/farah-yumman-zahid/.vscode/settings.json; then
    echo "✅ API Key: Set"
else
    echo "⚠️  API Key: Needs configuration"
fi

echo ""
echo "🎯 If still not working, run: code --help"
echo "📞 Or check: https://github.com/ContinueDev/Continue/issues"

# Cleanup
rm -f /tmp/glm_test.py

echo ""
echo "✨ Diagnostic Complete for Boss Rizwan! 🎯"
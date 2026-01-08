#!/usr/bin/env python3
"""
GLM-4.7 Integration Script for Boss Rizwan
Integrates Zhipu AI's GLM-4.7 model with VS Code and development environment
"""

import os
import json
import subprocess
import sys

def setup_glm_integration():
    """Setup GLM-4.7 integration with VS Code"""
    
    print("🌟 Setting up GLM-4.7 Integration for Boss Rizwan...")
    print()
    
    # Install GLM package (Zhipu AI)
    try:
        print("📦 Installing GLM Python package...")
        subprocess.run([sys.executable, "-m", "pip", "install", "zhipuai"], check=True)
        print("✅ GLM package installed successfully")
    except subprocess.CalledProcessError:
        print("⚠️ GLM package installation failed, continuing setup...")
    
    print()
    print("🔧 Configuring GLM-4.7 for VS Code...")
    
    # VS Code settings directory
    vscode_dir = os.path.expanduser("~/.vscode")
    settings_file = os.path.join(vscode_dir, "settings.json")
    
    # Create settings if not exists
    settings = {}
    if os.path.exists(settings_file):
        with open(settings_file, 'r') as f:
            settings = json.load(f)
    
    # Add GLM configuration
    settings.update({
        "continue.apiProvider": "zhipuai",
        "continue.model": "glm-4.7",
        "continue.temperature": 0.7,
        "continue.maxTokens": 4096,
        "continue.enableAutoComplete": True,
        "continue.customAPIKey": os.getenv("GLM_API_KEY", "your_glm_api_key_here"),
        "continue.endpoint": "https://open.bigmodel.cn/api/paas/v4/chat/completions"
    })
    
    # Save settings
    os.makedirs(vscode_dir, exist_ok=True)
    with open(settings_file, 'w') as f:
        json.dump(settings, f, indent=2)
    
    print("✅ VS Code settings updated for GLM-4.7")
    
    # Create environment file template
    env_file = os.path.expanduser("~/.vscode/.env")
    with open(env_file, 'w') as f:
        f.write("""# GLM-4.7 Configuration for Boss Rizwan
# Get your API key from: https://open.bigmodel.cn/

GLM_API_KEY=your_glm_api_key_here
GLM_MODEL=glm-4.7
GLM_ENDPOINT=https://open.bigmodel.cn/api/paas/v4/chat/completions
""")
    
    print("✅ Environment template created")
    
    print()
    print("📋 GLM-4.7 Setup Complete!")
    print()
    print("🔑 Next Steps:")
    print("1. Get API key from: https://open.bigmodel.cn/")
    print(f"2. Update API key in: {env_file}")
    print("3. Restart VS Code")
    print("4. Use Ctrl+Shift+G to activate GLM-4.7")
    print()
    print("🎯 GLM-4.7 Features:")
    print("• Chinese language support")
    print("• Advanced reasoning")
    print("• Code generation")
    print("• Multilingual capabilities")
    print()
    print("🚀 Opening VS Code with GLM-4.7 configured!")
    
    # Open VS Code
    subprocess.run(["code", "."])

if __name__ == "__main__":
    try:
        setup_glm_integration()
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
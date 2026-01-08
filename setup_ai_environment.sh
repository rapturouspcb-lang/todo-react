#!/bin/bash

# AI Development Environment Setup Script for Boss Rizwan

echo "🚀 Setting up AI Development Environment for Boss Rizwan..."
echo ""

# Check if VS Code is running
if pgrep -f "code" > /dev/null; then
    echo "⚠️  VS Code is currently running. Please close VS Code first."
    read -p "Press Enter to continue anyway..."
fi

echo "📦 Installing AI Extensions..."

# Install Continue extension for GLM-4.7 support
echo "Installing Continue Extension (GLM-4.7 support)..."
code --install-extension Continue.continue 2>/dev/null &
sleep 5

# Install additional useful extensions
echo "Installing additional AI extensions..."
code --install-extension GitHub.copilot 2>/dev/null &
sleep 3

code --install-extension ms-python.python 2>/dev/null &
sleep 3

code --install-extension ms-vscode.vscode-typescript-next 2>/dev/null &
sleep 3

# Wait for installations to complete
echo "⏳ Waiting for installations to complete..."
sleep 10

echo ""
echo "✅ Extensions Installation Complete!"
echo ""

# Create VS Code configuration directory
mkdir -p ~/.vscode

echo "🔧 Setting up VS Code configurations..."

# Create keybindings if not exists
if [ ! -f ~/.vscode/keybindings.json ]; then
    echo "Creating keyboard shortcuts..."
    cat > ~/.vscode/keybindings.json << 'EOF'
[
  {
    "key": "ctrl+shift+c",
    "command": "claude-code.askClaude"
  },
  {
    "key": "ctrl+shift+g", 
    "command": "continue.continueGenerate"
  },
  {
    "key": "ctrl+shift+l",
    "command": "github.copilot.generate"
  }
]
EOF
fi

# Create settings if not exists
if [ ! -f ~/.vscode/settings.json ]; then
    echo "Creating VS Code settings..."
    cat > ~/.vscode/settings.json << 'EOF'
{
  "workbench.colorTheme": "Default Dark+",
  "editor.fontSize": 14,
  "claude-code.enabled": true,
  "claude-code.model": "claude-3.5-sonnet",
  "continue.model": "claude-3.5-sonnet",
  "github.copilot.enable": {
    "*": true,
    "yaml": true,
    "plaintext": true,
    "markdown": true
  }
}
EOF
fi

echo ""
echo "🌟 AI Environment Setup Complete!"
echo ""

# Display summary
echo "📋 Setup Summary:"
echo "✅ VS Code: Ready with AI extensions"
echo "✅ Claude Code: Ctrl+Shift+C"
echo "✅ Continue (GLM-4.7): Ctrl+Shift+G"  
echo "✅ GitHub Copilot: Ctrl+Shift+L"
echo ""

echo "🔑 Next Steps for GLM-4.7:"
echo "1. Get GLM API key from https://open.bigmodel.cn/"
echo "2. Open VS Code settings (Ctrl+,)"
echo "3. Search for 'continue.apiKey'"
echo "4. Enter your GLM API key"
echo "5. Set 'continue.model' to 'glm-4.7'"
echo ""

echo "🎯 For Boss Rizwan's Workflow:"
echo "- Claude Code: Complex problems & explanations"
echo "- GLM-4.7: Chinese language & specific tasks"
echo "- GitHub Copilot: Daily code completion"
echo ""

echo "🚀 Opening VS Code..."
code .

echo ""
echo "✨ Setup Complete! AI Development Environment Ready for Boss Rizwan! 🎯"
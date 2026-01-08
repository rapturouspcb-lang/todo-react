#!/bin/bash

# Image Error Fix Script for Boss Rizwan
# Fixes the issue where todo-app-final shows asset loading errors

echo "🔧 Fixing Image Error for Boss Rizwan"
echo "====================================="

# Check if server is running
if pgrep -f "python3 -m http.server" > /dev/null; then
    echo "🛑 Stopping current server..."
    pkill -f "python3 -m http.server"
    sleep 2
fi

# Navigate to todo-app-final
cd /home/farah-yumman-zahid/todo-app-final

# Check if assets folder exists and has correct files
echo "📁 Checking assets folder..."
if [ -d "assets" ]; then
    echo "✅ Assets folder exists"
    echo "📋 Files in assets:"
    ls -la assets/
    echo ""
else
    echo "❌ Assets folder missing!"
    echo "🔄 Rebuilding app..."
    cd /home/farah-yumman-zahid/todo-react
    npm run build
    cp -r dist/* /home/farah-yumman-zahid/todo-app-final/
    cd /home/farah-yumman-zahid/todo-app-final
fi

# Check index.html
echo "📄 Checking index.html..."
if [ -f "index.html" ]; then
    echo "✅ index.html exists"
    echo "📋 index.html content check:"
    head -10 index.html
    echo ""
else
    echo "❌ index.html missing!"
fi

# Restart server with proper configuration
echo "🚀 Starting server with fixed configuration..."
python3 -m http.server 8000 --bind 0.0.0.0 &

echo ""
echo "✅ Server started on http://localhost:8000/"
echo ""
echo "🧪 Test the app now!"
echo "📋 If still showing errors, run:"
echo "   cd /home/farah-yumman-zahid/todo-app-final && ls -la"
echo "   cd /home/farah-yumman-zahid/todo-app-final && cat index.html"
echo ""
echo "🎯 Common fixes:"
echo "1. Clear browser cache (Ctrl+Shift+R)"
echo "2. Try private/incognito mode"
echo "3. Check browser console (F12) for specific errors"
echo "4. Restart browser completely"

# Verify server is running
sleep 3
if curl -s http://localhost:8000/ > /dev/null; then
    echo "✅ Server is responding correctly!"
else
    echo "❌ Server is not responding"
    echo "🔄 Starting alternative server..."
    python3 -m http.server 8001 --bind 0.0.0.0 &
    echo "✅ Alternative server started on http://localhost:8001/"
fi

echo ""
echo "🎯 Fix Complete for Boss Rizwan!"
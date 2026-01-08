#!/bin/bash
# Auto-start script for todo-app-final server

# Kill any existing servers on port 8000
pkill -f "python3 -m http.server 8000" 2>/dev/null

# Start the server in the background
cd /home/farah-yumman-zahid/todo-app-final
nohup python3 -m http.server 8000 --bind 0.0.0.0 > /dev/null 2>&1 &

echo "Todo app server started on http://localhost:8000"
echo "Process ID: $!"
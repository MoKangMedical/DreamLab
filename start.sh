#!/bin/bash
# DreamLab - 梦的解析平台 一键启动脚本
set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "🌙 DreamLab 启动中..."

# Kill existing processes
pkill -f "uvicorn.*8002" 2>/dev/null || true
pkill -f "next.*3002" 2>/dev/null || true
sleep 1

# Start backend
echo "📡 启动后端 (port 8003)..."
cd "$PROJECT_DIR"
python3 -m uvicorn backend.main:app --host 0.0.0.0 --port 8003 > /tmp/dreamlab-backend.log 2>&1 &
BACKEND_PID=$!

# Start frontend
echo "🎨 启动前端 (port 3002)..."
cd "$PROJECT_DIR/frontend"
npx next start -p 3002 > /tmp/dreamlab-frontend.log 2>&1 &
FRONTEND_PID=$!

sleep 3

# Verify
if kill -0 $BACKEND_PID 2>/dev/null; then
    echo "✅ 后端已启动: http://localhost:8002"
    echo "   API 文档: http://localhost:8002/docs"
else
    echo "❌ 后端启动失败，查看: /tmp/dreamlab-backend.log"
fi

if kill -0 $FRONTEND_PID 2>/dev/null; then
    echo "✅ 前端已启动: http://localhost:3002"
else
    echo "❌ 前端启动失败，查看: /tmp/dreamlab-frontend.log"
fi

echo ""
echo "🌙 DreamLab 已就绪！打开 http://localhost:3002 开始探索梦境"

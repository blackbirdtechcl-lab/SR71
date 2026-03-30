#!/bin/bash
set -e

SERVER="root@204.168.154.87"

echo "🚀 BLACKBIRD DEPLOY"
echo "==================="

# Git push
echo "📤 Git push..."
git add -A
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M')" || echo "Nothing to commit"
git push origin main

# Pull en servidor
echo "📡 Pull en servidor..."
ssh ${SERVER} << 'ENDSSH'
cd /root/blackbird
git pull origin main
source venv/bin/activate
pip install -r requirements.txt --quiet 2>/dev/null || true
echo "✅ Código actualizado"
ENDSSH

echo "✅ Deploy completo!"

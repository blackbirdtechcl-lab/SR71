#!/bin/bash
set -e

SERVER="root@204.168.154.87"

echo "🚀 BLACKBIRD DEPLOY"
echo "==================="

# Crear tarball
echo "📦 Empaquetando..."
tar czf /tmp/blackbird.tar.gz \
  --exclude='venv' \
  --exclude='__pycache__' \
  --exclude='.git' \
  --exclude='*.db' \
  *.py index.html DEPLOY.sh data/ files/ files3/ blackbird_skills/ 2>/dev/null || true

# Subir
echo "📤 Subiendo a servidor..."
scp /tmp/blackbird.tar.gz ${SERVER}:/root/

# Extraer en servidor
echo "📡 Desplegando..."
ssh ${SERVER} "cd /root/blackbird && tar xzf /root/blackbird.tar.gz && rm /root/blackbird.tar.gz"

echo "✅ Deploy completo!"

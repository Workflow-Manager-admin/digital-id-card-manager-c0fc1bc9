#!/bin/bash
cd /home/kavia/workspace/code-generation/digital-id-card-manager-c0fc1bc9/id_card_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


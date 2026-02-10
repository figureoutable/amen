#!/bin/bash
# Double-click this file to start the app and open it in your browser.
# Keep this window open while you use the app.

cd "$(dirname "$0")"

echo "Starting the app..."
npm run dev &
PID=$!
sleep 18
echo "Opening http://localhost:3000 in your browser..."
open "http://localhost:3000"
wait $PID

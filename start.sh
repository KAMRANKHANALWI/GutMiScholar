#!/bin/bash

echo "Starting Backend..."
cd backend
./development.sh &
BACKEND_PID=$!

echo "Starting Frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

wait
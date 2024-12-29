#!/bin/bash

echo "Installing dependencies..."
npm install --force

echo "Building..."
npm run build

echo "Starting server..."
npm run server
#!/bin/bash

echo "Installing dependencies..."
npm install --force

echo "Building..."
npm run build

echo "Starting workers..."
npm run worker
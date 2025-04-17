#!/bin/bash
# Debug script to verify directory structure before build

echo "Current directory: $(pwd)"
echo "Listing all files and directories:"
ls -la

echo "Checking for app directory:"
if [ -d "app" ]; then
  echo "app directory exists"
  echo "Contents of app directory:"
  ls -la app
else
  echo "app directory does not exist!"
fi

echo "Checking for pages directory:"
if [ -d "pages" ]; then
  echo "pages directory exists"
  echo "Contents of pages directory:"
  ls -la pages
else
  echo "pages directory does not exist!"
fi

echo "Running Next.js build..."
npm run build

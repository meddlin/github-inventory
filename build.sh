#!/bin/bash

# Build script for GitHub CLI using PyInstaller
# This script creates a single binary executable

set -e  # Exit on any error

echo "🔨 Building GitHub Inventory CLI binary..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf build/ dist/

# Install/update dependencies
echo "📦 Installing dependencies..."
# Use the virtual environment's pip if available, otherwise use system pip
if [ -f "venv/bin/pip" ]; then
    ./venv/bin/pip install -r requirements.txt
    ./venv/bin/pip install -r requirements-dev.txt
    ./venv/bin/pip install pyinstaller
else
    pip install -r requirements.txt
    pip install -r requirements-dev.txt
    pip install pyinstaller
fi

# Build the binary using PyInstaller
echo "⚙️  Building binary with PyInstaller..."
# Use the virtual environment's Python if available, otherwise use system Python
if [ -f "venv/bin/pyinstaller" ]; then
    ./venv/bin/pyinstaller github.spec
else
    pyinstaller github.spec
fi

# Check if build was successful
if [ -f "dist/github" ]; then
    echo "✅ Build successful!"
    echo "📁 Binary location: dist/github"
    echo "📊 Binary size: $(du -h dist/github | cut -f1)"
    echo ""
    echo "🚀 You can now:"
    echo "   - Copy dist/github to your Docker image"
    echo "   - Run ./dist/github --help to test locally"
else
    echo "❌ Build failed!"
    exit 1
fi

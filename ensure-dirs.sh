#!/bin/bash

# Create the public/images directory if it doesn't exist
mkdir -p public/images
echo "Ensured public/images directory exists"

# List available images (if any)
echo "Available images in public/images:"
ls -la public/images/

# Check if the specific image exists
if [ -f "public/images/mypic1.png" ]; then
  echo "mypic1.png exists"
else
  echo "WARNING: mypic1.png does not exist in public/images/ - please add it"
fi

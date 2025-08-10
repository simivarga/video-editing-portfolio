#!/bin/bash

# Video Compression Script
# This script compresses videos to be under 50MB while maintaining good quality

echo "🎬 Starting video compression..."
echo "Target: Under 50MB per video"
echo ""

# Create compressed videos directory
mkdir -p src/videos/compressed

# Function to compress a single video
compress_video() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local output_file="src/videos/compressed/${filename%.*}_compressed.mp4"
    
    echo "📹 Processing: $filename"
    
    # Get original file size
    local original_size=$(du -h "$input_file" | cut -f1)
    echo "   Original size: $original_size"
    
    # Compress video with H.264 codec, optimized for web
    # Using CRF (Constant Rate Factor) for quality control
    ffmpeg -i "$input_file" \
        -c:v libx264 \
        -preset medium \
        -crf 28 \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -y \
        "$output_file"
    
    # Check if compression was successful
    if [ $? -eq 0 ]; then
        local compressed_size=$(du -h "$output_file" | cut -f1)
        echo "   ✅ Compressed size: $compressed_size"
        
        # Check if file is under 50MB
        local size_bytes=$(du -b "$output_file" | cut -f1)
        local size_mb=$((size_bytes / 1024 / 1024))
        
        if [ $size_mb -le 50 ]; then
            echo "   🎯 Success: Under 50MB ($size_mb MB)"
        else
            echo "   ⚠️  Warning: Still over 50MB ($size_mb MB)"
            echo "   🔄 Trying more aggressive compression..."
            
            # More aggressive compression
            ffmpeg -i "$input_file" \
                -c:v libx264 \
                -preset slower \
                -crf 32 \
                -c:a aac \
                -b:a 96k \
                -movflags +faststart \
                -y \
                "$output_file"
            
            local final_size=$(du -h "$output_file" | cut -f1)
            local final_size_bytes=$(du -b "$output_file" | cut -f1)
            local final_size_mb=$((final_size_bytes / 1024 / 1024))
            echo "   ✅ Final size: $final_size ($final_size_mb MB)"
        fi
    else
        echo "   ❌ Compression failed for $filename"
    fi
    
    echo ""
}

# Process all MP4 files in src/videos/
for video in src/videos/*.mp4; do
    if [ -f "$video" ]; then
        compress_video "$video"
    fi
done

echo "🎉 Compression complete!"
echo ""
echo "📁 Compressed videos are in: src/videos/compressed/"
echo ""
echo "📊 Summary:"
echo "Original videos:"
ls -lh src/videos/*.mp4
echo ""
echo "Compressed videos:"
ls -lh src/videos/compressed/*.mp4 2>/dev/null || echo "No compressed videos found"

# 1. Ensure it's square
#

# gemini-3-pro-image-preview
MODEL="gemini-2.5-flash-image"
output=$(curl -s "https://generativelanguage.googleapis.com/v1beta/models/$MODEL:generateContent" \
    -H "x-goog-api-key: $IMAGE_AI_API_KEY" \
    -H 'Content-Type: application/json' \
    -X POST \
    -d '{
      "contents": [{
        "parts": [
          {"text": "Create a picture of a futuristic banana with neon lights in a cyberpunk city."}
        ]
      }]
    }')

echo "$output" | jq -r '.candidates[0].content.parts[0].inlineData.data' | base64 -d > image.png

# mkdir ./output

# 2. Create .ico version
# ./magick image.png -define icon:auto-resize=256,128,64,48,32,16 output/favicon.ico
# ./magick image.png -resize 512x512 output/icon.png
# ./magick image.png -resize 180x180 -background white -alpha remove -alpha off output/apple-icon.png


#
# ./magick -size 1200x630 xc:black \( og-image.png -resize 460x460 \) -gravity center -composite opengraph-image.png

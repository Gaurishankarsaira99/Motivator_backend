from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Replace with your YouTube API Key
API_KEY = "AIzaSyAe1crH7_my7noL9BWKx_hnJshwb2PTUuU"

@app.route('/search', methods=['GET'])
def search_videos():
    query = request.args.get('q', 'Motivational videos')  # Default search = "Motivation"
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={query}&type=video&maxResults=10&key={API_KEY}"
    
    response = requests.get(url)
    data = response.json()

    videos = []
    for item in data["items"]:
        video = {
            "title": item["snippet"]["title"],
            "videoId": item["id"]["videoId"],
            "thumbnail": item["snippet"]["thumbnails"]["medium"]["url"],
            "channel": item["snippet"]["channelTitle"],
            "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}"
        }
        videos.append(video)

    return jsonify(videos)

import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Default to 5000 for local testing
    app.run(host="0.0.0.0", port=port)
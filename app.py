from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
import os
import frontmatter
from pathlib import Path

app = Flask(__name__)
CORS(app)  # Enable CORS for development

# Configure static file serving for production
static_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frontend', 'dist')
app.static_folder = static_folder

@app.route('/api/content/posts/<slug>')
def get_post(slug):
    try:
        post_path = Path('content/blogs/posts') / f'{slug}.md'
        if not post_path.exists():
            return jsonify({'error': 'Post not found'}), 404
            
        # Read and return the markdown content
        with open(post_path) as f:
            post = frontmatter.load(f)
            return jsonify({
                'content': post.content,
                'metadata': post.metadata
            })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/content/posts')
def get_posts():
    try:
        posts = []
        posts_dir = Path('content/blogs/posts')
        
        for post_file in posts_dir.glob('*.md'):
            with open(post_file) as f:
                post = frontmatter.load(f)
                posts.append({
                    'slug': post_file.stem,
                    'title': post.metadata.get('title'),
                    'date': post.metadata.get('date'),
                    'description': post.metadata.get('description'),
                    'tags': post.metadata.get('tags', [])
                })
        
        # Sort posts by date (newest first)
        posts.sort(key=lambda x: x['date'], reverse=True)
        return jsonify(posts)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Serve React app in production
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path and os.path.exists(os.path.join(static_folder, path)):
        return send_from_directory(static_folder, path)
    return send_from_directory(static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000) 
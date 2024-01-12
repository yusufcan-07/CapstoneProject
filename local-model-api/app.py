from flask import Flask, request, jsonify
from werkzeug.exceptions import HTTPException
from pydantic import BaseModel, ValidationError
from transformers import pipeline
from functools import lru_cache
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class NewsItem(BaseModel):
    content: str

@lru_cache(maxsize=50)
def load_model(model_name):
    model = pipeline("sentiment-analysis", model=model_name, tokenizer=model_name)
    return model

model_name = "savasy/bert-base-turkish-sentiment-cased"
nlp = load_model(model_name)

@app.route('/analyze-news/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def analyze_news():
    if request.method == 'POST':
        try:
            data = request.get_json()
            item = NewsItem(**data)
            result = nlp(item.content)
            return jsonify(result)
        except ValidationError as e:
            return jsonify({'error': str(e)}), 400
        except Exception as e:
            return jsonify({'error': 'An unexpected error occurred', 'details': str(e)}), 500
    else:
        return jsonify({'error': 'Invalid operation. This endpoint only supports POST requests.'}), 405

@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    response = e.get_response()
    response.data = jsonify({
        'code': e.code,
        'name': e.name,
        'description': e.description,
    })
    response.content_type = "application/json"
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)


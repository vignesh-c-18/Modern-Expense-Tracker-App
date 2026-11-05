from flask import Flask
from flask_cors import CORS
from models import db
from routes import expenses_bp
import os

app = Flask(__name__)
@app.route('/')
def home():
    return {"message": "Flask backend is running!"}
# Enable CORS for the React frontend
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configure SQLite database in the backend folder
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Register blueprints for API routes
app.register_blueprint(expenses_bp, url_prefix='/api')

if __name__ == '__main__':
    with app.app_context():
        # Create database tables if they don't exist
        db.create_all()
    # Run the Flask app
    app.run(debug=True, port=5000)

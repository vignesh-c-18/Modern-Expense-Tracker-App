from flask import Blueprint, request, jsonify
from models import db, Expense

expenses_bp = Blueprint('expenses', __name__)

@expenses_bp.route('/expenses', methods=['GET'])
def get_expenses():
    # Fetch all expenses, ordered by date descending
    expenses = Expense.query.order_by(Expense.date.desc()).all()
    return jsonify([expense.to_dict() for expense in expenses])

@expenses_bp.route('/expenses', methods=['POST'])
def add_expense():
    data = request.get_json()
    
    # Basic input validation
    required_fields = ['title', 'amount', 'category', 'date']
    if not data or not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields: title, amount, category, date'}), 400
        
    try:
        new_expense = Expense(
            title=data['title'].strip(),
            amount=float(data['amount']),
            category=data['category'].strip(),
            date=data['date'].strip()
        )
        db.session.add(new_expense)
        db.session.commit()
        return jsonify(new_expense.to_dict()), 201
    except ValueError:
        return jsonify({'error': 'Invalid amount, must be a number'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@expenses_bp.route('/expenses/<int:id>', methods=['PUT'])
def update_expense(id):
    expense = Expense.query.get_or_404(id)
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided for update'}), 400

    if 'title' in data:
        expense.title = data['title'].strip()
    if 'amount' in data:
        try:
            expense.amount = float(data['amount'])
        except ValueError:
            return jsonify({'error': 'Invalid amount, must be a number'}), 400
    if 'category' in data:
        expense.category = data['category'].strip()
    if 'date' in data:
        expense.date = data['date'].strip()
        
    try:
        db.session.commit()
        return jsonify(expense.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@expenses_bp.route('/expenses/<int:id>', methods=['DELETE'])
def delete_expense(id):
    expense = Expense.query.get_or_404(id)
    try:
        db.session.delete(expense)
        db.session.commit()
        return jsonify({'message': 'Expense deleted successfully', 'id': id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

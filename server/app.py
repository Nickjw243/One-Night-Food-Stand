#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Users, Recipes, Swipes

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/users/<int:id>', methods = ['DELETE'])
def users(id):
    user = Users.query.filter(Users.id == id).first()
    db.session.delete(user)
    db.session.commit()

    res = make_response(
        {},
        201
    )
    return res

if __name__ == '__main__':
    app.run(port=5555, debug=True)


#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, request
from flask_restful import Resource
from flask_cors import cross_origin

# Local imports
from config import app, db, api
# Add your model imports
from models import db, Users, Recipes, Swipes


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/swipes', methods = ['GET', 'POST'])
def swipes():
    if request.method == "GET":
        swipes = Swipes.query.all()
        swipes_dict = [swipe.to_dict(rules = ('-recipe', '-user')) for swipe in swipes]
        response = make_response(
            swipes_dict,
            200
        )
    elif request.method == 'POST':
        form_data = request.get_json()
        new_swipes = Swipes(
            swipe = form_data['swipe'],
            user_id = form_data['user_id'],
            recipe_id = form_data['recipe_id']
        )
        db.session.add(new_swipes)
        db.session.commit()
        response = make_response(
            new_swipes.to_dict(rules=('-recipe','-user',)),
            201
        )
    return response

@app.route('/recipes/<int:id>', methods = ['GET'])
def recipe_by_id(id):
    recipe = Recipes.query.filter(Recipes.id == id).first()

    if recipe:
        response = make_response(
            recipe.to_dict(rules = ('-swipes', )),
            200
        )
    else:
        response = make_response(
            { 'error': 'Recipe not found' },
            404
        )
    
    return response

@app.route('/recipes', methods = ['GET'])
def recipes():

    recipes = Recipes.query.filter().all()

    recipes_dict = [recipe.to_dict() for recipe in recipes]

    response = make_response(
        recipes_dict,
        200
    )

    return response

##__________TESTING REC BY USERID__________##
@app.route('/hello/<int:userID>', methods=['GET'])
def get_recipes_for_swipes(userID):
    swipeable_recipes = []
    all_recipes = Recipes.query.all()
    for recipe in all_recipes:
        has_swiped = any(swipe.user_id == userID for swipe in recipe.swipes)
        if not has_swiped:
            swipeable_recipes.append(recipe.to_dict(rules=('-swipes','-users',)))
    
    response = make_response(
        swipeable_recipes,
        200
    )
    return response
##__________TESTING REC BY USERID__________##

@app.route('/recipes/<string:occasion>', methods = ['GET'])
def recipes_occasion(occasion):

    recipes = Recipes.query.filter(Recipes.occasion == occasion).all()

    recipes_dict = [recipe.to_dict(rules = ('-swipes', )) for recipe in recipes]

    response = make_response(
        recipes_dict,
        200
    )

    return response

@app.route('/recipes/<string:weather>', methods = ['GET'])
def recipes_weather(weather):

    recipes = Recipes.query.filter(Recipes.weather == weather).all()

    recipes_dict = [recipe.to_dict(rules = ('-swipes', )) for recipe in recipes]

    response = make_response(
        recipes_dict,
        200
    )

    return response

@app.route('/recipes/<string:protein>', methods = ['GET'])
def recipes_protein(protein):

    recipes = Recipes.query.filter(Recipes.protein == protein).all()

    recipes_dict = [recipe.to_dict(rules = ('-swipes', )) for recipe in recipes]

    response = make_response(
        recipes_dict,
        200
    )

    return response

@app.route('/recipes/<string:difficulty>', methods = ['GET'])
def recipes_difficulty(difficulty):

    recipes = Recipes.query.filter(Recipes.difficulty == difficulty).all()

    recipes_dict = [recipe.to_dict(rules = ('-swipes', )) for recipe in recipes]

    response = make_response(
        recipes_dict,
        200
    )

    return response

@app.route('/swipes/<int:id>', methods = ['PATCH'])
def swipe_by_id(id):
    swipe = Swipes.query.filter(Swipes.id == id).first()

    if swipe:
        try:
            form_data = request.get_json()

            for attr in form_data:
                setattr(swipe, attr, form_data[attr])
            
            db.session.commit()

            response = make_response(
                swipe.to_dict(rules = ('-user', '-recipe')),
                202
            )
        except ValueError:
            response = make_response(
                { 'errors': ['validation errors'] },
                400
            )
    else:
        response = make_response(
            { 'error': 'Swipe not found' },
            404
        )
    
    return response

@app.route('/users/<int:id>', methods = ['GET','DELETE'])
def users_by_id(id):
    user = Users.query.filter(Users.id == id).first()

    if request.method == 'GET':
        user_body = user.to_dict(rules=('-swipes','-username','-id',))

        res = make_response(
            user_body,
            200
        )
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()

        res = make_response(
            {},
            201
        )
    return res

##-------------This is for the login functionality-----##(app.js)
@app.route('/login', methods = ['POST'])
def users_by_email():
    try:
        form_data = request.get_json()
        email = form_data['email']
        password = form_data['password']
        user = Users.query.filter(Users.user_email == email).first()

        if user:
            if password == user.passwordhash:
                # login_body = user.to_dict(rules=('-swipes','-username','-passwordhash',))
                login_body = user.to_dict(only=('id',))
                res = make_response(
                    login_body,
                    200
                )
            else:
                res = make_response(
                    {"error": "wrong password"},
                    401
                )
        else:
            res = make_response(
                {"error": "account does not exist"},
                404
            )
    except:
        res = make_response(
            {"error": "account does not exist"},
            404
        )
    return res

@app.route('/users', methods = ['POST'])
def users():
    try:
        form_data = request.get_json()
        new_user = Users(
            username = form_data['username'],
            user_email = form_data['user_email'],
            passwordhash = form_data['passwordhash']
        )
        db.session.add(new_user)
        db.session.commit()
        response = make_response(
            new_user.to_dict(),
            201
        )
    except ValueError:
        response = make_response(
            {'Error': 'Validation error'},
            400
        )
    return response

@app.route('/swipes/<int:user>', methods = ['GET'])
def swipes_by_user(user):

    matches = Swipes.query.filter(db.and_(Swipes.user_id == user, Swipes.swipe == 1)).all()

    matches_dict = [match.to_dict() for match in matches]

    response = make_response(
        matches_dict,
        200
    )
    return response

@app.route('/recipes/filter', methods = ['GET'])
def recipes_filter():
    occasion = request.args.get('occasion')
    weather = request.args.get('weather')
    protein = request.args.get('protein')
    difficulty = request.args.get('difficulty')

    filters = {}
    if occasion:
        filters['occasion'] = occasion
    
    if weather:
        filters['weather'] = weather

    if protein:
        filters['protein'] = protein
    
    if difficulty:
        filters['difficulty'] = difficulty
    
    recipes = Recipes.query.filter_by(**filters).all()

    recipes_dict = [recipe.to_dict(rules=('swipes', )) for recipe in recipes]

    response = make_response(
        recipes_dict,
        200
    )

    return response


if __name__ == '__main__':
    app.run(port=5555, debug=True)


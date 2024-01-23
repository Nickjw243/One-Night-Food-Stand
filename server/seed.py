#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Users, Recipes, Swipes

fake = Faker()

def create_username():
    usernames = []
    for _ in range(5):
        u = Users(
            username = fake.name(),
            user_email = fake.first_name(),
            passwordhash = fake.first_name()
        )
        usernames.append(u)
    return usernames

def create_recipes():
    recipes = []
    for _ in range(5):
        r = Recipes(
            name = fake.name(),
            category = fake.name(),
            ingredients = fake.sentence(),
            directions = fake.sentence()
        )
        recipes.append(r)
    return recipes

def create_swipes(usernames, recipes):
    swipes = []
    for _ in range(5):
        s = Swipes(
            swipe = fake.text(),
            user_id = rc([username.id for username in usernames]),
            recipe_id = rc([recipe.id for recipe in recipes]),
            swipe_date = fake.date_time()
        )
        swipes.append(s)
    return swipes


if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        Users.query.delete()
        Recipes.query.delete()
        Swipes.query.delete()

        print("Seeding usernames...")
        usernames = create_username()
        db.session.add_all(usernames)
        db.session.commit()

        print("Seeding recipes...")
        recipes = create_recipes()
        db.session.add_all(recipes)
        db.session.commit()

        print("Seeding swipes...")
        swipes = create_swipes(usernames, recipes)
        db.session.add_all(swipes)
        db.session.commit()

        print("Done seeding!")







        # print("Deleting data")
        # Users.query.delete()
        # Recipes.query.delete()
        # Swipes.query.delete()
        # # Seed code goes here!

        # print("Create Username...")
        # name1 = Users(username = "Input username")

        # print("Creating Recipes...")
        # pulled_pork = Recipes(
        #     name = "Smoked Pulled Pork",
        #     category = "Big group",
        #     ingredients = "1 bone-in pork butt (8-10 pounds), Apple chips or pellets, 3 tbsp of mustard, 1/4 cup of favorite BBQ seasoning, 1/3 cup of apple cider or juice, 3 tbsp of cider vinegar",
        #     directions = "Preheat smoker to 275 degrees F. Add wood chips or pellets. Trim excess fat from pork butt (if needed). Pat the pork butt dry with paper towel then apply the mustard for the binder. Sprinkle your seasoning on all sides. In a spray bottle, combine the apple cider and the cider vinegar. Place pork butt in smoker for 4-5 hours until a deep mahogony color is formed, spritzing the pork with your spray mixture every hour. Once pork has developed the color that you prefer, remove the pork from the smoker and place in a baking pan. Liberally spritz with your cider mixture then cover with foil and return it to the smoker. Continue to cook until the pork butt reaches 203 degrees and a meat probe goes in smoth with no resistance. Remove from the smoker and let rest for at least an hour. Once finished resting, remove the bone and pull the meat, tossing the meat with the juices and serve!"
        # )
        # chicken_wings = Recipes(
        #     name = "Grilled Chicken Wings",
        #     category = "Big group, family",
        #     ingredients = "xyz",
        #     directions = "abc"
        # )
        # burgers = Recipes(
        #     name = "Grilled Burgers",
        #     ingredients = "xyz",
        #     directions = "abc"
        # )

        # print("Creating Swipes...")

        # print("Seeding done!")

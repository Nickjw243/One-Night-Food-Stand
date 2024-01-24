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
    u = Users(
        username = 'Hank',
        user_email = 'hank@form.net',
        passwordhash = 'just'
    )
    usernames.append(u)

    uu = Users(
    username = 'tim',
    user_email = 'tim@form.net',
    passwordhash = 'just'
    )
    usernames.append(uu)

    return usernames

def create_recipes():
    recipes = []

    recipe1 = Recipes(
        name = 'Grilled Lemon-Pepper Chicken',
        category = 'Barbecue',
        ingredients = 'Chicken, lemon, pepper, olive oil',
        directions = 'Marinate chicken with lemon, pepper, and olive oil. Grill until cooked, turning occasionally.',
        image_url = 'https://stordfkenticomedia.blob.core.windows.net/df-us/rms/media/recipemediafiles/recipes/retail/x17/18476-grilled-lemon-pepper-chicken-600x600.jpg?ext=.jpg',
        occasion = 'Backyard_BBQ',
        weather = 'Sunny',
        protein = 'Chicken',
        difficulty = 'Easy'
    )
    recipes.append(recipe1)

    recipe2 = Recipes(
        name = 'Honey Glazed BBQ Ribs',
        category = 'Barbecue',
        ingredients = 'Pork ribs, honey, barbecue seasoning, garlic',
        directions = 'Rub ribs with a mix of honey, barbecue seasoning, and garlic. Slow cook on the barbecue until tender.',
        image_url = 'https://cdn.beeyondthehive.com/wp-content/uploads/2020/07/honeyribs1-1200x600.jpg',
        occasion = 'Casual_Hang',
        weather = 'Snowy',
        protein = 'Pork',
        difficulty = 'Hard'
    )
    recipes.append(recipe2)

    recipe3 = Recipes(
        name = 'Smoky Chipotle BBQ Pulled Pork',
        category = 'Barbecue',
        ingredients = 'Pork, chipotle seasoning, garlic, barbecue seasoning',
        directions = 'Season pork with chipotle, garlic, and spices. Smoke on the barbecue until it pulls apart easily.',
        image_url = 'https://overthefirecooking.com/wp-content/uploads/2022/06/A_IMG_3733-2-scaled.jpg',
        occasion = 'Family_Reunion',
        weather = 'Hot',
        protein = 'Pork',
        difficulty = 'Hard'
    )
    recipes.append(recipe3)

    recipe4 = Recipes(
        name = 'Barbecue Shrimp Skewers',
        category = 'Barbecue',
        ingredients = 'Shrimp, barbecue sauce',
        directions = 'Skewer shrimp and brush with barbecue sauce. Grill until shrimp are opaque and slightly charred.',
        image_url = 'https://feelgoodfoodie.net/wp-content/uploads/2020/05/Grilled-Shrimp-Skewers-6.jpg',
        occasion = 'Holiday',
        weather = 'Hot',
        protein = 'Shrimp',
        difficulty = 'Easy'
    )
    recipes.append(recipe4)

    recipe5 = Recipes(
        name = 'Maple-Bourbon Glazed Chicken Wings',
        category = 'Barbecue',
        ingredients = 'Chicken wings, maple syrup, bourbon, barbecue seasoning',
        directions = 'Toss chicken wings in a mix of maple syrup, bourbon, and spices. Grill until crispy and caramelized.',
        image_url = 'https://www.simplyrecipes.com/thmb/jj7rNq0qgdxaAWQwOVZFH6P1m8g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2015__01__bourbon-maple-glazed-chicken-wings-vertical-a-1800-c6a4710dfd9c41bf8f92104129dacd80.jpg',
        occasion = 'Friend_Gathering',
        weather = 'Windy',
        protein = 'Chicken',
        difficulty = 'Easy'
    )
    recipes.append(recipe5)

    recipe6 = Recipes(
        name = 'Teriyaki Pineapple BBQ Salmon',
        category = 'Barbecue',
        ingredients = 'Salmon, teriyaki sauce, pineapple',
        directions = 'Marinate salmon in teriyaki sauce, top with pineapple slices, and grill until fish flakes easily.',
        image_url = 'https://i0.wp.com/www.themountainkitchen.com/wp-content/uploads/2022/08/pineapple-plank-salmon.jpg',
        occasion = 'Backyard_BBQ',
        weather = 'Sunny',
        protein = 'Fish',
        difficulty = 'Hard'
    )
    recipes.append(recipe6)

    recipe7 = Recipes(
        name = 'Spicy Mango BBQ Chicken Skewers',
        category = 'Barbecue',
        ingredients = 'Chicken, spicy mango barbecue sauce',
        directions = 'Thread chicken onto skewers, coat with spicy mango BBQ sauce, and grill until fully cooked.',
        image_url = 'https://winealittlecookalot.com/wp-content/uploads/2020/08/mg_1862-1209x1920.jpg',
        occasion = 'Casual_Hang',
        weather = 'Snowy',
        protein = 'Chicken',
        difficulty = 'Easy'
    )
    recipes.append(recipe7)

    recipe8 = Recipes(
        name = 'Mesquite-Smoked Brisket',
        category = 'Barbecue',
        ingredients = 'Beef brisket, mesquite seasoning',
        directions = 'Rub brisket with mesquite seasoning, smoke low and slow until a flavorful crust forms.',
        image_url = 'https://cdn11.bigcommerce.com/s-bsut34lcyq/images/stencil/2048x2048/products/7405/2689/Classic-Mesquite-Smoked-Brisket_C9A8523__49978.1692998540.jpg?c=2',
        occasion = 'Wedding',
        weather = 'Rainy',
        protein = 'Beef',
        difficulty = 'Medium'
    )
    recipes.append(recipe8)

    recipe9 = Recipes(
        name = 'Garlic Herb Grilled Corn',
        category = 'Barbecue',
        ingredients = 'Corn, garlic, herbs, butter',
        directions = 'Rub corn with garlic, herbs, and butter. Grill until kernels are tender and slightly charred.',
        image_url = 'https://3.bp.blogspot.com/-HawhR7ebQx0/UDzxutJ7kDI/AAAAAAAAEhs/qRVICXCkbng/s400/IMG_3981.jpg',
        occasion = 'Business',
        weather = 'Windy',
        protein = 'Vegetarian',
        difficulty = 'Easy'
    )
    recipes.append(recipe9)

    recipe10 = Recipes(
        name = 'Barbecue Veggie Kabobs',
        category = 'Barbecue',
        ingredients = 'Mixed vegetables, barbecue sauce',
        directions = 'Skewer a variety of veggies, brush with barbecue sauce, and grill until vegetables are tender.',
        image_url = 'https://www.acouplecooks.com/wp-content/uploads/2021/06/Vegetable-Kabobs-006.jpg',
        occasion = 'Family_Reunion',
        weather = 'Cloudy',
        protein = 'Vegetarian',
        difficulty = 'Easy'
    )
    recipes.append(recipe10)


    return recipes

def create_swipes(usernames, recipes):
    swipes = []
    for _ in range(5):
        s = Swipes(
            swipe = randint(0,1),
            user_id = rc([username.id for username in usernames]),
            recipe_id = rc([recipe.id for recipe in recipes])
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

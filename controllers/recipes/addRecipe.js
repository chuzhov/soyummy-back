const { Recipe } = require("../../models");

const {BASE_INGREDIENT_IMG_URL} = require('../../config/defaults');

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

// const fakebody = {
//   "imgURL": "https://res.cloudinary.com/dcpsasqw8/image/upload/v1678474415/assets/own_recipes_photos/dafault.png",
//   "title": "Кіт в хлібі",
//   "about": "Хліб розташований семетрично навколо голови кота",
//   "category": "Beef",
//   "cookingTime": "20-30 min",
//   "ingredients": [
//     {
//       "ingredient": "Lime",
//       "qty": "4",
//       "imgURL": "https://www.themealdb.com/images/ingredients/Lime-Small.png",
//       "_id": {
//         "$oid": "640cb39bbc40cacac3c6f90d"
//       }
//     },
//     {
//       "ingredient": "Balsamic Vinegar",
//       "qty": "8",
//       "imgURL": "https://www.themealdb.com/images/ingredients/Balsamic%20Vinegar-Small.png",
//       "_id": {
//         "$oid": "640cb39bbc40cacac3c6f90e"
//       }
//     },
//     {
//       "ingredient": "Сирок",
//       "qty": "3",
//       "imgURL": "https://www.themealdb.com/images/ingredients/Сирок-Small.png",
//       "_id": {
//         "$oid": "640cb39bbc40cacac3c6f90f"
//       }
//     }
//   ],
//   "description": "Взяти хліб взяти кота, елегантно поїднати",
//   "owner": {
//     "$oid": "6408a40a32bc509704e0b529"
//   },
//   "__v": 0
// }



const addRecipe = async (req, res) => {
    
  const { _id } = req.user;
  const recipe = req.body
  const { ingredients } = req.body;
    
  const newArr = ingredients.map(obj => ({ ingredient: obj.ingredient,  qty: obj.qty, imgURL:`${BASE_INGREDIENT_IMG_URL}/${obj.ingredient.replace(/\s/g, '%20')}-Small.png` }));

  const conditions = newArr.map(obj => ({
    $elemMatch: obj
  }))

  const result = await Recipe.find({ ingredients: { $all: conditions } });

    if (result.length > 0) {
        throw HttpError(409, "Recipe is already created")
    }
    await Recipe.create({ ...recipe, owner: _id, ingredients: newArr} );
    res.status(201).send('Recipe created successfully');
};

module.exports = addRecipe;

const instance = require("../../helpers/instance")

const fetchMealByIngredient = async (req, res) => {
    const { ingredient } = req.body;
    const { data } = await instance.get(`/filter.php?i=${ingredient}`);
    res.send(data.meals);

};


module.exports = fetchMealByIngredient;

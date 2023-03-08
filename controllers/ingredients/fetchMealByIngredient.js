
const fetchMealByIngredient = async (req, res) => {
    const { ingredient } = req.body;
    const data = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`)
        res.send(data);

};


module.exports = fetchMealByIngredient;

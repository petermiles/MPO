const createUser = (req, res) => {
    req.app
        .get('db')
        .create_user(req.body)
}

const createRecipeBook = (req, res) => {
	console.log(req.body)
    req.app
        .get('db')
        .create_book(req.body)
        .then(result => res.json(result))
}

const getRecipeBooks = (req, res) => {
    req.app
        .get('db')
        .get_books(req.params.id)
        .then((result) => res.json(result))
}

module.exports = {
    createUser,
    createRecipeBook,
    getRecipeBooks
}
const test = (request, response) =>
{
    return response.status(200).json
    ({
        message: "testing article controller"
    });
}

const book = (request, response) =>
{
    console.log("Ejecuting test endpoint...");
    return response.status(200).json
    (
        [
            {
                title: "APIRestful NodeJS",
                author: "Javier Sainz de Baranda",
            },
            {
                title: "Fundaments of Object-C",
                author: "Javier Sainz de Baranda",
            }
        ]
    );
}

const createArticle = (request, response) =>
{
    // Get data to save by post

    // Validate data

    // Assign values to the model object( manual or automatic )

    // Save the item in database

    return response.status(200).json
    ({
        message: "Save action"
    });
}

module.exports = { test, book, createArticle};
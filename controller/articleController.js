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
};


module.exports = { test, book };
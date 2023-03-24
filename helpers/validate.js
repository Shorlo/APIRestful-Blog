const validator = require('validator');

const validateArticle = (params) =>
{
    let validate_title = !validator.isEmpty(params.title) && validator.isLength(params.title, {min: 5, max: 25});
    let validate_content = !validator.isEmpty(params.content);

    if(!validate_title || !validate_content)
    {
        throw new Error("Info is not validate!!");
    }
}

module.exports = { validateArticle };
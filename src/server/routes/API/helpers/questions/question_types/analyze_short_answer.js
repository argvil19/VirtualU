module.exports = (params) => {
    const regex = new RegExp('\\b' + params.answer + '\\b', 'i');
    
    return regex.test(params.input);
};

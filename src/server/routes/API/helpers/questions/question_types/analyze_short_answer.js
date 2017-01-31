module.exports = (params) => {
    const regex = new RegExp(params.answer, 'i');
    
    return regex.test(params.input);
}
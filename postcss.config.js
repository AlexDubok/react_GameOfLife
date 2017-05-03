/* eslint-disable */
module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-modules')({
            generateScopedName: '[name]__[local]___[hash:base64:5]',
            scopeBehaviour: 'global' // can be 'global' or 'local',
        })        
    ]
};

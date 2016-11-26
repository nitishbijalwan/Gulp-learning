module.exports = function () {
    var client = './src/client/';
    var config = {
        temp: './tmp',
        //contains js that we want to process
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        less: client + 'styles/styles.less'
    };
    return config;
};
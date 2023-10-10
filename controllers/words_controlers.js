exports.showMainPage = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Learn Vocab App',
        path: 'index',
    })
}
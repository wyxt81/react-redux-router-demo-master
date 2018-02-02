//分页查询
exports.pagerFind = function (req, res, model, sortObj, conditionObj) {
    var size = req.query.size ? parseInt(req.query.size) : 1,
        page = req.query.page ? parseInt(req.query.page) : 1,
        condition = conditionObj ? conditionObj : {},
        skip = (page - 1) * size,
        sort = sortObj ? sortObj : {'updateAt': 1};

    model.find(condition, function (err, dataAll) {
        if (err) console.log(err.message);
        var elements = dataAll.length;
        model.find(condition).skip(skip).limit(size).sort(sort).lean().exec(function (err, data) {
            if (err) console.log(err.message);
            res.json({
                status: 'S',
                msg: 'success',
                data: data,
                pager: {
                    totalpage: elements < size ? 1 : Math.ceil(elements / size),
                    totalelement: elements,
                    pagecurrent: page,
                    pagesize: size
                }
            });
        })
    });
};

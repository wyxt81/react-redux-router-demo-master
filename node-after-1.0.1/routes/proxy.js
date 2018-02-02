/**
 * Author：dengyu
 * Time：2017/9/29
 * Description：proxy
 */

var express = require('express'),
    proxy = require('express-http-proxy');

var router = express.Router();
apiProxy = proxy("http://10.27.74.78:8080", {
    forwardPath: function (req, res) {
        return req._parsedUrl.path
    }
});

router.use("/bi-manager-web/bi/*", apiProxy);
router.use("/bi-manager-web/bi/*/*", apiProxy);

module.exports = router;
/**
 * Author：dengyu
 * Time：2017/6/16
 * Description：pageModel
 */

module.exports = function(pageIndex, pageSize){
    this.pageIndex = pageIndex || 1;
    this.pageSize = pageSize || 10;
    this.total = 0;
    this.rows = [];

    //数据库对应每页的起始下标值
    this.getIndex = function(){
        let index = 0;
        if (this.pageIndex >= 1 && this.pageSize >= 1){
            index = (this.pageIndex - 1) * this.pageSize;
        }
        return index;
    }
};
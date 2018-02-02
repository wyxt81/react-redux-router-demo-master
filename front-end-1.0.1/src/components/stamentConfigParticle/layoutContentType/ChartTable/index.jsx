/**
 * Author：zhoushuanglong
 * Time：2017/6/26
 * Description：chart table
 */

import React, {Component} from 'react';
import {Table, Icon} from 'antd';
import {generateUUID} from '../../../../public/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showReportTable} from '../../../../actions/showReport';
import {isEmpty, compareObject} from '../../../../public/index';

class ChartTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: generateUUID(),
        };
    };

    componentWillMount(){
        this.search(1);
    };

    componentWillReceiveProps(newProps){
        if(newProps.search != this.props.search){
            this.search(1);
        }
        if(!newProps.showReport && !compareObject(newProps.onlyTable, this.props.onlyTable)){
            this.search(1);
        }
    };

    search = (page) => {
        let sql = this.props.condition ? this.props.condition.data.sql.toLowerCase() : '';
        let querysOne = [];
        let querysTwo = [];
        if(!isEmpty(this.props.querys)){
            for(let id in this.props.querys){
                if(this.props.querys[id]){
                    if(!this.props.querys[id].startsWith("&")){
                        querysOne.push(this.props.querys[id]);
                    } else {
                        querysTwo.push(this.props.querys[id].substring(1));
                    }
                }
            }
        }
        this.props.actions.showReportTable({
            pageIndex: page,
            pageSize: this.props.pageSize || 5,
            sql: sql,
            querysOne: querysOne,
            querysTwo: querysTwo,
            id: this.state.id,
            columns: this.props.condition ? this.props.condition.data.dimension.concat(this.props.condition.data.measurement) : [],
        });
    };

    render() {
        let table = {
            pageIndex: 1,
            pageSize: 5,
            total: 5,
            rows: [{
                name: 'John Brown',
                address: 'New York No. 1 Lake Park',
            }, {
                name: 'Jim Green',
                address: 'London No. 1 Lake Park',
            }, {
                name: 'Joe Black',
                address: 'Sidney No. 1 Lake Park',
            }, {
                name: 'Joe Black',
                address: 'Sidney No. 1 Lake Park',
            }, {
                name: 'Joe Black',
                address: 'Sidney No. 1 Lake Park',
            }],
            columns: [{
                title: 'Name',
                dataIndex: 'name',
            }, {
                title: 'Address',
                dataIndex: 'address',
            }]
        };
        if(this.props.tables[this.state.id]){
            table = this.props.tables[this.state.id];
        }
        table.rows = table.rows.map((value, index) => {
            return {...value, key: index}
        });
        return <div className="table-wraper" style={{height: this.props.height + 'px'}}>
            <Table
                dataSource={table.rows}
                columns={table.columns}
                pagination={{
                    current:table.pageIndex,
                    pageSize:table.pageSize,
                    total:table.total,
                    showQuickJumper: true,
                    onChange:(page) => this.search(page)
                }}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        tables: state.showReport.tables,
        querys: state.showReport.querys,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({showReportTable}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ChartTable);
/**
 * Author：dengyu
 * Time：2017/8/1
 * Description：query district
 */

import React, {Component} from 'react';
import {Select} from 'antd';
import {generateUUID} from '../../../../public/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showReportQuery, showReportGetDistrict, showReportSetDistrict} from '../../../../actions/showReport';
import {isEmpty} from '../../../../public/index';
import './index.scss';

const Option = Select.Option;
class QueryDistrict extends Component {
    constructor(props) {
        super(props);
        let id = generateUUID();
        this.state = {
            id: id,
            selectCountry:[],
            childrenCountry: this.props.country[id] || [],
            selectProvince:[],
            childrenProvince: this.props.province[id] || [],
            selectCity:[],
            childrenCity: this.props.city[id] || [],
            district: {
                country: "",
                province: "",
                city: "",
            },
        };
    };

    onChangeCountry = (value) => {
        if (this.props.showReport) {
            let select = "";
            value.forEach((value, index) => {
                select += "'" + value.split("&")[1] + "',";
            });
            if (value.length > 0 && this.props.condition) {
                let name = (this.props.condition && this.props.condition.data && this.props.condition.data.district && this.props.condition.data.district.country) ? this.props.condition.data.district.country : 'country';
                let country = name + ' in (' + select.substring(0, select.length - 1) + ') ';
                this.setState({
                    district: {
                        country: country,
                        province: "",
                        city: "",
                    },
                });
                this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + country);
            } else {
                this.props.actions.showReportQuery(this.state.id, '');
            }
        }
        this.setState({
            selectCountry: value,
            selectProvince:[],
            selectCity:[],
        });
        if(value.length > 0){
            this.props.actions.showReportGetDistrict({
                id: this.state.id,
                type: "province",
                sql: "select * from district",
                query: "parentId = " + value[value.length - 1].split("&")[0],
            });
        } else {
            this.props.actions.showReportSetDistrict({
                id: this.state.id,
                type: "province",
                data: [],
            });
        }
        this.props.actions.showReportSetDistrict({
            id: this.state.id,
            type: "city",
            data: [],
        });
    };

    onChangeProvince = (value) => {
        if (this.props.showReport) {
            let select = "";
            value.forEach((value, index) => {
                select += "'" + value.split("&")[1] + "',";
            });
            if (value.length > 0 && this.props.condition) {
                let name = (this.props.condition && this.props.condition.data && this.props.condition.data.district && this.props.condition.data.district.province) ? this.props.condition.data.district.province : 'province';
                let province = name + ' in (' + select.substring(0, select.length - 1) + ') ';
                this.setState({
                    district: {
                        country: this.state.district.country,
                        province: province,
                        city: "",
                    },
                });
                this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + this.state.district.country + " and " + province);
            } else {
                this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + this.state.district.country);
            }
        }
        this.setState({
            selectProvince:value,
            selectCity:[],
        });
        if(value.length > 0){
            this.props.actions.showReportGetDistrict({
                id: this.state.id,
                type: "city",
                sql: "select * from district",
                query: "parentId = " + value[value.length - 1].split("&")[0],
            });
        } else {
            this.props.actions.showReportSetDistrict({
                id: this.state.id,
                type: "city",
                data: [],
            });
        }
    };

    onChangeCity = (value) => {
        if (this.props.showReport) {
            let select = "";
            value.forEach((value, index) => {
                select += "'" + value.split("&")[1] + "',";
            });
            if (value.length > 0 && this.props.condition) {
                let name = (this.props.condition && this.props.condition.data && this.props.condition.data.district && this.props.condition.data.district.city) ? this.props.condition.data.district.city : 'city';
                let city = name + ' in (' + select.substring(0, select.length - 1) + ') ';
                this.setState({
                    district: {
                        country: this.state.district.country,
                        province: this.state.district.province,
                        city: city,
                    },
                });
                this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + this.state.district.country + " and " + this.state.district.province + " and " + city);
            } else {
                this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + this.state.district.country + " and " + this.state.district.province);
            }
        }
        this.setState({
            selectCity:value,
        });
    };

    componentWillMount() {
        this.props.actions.showReportGetDistrict({
            id: this.state.id,
            type: "country",
            sql: "select * from district",
            query: "parentId = -1",
        });
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            childrenCountry: newProps.country[this.state.id] || [],
            childrenProvince: newProps.province[this.state.id] || [],
            childrenCity: newProps.city[this.state.id] || [],
        });
        if(isEmpty(newProps.querys) && !newProps.country[this.state.id]){
            this.props.actions.showReportGetDistrict({
                id: this.state.id,
                type: "country",
                sql: "select * from district",
                query: "parentId = -1",
            });
            this.setState({
                selectCountry: [],
                selectProvince:[],
                selectCity:[],
            });
        }
    };

    render() {
        let childrenCountry = [];
        let childrenProvince = [];
        let childrenCity = [];
        if (this.state.childrenCountry.length > 0) {
            childrenCountry = this.state.childrenCountry.map((item, index) => {
                return <Option key={index}
                               value={item.id + "&" + item.name}>{item.name}</Option>;
            });
        }
        if (this.state.childrenProvince.length > 0) {
            childrenProvince = this.state.childrenProvince.map((item, index) => {
                return <Option key={index}
                               value={item.id + "&" + item.name}>{item.name}</Option>;
            });
        }
        if (this.state.childrenCity.length > 0) {
            childrenCity = this.state.childrenCity.map((item, index) => {
                return <Option key={index}
                               value={item.id + "&" + item.name}>{item.name}</Option>;
            });
        }
        return <div className="query-district">
            <span>地区</span>
            <Select
                mode="multiple"
                style={{minWidth: '100px'}}
                placeholder={"国家"}
                size="large"
                value={this.state.selectCountry}
                onChange={this.onChangeCountry}>
                {childrenCountry}
            </Select>
            <Select
                mode="multiple"
                style={{minWidth: '100px'}}
                placeholder={"省份"}
                size="large"
                value={this.state.selectProvince}
                onChange={this.onChangeProvince}>
                {childrenProvince}
            </Select>
            <Select
                mode="multiple"
                style={{minWidth: '100px'}}
                placeholder={"城市"}
                size="large"
                value={this.state.selectCity}
                onChange={this.onChangeCity}>
                {childrenCity}
            </Select>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        querys: state.showReport.querys,
        country: state.showReport.country,
        province: state.showReport.province,
        city: state.showReport.city,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({showReportQuery, showReportGetDistrict, showReportSetDistrict}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(QueryDistrict);
/**
 * Author：dengyu
 * Time：2017/8/21
 * Description：query range
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, Button, message, Checkbox} from 'antd';
import {contentData} from '../../../../actions/layout';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
class PaneData extends Component {
    state = {
        range: ['day', 'week', 'month', 'year'],
        options: [
            { label: '日', value: 'day' },
            { label: '周', value: 'week' },
            { label: '月', value: 'month' },
            { label: '年', value: 'year' },
        ],
    };

    renderQuery = () => {
        const form = this.props.form.getFieldsValue();
        if(Object.prototype.toString.call(form.range) == "[object Array]" && form.range.length > 0){
            let prop = {};
            form.range.forEach((item, index) => {
                for(let i = 0; i < this.state.options.length; i++){
                    if(this.state.options[i].value == item){
                        prop[item] = this.state.options[i].label;
                        break;
                    }
                }
            });
            this.props.actions.contentData(this.props.currentCurId, this.props.currentSection, 'one', { prop: prop });
            message.info('时间范围配置成功');
        } else {
            message.warning('请选择时间范围');
        }
    };

    componentWillMount() {
        const This = this;
        This.props.content.map((d, i) => {
            if (d.layoutId === This.props.currentCurId) {
                let prop = d.children[This.props.currentSection].condition.data.prop;
                let range = [];
                for(let key in prop){
                    range.push(key);
                }
                This.setState({
                    range: range
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return <Form>
            <h3 className="parameter-title">配置范围</h3>
            <div className="parameter-content">
                <FormItem>
                    {getFieldDecorator('range', {
                        initialValue: this.state.range
                    })(<CheckboxGroup options={this.state.options} />)}
                </FormItem>
            </div>
            <div className="parameter-content reload-chart">
                <Button type="primary" icon="reload" onClick={this.renderQuery}>更新</Button>
            </div>
        </Form>
    }
}

const mapStateToProps = (state) => {
    return {
        dataList: state.configData.dataList.rows,
        currentSection: state.layoutConfig.currentSection,
        currentCurId: state.layoutConfig.currentId,
        content: state.layoutConfig.content,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({contentData}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PaneData));
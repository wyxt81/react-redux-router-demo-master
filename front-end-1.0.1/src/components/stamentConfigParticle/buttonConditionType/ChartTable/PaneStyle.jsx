/**
 * Author：zhoushuanglong
 * Time：2017/6/20
 * Description：line style
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, Input, Button, message} from 'antd';
import {contentStyle} from '../../../../actions/layout';

const FormItem = Form.Item;
class PaneStyle extends Component {
    state = {
        title: '未命名',
    };

    renderChart = () => {
        const form = this.props.form.getFieldsValue();
        if (!form.title) {
            message.warning('标题不能为空');
        } else {
            this.setState({
                title: form.title,
            }, () => {
                this.props.actions.contentStyle(this.props.currentCurId, this.props.currentSection, this.state.title, {});
            });
        }
    };

    componentWillMount() {
        const This = this;
        This.props.content.map((d, i) => {
            if (d.layoutId === This.props.currentCurId) {
                let section = d.children[This.props.currentSection];
                This.setState({
                    title: section.title,
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return <Form>
            <h3 className="parameter-title">标题</h3>
            <div className="parameter-content">
                <FormItem>
                    {getFieldDecorator('title', {
                        initialValue: this.state.title
                    })(<Input placeholder="标题" type="text"/>)}
                </FormItem>
            </div>
            <div className="parameter-content reload-chart">
                <Button type="primary" icon="reload" onClick={this.renderChart}>更新</Button>
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
        actions: bindActionCreators({contentStyle}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PaneStyle));
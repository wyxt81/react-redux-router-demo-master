/**
 * Author：zhoushuanglong
 * Time：2017/5/26
 * Description：config content
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Card, Button, Modal, Form, Input, message} from 'antd';

import {saveProduction} from '../../../actions/production';
import {productionName, productionClear} from '../../../actions/layout';
import './index.scss';

function calculateCardHeight() {
    let $content = $('#configContent'),
        $window = parseInt($(window).height()),
        $header = parseInt($('.app-main-header').height()),
        $breadcrumb = parseInt($('.breadcrumb-nav').height()) + 30,
        $cardBody = $content.find('.ant-card-body').eq(0),
        contentHeight = $window - $header - $breadcrumb - 16 - 2,
        cardHeader = 49;
    $cardBody.height(contentHeight - cardHeader);
}
$(window).resize(function () {
    calculateCardHeight();
});

const FormItem = Form.Item;
const confirm = Modal.confirm;
class ConfigContent extends Component {
    componentDidMount() {
        calculateCardHeight();
    };

    state = {visible: false};
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        const form = this.props.form.getFieldsValue();
        if (!form.name || form.name.trim() === '') {
            message.warning('请输入作品名称');
        } else {
            this.props.actions.productionName(form.name);

            if (this.props.productionId !== '') {
                this.props.actions.saveProduction({
                    id: this.props.productionId,
                    name: form.name,
                    config: this.props.layoutConArr
                });
            } else {
                this.props.actions.saveProduction({
                    name: form.name,
                    config: this.props.layoutConArr
                });
            }
        }
    };
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    proClear = () => {
        const This = this;
        confirm({
            title: '清除配置',
            content: '清除目前所有配置，确定继续吗？',
            onOk() {
                This.props.actions.productionClear();
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return <div className="config-content" id="configContent">
            <Card
                title="图表配置"
                bordered={false}
                extra={<div>
                    {/*<Button type="primary" icon="eye-o">预览</Button>*/}
                    <Button type="primary" icon="save" onClick={this.showModal}>保存</Button>
                    <Button type="primary" icon="delete" onClick={this.proClear}>清除</Button>
                </div>}>
                {this.props.children}
            </Card>
            <Modal
                title="作品名称"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                <Form>
                    <FormItem>
                        {getFieldDecorator('name', {
                            initialValue: this.props.productionName
                        })(<Input placeholder="请输入名称"/>)}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        productionId: state.layoutConfig.productionId,
        productionName: state.layoutConfig.productionName,
        layoutConArr: state.layoutConfig.content
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({saveProduction, productionName, productionClear}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ConfigContent));
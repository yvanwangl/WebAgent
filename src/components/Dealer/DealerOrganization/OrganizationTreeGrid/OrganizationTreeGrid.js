import React, {Component, PropTypes} from 'react';
import {Table} from 'antd';
import {injectIntl} from 'react-intl';
import {numberFormat} from '../../../../utils/util';
import messages from './messages';
import styles from './index.css';

class OrganizationTreeGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectId: null
        };
        const {intl: {formatMessage}} = this.props;
        this.columns = [
            {
                title: formatMessage(messages.name),
                dataIndex: 'name',
                key: 'name',
                width: '30%',
            },
            {
                title: formatMessage(messages.code),
                dataIndex: 'code',
                key: 'code',
                width: '30%',
            }, {
                title: formatMessage(messages.balance),
                dataIndex: 'balance',
                key: 'balance',
                className: 'columnMoney',
                render: (text, record, index)=> <span>{numberFormat(text)}</span>
            }
        ];
    }

    static propTypes = {
        treeGridNodes: PropTypes.array.isRequired,
        currentItem: PropTypes.object.isRequired,
        onRowSelect: PropTypes.func.isRequired,
    };

    /*组织树表选中事件*/
    rowSelection = (record) => {
        const {onRowSelect} = this.props;
        if(this.state.selectId!=record.id){
            this.setState({
                selectId: record.id
            });
            onRowSelect(record.id);
        }
    };

    /*树节点进行迭代更新*/
    updateTreeNodes = (treeNodes, currentItem)=>{
        treeNodes.map((node)=>{
            if(node.id==currentItem.id){
                Object.assign(node, currentItem);
            } else {
                if(node.children.length>0){
                    this.updateTreeNodes(node.children, currentItem);
                }
            }
        });
    };

    /*默认选中根组织节点*/
    componentWillMount(){
        let {treeGridNodes, onRowSelect} = this.props;
        this.setState({
            selectId: treeGridNodes.length>0 ? treeGridNodes[0].id:null
        }, ()=>onRowSelect(this.state.selectId));
    }

    componentWillReceiveProps(nextProps) {
        const {currentItem, onRowSelect} = nextProps;
        if (currentItem.id && this.state.selectId != currentItem.id) {
            this.setState({
                selectId: currentItem.id
            }, ()=>onRowSelect(this.state.selectId));
        }
    }

    render() {
        const {treeGridNodes, currentItem} = this.props;
        this.updateTreeNodes(treeGridNodes, currentItem);
        return (
            /*
            * defaultExpandAllRows
            * scroll={{ y: 300 }}
            * */
            <Table
                columns={this.columns}
                onRowClick={this.rowSelection}
                dataSource={treeGridNodes}
                pagination={false}
                rowKey={record => `${record.id}`}
                rowClassName={(record, index)=> record.id==this.state.selectId ? 'ant-table-row-select':''}
            />
        );
    }
}

/*function OrganizationTreeGrid({
 intl,
 treeNodes,
 onTreeNodeSelect,
 deselectAll,
 currentItem
 }) {

 /!*首次加载组织树，默认选中根节点*!/
 const defaultSelectKeys  = treeNodes.length>0?[`${treeNodes[0]['id']}`]:[];

 /!*新增组织，或修改组织，选中当前节点*!/
 let selectedKeys = currentItem.id ? [`${currentItem.id}`]:[];

 /!*默认选中根节点，手动进行节点选中逻辑处理*!/
 if(defaultSelectKeys.length>0 && window.isFirstLoad){
 onTreeNodeSelect(defaultSelectKeys[0]);
 window.isFirstLoad = false;
 }

 /!*迭代生成 组织树节点*!/
 const genChildNodes = (children) => {
 return children.map(({name, id, children}) =>{
 /!*如果对组织的名称进行修改，对组织树中的节点名称进行更新*!/
 if(currentItem.id==id){
 name = currentItem.name;
 }
 return (
 <TreeNode title={name} key={id}>
 { children.length>0 && genChildNodes(children) }
 </TreeNode>
 );
 })
 };

 /!*组织树节点选中事件*!/
 const treeNodeSelect = (selectedKeys, info) => {
 if(selectedKeys.length>0){
 onTreeNodeSelect(selectedKeys[0]);
 }else {
 selectedKeys = [];
 deselectAll();
 }
 };

 return (
 <Tree
 defaultExpandAll={true}
 defaultSelectedKeys={defaultSelectKeys}
 onSelect={treeNodeSelect}
 autoExpandParent={true}

 >
 {
 treeNodes.map(({name, id, children}) => {
 {/!*如果对组织的名称进行修改，对组织树中的节点名称进行更新*!/}
 if(currentItem.id==id){
 name = currentItem.name;
 }
 return (
 <TreeNode title={name} key={id}>
 {
 children.length>0 && genChildNodes(children)
 }
 </TreeNode>
 )
 })
 }
 </Tree>
 );
 }*/

export default injectIntl(OrganizationTreeGrid);
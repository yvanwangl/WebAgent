const treeNodes = [
    {
        name: '根组织',
        id: '1',
        children: [
            {name: '市场部', id: '2', children: []},
            {name: '营业部', id: '3', children: []},
            {name: '技术部', id: '4', children: []},
            {name: '财务部', id: '5', children: []},
        ]
    }
];
const organizations = [
    {id:1,name:'根组织',code:'0001',parentId:'',parentName:'',remark:'',balance:0,},
    {id:2,name:'市场组织',code:'0002',parentId:'1',parentName:'根组织',remark:'',balance:0,},
    {id:3,name:'技术组织',code:'0003',parentId:'1',parentName:'根组织',remark:'',balance:0,},
    {id:4,name:'财务组织',code:'0004',parentId:'2',parentName:'市场组织',remark:'',balance:0,},
    {id:5,name:'商务组织',code:'0005',parentId:'1',parentName:'根组织',remark:'',balance:0,},
];

const staffList = [
    {id:'1',name:'测试员工',code:'D0001',type:0, mobilePhone:'123243424324', organizationId:'1',organizationName:'根组织',remark:'备注测试',account:0, balance:0.00,},
    {id:'2',name:'开发员工',code:'D0002',type:1, mobilePhone:'435435345345', organizationId:'2',organizationName:'市场组织',remark:'备注测试',account:1, balance:33.00,},
    {id:'3',name:'商务员工',code:'D0003',type:1, mobilePhone:'657467457657', organizationId:'1',organizationName:'根组织',remark:'备注测试',account:2, balance:100.00,},
    {id:'4',name:'市场员工',code:'D0004',type:1, mobilePhone:'457523453425', organizationId:'3',organizationName:'技术组织',remark:'备注测试',account:1, balance:432.05,},
    {id:'5',name:'行政员工',code:'D0005',type:1, mobilePhone:'365635657655', organizationId:'4',organizationName:'财务组织',remark:'备注测试',account:2, balance:800.32,},
    {id:'6',name:'人力员工',code:'D0006',type:1, mobilePhone:'346123142134', organizationId:'5',organizationName:'商务组织',remark:'备注测试',account:0, balance:90.00,},
];
export default {
    /*登录接口*/
    'POST /login': (req, res) => {
        res.send({
            success: true,
            data: {
                partnerStaffName: '1000',
                role: '管理员',
                partnerAccountNumber: '1000322',
                balance: 12500,
                partnerStaffCode: '10005620',
                partnerName: '张三',
                partnerCode: '100056',
                admin: true
            }
        });
    },
    /*退出接口*/
    'POST /logout': (req, res) => {
        res.send({
            success: true
        });
    },
    /*获取组织树*/
    'GET /api/organization': (req, res)=>{
        let treeNodes = [];
        function genTreeNodes(organizations) {
            for(let organization of organizations){
                organization.children = [];
                if(organization.parentId==''){
                    treeNodes.push(organization);
                }else {
                    for (let o of organizations){
                        if( o.id == organization.parentId){
                            o.children.push(organization);
                        }
                    }
                }
            }
            return treeNodes;
        }
        res.send({
            success: true,
            data: genTreeNodes(organizations)[0]
        });
    },
    /*根据组织标识获取组织信息*/
    'GET /api/organization/:id': (req, res) => {
        const id = req.params.id;
        let targetO = organizations.filter((organization)=> organization.id == id);
        let data = targetO[0];
        res.send({
            success: true,
            ...data
        });
    },
    /*新增组织*/
    'POST /api/organization':(req, res)=>{
        req.on('data', function(data){
            let organization = JSON.parse(data.toString());
            let length = organizations.length;
            let newOrganization = {...organization, id: `${length+1}`, balance:0};
            organizations.push(newOrganization);
            res.send({
                data: newOrganization,
                success: true
            });
        });
    },
    /*修改组织*/
    'PUT /api/organization/:id': (req, res)=>{
        const id = req.params.id;
        const targetO = organizations.filter(organization=> organization.id==id);
        req.on('data', function (data) {
            let newData = JSON.parse(data.toString());
            let organization = targetO[0];
            organization['name'] = newData['name'];
            organization['code'] = newData['code'];
            organization['remark'] = newData['remark'];
            res.send({
                success: true,
                data: organization
            });
        });
    },

    'GET /api/staff': (req, res) => {
        const organizationId = req.query.organizationId;
        let staffs = staffList.filter(staff=> staff.organizationId == organizationId);
        res.send({
            success: true,
            data:staffs
        });
    },

    /*新用户激活，获取可以激活的产品包*/
    'GET /api/activateNew/activateProduct': (req, res)=>{
        res.send({
            success: true,
            errorCode: null,
            data: [
                {id:1, externalName:'包1', code:'001', monthAmount:200, description: '包1的描述'},
                {id:2, externalName:'包2', code:'002', monthAmount:400, description: '包2的描述'},
                {id:3, externalName:'包3', code:'003', monthAmount:800, description: '包3的描述'},
            ]
        });
    },

    /*新用户激活，激活*/
    'POST /api/activateNew/active': (req, res) => {
        res.send({
            success: true,
            errorCode: null
        });
    },

    /*客户服务-获取用户*/
    'GET /api/customer-service/getSubscribers': (req, res)=>{
        res.send({
            success: true,
            errorCode: null,
            data: [
                /*{id:'1', serviceCode:'23424242', subscriberStatus:1, activateDate: new Date().toLocaleDateString()},*/
                {id: '2', serviceCode:'67876876', subscriberStatus:2, activateDate: new Date().toLocaleDateString()},
                {id: '3', serviceCode:'34534355', subscriberStatus:3, activateDate: new Date().toLocaleDateString()},
            ]
        });
    },

    /*客户服务-获取服务信息及客户信息*/
    'GET /api/customer-service/getSubscriberInfo/:id': (req, res)=>{
        res.send({
            success: true,
            errorCode: null,
            data: {
                serviceInfo: {
                    serviceCode: '02102251784',
                    subscriberStatus: 2,
                    balance: 0,
                    estimatedStopDate: new Date().toLocaleDateString(),
                    stbType: '一级机顶盒',
                    stbCode: '956866',
                    displayName: 'Decoder',
                    subsidiaryOfferDisplayName: 'subsidiary1,subsidiary2,subsidiary3'
                },
                customerInfo: {
                    id: 3,
                    firstName: '王',
                    lastName: '亚飞',
                    mobile: '12856489545',
                    email: '84359345@qq.com',
                    saleAreaId: 1,
                    saleAreaName: '北京区域',
                    addressId: 3,
                    addressName: '亦庄销售区',
                    detailAddress: '科创十四街',
                    fullAddress: '亦庄销售区 科创十四街'
                }
            }
        });
    },

    /*客户服务-获取当前用户的产品包及可更换的包*/
    'GET /api/customer-service/getCurrentBouquet/:subscriberId': (req, res)=>{
        res.send({
            success: true,
            errorCode: null,
            data: {
                currentBouquet: '基本包',
                bouquets: [
                    {id:1, externalName:'包1', code:'001', monthAmount:200, description: '包1的描述', businessClass: 0},
                ]
            }
        });
    },

    /*此接口无效*/
    'GET /api/customer-service/getProducts/:businessClass': (req, res)=>{
        const businessClass = req.params.businessClass;
        let products = [
            {id:1, externalName:'包1', code:'001', monthAmount:200, description: '包1的描述', businessClass: 0},
            {id:2, externalName:'包2', code:'002', monthAmount:400, description: '包2的描述', businessClass: 0},
            {id:3, externalName:'包3', code:'003', monthAmount:800, description: '包3的描述', businessClass: 0},
            {id:4, externalName:'包4', code:'004', monthAmount:888, description: '包4的描述', businessClass: 1},
            {id:5, externalName:'包5', code:'005', monthAmount:666, description: '包5的描述', businessClass: 1},
        ];
        res.send({
            success: true,
            errorCode: null,
            data: products
        });
    },

    /*客户服务-获取合作伙伴销售区域及销售区域下的地址列表*/
    'GET /api/address': (req, res)=> {
        res.send({
            success: true,
            errorCode: null,
            data: {
                saleAddressId: 1,
                saleAddressName: '北京',
                addresses: [
                    {id:2, name:'中关村', code:'001', parentId: 1},
                    {id:3, name:'海淀黄庄', code:'002', parentId: 2},
                ]
            }
        });
    },

    /*修改客户信息*/
    'PUT /api/customer-service/modifyCustomer': (req, res)=>{
        req.on('data', function (data) {
            let newData = JSON.parse(data.toString());
            res.send({
                success: true,
                errorCode: null,
                data: newData
            });
        });
    },

    /*客户服务-充值*/
    'POST /api/customer-service/doRecharge': (req, res) => {
        res.send({
            success: true,
            errorCode: null
        });
    },

    /*客户服务-更换包*/
    'POST /api/customer-service/doChangeBouquet': (req, res) => {
        res.send({
            success: true,
            errorCode: null
        });
    },

    /*客户服务-物理产品更换-查询资源状态*/
    'GET /api/customer-service/getResourceStatus': (req, res)=>{
        res.send({
            success: true,
            errorCode: null,
            data: [
                {id:11, name:'损坏'},
                {id:12, name:'报废'},
            ]
        });
    },

    /*客户服务-更换物理资源*/
    'POST /api/customer-service/doChangeCard': (req, res) => {
        res.send({
            success: true,
            errorCode: null
        });
    },

    /*客户服务-刷新授权*/
    'POST /api/customer-service/doRefreshAuth': (req, res) => {
        res.send({
            success: true,
            errorCode: null
        });
    },

    /*查询统计-激活用户查询-查询销售员及产品包*/
    'GET /api/activation-subscriber/getSalesAndBouquets': (req, res)=>{
        res.send({
            success: true,
            errorCode: null,
            data: {
                sales: [
                    {id: 1, name: '小明', code: '12323123'},
                    {id: 2, name: '小王', code: '32323545'},
                    {id: 3, name: '小四', code: '56757566'},
                ],
                bouquets: [
                    {code: '111', externalName: '包111'},
                    {code: '222', externalName: '包222'},
                    {code: '333', externalName: '包333'},
                ]
            }
        });
    },

    /*查询统计-查询销售员*/
    'GET /api/activation-subscriber/getPartnerStaffs': (req, res)=>{
        res.send({
            success: true,
            errorCode: null,
            data: [
                    {id: 1, name: '小明', code: '12323123'},
                    {id: 2, name: '小王', code: '32323545'},
                    {id: 3, name: '小四', code: '56757566'}
                ]

        });
    },

    /*查询统计-激活用户查询-查询激活用户列表*/
    'GET /api/activation-subscriber/queryActivationSubscribers': (req, res)=>{
        res.send({
            success: true,
            errorCode: null,
            data: [
                {id:1, date: '2017-01-01', smartCardCode: '12312321', stbCode: '32545', customerName:'赵五', mobile:'123123213', bouquet:'Basic(KSH 499)', salerCode:'1231123', salerName:'zhagnsan'},
                {id:2, date: '2017-02-01', smartCardCode: '67655676', stbCode: '12333', customerName:'赵六', mobile:'678768768', bouquet:'Basic(KSH 499)', salerCode:'1244888', salerName:'lisi'},
                {id:3, date: '2017-03-01', smartCardCode: '98098879', stbCode: '98778', customerName:'赵七', mobile:'456654656', bouquet:'Basic(KSH 499)', salerCode:'9897890', salerName:'sunwu'},
            ]
        });
    },

    /*查询统计-激活用户查询-查询额度销售列表*/
    'GET /api/balance-sale/queryBalanceSale': (req, res) => {
        res.send({
            success: true,
            errorCode: null,
            data: [
                {
                    id: 1,
                    date: '2017-01-01',
                    money: 100.00,
                    amount: 2,
                    smartCardCode: '12312321',
                    cardValue: '-',
                    saleType: 0,
                    mobile: '123123213',
                    salerCode: '1231123',
                    salerName: 'zhagnsan'
                },
                {
                    id: 2,
                    date: '2017-02-01',
                    money: 100.00,
                    amount: 3,
                    smartCardCode: '98098879',
                    cardValue: '-',
                    saleType: 0,
                    mobile: '678768768',
                    salerCode: '1244888',
                    salerName: 'lisi'
                },
                {
                    id: 3,
                    date: '2017-03-01',
                    money: 100.00,
                    amount: 2,
                    smartCardCode: '-',
                    cardValue: '98778',
                    saleType: 1,
                    mobile: '456654656',
                    salerCode: '9897890',
                    salerName: 'sunwu'
                },
            ]
        });
    },

    /*客户服务-重发短信*/
    'POST /api/balance-sale/resendMessage': (req, res) => {
        res.send({
            success: true,
            errorCode: null
        });
    },


    // GET POST 可省略
    '/api/users/1': {id: 1},

    // 支持自定义函数，API 参考 express@4
    'POST /api/users/create': (req, res) => {
        res.end('OK');
    },
};

export const mapPermissionToText = {
    'CONTENT_MOD': 'Content Moderator',
    'ACOUNT_MOD ': 'Account Moderator',
    'UNIT_ADMIN': 'Unit Administrator',
    'SUPER_ADMIN': 'Super Administrator'
};


export const mapPermissionToSelections = {
    'CONTENT_MOD': [{
        header: 'Quản lí tài khoản',
        navigations: [{
            title: 'Quản lý bài viết',
            redirectTo: '/ContentManage'
        }, {
            title: 'Tạo Event',
            redirectTo: '/event'
        }]
    }, {
        header: 'Cộng đồng',
        navigations: [{
            title: 'Trang chủ',
            redirectTo: '/'
        }, {
            title: 'Bảng xếp hạng',
            redirectTo: '/rank'
        }]
    }],
    
    'ACOUNT_MOD': [{
        header: 'Quản lí tài khoản',
        navigations: [{
            title: 'Duyệt tài khoản',
            redirectTo: '/approve'
        }, {
            title: 'Xóa tài khoản',
            redirectTo: '/delete-account'
        }, {
            title: 'Tạo tài khoản admin',
            redirectTo: '/CreateAccountAdmin'
        }]
    }, {
        header: 'Cộng đồng',
        navigations: [{
            title: 'Trang chủ',
            redirectTo: '/'
        }, {
            title: 'Bảng xếp hạng',
            redirectTo: '/rank'
        }]
    }],
    
    'UNIT_ADMIN': [{
        header: 'Quản lí tài khoản',
        navigations: [{
            title: 'Duyệt tài khoản',
            redirectTo: '/approve'
        }, {
            title: 'Xóa tài khoản',
            redirectTo: '/delete-account'
        }, {
            title: 'Quản lý bài viết',
            redirectTo: '/ContentManage'
        }, {
            title: 'Tạo tài khoản admin',
            redirectTo: '/CreateAccountAdmin'
        },{
            title: 'Quản lý admin',
            redirectTo: '/admin-account'
        }, {
            title: 'Tạo Event',
            redirectTo: '/event'
        }]
    }, {
        header: 'Cộng đồng',
        navigations: [{
            title: 'Trang chủ',
            redirectTo: '/'
        }, {
            title: 'Bảng xếp hạng',
            redirectTo: '/rank'
        }]
    }],
    
    'SUPER_ADMIN': [{
        header: 'Quản lí tài khoản',
        navigations: [{
            title: 'Duyệt tài khoản',
            redirectTo: '/approve'
        }, {
            title: 'Xóa tài khoản',
            redirectTo: '/delete-account'
        }, {
            title: 'Quản lý bài viết',
            redirectTo: '/ContentManage'
        }, {
            title: 'Quản lý admin',
            redirectTo: '/admin-account'
        }, {
            title:  'Tạo tài khoản admin',
            redirectTo: '/CreateAccountAdmin'
        },{
            title: 'Tạo Event',
            redirectTo: '/event'
        }]
    }, {
        header: 'Cộng đồng',
        navigations: [{
            title: 'Trang chủ',
            redirectTo: '/'
        }, {
            title: 'Bảng xếp hạng',
            redirectTo: '/rank'
        }]
    }]
};
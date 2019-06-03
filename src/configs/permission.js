export const mapPermissionToText = {
    'CONTENT_MOD': 'Content Moderator',
    'ACOUNT_MOD ': 'Account Moderator',
    'UNIT_MOD': 'Unit Administrator',
    'SUPER_ADMIN': 'Super Administrator'
};

export const mapPermissionToSelections = {
    'CONTENT_MOD': [{
        header:  ' Quản lý',
        navigations: [ {
            title: 'Quản lý bài viết',
            redirectTo: '/ContentManage'
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
        }]
    }, {
        header: 'Cộng đồng',
        navigations: [{
            title: 'Trang chủ',
            redirectTo: '/home'
        }, {
            title: 'Bảng xếp hạng',
            redirectTo: '/leaderboard'
        }]
        }],
    
    'UNIT_MOD': [{
        header: 'Quản lí tài khoản',
        navigations: [{
            title: 'Duyệt tài khoản',
            redirectTo: '/approve'
        }, {
            title: 'Xóa tài khoản',
            redirectTo: '/delete-account'
        }]
    }, {
        header: 'Cộng đồng',
        navigations: [{
            title: 'Trang chủ',
            redirectTo: '/home'
        }, {
            title: 'Bảng xếp hạng',
            redirectTo: '/leaderboard'
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
            title: 'Tạo tài khoản admin',
            redirectTo: '/CreateAccountAdmin'
        }, {
            title: 'Tạo Event',
            redirectTo: '/event'
        }]
    }, {
        header: 'Cộng đồng',
        navigations: [{
            title: 'Trang chủ',
            redirectTo: '/home'
        }, {
            title: 'Bảng xếp hạng',
            redirectTo: '/leaderboard'
        }]
    }]
};
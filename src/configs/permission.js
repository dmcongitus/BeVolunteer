export const mapPermissionToText = {
    2: 'Content Moderator',
    3: 'Account Moderator',
    4: 'Unit Administrator',
    5: 'Super Administrator'
};

export const mapPermissionToSelections = {
    2: [{
        header: 'Cộng đồng',
        navigations: [{
            title: 'Trang chủ',
            redirectTo: '/home'
        }, {
            title: 'Bảng xếp hạng',
            redirectTo: '/leaderboard'
        }]
        }],
    
    3: [{
        header: 'Quản lí tài khoản',
        navigations: [{
            title: 'Duyệt tài khoản',
            redirectTo: '/delete-account'
        }, {
            title: 'Xóa tài khoản',
            redirectTo: '/manage'
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
    
    4: [{
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
    
    5: [{
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
    }]
};
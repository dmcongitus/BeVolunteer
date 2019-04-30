export const mapPermissionToText = {
    2: 'Content Moderator',
    3: 'Account Moderator',
    4: 'Unit Administrator',
    5: 'Super Administrator'
};

export const mapPermissionToSelections = {
    2: [{
        header: 'Cộng đồng',
        navigations: [
            {
                title: 'Trang chủ',
                redirectTo: '/home'
            }, 
            {
                title: 'Bảng xếp hạng',
                redirectTo: '/leaderboard'
            },
            {
                title: 'Sự kiện',
                subPermission: [
                    {
                        title: 'Tạo sự kiện',
                        redirectTo: '/event'
                    },
                    {
                        title: 'Danh sách sự kiện',
                        redirectTo: '/eventList'
                    }
                ]
            },]
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
        }, {
            title: 'Quản lý bài viết',
            redirectTo: '/ContentManage'
        }, {
            title: 'Tạo tài khoản admin',
            redirectTo: '/CreateAccountAdmin'
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
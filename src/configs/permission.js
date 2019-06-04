export const mapPermissionToText = {
    "CONTENT_MOD": 'Content Moderator',
    "ACCOUNT_MOD": 'Account Moderator',
    "UNIT_ADMIN": 'Unit Administrator',
    "SUPER_ADMIN": 'Super Administrator'
};

export const mapPermissionToSelections = {
    "CONTENT_MOD": [{
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
    
    "ACCOUNT_MOD": [
        {
            header: 'Quản lí tài khoản',
            navigations: [
                {
                    title: 'Duyệt tài khoản',
                    redirectTo: '/approve'
                }, {
                    title: 'Xóa tài khoản',
                    redirectTo: '/delete-account'
                },
            ]
        },
        {
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
                }
            ]
        },
        
    ],
    
    "UNIT_ADMIN": [
        {
            header: 'Quản lí tài khoản',
            navigations: [{
                title: 'Duyệt tài khoản',
                redirectTo: '/approve'
            }, {
                title: 'Xóa tài khoản',
                redirectTo: '/delete-account'
            }]
        }, 
        {
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
                }
            ]
        }
    ],
    
    "SUPER_ADMIN": [
        {
            header: 'Quản lí tài khoản',
            navigations: [
                {
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
                }
            ]
        }, 
        {
            header: 'Cộng đồng',
            navigations: [
                {
                    title: 'Trang chủ',
                    redirectTo: '/home'
                }, {
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
                }
            ]
        }
    ]
};
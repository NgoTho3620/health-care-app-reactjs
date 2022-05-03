export const adminMenu = [
    {
        //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud',
                link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux',
                link: '/system/user-redux',
            },

            // {
            //     name: 'menu.admin.manage-admin',
            //     link: '/system/user-admin',
            // },
        ],
    },

    {
        //quản lý bác sĩ
        name: 'menu.admin.manage-doctor',
        menus: [
            {
                name: 'menu.doctor.add-info-doctor',
                link: '/system/manage-doctor',
                // subMenus: [
                //     {
                //         name: 'menu.system.system-administrator.user-manage',
                //         link: '/system/user-manage',
                //     },
                //     {
                //         name: 'menu.system.system-administrator.user-redux',
                //         link: '/system/user-redux',
                //     },
                // ],
            },
            {
                //quản lý kế hoạch khám bệnh bác sĩ
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule',
            },
        ],
    },
    {
        //quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic',
                link: '/system/manage-clinic',
            },
        ],
    },
    {
        //quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty',
                link: '/system/manage-specialty',
            },
        ],
    },
    {
        //quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook',
                link: '/system/manage-handbook',
            },
        ],
    },
    {
        //quản lý biểu đồ
        name: 'menu.admin.charts',
        menus: [
            {
                name: 'menu.admin.manage-charts',
                link: '/system/manage-chart',
            },
        ],
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                //Quản lý kế hoạch khám bệnh của bác sĩ
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule',
            },
            {
                //Quản lý bệnh nhân khám bệnh
                name: 'menu.doctor.manage-patient',
                link: '/doctor/manage-patient',
            },
        ],
    },
];

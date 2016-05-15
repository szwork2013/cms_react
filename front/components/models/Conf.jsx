const LeftNavs = {
    users: {
         name: '用户管理',
         default_extend: true,
         lists: {
             lists:  {
                  name: '用户列表',
             },
             power:  {
                  name: '权限列表',
             },
             help:  {
                  name: '帮助',
             },
         }
    },
    pops:  {
         name: '联想弹窗',
         default_extend: false,
         lists: {
             lists:  {
                  name: '弹窗列表',
             },
             rules:  {
                  name: '规则列表',
             },
             help:  {
                  name: '帮助',
             },
         }
    },

};

export default LeftNavs;

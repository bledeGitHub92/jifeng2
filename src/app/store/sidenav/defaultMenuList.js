export default [
    {
        name: '统 计',
        lists: [
            { name: '实时概况', url: '/summary', icon: 'am-icon-clock-o' },
            { name: '报表', url: '/report', icon: 'am-icon-file-text-o' },
        ]
    },
    {
        name: '玩 家 分 析',
        lists: [
            { name: '新增玩家', url: '/player/add', icon: 'am-icon-user' },
            { name: '活跃玩家', url: '/player/active', icon: 'am-icon-user' },
            { name: '有效玩家', url: '/player/effective', icon: 'am-icon-user' },
            { name: '留存统计', url: '/player/retained', icon: 'am-icon-user' },
            { name: '设备详情', url: '/player/device', icon: 'am-icon-user' },
            { name: '生命周期', url: '/player/lifecycle', icon: 'am-icon-user' },
        ]
    },
    {
        name: '数 据 查 询',
        lists: [
            { name: '玩家查询', url: '/dashboard', icon: 'am-icon-pie-chart' },
            { name: 'Mail', url: '/mail', icon: 'am-icon-area-chart' },
            { name: 'Form', url: '/form', icon: 'am-icon-search' },
            { name: 'Tables', url: '/table', icon: 'am-icon-table' }
        ]
    },
    {
        name: '数 据 分 析',
        lists: [
            { name: 'Time Line', url: '/time-line', icon: 'am-icon-pie-chart' },
        ]
    }
]
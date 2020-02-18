export default {
  // 登录页
  LOGIN: {
    title: '账号登录',
    username: '用户名',
    pwd: '密码',
    remeber: '记住密码',
    login: '登录',
  },
  
  // index
  INDEX: {
    title: '虹星智慧虹膜识别系统',
    logout: '退出登录',
    editPwd: '修改密码',
    downloadDoc: '下载模板',
    oldPwd: '旧密码',
    newPwd: '新密码',
    okPwd: '确认新密码',
  },

  // 主页
  HOME: {
    name: '首页',
    deviceStatus: '设备状态',
    deviceAllNumber: '设备总数',
    deviceOnlineNumber: '设备在线数'
  },

  // 监视识别
  CAMERA: {
    name: '监视识别',
    type: {
      eye: '虹膜识别',
      face: '人脸识别',
      eyeAndFace: '虹膜+人脸',
      pwd: '密码',
    },
    left: {
      title: '识别采图',
      p1: '设备站点',
      p2: '设备编号',
      p3: '识别时间',
      p4: '识别方式',
    },
    right: {
      title: '系统照片',
      p1: '姓名',
      p2: '工号',
      p3: '部门',
      p4: '注册时间',
    },
    result: '识别结果'
  },

  // 设备管理
  DEVICESTATUS: {
    name: '设备管理'
  },

  // 人员管理
  PEOPLEMANAGER: {
    name: '人员管理'
  },

  // 考勤管理
  WORKLOG: {
    name: '考勤管理'
  },

  // 识别记录
  THROUGHLOG: {
    name: '识别记录'
  },

  // 设备同步记录
  SYNCLOG: {
    name: '设备同步记录'
  },

  // 用户管理
  USERMANAGER: {
    name: '用户管理'
  },

  // 组织架构
  ORGANIZE: {
    name: '组织架构',
    empty: '暂无子部门',
  },

  // 表格字段
  TABLE: {
    tableName: {
      people: '人员表',
      work: '考勤表'
    },

    deviceType: '设备类型',

    empty: '暂无数据',
    deviceName: '设备名称',
    sn: 'SN',
    deviceIp: '设备IP',
    newworkStatus: '网络连接状态',
    connect: '连接',
    disconnect: '断开',

    type: '类型',
    sites: '站点',
    ipAddr: 'IP地址',
    operate: '操作',

    name: '姓名',
    department: '部门',
    empno: '工号',
    position: '职位',
    email: '邮箱',
    phone: '手机',
    isSignEye: '是否注册虹膜',
    isSignFace: '是否注册人脸',
    departmentName: '部门名称',

    period: '日期时间段',
    absence: '缺勤统计',
    lateCount: '迟到统计',
    earlyLeaveCount: '早退统计',
    abnormal: '异常统计',
    normal: '出勤统计',
    startWork: '上班',
    endWork: '下班',
    startWorkTime: '上班时间',
    endWorkTime: '下班时间',
    FriWork: '周六上班',
    SatWork: '周日上班',
    setWorkTime: '请在月末或月初设置！',

    recTime: '识别时间',

    time: '时间',
    status: '状态',
    sendType: '下发类型',
    add: '增加',
    delete: '删除',
    noSame: '未同步',
    sameSuccess: '同步成功',
    sameErr: '同步失败',

    userType: '用户类型',

    '一': '一',
    '二': '二',
    '三': '三',
    '四': '四',
    '五': '五',
    '六': '六',
    '日': '日' ,

    editPeople: '修改人员',
    sendPeople: '人员下发',
    device: '设备',

    adminRole: {
      admin: '普通管理员',
      superAdmin: '超级管理员',
      root: '系统管理员'
    },
  },

  // button 操作
  BUTTON: {
    more: '更多操作',
    add: '添加',
    edit: '修改',
    del: '删除',
    resetPwd: '重置密码',
    send: '下发',
    cancel: '取消',
    confirm: '提交',
    delArr: '批量删除',
    sendArr: '批量下发',
    import: '导入',
    export: '导出',
    search: '搜索',
    workSet: '考勤设置',
    addChild: '添加子部门',
    delChild: '删除部门',
    addPeople: '添加人员',
    ok: '确定',
  },

  // input 输入框
  INPUT: {
    input: '请填写',
    select: '请选择',
    startTime: '开始时间',
    endTime: '结束时间',
    rePwd: '重复密码',
    yes: '是',
    no: '否',
    choose: '选择',
  },

  // 文字提示
  MESSAGE: {
    title: '温馨提示',
    buzu: '请至少选择一名职工',
    confirmDeleteDevice: '确定删除当前设备吗？',
    confirmDeletePeople: '确定删除当前员工吗？',
    inputUsername: '请输入用户名',
    inputPwd: '请输入密码',
    getMenuErr: '获取菜单失败',
    startWorkTime: '请选择上班时间',
    endWorkTime: '请选择下班时间',
    selectTime: '请选择时间',
    setSuccess: '设置成功',
    pwdAgain: '请再次输入密码',
    pwdNoSame: '两次输入密码不一致',
    lengthErr: '长度在 3 到 18 个字符',
    selectUsertype: '请选择用户类型',
    resetPwdSuccess: '密码重置成功',
    confirmResetPwd: '确定重置此管理员的密码吗？',
    createSuccess: '创建成功',
    editSuccess: '更改成功',
    inputPhone: '请输入手机号',
    inputNumber: '请输入数字值',
    phoneErr: '手机号格式错误',
    inputName: '请输入姓名',
    selectDepartment: '请选择部门',
    inputEmpno: '请输入工号',
    inputPosition: '请输入职位',
    selectPosition: '请选择职位',
    inputEmail: '请输入邮箱地址',
    inpurEmailErr: '请输入正确的邮箱地址',
    selectDevice: '请选择设备',
    selectFile: '请选择文件',
    selectPeople: '请至少选中一个职员',
    inputIp: '请输入IP地址',
    inputIpErr: 'IP地址格式错误',
    inputSN: '请输入设备编号号',
    selectDeviceType: '请选择设备类型',
    inputSites: '请输入站点',
    deleteSuccess: '删除成功',
    eteDevice: '确定删除吗？',
    sendSuccess: '下发成功',
    sendErr: '下发失败',
    importSuccess: '导入成功',
    confirmDeleteChild: '删除当前部门，该部门下的所有子部门也会一并删除！请确定此操作！',
    submitSuccess: '提交成功',
    inputTitle: '请输入名称',
    selectDeleteDepartment: '请选中要删除的部门',
    editPwdSuccess: '密码修改成功，请重新登陆！',
    failInfoTitle: '失败信息',
    code: {
      101: '用户未登录',
      102: 'token 错误',
      103: '用户不存在',
      104: '密码错误',
      105: '用户名已存在',
      106: '新密码与旧密码相同',
      107: '用户被禁用',
      108: 'token 过期',
      109: '身份证已存在',
      301: '参数错误',
      302: '参数或配置未找到',
      303: '数据保存失败',
      350: '设备不存在',
      351: '设备状态异常',
      361: '部门下有人员未删除',
      400: '错误',
      401: '网络连接失败或超时',
      500: '服务器内部错误',
      501: '数据库错误',
      timeOut: '请求超时，请重试',
      error: '请求超时，请重试',
    }
  }
}
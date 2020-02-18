export default {
  // 登录页
  LOGIN: {
    title: '賬號登錄',
    username: '用戶名',
    pwd: '密碼',
    remeber: '記住密碼',
    login: '登錄',
  },
  
  // index
  INDEX: {
    title: '虹星智慧虹膜識別係統',
    logout: '退出登錄',
    editPwd: '修改密碼',
    downloadDoc: '下載模板',
    oldPwd: '舊密碼',
    newPwd: '新密碼',
    okPwd: '確認新密碼',
  },

  // 主页
  HOME: {
    name: '首頁',
    deviceStatus: '設備狀態',
    deviceAllNumber: '設備總數',
    deviceOnlineNumber: '設備在綫數'
  },

  // 监视识别
  CAMERA: {
    name: '監視識別',
    type: {
      eye: '虹膜識別',
      face: '人臉識別',
      eyeAndFace: '虹膜+人臉',
      pwd: '密碼',
    },
    left: {
      title: '識別彩圖',
      p1: '設備站點',
      p2: '設備編號',
      p3: '識別時間',
      p4: '識別方式',
    },
    right: {
      title: '系統照片',
      p1: '姓名',
      p2: '工號',
      p3: '部門',
      p4: '註冊時間',
    },
    result: '識別結果'
  },

  // 设备管理
  DEVICESTATUS: {
    name: '設備管理'
  },

  // 人员管理
  PEOPLEMANAGER: {
    name: '人員管理'
  },

  // 考勤管理
  WORKLOG: {
    name: '考勤管理'
  },

  // 识别记录
  THROUGHLOG: {
    name: '識別記錄'
  },

  // 设备同步记录
  SYNCLOG: {
    name: '設備同步記錄'
  },

  // 用户管理
  USERMANAGER: {
    name: '用戶管理'
  },

  // 组织架构
  ORGANIZE: {
    name: '組織架構',
    empty: '暫無子部門',
  },

  // 版本管理
  VERSION: {
    name: '版本管理',
  },

  // 表格字段
  TABLE: {
    tableName: {
      people: '人員表',
      work: '考勤表'
    },

    deviceType: '設備類型',

    empty: '暫無資料',
    deviceName: '設備名稱',
    sn: 'SN',
    deviceIp: '設備IP',
    newworkStatus: '網絡連接狀態',
    connect: '連接',
    disconnect: '斷開',

    type: '類型',
    sites: '站點',
    ipAddr: 'IP地址',
    operate: '操作',

    name: '姓名',
    department: '部門',
    empno: '工號',
    position: '職位',
    email: '郵箱',
    phone: '手機號',
    isSignEye: '是否註冊虹膜',
    isSignFace: '是否注冊人臉',
    departmentName: '部門名稱',

    period: '日期時間段',
    absence: '缺勤統計',
    lateCount: '遲到統計',
    earlyLeaveCount: '早退統計',
    abnormal: '異常統計',
    normal: '出勤統計',
    startWork: '上班',
    endWork: '下班',
    startWorkTime: '上班時間',
    endWorkTime: '下班時間',
    FriWork: '周六上班',
    SatWork: '周日上班',
    setWorkTime: '請在月末或月初設置！',

    recTime: '識別時間',

    time: '時間',
    status: '狀態',
    sendType: '下發類型',
    add: '增加',
    delete: '刪除',
    noSame: '未同步',
    sameSuccess: '同步成功',
    sameErr: '同步失敗',

    userType: '用戶類型',
    
    '一': '一',
    '二': '二',
    '三': '三',
    '四': '四',
    '五': '五',
    '六': '六',
    '日': '日' ,

    editPeople: '修改人員',
    sendPeople: '人員下發',
    device: '設備',

    adminRole: {
      admin: '普通管理員',
      superAdmin: '超級管理員',
      root: '系統管理員'
    },

    groupName: '分组名称',
    selectGroup: '选择分组',
    selectDevice: '选择设备',

    appType: 'app类型',
    version: '版本号',
    file: '版本文件',
    filename: '文件名',
    message: '版本描述',
    downloadUrl: '下载地址',
  },

  // button 操作
  BUTTON: {
    more: '更多操作',
    add: '添加',
    edit: '修改',
    del: '删除',
    resetPwd: '重置密碼',
    send: '下發',
    cancel: '取消',
    confirm: '提交',
    delArr: '批量删除',
    sendArr: '批量下發',
    import: '導入',
    export: '導出',
    search: '搜索',
    workSet: '考勤設置',
    addChild: '添加子部門',
    delChild: '删除部門',
    addPeople: '添加人員',
    ok: '確定',
    addGroup: '添加分组',
    editGroup: '修改分组',
    delGroup: '删除分组',
    addDevice: '添加设备',
    deviceSetting: '设备配置',
  },

  // input 输入框
  INPUT: {
    input: '請填寫',
    select: '請選擇',
    startTime: '開始時間',
    endTime: '結束時間',
    rePwd: '重複密碼',
    yes: '是',
    no: '否',
    choose: '選擇',
  },

  // 文字提示
  MESSAGE: {
    title: '溫馨提示',
    buzu: '請至少選擇一名職工',
    confirmDeleteDevice: '確定刪除當前設備嗎？',
    confirmDeletePeople: '確定刪除當前員工嗎？',
    inputUsername: '請輸入用戶名',
    inputPwd: '請輸入密碼',
    getMenuErr: '獲取菜單失敗',
    startWorkTime: '請選擇上班時間',
    endWorkTime: '請選擇下班時間',
    selectTime: '请选择时间',
    setSuccess: '設置成功',
    pwdAgain: '請再次輸入密碼',
    pwdNoSame: '兩次輸入密碼不一致',
    lengthErr: '長度在3到18個字符',
    selectUsertype: '請選擇用戶類型',
    resetPwdSuccess: '密碼重置成功',
    confirmResetPwd: '確定重置此密碼嗎？',
    createSuccess: '創建成功',
    editSuccess: '更改成功',
    inputPhone: '請輸入手機號',
    inputNumber: '請輸入數字值',
    phoneErr: '手機號格式錯誤',
    inputName: '請輸入姓名',
    selectDepartment: '請選擇部門',
    inputEmpno: '請輸入工號',
    inputPosition: '請輸入職位',
    selectPosition: '請選擇職位',
    inputEmail: '請輸入郵箱地址',
    inpurEmailErr: '請輸入正確的有郵箱地址',
    selectDevice: '請選擇設備',
    selectFile: '請選擇文件',
    selectPeople: '請至少選中一個職員',
    inputIp: '請輸入IP地址',
    inputIpErr: 'IP地址格式錯誤',
    inputSN: '請輸入設備編號',
    selectDeviceType: '請選擇設備類型',
    inputSites: '請輸入站點',
    deleteSuccess: '刪除成功',
    confirmDel: '確定刪除嗎？',
    sendSuccess: '下發成功',
    sendErr: '下發失敗',
    importSuccess: '導入成功',
    confirmDeleteChild: '該模塊及其子模塊都會被刪除，您確定刪除嗎？',
    submitSuccess: '提交成功',
    inputTitle: '請輸入名稱',
    selectDeleteDepartment: '請選中要刪除的部門',
    editPwdSuccess: '密碼修改成功，請重新登陸！',
    failInfoTitle: '失敗信息',
    inputGroupName: '请输入分组名称',
    selectGroup: '请选择分组',
    selectDeleteGroup: '请选中要删除的分组',
    selectEditGroup: '请选中要修改的分组',
    confirmDeleteGroup: '删除当前分组，该分组下的所有设备的数据会清空！请确定此操作！',
    deviceTypeNoSame: '所选设备类型不统一',
    selectAppType: '请选择app类型',
    inputVersion: '请输入版本号',
    inputFileName: '请输入文件名',
    inputMessage: '请输入版本描述',
    code: {
      101: '用戶未登錄',
      102: 'token 錯誤',
      103: '用戶不存在',
      104: '密碼錯誤',
      105: '用戶名已存在',
      106: '新密碼與舊密碼相同',
      107: '用戶被禁用',
      108: 'token 過期',
      109: '身份證已存在',
      301: '參數錯誤',
      302: '參數或配置未找到',
      303: '數據保存失敗',
      350: '設備不存在',
      351: '設備狀態異常',
      361: '部門下有人員未刪除',
      400: '錯誤',
      401: '網絡連接失敗或超時',
      500: '服務器內部錯誤',
      501: '數據庫錯誤',
      timeOut: '請求超時，請重試',
      error: '請求失敗，請重試',
    }
  }
}
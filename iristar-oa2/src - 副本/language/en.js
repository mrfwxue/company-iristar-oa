export default {
  // 登录页
  LOGIN: {
    title: 'Account login',
    username: 'user name',
    pwd: 'password',
    remeber: 'Remember Password',
    login: 'Login',
  },
  
  // index
  INDEX: {
    title: 'Iristar Smart Recognition System',
    logout: 'Sign Out',
    editPwd: 'Change Password',
    downloadDoc: 'Download the template',
    oldPwd: 'Old password',
    newPwd: 'New password',
    okPwd: 'Confirm the new password',
  },

  // 主页
  HOME: {
    name: 'Home',
    deviceStatus: 'Device Status',
    deviceAllNumber: 'The total number of devices',
    deviceOnlineNumber: 'Device Online'
  },

  // 监视识别
  CAMERA: {
    name: 'Real-time Identification Image',
    type: {
      eye: 'Iris identification',
      face: 'face identification',
      eyeAndFace: 'Iris and face identification',
      pwd: 'Password',
    },
    left: {
      title: 'Identification Image',
      p1: 'Device sites',
      p2: 'Device SN',
      p3: 'Identification Time',
      p4: 'Identify ways',
    },
    right: {
      title: 'System Photo',
      p1: 'Name',
      p2: 'Staff ID',
      p3: 'Department',
      p4: 'Registration Time',
    },
    result: 'Identification Results'
  },

  // 设备管理
  DEVICESTATUS: {
    name: 'Device List'
  },

  // 人员管理
  PEOPLEMANAGER: {
    name: 'Staff Management'
  },

  // 考勤管理
  WORKLOG: {
    name: 'Attendance Management'
  },

  // 识别记录
  THROUGHLOG: {
    name: 'Identification Record'
  },

  // 设备同步记录
  SYNCLOG: {
    name: 'Simultaneous Recording'
  },

  // 用户管理
  USERMANAGER: {
    name: 'User Management'
  },

  // 组织架构
  ORGANIZE: {
    name: 'Organization',
    empty: 'No Subsector',
  },

  // 版本管理
  VERSION: {
    name: '版本管理',
  },

  // 表格字段
  TABLE: {
    tableName: {
      people: 'Staff List',
      work: 'Attendance Statistics'
    },

    deviceType: 'Devicetype',

    empty: 'No Data',
    deviceName: 'Device Name',
    sn: 'SN',
    deviceIp: 'Device IP',
    newworkStatus: 'Network Connection Status',
    connect: 'Connect',
    disconnect: 'Disconnect',

    type: 'Type',
    sites: 'Sites',
    ipAddr: 'Add.',
    operate: 'Operations',

    name: 'Name',
    department: 'Department',
    empno: 'Staff ID',
    position: 'Position',
    email: 'Email',
    phone: 'Tel',
    isSignEye: 'Iris register',
    isSignFace: 'Face register',
    departmentName: 'Department name',

    period: 'Period',
    absence: 'Absence',
    lateCount: 'Late Statistics',
    earlyLeaveCount: 'Statistical Leave Early',
    abnormal: 'Statistical Anomalies',
    normal: 'Attendance Statistics',
    startWork: 'Clock in',
    endWork: 'Clock out',
    startWorkTime: 'Starting time',
    endWorkTime: 'Quitting time',
    FriWork: 'Clock in at saturday',
    SatWork: 'Clock out at sunday',
    setWorkTime: 'Please set up at the beginning or end of the month!',

    recTime: 'Identification Time',

    time: 'Time',
    status: 'user',
    sendType: 'Issued type',
    add: 'Add',
    delete: 'Delete',
    noSame: 'Not synchronized',
    sameSuccess: 'Successful synchronization',
    sameErr: 'Synchronization failed',

    userType: 'User Type',
    
    '一': 'Sun.',
    '二': 'Mon.',
    '三': 'Tues.',
    '四': 'Wed.',
    '五': 'Thur.',
    '六': 'Fri.',
    '日': 'Sat.' ,

    editPeople: 'Modify staff',
    sendPeople: 'Officers Issued',
    device: 'Device',

    adminRole: {
      admin: 'Admin',
      superAdmin: 'Super_admin',
      root: 'Root'
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
    more: 'more',
    add: 'Add',
    edit: 'Change',
    del: 'Delete',
    resetPwd: 'Reset Password',
    send: 'Issued',
    cancel: 'Cancel',
    confirm: 'Submit',
    delArr: 'Batch Delete',
    sendArr: 'Batch Issued',
    import: 'Import',
    export: 'Export',
    search: 'Search',
    workSet: 'Attendance Set',
    addChild: 'Add Subsections',
    delChild: 'Delete Department',
    addPeople: 'Add Staff',
    ok: 'Confirm',
    addGroup: '添加分组',
    editGroup: '修改分组',
    delGroup: '删除分组',
    addDevice: '添加设备',
    deviceSetting: '设备配置',
  },

  // input 输入框
  INPUT: {
    input: 'Please fill in',
    select: 'Please select',
    startTime: 'Start Time',
    endTime: 'End Time',
    rePwd: 'Confirm Password',
    yes: 'Yes',
    no: 'No',
    choose: 'Select',
  },

  // 文字提示
  MESSAGE: {
    title: 'Tips',
    buzu: 'Please select at least one worker',
    confirmDeleteDevice: 'Delete this device?',
    confirmDeletePeople: 'Delete the current staff?',
    inputUsername: 'Please enter user name',
    inputPwd: 'Please enter password',
    getMenuErr: 'Failure to obtain menu',
    startWorkTime: 'Please select the start of the working hours',
    endWorkTime: 'Please select the end of the working hours',
    selectTime: 'Please select the time',
    setSuccess: 'Setting success',
    pwdAgain: 'Please enter your password again',
    pwdNoSame: 'Enter the password twice inconsistent',
    lengthErr: 'Enter the length of 3 to 18 characters',
    selectUsertype: 'Please select the type of user',
    resetPwdSuccess: 'Password reset successful',
    confirmResetPwd: 'This determination reset the administrator password for it?',
    createSuccess: 'Add success',
    editSuccess: 'Successful change',
    inputPhone: 'Please enter Tel',
    inputNumber: 'Please enter a numeric value',
    phoneErr: 'Malformed Tel',
    inputName: 'Please enter name',
    selectDepartment: 'Please select department',
    inputEmpno: 'Please enter Staff ID',
    inputPosition: 'Please enter position',
    selectPosition: 'Please select position',
    inputEmail: 'Please input the email address',
    inpurEmailErr: 'Please input the correct email address',
    selectDevice: 'Please select a device',
    selectFile: 'Please select a file',
    selectPeople: 'Please select at least one staff member',
    inputIp: 'Enter the IP address',
    inputIpErr: 'IP address format error',
    inputSN: 'Please enter the device number',
    selectDeviceType: 'Please select the type of device',
    inputSites: 'Please enter the site',
    deleteSuccess: 'Success',
    confirmDel: 'confirm to delete?',
    sendSuccess: 'Issued success',
    sendErr: 'Issued fail',
    importSuccess: 'Import success',
    confirmDeleteChild: 'The module and its sub-modules will be deleted, are you sure to delete it?',
    submitSuccess: 'Submitted successfully',
    inputTitle: 'Please enter a name',
    selectDeleteDepartment: 'Please select the department you want to delete',
    editPwdSuccess: 'Password changed successfully, please login again!',
    failInfoTitle: 'Import failure',
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
      101: 'User not logged in',
      102: 'Bad Token',
      103: 'User not exist',
      104: 'PassWord Error',
      105: 'The user name already exists',
      106: 'The new password is the same as the old one',
      107: 'User was disabled',
      108: 'Expired Token token',
      109: 'Id card already exists',
      301: 'Parameter error',
      302: 'Parameters or configuration not found',
      303: 'Data saving failed',
      350: 'Equipment does not exist',
      351: 'Abnormal device state',
      361: 'There are personnel under the department not deleted',
      400: 'Error',
      401: 'Network connection failed or timed out',
      500: 'Internal server error',
      501: 'Database Error',
      timeOut: 'Request timeout, please try again',
      error: 'The request failed. Please try again',
    }
  }
}
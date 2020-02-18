<template>
  <div class="s320 device-setting">
    <div class="param-setting">
      <h2>通用设置</h2>
      <div class="item">
        <div class="inner"><label>系统语言</label></div>
        <div class="inner w-150">
          <el-select v-model="s320Set.language" size="mini" clearable :placeholder="$t('message.INPUT.select')">
            <el-option
              v-for="item in yuzhi"
              :key="item.val"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <div class="inner">
          <label>亮度</label>
        </div>
        <div class="inner w-150">
          <el-slider v-model="s320Set.brightness"></el-slider>
        </div>
      </div>
      <div class="item">
        <div class="inner"><label>系统时间</label></div>
        <div class="inner w-150">
          <el-time-picker
            v-model="s320Set.systemTime"
            value-format="HH:mm:ss"
            size="mini"
            clearable
            :placeholder="$t('message.INPUT.select')">
          </el-time-picker>
        </div>
        <div class="inner">
          <label>系统日期</label>
        </div>
        <div class="inner w-150">
          <el-date-picker
            v-model="s320Set.systemDate"
            value-format="yyyy-MM-dd"
            size="mini"
            clearable
            type="date"
            :placeholder="$t('message.INPUT.select')">
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="param-setting">
      <div class="item" style="margin-top:0;">
        <div class="col">
          <div class="item" style="margin-top:0;">
            <div class="inner">
              <label><h3>LOGO</h3></label>
            </div>
            <div class="inner w-100">
              <el-button size="mini">删除LOGO</el-button>
            </div>
          </div>
          <div class="item">
            <div class="inner" style="margin-right:39px">
              <label><h3>添加LOGO</h3></label>
            </div>
            <div class="inner w-100">
              <el-button size="mini">选择图片</el-button>
            </div>
          </div>
        </div>
        <div class="col" style="width:97px;">
          <img src="@/assets/img/slide/logo.png" alt="">
        </div>
      </div>
    </div>
    <div class="param-setting">
      <h2>工作模式</h2>
      <div class="item">
        <div class="inner" style="margin-right:150px;"><el-radio v-model="s320Set.workMode" label='0'>默认全天虹膜</el-radio></div>
        <div class="inner"><el-radio v-model="s320Set.workMode" label='1'>默认全天人脸</el-radio></div>
      </div>
      <div class="item">
        <div class="inner" style="margin-right:108px;"><el-radio v-model="s320Set.workMode" label='2'>默认全天人脸或虹膜</el-radio></div>
        <div class="inner"><el-radio v-model="s320Set.workMode" label='3'>默认全天人脸且虹膜</el-radio></div>
      </div>
      <div class="inset-line ml-10"></div>
      <div class="item" style="margin-top:10px;">
        <div class="inner"><el-radio v-model="s320Set.workMode" label='4'>自定义模式</el-radio></div>
        <div class="inner-wrap" v-show="s320Set.workMode=='4'">
          <div class="item">
            <div class="label">
              <label>工作时间</label>
            </div>
            <div class="input w-100">
              <el-select v-model="s320Set.startDay" size="mini" clearable :placeholder="$t('message.INPUT.select')">
                <el-option
                  v-for="item in yuzhi"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val">
                </el-option>
              </el-select>
            </div>
            <span style="margin:0 30px;">至</span>
            <div class="input w-100">
              <el-select v-model="s320Set.endDay" size="mini" clearable :placeholder="$t('message.INPUT.select')">
                <el-option
                  v-for="item in yuzhi"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="label">
              <label>工作时间模式</label>
            </div>
            <div class="input w-100">
              <el-select v-model="s320Set.bioType" size="mini" clearable :placeholder="$t('message.INPUT.select')">
                <el-option
                  v-for="item in workMode"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="label">
              <label>开始时间</label>
            </div>
            <div class="input w-100">
              <el-select v-model="s320Set.startTime" size="mini" clearable :placeholder="$t('message.INPUT.select')">
                <el-option
                  v-for="item in yuzhi"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val">
                </el-option>
              </el-select>
            </div>
            <div class="label">
              <label style="min-width:75px;">结束时间</label>
            </div>
            <div class="input w-100">
              <el-select v-model="s320Set.endTime" size="mini" clearable :placeholder="$t('message.INPUT.select')">
                <el-option
                  v-for="item in yuzhi"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="label">
              <label>非工作时间模式</label>
            </div>
            <div class="input w-100">
              <el-select v-model="s320Set.bioTypeIdle" size="mini" clearable :placeholder="$t('message.INPUT.select')">
                <el-option
                  v-for="item in workMode"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="param-setting">
      <h2>功能设置</h2>
      <div class="item">
        <div class="inner"><label>设备端注册</label></div>
        <div class="inner">
          <el-switch
            v-model="s320Set.devRegEnabled"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
          </el-switch>
        </div>
      </div>
      <div class="item">
        <div class="inner"><label>人脸补光</label></div>
        <div class="inner">
          <el-switch
            v-model="s320Set.lightEnabled"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
          </el-switch>
        </div>
      </div>
      <div class="inset-line ml-10"></div>
      <div class="item">
        <div class="inner"><label>门禁设置</label></div>
        <div class="inner">
          <el-switch
            v-model="s320Set.gateEnabled"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
          </el-switch>
        </div>
        <div class="inner-wrap">
          <div class="item">
            <div class="label">
              <label>开关时长</label>
            </div>
            <div class="input w-100">
              <el-select v-model="s320Set.closeTimeout" size="mini" clearable :placeholder="$t('message.INPUT.select')">
                <el-option
                  v-for="item in closeTimeout"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="label">
              <el-radio v-model="s320Set.gateMode" label='wigan'>韦根</el-radio>
            </div>
          </div>
          <div class="item">
            <div class="label">
              <el-radio v-model="s320Set.gateMode" label='relay'>继电器</el-radio>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="param-setting">
      <h2>
        {{qita.msg}}
        <div class="add"><el-button size="mini" icon="el-icon-plus" @click="addAttr"></el-button></div>
      </h2>
      <div class="item" v-for="(item, i) in qita.data" :key="i">
        <div class="inner">
          <div class="label">
            <label>属性名</label>
          </div>
          <div class="input">
            <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="item.key" autocomplete="off"></el-input>
          </div>
        </div>
        <div class="inner">
          <div class="label">
            <label>属性值</label>
          </div>
          <div class="input">
            <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="item.val" autocomplete="off"></el-input>
          </div>
        </div>
        <div class="inner"><el-button size="mini" icon="el-icon-minus" @click="delAttr(item, i)"></el-button></div>
      </div>
    </div>
    <div class="param-setting">
      <div class="item saveData">
        <el-button size="mini" :disabled="isClick" @click="saveData">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 's320',
  components: {},
  props: {
    deviceData: {}
  },
  data() {
    return {
      isClick: false,
      activeColor: '#13ce66',
      inactiveColor: '#ff4949',
      yuzhi: [
        {label: '宽松', val: '1'},
        {label: '严格', val: '2'},
      ],
      workMode: [
        {label: '虹膜', val: '0'},
        {label: '人脸', val: '1'},
        {label: '人脸或虹膜', val: '2'},
        {label: '人脸加虹膜', val: '3'},
      ],
      closeTimeout: [
        {label: '1s', val: '1'},
        {label: '2s', val: '2'},
        {label: '3s', val: '3'},
        {label: '4s', val: '4'},
        {label: '5s', val: '5'},
        {label: '6s', val: '6'},
        {label: '7s', val: '7'},
        {label: '8s', val: '8'},
        {label: '9s', val: '9'},
        {label: '10s', val: '10'},
      ],
      s320Set: {
        title: '配置S320',
        language: '', // 语言
        brightness: 0, // 亮度
        systemTime: '', // 系统时间
        systemDate: '', // 系统日期
        logo: '',
        workMode: '', // 0: 全天虹膜 1：全天人脸 2：全天人脸或虹膜 3：全天人脸加虹膜 4： 自定义
        startDay: '', // 工作开始时间
        endDay: '', // 工作结束时间
        bioType: '', // 工作模式 0: 虹膜 1：人脸 2 人脸或虹膜 3 人脸加虹膜
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        bioTypeIdle: '', // 非工作模式 0: 虹膜 1：人脸 2 人脸或虹膜 3 人脸加虹膜
        devRegEnabled: '', // 设备端注册 0: 关闭， 1：开启
        lightEnabled: '', // 是否开启补光 0: 关闭， 1：开启
        gateEnabled: '', // 是否开启门禁 0: 关闭， 1：开启
        closeTimeout: '', // 开关时长
        gateMode: '', // 'wigan' 或者 relay
      },
      qita: { // 用户手动添加的动态属性
        msg: '自定义属性',
        data: []
      }
    }
  },
  beforeDestroy() {},
  destroyed() {},
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$emit('returnTitle', this.s320Set.title)
    this.isClick = false;
    this.formatData();
  },
  methods: {
    formatData() {
      // console.log('format')
      const {
        deviceType, // 设备类型
        language, // 语言
        brightness, // 亮度
        systemTime, // 系统时间
        systemDate, // 系统日期
        logo,
        workMode, // 0: 全天虹膜 1：全天人脸 2：全天人脸或虹膜 3：全天人脸加虹膜 4： 自定义
        startDay, // 工作开始时间
        endDay, // 工作结束时间
        bioType, // 工作模式 0: 虹膜 1：人脸 2 人脸或虹膜 3 人脸加虹膜
        startTime, // 开始时间
        endTime, // 结束时间
        bioTypeIdle, // 非工作模式 0: 虹膜 1：人脸 2 人脸或虹膜 3 人脸加虹膜
        devRegEnabled, // 设备端注册 0: 关闭， 1：开启
        lightEnabled, // 是否开启补光 0: 关闭， 1：开启
        gateEnabled, // 是否开启门禁 0: 关闭， 1：开启
        closeTimeout, // 开关时长
        gateMode, // 'wigan' 或者 relay
      } = this.deviceData;
      this.s320Set = {
        language, // 语言
        brightness: Number(brightness), // 亮度
        systemTime, // 系统时间
        systemDate, // 系统日期
        logo,
        workMode, // 0: 全天虹膜 1：全天人脸 2：全天人脸或虹膜 3：全天人脸加虹膜 4： 自定义
        startDay, // 工作开始时间
        endDay, // 工作结束时间
        bioType, // 工作模式 0: 虹膜 1：人脸 2 人脸或虹膜 3 人脸加虹膜
        startTime, // 开始时间
        endTime, // 结束时间
        bioTypeIdle, // 非工作模式 0: 虹膜 1：人脸 2 人脸或虹膜 3 人脸加虹膜
        devRegEnabled, // 设备端注册 0: 关闭， 1：开启
        lightEnabled, // 是否开启补光 0: 关闭， 1：开启
        gateEnabled, // 是否开启门禁 0: 关闭， 1：开启
        closeTimeout, // 开关时长
        gateMode, // 'wigan' 或者 relay
      };
    },
    addAttr() {
      let obj = {
        key: '',
        val: '',
      }
      this.qita.data.push(obj);
    },
    delAttr(item, i) {
      this.qita.data.splice(i, 1)
    },
    saveData() {
      this.isClick = true;
      this.$emit('saveData', this.s320Set)
    }
  },
}
</script>

<style lang="scss" scoped>
.inset-line{
  max-width:600px;
  height:1px;
  background:#b5b5b5;
  margin:10px 0;
}
.ml-10{
  margin-left:10px;
}
.s320{
  .inner-wrap{
    padding-left:25px;
    label{
      display:inline-block;
      min-width:115px;
    }
  }
}
.item{
  .col{
    display:inline-block;
    img{
      width:100%;
    }
  }
}
</style>


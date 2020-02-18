<template>
  <div class="w200 device-setting">
    <div class="param-setting">
      <h2>注册模式</h2>
      <div class="item">
        <div class="inner"><label>人脸</label></div>
        <div class="inner">
          <el-switch
            v-model="w200Set.model.face.val"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
          </el-switch>
        </div>
        <div class="inner">
          <label>人脸采集阈值</label>
        </div>
        <div class="inner w-100">
          <el-select v-model="w200Set.model.face.yuzhi" size="mini" clearable :placeholder="$t('message.INPUT.select')">
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
        <div class="inner"><label>虹膜</label></div>
        <div class="inner">
          <el-switch
            v-model="w200Set.model.eye.val"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
          </el-switch>
        </div>
        <div class="inner">
          <label>虹膜采集阈值</label>
        </div>
        <div class="inner w-100">
          <el-select v-model="w200Set.model.eye.yuzhi" size="mini" clearable :placeholder="$t('message.INPUT.select')">
            <el-option
              v-for="item in yuzhi"
              :key="item.val"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- <div class="item">
        <div class="inner"><label>密码</label></div>
        <div class="inner">
          <el-switch
            v-model="w200Set.model.pwd"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
          </el-switch>
        </div>
      </div> -->
      <div class="item">
        <div class="inner"><label>活体检测</label></div>
        <div class="inner">
          <el-switch
            v-model="w200Set.model.livingCheck"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
          </el-switch>
        </div>
      </div>
      <div class="item">
        <div class="inner"><label>美瞳检测</label></div>
        <div class="inner">
          <el-switch
            v-model="w200Set.model.eyeCheck"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
          </el-switch>
        </div>
      </div>
    </div>
    <div class="param-setting">
      <h2>参数设置</h2>
      <div class="item">
        <div class="label">
          <label>白色补光灯源值</label>
        </div>
        <div class="input">
          <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="w200Set.param.whiteLight" autocomplete="off"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="label">
          <label>红外补光灯源值</label>
        </div>
        <div class="input">
          <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="w200Set.param.redLight" autocomplete="off"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="label">
          <label>人脸注册距离值</label>
        </div>
        <div class="input">
          <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="w200Set.param.faceDis.min" autocomplete="off"></el-input>
        </div>
        <span class="last">至</span>
        <div class="input">
          <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="w200Set.param.faceDis.max" autocomplete="off"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="label">
          <label>虹膜注册距离值</label>
        </div>
        <div class="input">
          <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="w200Set.param.eyeDis.min" autocomplete="off"></el-input>
        </div>
        <span class="last">至</span>
        <div class="input">
          <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="w200Set.param.eyeDis.max" autocomplete="off"></el-input>
        </div>
      </div>
    </div>
    <div class="param-setting">
      <h2>
        {{w200Set.qita.msg}}
        <div class="add"><el-button size="mini" icon="el-icon-plus" @click="addAttr"></el-button></div>
      </h2>
      <div class="item" v-for="(item, i) in w200Set.qita.data" :key="i">
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
  name: 'w200',
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
      w200Set: {
        title: '配置W200',
        model: { // 注册模式
          face: { // 人脸
            val: true,
            yuzhi: '', // 阈值
          },
          eye: { // 虹膜
            val: true,
            yuzhi: '', // 阈值
          },
          pwd: true, // 密码
          livingCheck: true, // 活体检测
          eyeCheck: true, // 美瞳检测
        },
        param: { // 参数设置
          whiteLight: '', // 白色补光灯源值
          redLight: '', // 红外补光灯源值
          faceDis: { // 人脸注册距离
            min: '',
            max: '',
          },
          eyeDis: { // 虹膜注册距离
            min: '',
            max: '',
          }
        },
        qita: { // 用户手动添加的动态属性
          msg: '自定义属性',
          data: []
        }
      }
    }
  },
  beforeDestroy() {},
  destroyed() {},
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.isClick = false;
    this.$emit('returnTitle', this.w200Set.title);
    this.formatData();
  },
  methods: {
    formatData() {
      const {
        deviceType, // 设备类型
        bioType, // 0：虹膜，1：人脸，2：虹膜+人脸
        faceThreshold, // 人脸采集阈值
        irisThreshold, // 虹膜采集阈值
        bioLivenessCheckEnabled, // 0：不启用活体检测1：启用
        cosmeticLenseCheckEnabled, // 0：不启用美瞳检测1：启用
        
        whileLight, // 白光亮度值
        redLight, // 红光亮度值
        faceMinTofThreshold, // 人脸采集最小距离值
        faceMaxTofThreshold, // 人脸采集最大距离值
        irisMinTofThreshold, // 虹膜采集最小距离值
        irisMaxTofThreshold, // 虹膜采集最大距离值

        imageDir, // 采集图像保存路径
        logPath, // 日志路径
      } = this.deviceData;
      this.w200Set = {
        title: '配置W200',
        model: { // 注册模式
          face: { // 人脸
            val: bioType != 0,
            yuzhi: faceThreshold, // 阈值
          },
          eye: { // 虹膜
            val: bioType != 1,
            yuzhi: irisThreshold, // 阈值
          },
          pwd: true, // 密码
          livingCheck: bioLivenessCheckEnabled == 1, // 活体检测
          eyeCheck: cosmeticLenseCheckEnabled == 1, // 美瞳检测
        },
        param: { // 参数设置
          whiteLight: whileLight, // 白色补光灯源值
          redLight: redLight, // 红外补光灯源值
          faceDis: { // 人脸注册距离
            min: faceMinTofThreshold,
            max: faceMaxTofThreshold,
          },
          eyeDis: { // 虹膜注册距离
            min: irisMinTofThreshold,
            max: irisMaxTofThreshold,
          }
        },
        qita: { // 用户手动添加的动态属性
          msg: '自定义属性',
          data: []
        }
      };
    },
    addAttr() {
      let obj = {
        key: '',
        val: '',
      }
      this.w200Set.qita.data.push(obj);
    },
    delAttr(item, i) {
      this.w200Set.qita.data.splice(i, 1)
    },
    saveData() {
      this.isClick = true;
      this.$emit('saveData', this.w200Set)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>


<template>
  <div class="s300 device-setting">
    <div class="param-setting">
      <h2>注册模式</h2>
      <div class="item">
        <div class="inner"><label>人脸</label></div>
        <div class="inner">
          <el-switch
            v-model="s300Set.model.face.val"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
          </el-switch>
        </div>
        <div class="inner">
          <label>人脸采集阈值</label>
        </div>
        <div class="inner w-100">
          <el-select v-model="s300Set.model.face.yuzhi" size="mini" clearable :placeholder="$t('message.INPUT.select')">
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
            v-model="s300Set.model.eye.val"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
          </el-switch>
        </div>
        <div class="inner">
          <label>虹膜采集阈值</label>
        </div>
        <div class="inner w-100">
          <el-select v-model="s300Set.model.eye.yuzhi" size="mini" clearable :placeholder="$t('message.INPUT.select')">
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
        <div class="inner"><label>活体检测</label></div>
        <div class="inner">
          <el-switch
            v-model="s300Set.model.livingCheck"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
          </el-switch>
        </div>
      </div>
      <div class="item">
        <div class="inner"><label>美瞳检测</label></div>
        <div class="inner">
          <el-switch
            v-model="s300Set.model.eyeCheck"
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
          <label>红外补光灯源值</label>
        </div>
        <div class="input">
          <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="s300Set.param.redLight" autocomplete="off"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="label">
          <label>人脸注册距离值</label>
        </div>
        <div class="input">
          <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="s300Set.param.faceDis.min" autocomplete="off"></el-input>
        </div>
        <span class="last">至</span>
        <div class="input">
          <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="s300Set.param.faceDis.max" autocomplete="off"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="label">
          <label>虹膜注册距离值</label>
        </div>
        <div class="input">
          <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="s300Set.param.eyeDis.min" autocomplete="off"></el-input>
        </div>
        <span class="last">至</span>
        <div class="input">
          <el-input type="text" size="mini" :placeholder="$t('message.INPUT.input')" clearable v-model="s300Set.param.eyeDis.max" autocomplete="off"></el-input>
        </div>
      </div>
    </div>
    <div class="param-setting">
      <h2>
        {{s300Set.qita.msg}}
        <div class="add"><el-button size="mini" icon="el-icon-plus" @click="addAttr"></el-button></div>
      </h2>
      <div class="item" v-for="(item, i) in s300Set.qita.data" :key="i">
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
        <el-button size="mini" @click="saveData">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 's300',
  components: {},
  props: {},
  data() {
    return {
      activeColor: '#13ce66',
      inactiveColor: '#ff4949',
      yuzhi: [
        {label: '宽松', val: '1'},
        {label: '严格', val: '2'},
      ],
      s300Set: {
        title: '配置S300UC',
        model: { // 注册模式
          face: { // 人脸
            val: true,
            yuzhi: '', // 阈值
          },
          eye: { // 虹膜
            val: true,
            yuzhi: '', // 阈值
          },
          livingCheck: true, // 活体检测
          eyeCheck: true, // 美瞳检测
        },
        param: { // 参数设置
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
  created() {
    this.$emit('returnTitle', this.s300Set.title)
  },
  mounted() {},
  methods: {
    addAttr() {
      let obj = {
        key: '',
        val: '',
      }
      this.s300Set.qita.data.push(obj);
    },
    delAttr(item, i) {
      this.s300Set.qita.data.splice(i, 1)
    },
    saveData() {}
  },
}
</script>

<style lang="scss" scoped>

</style>


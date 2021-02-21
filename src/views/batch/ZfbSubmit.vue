<template>
  <div class="wrap">
    <custom-step :currentStep="4"></custom-step>
    <div class="list">
      <el-form :model="model" ref="ruleForm">
        <el-table
            :header-cell-style="{textAlign: 'center'}"
            :cell-style="{ textAlign: 'center', paddingBottom: 0 }"
            stripe
            :data="model.list">
          <el-table-column
              key="payee"
              label="支付宝账号">
            <template slot-scope="scope">
              <el-form-item :prop="'list.' + scope.$index + '.payee'" :rules="rules.payee">
                <el-input v-model="scope.row.payee" placeholder="请输入支付宝账号" maxlength="64" size="medium"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
              key="real_name"
              label="姓名">
            <template slot-scope="scope">
              <el-form-item :prop="'list.' + scope.$index + '.real_name'" :rules="rules.real_name">
                <el-input v-model="scope.row.real_name" placeholder="姓名" maxlength="20" size="medium"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
              key="amount"
              label="转账金额（元）">
            <template slot-scope="scope">
              <el-form-item :prop="'list.' + scope.$index + '.amount'" :rules="rules.amount">
                <el-input v-model="scope.row.amount" placeholder="只能输入2位小数" size="medium" @change="doChangeAmount"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
              key="remark"
              label="备注内容">
            <template slot-scope="scope">
              <el-form-item :prop="'list.' + scope.$index + '.remark'" :rules="rules.remark">
                <el-input v-model="scope.row.remark" placeholder="只能输入100个汉字" maxlength="100" size="medium"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-form-item>
                <el-button size="medium" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <!--统计-->
      <ul class="statistics">
        <li>共计: {{ this.model.list.length }} 笔</li>
        <li>手续费: {{ getFee }}元</li>
        <li>转账金额: {{ amount }}元</li>
      </ul>
      <div class="total"><b>总计</b>:  <span class="strong">{{ getTotalFee }}元</span></div>
      <div class="operate">
        <el-button class="resetBtn add" @click="doReset">重新填写</el-button>
        <el-button class="ml20 baseBtn submit" @click="doSubmit">提交转账</el-button>
      </div>
    </div>
    <el-dialog
        title="提示"
        width="500px"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false">
      <span>数据提交后无法撤回，是否确认提交？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doConfirmSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CustomStep from "@/components/CustomStep";
import Util from '@/util';
import Storage from '@/util/storage';
import api from "@/util/api";
import debounce from 'lodash.debounce';
import {Message} from 'element-ui';

export default {
  name: "ZfbSubmit",
  components: {
    CustomStep
  },
  data() {
    return {
      model: {
        list: [

        ]
      },
      mode: 1,          // 转账账户类型,1:官方账户,2:企业账户
      charge: null,
      amount: 0,        // 转账金额
      serviceCharge: 0, // 转账费率（官方账户用）
      rules: {
        payee: [
          { required: true, message: '支付宝账号必填', trigger: 'blur' },
        ],
        real_name: [
          { required: true, message: '姓名必填', trigger: 'blur' },
        ],
        amount: [
          { required: true, message: '转账金额必填', trigger: 'blur' },
          { validator: this.validateMoney, trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '备注内容必填', trigger: 'blur' },
        ]
      },
      dialogVisible: false
    }
  },
  methods: {
    // 转账金额
    getAmount() {
      this.model.list.forEach((item) => {
        this.amount = Util.accAdd(item.amount, this.amount);
      })
    },
    validateMoney(rule, value, callback) {
      var reg = /^([0-9](\.[0-9]{1,2}){0,1}|[1-9][0-9]{0,7}(\.[0-9]{1,2}){0,1})$/;
      if(!reg.test(value)) {
        callback('仅支持最大8位整数允许2位小数');
      }
      if(value < 1) {
        callback('支付宝转账每笔最低1元');
      }
      callback();
    },
    doReset() {
      Storage.clear('sureList');
      this.$router.push({path: '/transferByZFB'});
    },
    handleDelete(index, row) {
      if(this.model.list.length == 1) {
        Message.warning('至少需要一条转账记录！');
        return false;
      }
      this.model.list.splice(index,1);
    },

    // 确认提交
    doConfirmSubmit: debounce(function() {
      api.batchTransfer({
        type: 1,
        official: this.mode,
        transfers: this.model.list
      }).then(res => {
        this.dialogVisible = false;
        this.$pay({
          payAmount: parseFloat(res.data.recharge),
          qrCodeUrl: res.data.qr_url
        });
        Storage.clear('sureList');
      }).catch(error => {
        this.dialogVisible = false;
      })
    }, 300),
    doSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.dialogVisible = true;
        }
      });
    },
    doChangeAmount(val) {
      var reg = /^([0-9](\.[0-9]{1,2}){0,1}|[1-9][0-9]{0,7}(\.[0-9]{1,2}){0,1})$/;
      if(!reg.test(val) || parseFloat(val) < 1) {
        return false;
      }
    }
  },
  computed: {
    // 手续费
    getFee() {
      if(this.mode == 1) {
        // 官方
        return this.amount * this.serviceCharge;
      }
      return 0;
    },
    getTotalFee() {
      if(this.mode == 1) {
        // 官方
        return Util.accAdd(this.amount * this.serviceCharge , this.amount);
      }
      return this.amount;
    }
  },
  mounted() {
    this.model.list = Storage.getItem('sureList') || [];
    this.mode = Storage.getItem('mode') || 1;
    this.charge = Storage.getItem('charge') || {};
    this.serviceCharge = parseFloat(this.charge.service_charge);

    this.getAmount();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base";
@import "@/assets/scss/mixin";
.wrap {
  width: 85%;
  margin: 0 auto;
  padding: 40px 0 0 0;
  .list {
    width: 82%;
    margin: 40px auto 0;
    .operate {
      margin-top: 20px;
      text-align: right;
      .submit {
        margin-left: 20px;
      }
    }
  }
}
.statistics {
  margin-top: 10px;
  border-bottom: 1px solid #eee;
  text-align: right;
  color: #909399;
  li {
    padding: 5px 5px;
  }
}
.total {
  text-align: right;
  padding-top: 10px;
  .strong{
    color: rgb(255, 0, 0);
    font-weight: bold;
  }
}
.baseBtn{
  @include baseBtn;
}
.resetBtn {
  @include resetBtn;
}
</style>
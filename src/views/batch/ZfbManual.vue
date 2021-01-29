<template>
  <div class="wrap">
    <custom-step :currentStep="3"></custom-step>
    <div class="list">
      <el-form :model="model" ref="ruleForm">
        <el-table
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{ textAlign: 'center', paddingBottom: 0 }"
          stripe
          :data="model.list">
        <el-table-column
            key="account"
            label="支付宝账号">
          <template slot-scope="scope">
            <el-form-item :prop="'list.' + scope.$index + '.account'" :rules="rules.account">
              <el-input v-model="scope.row.account" placeholder="请输入支付宝账号" maxlength="11" size="medium"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
            key="name"
            label="姓名">
          <template slot-scope="scope">
            <el-form-item :prop="'list.' + scope.$index + '.name'" :rules="rules.name">
              <el-input v-model="scope.row.name" placeholder="姓名" size="medium"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
            key="money"
            label="转账金额（元）">
          <template slot-scope="scope">
            <el-form-item :prop="'list.' + scope.$index + '.money'" :rules="rules.money">
              <el-input v-model="scope.row.money" placeholder="只能输入2位小数" size="medium"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
            key="remark"
            label="备注内容">
          <template slot-scope="scope">
            <el-form-item prop="remark">
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
      <div class="operate">
        <el-button class="baseBtn add" @click="doAdd">新增</el-button>
        <el-button class="ml20 baseBtn submit" @click="doSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomStep from "@/components/CustomStep";
export default {
  name: "ZfbManual",
  components: {
    CustomStep
  },
  data() {
    return {
      model: {
        list: [
          {
            account: '',
            name: '',
            money: '',
            remark: ''
          }
        ]
      },
      rules: {
        account: [
          { required: true, message: '支付宝账号必填', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '姓名必填', trigger: 'blur' },
        ],
        money: [
          { required: true, message: '转账金额必填', trigger: 'blur' },
          { validator: this.validateMoney, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validateMoney(rule, value, callback) {
      var reg = /^([0-9](\.[0-9]{1,2}){0,1}|[1-9][0-9]{0,7}(\.[0-9]{1,2}){0,1})$/;
      if(!reg.test(value)) {
        callback('仅支持最大8位整数允许2位小数');
      }
      callback();
    },
    doAdd() {
      this.model.list.push({
        account: '',
        name: '',
        money: '',
        remark: ''
      })
    },
    doSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          localStorage.setItem('transfer_sure', JSON.stringify(this.model.list))
          this.$router.push({path: '/transferByZFB/submit'});
        } else {
          this.$message({
            message: '数据填写存在错误！',
            type: 'warning'
          });
          return false;
        }
      });
    },

    handleDelete(index, row) {
      this.model.list.splice(index,1);
      console.log(index, row);
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base";
@import "@/assets/scss/mixin";
.wrap {
  width: 80%;
  margin: 0 auto;
  padding: 40px 0 0 0;
  .list {
    width: 70%;
    margin: 40px auto 0;
    .operate {
      margin-top: 20px;
      text-align: center;
      .submit {
        margin-left: 60px;
      }
    }
  }
}
.baseBtn{
  @include baseBtn;
}
</style>
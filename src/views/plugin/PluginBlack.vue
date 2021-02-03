<template>
  <div class="record-wrap">
    <div class="record">
      <div class="record-nav">
        <!--搜索-->
        <div class="search-wrap">
          <el-form :inline="true">
            <el-form-item label="支付宝账号" class="ml10">
              <el-input  placeholder="请输入支付宝账号" v-model="search.account"></el-input>
            </el-form-item>
            <el-form-item label="支付宝姓名" class="ml10">
              <el-input  placeholder="请输入支付宝姓名" v-model="search.name"></el-input>
            </el-form-item>
            <el-form-item class="ml20">
              <el-button type="primary" class="ml20 searchBtn" @click="doSearch()">搜索</el-button>
              <el-button type="primary" class="ml20 newAddBtn" @click="newAdd()">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--数据-->
        <div class="search-content">
          <el-table
              :header-cell-style="{textAlign: 'center'}"
              :cell-style="{ textAlign: 'center' }"
              id="out-table"
              :data="blackList">
            <el-table-column
                prop="order"
                label="#">
            </el-table-column>
            <el-table-column
                prop="account"
                label="支付宝账号">
            </el-table-column>
            <el-table-column
                prop="name"
                label="支付宝姓名">
            </el-table-column>
            <el-table-column
                prop="addDate"
                label="添加时间">
            </el-table-column>
            <el-table-column
                prop="updateDate"
                label="更新时间">
            </el-table-column>
            <el-table-column
                prop="operate"
                label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.currentPage"
                :page-sizes="pagination.pageSizes"
                :page-size="pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total"
                style="margin-top: 15px; text-align: right;"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="新增"
               :visible.sync="newAddFormVisible"
               :close-on-click-modal="false"
               width="500px"
               :before-close="handleClose"
    >
      <el-form :model="newAddForm"
               label-width="100px"
               ref="newAddForm"
               :rules="newAddRules">
        <el-form-item label="支付宝账号" prop="account">
          <el-input v-model="newAddForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付宝姓名">
          <el-input v-model="newAddForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetNewAdd">取 消</el-button>
        <el-button @click="doNewAdd" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Util from '@/util'
export default {
  name: "TransferRecord",
  data() {
    return {
      search: {
        account: '',
        name: ''
      },
      pagination: {
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        currentPage: 4,
        total: 100
      },
      blackList: [],
      newAddForm: {
        account: '',
        name: ''
      },
      newAddRules: {
        account: [
          { required: true, message: '请输入支付宝账号', trigger: 'blur' },
        ],
      },
      newAddFormVisible: false
    };
  },
  mounted() {
    this.axios.get('/black').then((res) => {
      this.blackList = res.data;
    })
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    doSearch() {
      alert('搜索!');
    },
    newAdd() {
      this.newAddFormVisible = true;
    },
    doNewAdd() {
      this.$refs.newAddForm.validate((valid) => {
        if (valid) {

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetNewAdd() {
      this.newAddForm.account = '';
      this.newAddForm.name = '';
      this.newAddFormVisible = false;
    },
    handleClose(done) {
      this.newAddForm.account = '';
      this.newAddForm.name = '';
      done();
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base.scss";
@import "@/assets/scss/mixin.scss";
  .record-wrap {
    padding: 20px;
    .record {
      width: 100%;
      padding: 30px 40px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
    }
  }
  .search-wrap {
    padding-left: 50px;
    border-bottom: 1px solid #ebeef5;;
  }
  .record-nav /deep/ {
    .el-tabs__item {
      &.is-active,
      &:hover{color: $baseColor;}
    }
    .el-tabs__active-bar {
      background-color: $baseColor;
    }
  }
  .searchBtn,
  .exportBtn{
    @include baseBtn;
  }

</style>
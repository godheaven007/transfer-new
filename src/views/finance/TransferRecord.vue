<template>
  <div class="record-wrap">
    <div class="record">
      <div class="record-nav">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="支付宝记录" name="zfb">
            <!--搜索-->
            <div class="search-wrap">
              <el-form :inline="true">
                <el-form-item label="日期范围">
                  <el-date-picker
                      v-model="search.time"
                      type="datetimerange"
                      range-separator="-"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="转账状态" class="ml10">
                  <el-select v-model="search.status" placeholder="请选择">
                    <el-option
                        v-for="item in search.statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="支付宝账号" class="ml10">
                  <el-input  placeholder="请输入支付宝账号" v-model="search.account"></el-input>
                </el-form-item>
                <el-form-item label="姓名" class="ml10">
                  <el-input  placeholder="请输入姓名" v-model="search.name"></el-input>
                </el-form-item>
                <el-form-item class="ml20">
                  <el-button type="primary" class="ml20" @click="doSearch(1)">搜索</el-button>
                  <el-button type="primary" class="ml20" @click="doExport(2)">导出</el-button>
                </el-form-item>
              </el-form>
            </div>
            <!--数据-->
            <div class="search-content">
              <el-table
                  id="out-table"
                  :data="recordData">
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="orderNo"
                    label="商户订单号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="account"
                    label="支付宝账号">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="金额">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="转账类型">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                  <template slot-scope="scope">
                    <el-tag type="danger">{{ scope.row.status }}</el-tag>
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
          </el-tab-pane>
          <el-tab-pane label="微信记录" name="wx">
            <!--搜索-->
            <div class="search-wrap">
              <el-form :inline="true">
                <el-form-item label="日期范围">
                  <el-date-picker
                      v-model="search2.time"
                      type="datetimerange"
                      range-separator="-"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="转账状态" class="ml10">
                  <el-select v-model="search2.status" placeholder="请选择">
                    <el-option
                        v-for="item in search2.statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="微信Openid" class="ml10">
                  <el-input  placeholder="请输入微信Openid" v-model="search2.account"></el-input>
                </el-form-item>
                <el-form-item label="姓名" class="ml10">
                  <el-input  placeholder="请输入姓名" v-model="search2.name"></el-input>
                </el-form-item>
                <el-form-item class="ml20">
                  <el-button type="primary" class="ml20" @click="doSearch(2)">搜索</el-button>
                  <el-button type="primary" class="ml20" @click="doExport(2)">导出</el-button>
                </el-form-item>
              </el-form>
            </div>
            <!--数据-->
            <div class="search-content">
              <el-table
                  :data="recordData2">
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="orderNo"
                    label="商户订单号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="account"
                    label="微信Openid">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="金额">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="转账类型">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Util from '@/util'
export default {
  name: "TransferRecord",
  data() {
    return {
      activeName: 'zfb',
      search: {
        time: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        statusList: [
            {
              value: '0',
              label: '全部'
            },
            {
              value: '1',
              label: '等待审核'
            },
            {
              value: '2',
              label: '等待转账'
            },
            {
              value: '3',
              label: '转账成功'
            },
            {
              value: '4',
              label: '转账异常'
            },
            {
              value: '5',
              label: '转账失败'
            },
            {
              value: '6',
              label: '已提现'
            },
            {
              value: '7',
              label: '转账取消'
            },
            {
              value: '8',
              label: '账号异常'
            }
        ],
        status: '',
        account: '',
        name: ''
      },
      search2: {
        time: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        statusList: [
          {
            value: '0',
            label: '全部'
          },
          {
            value: '1',
            label: '等待审核'
          },
          {
            value: '2',
            label: '等待转账'
          },
          {
            value: '3',
            label: '转账成功'
          },
          {
            value: '4',
            label: '转账异常'
          },
          {
            value: '5',
            label: '转账失败'
          },
          {
            value: '6',
            label: '已提现'
          },
          {
            value: '7',
            label: '转账取消'
          },
          {
            value: '8',
            label: '账号异常'
          }
        ],
        status: '',
        account: '',
        name: ''
      },
      pagination: {
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        currentPage: 4,
        total: 100
      },
      recordData: [],
      recordData2: [],
    };
  },
  mounted() {
    this.axios.get('/finance/record').then((res) => {
      this.recordData = res.data;
    })
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    doSearch(type) {
      console.log(this.search);
    },
    doExport(type) {
      let tables = document.getElementById("out-table");
      let table_book = this.$XLSX.utils.table_to_book(tables);
      var table_write = this.$XLSX.write(table_book, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        this.$FileSaver.saveAs(
            new Blob([table_write], { type: "application/octet-stream" }),
            `支付宝记录（${Util.getCurDate()}）`
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, table_write);
      }
      return table_write;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base.scss";
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

</style>
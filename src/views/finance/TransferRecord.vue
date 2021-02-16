<template>
  <div class="record-wrap">
    <div class="record">
      <div class="record-nav">
        <el-tabs v-model="activeName">
          <el-tab-pane label="支付宝记录" name="zfb">
            <!--搜索-->
            <div class="search-wrap">
              <el-form :inline="true">
                <el-form-item label="日期范围">
                  <el-date-picker
                      v-model="search.timeRange"
                      type="datetimerange"
                      range-separator="-"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="转账状态" class="ml10">
                  <el-select v-model="search.status" placeholder="请选择" @change="doStatusChange">
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
                  <el-button type="primary" class="ml20 searchBtn" @click="doSearch(1)">搜索</el-button>
                  <el-button type="primary" class="ml20 exportBtn" @click="doExport(2)">导出</el-button>
                </el-form-item>
              </el-form>
            </div>
            <!--数据-->
            <div class="search-content">
              <el-table
                  :header-cell-style="{textAlign: 'center'}"
                  :cell-style="{ textAlign: 'center' }"
                  id="out-table"
                  :data="recordData">
                <el-table-column
                    prop="create_time"
                    label="日期">
                </el-table-column>
                <el-table-column
                    prop="order_number"
                    label="商户订单号">
                </el-table-column>
                <el-table-column
                    prop="payee"
                    label="支付宝账号">
                </el-table-column>
                <el-table-column
                    prop="real_name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="amount"
                    label="金额">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="转账类型">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type == 1">公用支付宝</span>
                    <span v-else>微信</span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                  <template slot-scope="scope">
                    <el-tag :type="setTagType(scope.row.status)">{{ scope.row.status_text }}</el-tag>
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
                      v-model="search2.timeRange"
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
                  <el-button type="primary" class="ml20 searchBtn" @click="doSearch(2)">搜索</el-button>
                  <el-button type="primary" class="ml20 exportBtn" @click="doExport(2)">导出</el-button>
                </el-form-item>
              </el-form>
            </div>
            <!--数据-->
            <div class="search-content">
              <el-table
                  :header-cell-style="{textAlign: 'center'}"
                  :cell-style="{ textAlign: 'center' }"
                  :data="recordData2">
                <el-table-column
                    prop="date"
                    label="日期">
                </el-table-column>
                <el-table-column
                    prop="orderNo"
                    label="商户订单号">
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
import api from "@/util/api";
export default {
  name: "TransferRecord",
  data() {
    return {
      activeName: 'zfb',
      search: {
        type: 1,      // 转账类型1:支付宝,2:微信
        timeRange: [Util.getLastMonthCurDate(), Util.getNowDate()],
        status: '0',
        status_text: '全部',
        payee: '',                // 转账账号
        real_name: '',            // 转账姓名
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
            label: '转账取消'
          },
          {
            value: '7',
            label: '账号异常'
          }
        ],
      },
      search2: {
        type: 2,      // 转账类型1:支付宝,2:微信
        timeRange: [Util.getLastMonthCurDate(), Util.getNowDate()],
        status: '0',
        status_text: '全部',
        payee: '',                // 转账账号
        real_name: '',            // 转账姓名
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
            label: '转账取消'
          },
          {
            value: '7',
            label: '账号异常'
          }
        ]
      },
      pagination: {
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      recordData: [],
      recordData2: [],
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.queryList();
    },
    doStatusChange(val) {
      this.search.status = val;
    },
    doSearch(type) {
      this.queryList();
    },
    queryList() {
      api.getTransferList({
        type: this.search.type,
        start_time: this.search.timeRange[0],
        end_time: this.search.timeRange[1],
        status: this.search.status,
        payee: this.search.payee,
        real_name: this.search.real_name,
        current_page: this.pagination.currentPage,
        per_page: this.pagination.pageSize
      }).then(res => {
        let result = res.data;
        this.pagination.total = result.total;
        this.recordData = result.data;
      })
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
    },
    setTagType(status) {
      if(status == '1' || status == '2') {
        // 1:等待审核 2:等待转账
        return 'warning';
      } else if(status == '3') {
        // 3:转账成功
        return 'success';
      }
      // 4:转账异常,5:转账失败,6:转账取消,7:账号异常
      return 'danger';
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
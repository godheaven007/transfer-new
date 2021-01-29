<template>
  <div class="wrap">
    <custom-step :currentStep="3"></custom-step>
    <div class="upload-wrap">
      <el-upload
          class="upload"
          drag
          :show-file-list="false"
          :on-change="handleChange"
          action="">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"><em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          <div class="info-wrap">
            <ul class="info">
              <li>1.请务必按照模板格式填写上传，<a class="strong" href="/excel/易推客批量转账模板 .xlsx" target="_blank">下载模板</a></li>
              <li>2.使用易推客官方支付宝转账单笔转账最低 <span class="strong">1元</span></li>
              <li>3.每次最多上传 <span class="strong">2000</span> 笔转账</li>
            </ul>
          </div>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import CustomStep from "@/components/CustomStep";
export default {
  name: "ZfbBatch",
  components: {
    CustomStep
  },
  data() {
    return {
      fileContent: '',
      tableData: [],
      file: '',
      data: ''
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileContent = file.raw;
      let fileName = file.name;
      let fileType = fileName.substring(fileName.lastIndexOf('.') + 1);
      if (this.fileContent) {
        if (fileType === 'xlsx' || fileType === 'xls') {
          this.importfile(this.fileContent)
        } else {
          this.$message({
            type: 'warning',
            message: '附件格式错误，请重新上传！'
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请上传附件！'
        })
      }
    },
    importfile(obj) {
      let reader = new FileReader();

      reader.readAsArrayBuffer(obj)
      reader.onload = () => {
        let buffer = reader.result,
            bytes = new Uint8Array(buffer),
            length = bytes.byteLength;
        let binary = '';

        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        let XLSX = require('xlsx'),
            wb = XLSX.read(binary, {type: 'binary'}),
            output = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]),
            result = [];

        output.forEach((item) => {
          let o = {};
          for(var key in item) {
            if(key == '备注内容（非必填）') {
              o.remark = item[key];
            } else if(key == '姓名（非必填）') {
              o.name = item[key];
            } else if(key == '转账金额（2位小数）') {
              o.money = item[key];
            } else {
              o.account = item[key];
            }
          }
          result.push(o);
        });

        localStorage.setItem('transfer_sure', JSON.stringify(result));
        this.$router.push({path: '/transferByZFB/submit'});
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .wrap {
    width: 80%;
    margin: 0 auto;
    padding: 40px 0 0 0;
  }
  .upload-wrap {
    margin-top: 80px;
    text-align: center;
    .upload {
      width: 80%;
      margin: 0 auto;
    }
  }
  .info-wrap {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: left;
    .info {
      width: 400px;
      font-size: 16px;
      color: #666;
      li{
        padding: 5px 0;
      }
    }
  }
  .strong {
    color: rgb(255, 0, 0);
  }
</style>
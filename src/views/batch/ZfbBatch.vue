<template>
  <div class="wrap">
    <custom-step :currentStep="3"></custom-step>
    <div class="upload-wrap">
      <el-upload
          ref="upload"
          class="upload"
          drag
          :show-file-list="false"
          :limit="1"
          accept='.xls,.xlsx'
          :http-request="uploadCustom"
          action="">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"><em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          <div class="info-wrap">
            <ul class="info">
              <li>1.请务必按照模板格式填写上传，<a class="strong" style="cursor: pointer;" @click="downLoadTemplate" target="_blank">下载模板</a></li>
              <li>2.使用量付通官方支付宝转账单笔转账最低 <span class="strong">1元</span></li>
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
import Storage from '@/util/storage';
import api from "@/util/api";

export default {
  name: "ZfbBatch",
  components: {
    CustomStep
  },
  data() {
    return {
      uploadUrl: '/transfer/batchTransferByExcel'
    }
  },
  methods: {
    /**
     * 前端本地上传excel文件，需浏览器支持
     * @param file
     * @param fileList
     */
    importFile(_file) {
      let reader = new FileReader();

      reader.readAsArrayBuffer(_file)
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
              o.real_name = item[key];
            } else if(key == '转账金额（2位小数）') {
              o.amount = item[key];
            } else {
              o.payee = item[key];
            }
          }
          result.push(o);
        });

        Storage.setItem('sureList', result);
        this.$router.push({path: '/transferByZFB/submit'});
      }
    },

    uploadCustom(param) {
      let file = param.file,
          isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("请上传2M以下的excel文件");
        return false;
      }

      // 通过 FormData 对象上传文件
      let formData = new FormData();
      formData.append("file", file);
      formData.append("type", '1');             // 1:支付宝,2:微信
      formData.append("official", '1');         // 1:官方账户,2:企业账户

      this.axios.post(`/transfer/batchTransferByExcel`, formData, {
          headers: { 'Content-Type': 'multipart/form-data', 'Authorization': window.localStorage.getItem('token') }}
          ).then(res => {
            let result = res.data;

        if(result.code == 1) {
              this.importFile(file);
              Storage.setItem('sureInfo', {
                amount: result.data.amount,
                batch_order_number: result.data.batch_order_number,
                charges: result.data.charges,
                qr_url: result.data.qr_url,
                recharge: result.data.recharge
              });
            }
          }).catch(error => {
            this.$message.error(error);
          })
    },
    downLoadTemplate() {
      api.downloadTransferExcel({
        type: 1
      }).then(res => {
        window.location.href = res.data.url;
      })
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
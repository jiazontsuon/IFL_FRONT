<template>
    <!-- <div class = "iFL_parser_container"> -->
        <!-- <div class="model_box"> -->
  <div>
    <el-card class = "iFL_parser_container">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="always">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="65px" size="mini">
              <el-form-item
                :prop="domain"
                label="Domain"
                :rules="[
                  { required: true, message: 'Domain cannot be empty', trigger: 'blur' },
                ]"
              >
                <el-input v-model="dynamicValidateForm.domain"></el-input>
              </el-form-item>
              <el-form-item
                v-for="(func, index) in dynamicValidateForm.domains"
                :label="'R' + index"
                :key="func.func_name"
                :prop="'domains.' + index + '.val'"
                :rules="{
                  required: true, message: 'Relation name cannot be empty', trigger: 'blur'
                }"
              >
              <el-row :gutter="20">
                <el-col :span = "5"><el-input v-model="func.func_name"></el-input></el-col>
                <el-col :span = "13"><el-input v-model="func.val"></el-input></el-col>
                <el-col :span = "3"><el-button @click.prevent="removeDomain(func)">Del</el-button></el-col>
              </el-row>
              </el-form-item>
              <el-form-item>
                <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">sumbit</el-button> -->
                <el-button @click="addDomain">Add</el-button>
                <el-button @click="resetForm('dynamicValidateForm')">Reset</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col span="11">
          <el-card shadow="always">
            <el-form :model="expressionForm" ref="expressionF" label-width="100px" size="mini">
              <el-form-item label="IF Formula">
                <el-row :gutter="20">
                  <el-col :span = "18"><el-input v-model="dynamicValidateForm.expression"></el-input></el-col>
                  <el-col :span = "3"><el-button @click="evaluateFormula">Evaluate</el-button></el-col>
                </el-row>
              </el-form-item>
            </el-form>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 35}"
              v-model="exprResultArea">
            </el-input>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <!-- <div class="model_box">
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      dynamicValidateForm: {
        domains: [{
          func_name: 'eq',
          val: '{1,1},{2,2},{3,3}'
        }],
        domain: '1,2,3',
        expression: 'A(x/)E(y/) eq(x,y)'
      },
      // expressionForm: {
      //   expression: ''
      // },
      exprResultArea: ''
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        func_name: '',
        key: Date.now()
      })
    },
    async evaluateFormula () {
      const { data: res } = await this.$http.post('evaluate/', this.dynamicValidateForm)
      if (res.status === '200') {
        this.exprResultArea = res.message
      } else {
        this.$message.error('Invalid input')
      }
    },
    async test () {
      const x = await this.$http.get('hello')
      console.log(x)
    }
  }
}
</script>

<style lang="less" scoped>
.iFL_parser_container{
  background-color: #2b4b6b;
  // height: 100%;
}

.model_box{
  width: 50%;
  height: 60%;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 30%;
  top: 35%;
  transform: translate(-50%, -50%);

  .avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  // 百分比根据盒子的宽度和高度来定的
  transform: translate(-50%,-50%);
  background-color: #fff;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
    }
  }
}

.btns{
  display: flex;
  justify-content: flex-end;
}

.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding:0 20px;
  box-sizing: border-box;
}

</style>

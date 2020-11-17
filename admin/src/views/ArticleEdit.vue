<template>
  <div>
    <h3>{{id? '编辑':'添加'}}文章</h3>
    <el-form @submit.native.prevent="save">
      <el-form-item label="分类" label-width="80px">
        <el-select v-model="model.categeries" multiple>
          <el-option
            v-for="item in categeries"
            :label="item.name"
            :key="item._id"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" label-width="80px">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情" label-width="80px">
        <vue-editor seCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item label-width="80px">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categeries: {},
      // 初始化
      handleImageAdded: function(){}
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles", this.model);
      }

      if (res.status !== 200) {
        this.$message.error("添加失败！");
      }
      this.$router.push("/articles/list");
      this.$message.success("添加成功！");
      console.log(res);
    },
    async fatch() {
      console.log(this.id);
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    // 获取类别数据
    async fatchCategeries() {
      const res = await this.$http.get(`rest/categeries`);
      this.categeries = res.data;
    }
  },
  // 上传图片
  async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
    

    const formData = new FormData();
    formData.append("file", file);
    const res = await this.$http.post('/upload',formData)
    Editor.insertEmbed(cursorLocation, "image", res.data.url)
    resetUploader()
    
  },
  created() {
    this.fatchCategeries();
    this.id && this.fatch();
  }
};
</script>


<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #cccccc;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
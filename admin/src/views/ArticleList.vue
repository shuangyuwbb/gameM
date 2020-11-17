<template>
  <div>
    <h3>文章页面</h3>
    <el-table :data="articleList">
      <el-table-column prop="_id" label="ID" width="340"></el-table-column>
      <el-table-column prop="title" label="title"></el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: []
    };
  },
  methods: {
    async getarticleList() {
      const res = await this.$http.get("rest/articles");
      if (res.status !== 200) {
        this.$message.error("获取列表失败！");
      }
      this.articleList = res.data;
    },
    remove(row) {
      this.$confirm(`此操作将永久删除 "${row.title}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/articles/${row._id}`);
        if (res.status !== 200) {
          this.$message.error("删除失败！！");
        }
        this.$message.success("删除成功！");
        this.getarticleList();
      });
    }
  },
  created() {
    this.getarticleList();
  }
};
</script>

<style lang="less" scoped>
</style>
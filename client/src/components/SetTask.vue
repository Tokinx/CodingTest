<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    custom-class="set-task-dialog"
    destroy-on-close
  >
    <el-form :model="form" :rules="rules" label-width="100px" ref="form">
      <el-form-item label="Task name" prop="Task">
        <el-input
          v-model="form.Task"
          size="small"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="Stage" prop="Stage">
        <el-input-number
          v-model="form.Stage"
          :min="1"
          :max="10"
          label="Stage"
          size="small"
          :disabled="!!form._id"
        />
      </el-form-item>
      <el-form-item label="Description" prop="Description">
        <el-input
          v-model="form.Description"
          type="textarea"
          rows="4"
          size="small"
          maxlength="500"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="By who" prop="By_who">
        <el-input
          v-model="form.By_who"
          size="small"
          maxlength="50"
          show-word-limit
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" size="small">Save</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "SetItem",
  data() {
    return {
      visible: false,
      form: {},
      rules: {
        Task: {
          required: true,
          message: "Please enter task name",
          trigger: "blur",
        },
        Stage: {
          required: true,
          message: "Please set the stage",
          trigger: "change",
        },
        Description: {
          required: true,
          message: "Please enter task description",
          trigger: "blur",
        },
        By_who: {
          required: true,
          message: "Please enter author",
          trigger: "blur",
        },
      },
    };
  },
  watch: {
    visible(val) {
      val && (this.form = { Stage: 1, By_who: "Jeff" });
    },
  },
  computed: {
    title() {
      return this.form._id ? "Edit Task" : "Add Task";
    },
  },
  methods: {
    show(task) {
      this.visible = true;
      if (task) {
        this.$nextTick(() => {
          this.form = { ...task };
        });
      }
    },
    hide() {
      this.visible = false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        fetch("/api/setTask", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(this.form),
        })
          .then((res) => res.json())
          .then(({ data }) => {
            this.$emit("complete", data);
            this.hide();
          });
      });
    },
  },
};
</script>

<style scoped lang="less"></style>

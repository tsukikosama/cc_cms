<template>
  <a-modal
      v-model:visible="modalVisible"
      :title="props.id ? '修改' : '新增'"
      :ok-loading="loading"
      :width="600"
      @before-ok="handleSubmit"
  >
    <a-form ref="formRef" :model="form">
      <a-form-item label="用户名" field="username" required>
        <a-input
            v-model="form.username"
            placeholder="请输入用户名"
            :disabled="!!props.id"
            allow-clear
        />
      </a-form-item>
      <a-form-item label="密码" field="password" required>
        <a-input-password
            v-model="form.password"
            placeholder="请输入密码"
            allow-clear
        />
      </a-form-item>
      <a-form-item field="userType" label="账号状态" required>
        <a-select
            v-model="form.userType"
            placeholder="请选择账号状态"
            :disabled="!!props.id"
            allow-clear
        >
          <a-option label="管理员" :value="1"></a-option>
          <a-option label="财务" :value="2"></a-option>
          <a-option label="商务" :value="3"></a-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { FormInstance, Message } from '@arco-design/web-vue';
import useLoading from '@/hooks/loading';


const props = defineProps({
  id: {
    type: String,
  },
  visible: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['success', 'update:visible']);
const modalVisible = ref(false);
const formRef = ref<FormInstance>();
const { loading, setLoading } = useLoading();
const form = reactive<any>({
  id: '',
  username: '',
  password: '',
  userType: undefined,
});
const handleSubmit = async (done: (closed: boolean) => void) => {
  const res = await formRef.value?.validate();
  if (!res) {
    setLoading(true);
    try {
      if (props.id) {
        form.id = props.id;
        // await updateUserReq(form);
      } else {
        form.id = undefined;
        // await addUserReq(form);
      }
      Message.success('操作成功');
      done(true);
      emit('success');
    } catch (err) {
      done(false);
    } finally {
      setLoading(false);
    }
  } else {
    done(false);
  }
};
const getDetail = async (id: string) => {
  // const res = await getUserDetailReq(id);
  // form.id = res.data.id;
  // form.username = res.data.username;
  // form.userType = res.data.userType;
};
watch(
    () => modalVisible.value,
    (val) => {
      emit('update:visible', val);
    }
);
watch(
    () => props.visible,
    (val) => {
      modalVisible.value = val;
      formRef.value?.resetFields();
      if (val) {
        if (props.id) {
          getDetail(props.id);
        }
      }
    }
);
</script>

<template>
  <div class="container">
    <a-card class="general-card" :title="$t('menu.user.list')">
      <a-row>
        <a-col :flex="1">
          <a-form
              :model="formModel"
              :label-col-props="{ span: 6 }"
              :wrapper-col-props="{ span: 18 }"
              label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="name" label="用户名称">
                  <a-input
                      v-model="formModel.name"
                      placeholder="用户名称"
                      allow-clear
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button
                v-permission="['admin']"
                type="primary"
                @click="
                () => {
                  formModalVisible.visible = true;
                  formModalVisible.id = '';
                }
              "
            >
              <template #icon>
                <icon-user-add />
              </template>
              新增用户
            </a-button>
          </a-space>
        </a-col>
        <a-col
            :span="12"
            style="display: flex; align-items: center; justify-content: end"
        >
          <a-tooltip content="刷新">
            <div class="action-icon" @click="search">
              <icon-refresh size="18" />
            </div>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
          row-key="id"
          :loading="loading"
          :pagination="pagination"
          :columns="columns"
          :data="renderData"
          :bordered="false"
          @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #userType="{ record }">
          {{ userType[record.userType] }}
        </template>
        <template #operations="{ record }">
          <a-button

              type="text"
              size="small"
              @click="handleEdit(record.id)"
          >
            修改
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>

  <form-modal
      :id="formModalVisible.id"
      v-model:visible="formModalVisible.visible"
      @success="fetchData()"
  >
  </form-modal>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import FormModal from '@/views/user/role/components/form-model.vue';
import { Pagination } from '@/types/global';
import { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import useLoading from '@/hooks/loading';
import { useUserStore } from '@/store';

const { loading, setLoading } = useLoading(true);
const generateFormModel = () => {
  return {
    name: '',
  };
};
const formModel = ref(generateFormModel());

const formModalVisible = reactive({
  visible: false,
  id: '',
});
const renderData = ref<any[]>([]);
const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
};
const pagination = reactive({
  ...basePagination,
});
const columns = computed<TableColumnData[]>(() => [
  {
    title: '#',
    dataIndex: 'index',
    slotName: 'index',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    align: 'center',
  },
  {
    title: '用户类型',
    dataIndex: 'userType',
    slotName: 'userType',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
    align: 'center',
  },
]);

const fetchData = async (
    params: any = { current: 1, pageSize: 10 }
) => {
  setLoading(true);
  try {
    const { data } = await getUserPageReq({
      ...params,
      ...formModel.value,
    });
    renderData.value = data.list;
    pagination.current = params.current;
    pagination.total = data.total;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

const search = () => {
  fetchData({
    ...basePagination,
  } as unknown as any);
};
const onPageChange = (current: number) => {
  fetchData({ ...basePagination, current });
};
const reset = () => {
  formModel.value = generateFormModel();
};

const userType: { [key: number]: string } = {
  1: '管理员',
  2: '财务',
  3: '商务',
};
const handleEdit = (id?: number | string) => {
  formModalVisible.id = id;
  formModalVisible.visible = true;
};
const userStore = useUserStore();
fetchData();
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>

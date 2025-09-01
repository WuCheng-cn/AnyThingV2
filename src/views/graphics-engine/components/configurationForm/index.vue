<template>
  <a-collapse
    v-model:active-key="activeKey"
    :bordered="false"
  >
    <a-collapse-panel
      v-for="(item, index) in widget?.formConfig"
      :key="index"
      :header="item?.prototype?.getCustomClassName()"
      :style="{ border: 0 }"
    >
      <AnyForm
        :ref="(el:any) => setFormRef(el, item)"
        :init-data="initData[item.name]"
        :entity="item"
        :cols="item?.getCustomClassConfig()?.formCols || 1"
        :label-col="item?.getCustomClassConfig()?.formLabelVertical ? { span: 24 } : undefined"
        label-align="left"
        @change="handleChange"
      />
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">
import type { Node } from '@antv/x6'
import type { AnyBaseModel, ClassConstructorWithBaseModel } from '@arayui/core'
import type { ComponentExposed } from 'vue-component-type-helpers'
import type { WidgetFormBase } from '../../entity/WidgetFormBase'
import type { IWidgetUnknown } from '../../interface/IWidget'
import AnyForm from '@/components/core/PC/AnyForm.vue'

const currentNode = inject<Ref<Node>>('currentNode')

const widget = computed<IWidgetUnknown | undefined>(() => currentNode?.value?.getData())

const activeKey = ref(widget.value?.formConfig?.map((_item, index) => index))

const initData = ref<Record<string, any>>({})

const formRefs = ref({} as Record<string, ComponentExposed<typeof AnyForm<WidgetFormBase>>>)

watch(widget, () => {
  if (widget.value?.widgetData && widget.value?.formConfig) {
    const entries = widget.value.formConfig.map(Entity => [Entity.name, Entity.fromJSON(widget.value?.widgetData[Entity.name] || {})])
    initData.value = Object.fromEntries(entries)
  }
}, { deep: true })

function setFormRef(el: ComponentExposed<typeof AnyForm<WidgetFormBase>>, entity: ClassConstructorWithBaseModel<WidgetFormBase>) {
  formRefs.value[entity.name] = el
}

function handleChange() {
  const entries = Object.entries(formRefs.value).map(([key, el]) => [key, el.getFormData()?.toJSON()])
  const newWidgetData = Object.fromEntries(entries) as Record<string, AnyBaseModel>
  currentNode?.value?.setData({
    ...widget.value,
    widgetData: newWidgetData,
  })
}
</script>

<style scoped lang="less">
:deep(.ant-form-item){
  margin: unset !important;
}
</style>

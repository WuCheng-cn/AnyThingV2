<template>
  <a-collapse
    v-model:active-key="activeKey"
    :bordered="false"
  >
    <a-collapse-panel
      v-for="(item, index) in widget.formConfig"
      :key="index"
      :header="item?.prototype?.getCustomClassName()"
      :style="{ border: 0 }"
    >
      <AnyForm
        :ref="(el) => setFormRef(el, item)"
        :init-data="initData[item.name]"
        :entity="item"
        :cols="(item?.prototype as AnyBaseModel)?.getCustomClassConfig()?.formCols || 1"
        :label-col="(item?.prototype as AnyBaseModel)?.getCustomClassConfig()?.formLabelVertical ? { span: 24 } : undefined"
        label-align="left"
        @change="handleChange"
      />
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">
import type { Node } from '@antv/x6'
import type { AnyBaseModel, ClassConstructor } from '@arayui/core'
import type { WidgetFormBase } from '../../entity/WidgetFormBase'
import type { IWidgetUnknown } from '../../interface/IWidget'

const currentNode = inject('currentNode') as Ref<Node>

const widget = computed(() => currentNode.value?.getData() as IWidgetUnknown)

const activeKey = ref(widget.value.formConfig?.map((_item, index) => index))

const initData = ref<Record<string, any>>({})

const formRefs = ref<Record<string, any>>({})

watch(widget, () => {
  if (widget.value?.widgetData && widget.value?.formConfig) {
    const entries = widget.value.formConfig.map(Entity => [Entity.name, (Entity as any).fromJSON(widget.value.widgetData[Entity.name] || {})])
    initData.value = Object.fromEntries(entries) as Record<string, InstanceType<ClassConstructor<AnyBaseModel>>>
  }
}, { deep: true })

function setFormRef(el: any, entity: ClassConstructor<WidgetFormBase>) {
  formRefs.value[entity.name] = el
}

function handleChange() {
  const entries = Object.entries(formRefs.value).map(([key, el]) => [key, el.getFormData()?.toJSON()])
  const newWidgetData = Object.fromEntries(entries) as Record<string, InstanceType<ClassConstructor<AnyBaseModel>>>
  currentNode.value?.setData({
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

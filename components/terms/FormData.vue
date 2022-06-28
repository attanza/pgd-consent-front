<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-card-title class="headline primary white--text" primary-title>
        {{ title }}
      </v-card-title>
      <shared-form
        :form-items="formItems"
        show-close-btn
        @onSubmit="submit"
        @close="closeForm"
      />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, mixins, Prop, Watch } from 'nuxt-property-decorator'
import { ITerm } from '~/interfaces/term.interface'
import { ErrorMixin } from '~/mixins/error.mixin'
import { TableMixin } from '~/mixins/table.mixin'
import { CommonMixin } from '~/mixins/common.mixin'
import SharedForm from '../SharedForm.vue'
import { formItems } from './util'
import { ICollectionResponse } from '~/interfaces/api-response.interface'
import { ICheckList } from '~/interfaces/check-list.interface'

@Component({
  components: {
    SharedForm,
  },
})
export default class TermFormData extends mixins(
  ErrorMixin,
  TableMixin,
  CommonMixin
) {
  dialog = false
  title = 'Create Term'
  formItems = formItems
  source = ''
  @Prop({ type: Boolean }) show!: boolean
  @Prop({ type: String }) link!: string

  @Watch('show', { immediate: true })
  onShowChange() {
    this.dialog = this.show
  }
  @Watch('vuexFormData.source')
  onFormDataChange() {
    if (this.vuexFormData.source && this.vuexFormData.source !== '') {
      this.source = this.vuexFormData.source
      this.getCheckLists()
    }
  }

  async getCheckLists() {
    try {
      this.activateGlobalLoading(true)
      const url = `/check-lists?limit=100&fieldKey=source&fieldValue=${this.source}`
      const resp: ICollectionResponse<ICheckList> = await this.$axios.$get(url)
      const checkListItems: any[] = []
      resp.data?.map((doc: ICheckList) => {
        checkListItems.push({ _id: doc._id, name: doc.content })
      })
      const idx = this.formItems.findIndex((f) => f.key === 'checkLists')
      if (idx !== -1) {
        this.formItems[idx].items = checkListItems
      }

      this.activateGlobalLoading(false)
    } catch (e) {
      this.activateGlobalLoading(false)
      this.catchError(e)
    }
  }

  closeForm() {
    this.$emit('closeForm')
  }

  async submit(data: ITerm) {
    try {
      this.activateGlobalLoading(true)
      const resp = await this.$axios.$post(this.link, data)
      this.$emit('onCreate', resp.data)
      this.activateGlobalLoading(false)
    } catch (e) {
      this.activateGlobalLoading(false)
      this.catchError(e)
    }
  }
}
</script>

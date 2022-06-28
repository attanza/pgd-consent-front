<template>
  <v-dialog v-model="dialog" width="500">
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
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import SharedForm from '../SharedForm.vue'
import { formItems } from './util'
import { ErrorMixin } from '~/mixins/error.mixin'
import { TableMixin } from '~/mixins/table.mixin'
import { IConsent } from '~/interfaces/consent.interface'
import { CommonMixin } from '~/mixins/common.mixin'
import { ICollectionResponse } from '~/interfaces/api-response.interface'
import { ITerm } from '~/interfaces/term.interface'
import { IItems } from '~/interfaces/form-item.interface'

@Component({
  components: {
    SharedForm,
  },
})
export default class ConsentFormData extends mixins(
  ErrorMixin,
  TableMixin,
  CommonMixin
) {
  dialog = false
  title = 'Create Consent'
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
      this.getTerms()
    }
  }

  async getTerms() {
    try {
      this.activateGlobalLoading(true)
      const url = `/terms?limit=100&fieldKey=source&fieldValue=${this.source}`
      const resp: ICollectionResponse<ITerm> = await this.$axios.$get(url)
      const terms: IItems[] = []
      resp.data.map((doc: ITerm) => {
        terms.push({ _id: doc._id, name: doc.title })
      })
      const idx = this.formItems.findIndex((f) => f.key === 'term')
      if (idx !== -1) {
        this.formItems[idx].items = terms
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

  async submit(data: IConsent) {
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

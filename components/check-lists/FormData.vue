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
import { Component, Mixins } from 'vue-property-decorator'
import { Prop, Watch } from 'vue-property-decorator'
import { ITerm } from '~/interfaces/term.interface'
import { ErrorMixin } from '~/mixins/error.mixin'
import { TableMixin } from '~/mixins/table.mixin'
import SharedForm from '../SharedForm.vue'
import { formItems } from './util'

@Component({
  components: {
    SharedForm,
  },
})
export default class CheckListFormData extends Mixins(ErrorMixin, TableMixin) {
  dialog = false
  title = 'Create Term'
  formItems = formItems
  @Prop({ type: Boolean }) show!: boolean
  @Prop({ type: String }) link!: string

  @Watch('show', { immediate: true })
  onShowChange() {
    this.dialog = this.show
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

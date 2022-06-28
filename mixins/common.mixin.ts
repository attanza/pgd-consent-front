import { Component, Vue } from 'vue-property-decorator'
@Component
export class CommonMixin extends Vue {
  get currentEdit() {
    return this.$store.state.currentEdit
  }

  get comboData() {
    return this.$store.state.comboData
  }

  get user() {
    return this.$store.state.auth.user
  }

  get vuexFormData() {
    return this.$store.state.formData
  }

  get globalLoading() {
    return this.$store.state.globalLoading
  }

  checkDoUpdate(data1: any, data2: any): boolean {
    let doUpdate = false
    Object.keys(data1).forEach((key): void => {
      if (data1[key] !== data2[key]) {
        doUpdate = true
      }
    })
    return doUpdate
  }

  back(): void {
    this.$router.go(-1)
  }
}

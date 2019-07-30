import { Component, Prop, Mixins } from 'vue-property-decorator'
import { use } from '../utils'
import popup from '../mixins/popup'

// 公共动画样式
import '../style/animation.styl'

const [bem] = use('popup')

type Position = 'center' | 'bottom' | 'right'

@Component
export default class EscPopup extends Mixins(popup) {
  @Prop({ type: String, default: 'center' }) readonly position!: Position

  get isCenter () {
    return this.position === 'center'
  }

  render () {
    let transitionName = 'esc-dialog'
    if (!this.isCenter) {
      transitionName = `esc-fade-${this.position}`
    }

    return (
      <transition name={transitionName}>
        <div vShow={this.show} class={bem([this.position], true)}>
          {this.$slots.default}
        </div>
      </transition>
    )
  }
}

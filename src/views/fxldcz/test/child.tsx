import { ref, reactive, defineComponent } from 'vue'
import styles from './index.module.scss'

export default defineComponent({
  props: {
    show: { type: String, default: 'false' },
    message: {
      type: String,
      required: true
    }
  },
  setup() {
    const msg = ref('tsx component')
    const User = (
      <ul>
        {[1, 2, 3].map(r => (
          <li>
            {r}-{msg.value}
          </li>
        ))}
      </ul>
    )
    return () => {
      return (
        <div>
          <User></User>
        </div>
      )
    }
  }
})

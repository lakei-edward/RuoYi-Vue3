import { ref, reactive } from 'vue'
import styles from './index.module.scss'
export default function (props) {
  const msg = ref('tsx component')
  const state = reactive({
    name: 'lakeiedward'
  })
  const myBooleanValue = true
  return (
    <div class="flex justify-between items-center">
      <h1>{props.show}</h1>
      <h1>{props.message}</h1>
      <p>This is a TSX component in Vue 3!</p>
      <div class={styles.box} onClick={() => (msg.value = '123')}>
        {msg.value}
      </div>
      <div>{state.name}</div>
      <p>{myBooleanValue.toString()}</p>
    </div>
  )
}

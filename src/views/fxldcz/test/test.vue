<script lang="tsx">
import styles from './index.module.scss'
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  props: {
    show: { type: String, default: 'false' },
    message: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const msg = ref('tsx component')
    const state = reactive({
      name: 'lakeiedward'
    })
    const myBooleanValue = true
    return () => {
      return (
        <>
          <div class="flex justify-between items-center g">
            <h1>{props.show}</h1>
            <h1>{props.message}</h1>
            <p>This is a TSX component in Vue 3!</p>
            <div class={styles.box} onClick={() => (msg.value = '123')}>
              {msg.value}
            </div>
            <div>{state.name}</div>
            <p>{myBooleanValue.toString()}</p>
          </div>
          <div class="flex justify-between items-center g">
            <h1>{props.show}</h1>
            <h1>{props.message}</h1>
            <p>This is a TSX component in Vue 3!</p>
            <div class={styles.box} onClick={() => (msg.value = '123')}>
              {msg.value}
            </div>
            <div>{state.name}</div>
            <p>{myBooleanValue.toString()}</p>
          </div>
        </>
      )
    }
  }
})
</script>

import Axios from 'axios'

const pendings = {}

export default {
  addPending(config) {
    const { method, url, params, data } = config
    const id = [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
    // const cancel = pendings[id]

    config.cancelToken = config.cancelToken || new Axios.CancelToken((cancel) => {
      if (!pendings[id]) {
        pendings[id] = cancel
      }
    })
  },

  removePending(config) {
    const { method, url, params, data } = config
    const id = [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
    const cancel = pendings[id]
    if (cancel && typeof cancel === 'function') {
      cancel()
      pendings.delete(id)
    }
  },
  clearPending() {
    Object.keys(pendings).forEach(c => pendings[c]())
  }
}

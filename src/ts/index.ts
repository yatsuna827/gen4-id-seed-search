import { getUrl } from './getUrl.js'

const getValue = <T = string>(el: HTMLInputElement, f?: (value: string) => T) => (el.checkValidity() ? (f ? f(el.value) : el.value) : null)
const getTID = () => getValue(document.getElementById('tid-input'), Number)?.toString().padStart(5, '0')
const getSID = () => getValue(document.getElementById('sid-input'), Number)?.toString().padStart(5, '0')
const getPID = () => getValue(document.getElementById('pid-input'))?.padStart(8, '0')

const addRow = (txt: string, onClick?: () => void) => {
  const div = document.createElement('div')
  const classes = ['message', 'card']
  if (onClick) {
    classes.push('clickable')
    div.addEventListener('click', onClick)
  }
  div.className = classes.join(' ')
  div.append(txt)
  document.getElementById('message-container').appendChild(div)
  scrollToBottom()
}
const scrollToBottom = () => {
  const el = document.documentElement
  window.scroll({
    top: el.scrollHeight - el.clientHeight,
    behavior: 'smooth',
  })
}

const fetchSeedList = async (tid: string, arg: string, mode: 'pid' | 'sid'): Promise<number[]> => {
  const url = getUrl(tid, arg, mode)
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    return res.json()
  })
}

const makeRun = (main: () => Promise<void>) => async () => {
  document.getElementById('start-button-pid').setAttribute('disabled', 'true')
  document.getElementById('start-button-sid').setAttribute('disabled', 'true')

  await main()

  document.getElementById('start-button-pid').removeAttribute('disabled')
  document.getElementById('start-button-sid').removeAttribute('disabled')
}

const searchFromSID = async () => {
  const tid = getTID()
  if (tid == null) return alert('TIDの入力にエラーがあります')
  const sid = getSID()
  if (sid == null) return alert('SIDの入力にエラーがあります')

  await fetchSeedList(tid, sid, "sid")
    .then((seedList) => {
      addRow(`TID: ${tid} SID: ${sid} 検索結果: ${seedList.length}件`)
      for (const seed of seedList.map(_ => _.toString(16).padStart(8, "0"))) {
        addRow(seed)
      }
    })
    .catch((e) => {
      alert('通信に失敗しました (・ω<)')
      console.log(e)
    })
}

const searchFromPID = async () => {
  const tid = getTID()
  if (tid == null) return alert('TIDの入力にエラーがあります')
  const pid = getPID()
  if (pid == null) return alert('PIDの入力にエラーがあります')

  fetchSeedList(tid, pid, "pid")
    .then((seedList) => {
      addRow(`TID: ${tid} PID: ${pid} 検索結果: ${seedList.length}件`)
      for (const seed of seedList.map(_ => _.toString(16).padStart(8, "0"))) {
        addRow(seed)
      }
    })
    .catch((e) => {
      alert('通信に失敗しました (・ω<)')
      console.log(e)
    })
}

document.getElementById('start-button-sid').onclick = makeRun(searchFromSID)
document.getElementById('start-button-pid').onclick = makeRun(searchFromPID)

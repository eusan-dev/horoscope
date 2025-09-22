import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  type Stage = 'hello' | 'question' | 'form'
  const [stage, setStage] = useState<Stage>('hello')
  const [fade, setFade] = useState(false)

  // ⭐ zodiac state stays here
  const [month, setMonth] = useState("")
  const [day, setDay] = useState<number | "">("")
  const [sign, setSign] = useState("")

  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ]
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  useEffect(() => {
    if (stage === 'hello') {
      const t1 = setTimeout(() => setFade(true), 3000)
      const t2 = setTimeout(() => { setStage('question'); setFade(false) }, 3800)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }

    if (stage === 'question') {
      const t1 = setTimeout(() => setFade(true), 2500)  // ⏳ shorter pause
      const t2 = setTimeout(() => setStage('form'), 3200)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [stage])

  return (
    <main className="app">
      {stage === 'hello' && (
        <h1 className={`typewriter ${fade ? 'fadeOut' : ''}`}>Hello</h1>
      )}

      {stage === 'question' && (
        <h1 className={`typewriter ${fade ? 'fadeOut' : ''}`}>
          When is your birthday?
        </h1>
      )}

      {stage === 'form' && (
        <div className="dropdowns ascend">
          <select value={month} onChange={e => setMonth(e.target.value)}>
            <option value="">Month</option>
            {months.map(m => <option key={m}>{m}</option>)}
          </select>

          <select value={day} onChange={e => setDay(Number(e.target.value))}>
            <option value="">Day</option>
            {days.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      )}
    </main>
  )
}

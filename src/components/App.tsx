import { useState } from "react";
import randomJson from './huge_random.json'


export default function App() {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')


  const onSubmit = async () => {
    await fetch('/api/postEndpoint', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        value1,
        value2,
        value3,
        payload: randomJson
      })
    });
  }

  return <div>
    <input name="input1" value={value1} onChange={(event) => setValue1(event.target.value)}/>
    <input name="input2" value={value2} onChange={(event) => setValue2(event.target.value)}/>
    <input name="input3" value={value3} onChange={(event) => setValue3(event.target.value)}/>

    <button onClick={onSubmit} role="button">Submit</button>
  </div>
}
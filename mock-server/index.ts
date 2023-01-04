import express from 'express'
import cors from 'cors'
import { readFileSync, existsSync } from 'fs'

const webapp = express()
webapp.use(express.static('page'))

try {
  webapp.listen(3000, () => {
    console.log('Web-Server running at http://localhost:3000')
  })
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message)
  } else {
    console.log(e)
  }
}

const api = express()
api.use(cors())
api.get('/:tid/pid/:pid', (req, res) => {
  const { tid, pid } = req.params

  res.json([0xBEEFFACE, 0xCAFEEE])
})
api.get('/:tid/sid/:sid', (req, res) => {
  const { tid, sid } = req.params

  res.json([0])
})

try {
  api.listen(8080, () => {
    console.log('API-Server running at http://localhost:8080')
  })
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message)
  } else {
    console.log(e)
  }
}

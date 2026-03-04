#! /usr/bin/env node

import cypress from 'cypress'
import { createServer } from 'vite'

/**
 * Run or open Cypress tests.
 * @type {'run' | 'open'}
 */

const mode = process.argv[2] || 'run'
const startTime = performance.now()

let server

server = await createServer({
  root: './'
})

await server.listen()

let exitCode = 0

try {
  if (mode === 'open') {
    await cypress.open({
      config: {
        baseUrl: server?.resolvedUrls.local[0]
      },
      testingType: 'e2e',
      browser: 'electron'
    })
  } else {
    let result=  await cypress.run({
      quiet: false,
      reporter: 'list',
      config: {
        baseUrl: server?.resolvedUrls.local[0],
        screenshotOnRunFailure: false
      },
      browser: 'electron',
      headless: true,
      testingType: 'e2e'
    })

    if (
      !result ||
      result.status === 'failed' ||
      (result.totalFailed ?? 0) > 0
    ) {
      for (const run of result.runs) {
        for (const test of run.tests) {
          if (test.state === 'failed') {
            console.log(`
=== FAILED ===
Test: ${test.title.join(' > ')}
Duration: ${test.duration}ms
Error: ${test.displayError}
=================
`)
          }
        }
      }

      exitCode = 1
    }
  }
} catch (error) {
  exitCode = 1
  console.error('cypress runner error:', error)
} finally {
  await server?.close()

  const endTime = performance.now()
  const duration = ((endTime - startTime) / 1000).toFixed(2)
  console.log('finished cypress.', 'Duration:', duration + 's')

  process.exitCode = exitCode
}

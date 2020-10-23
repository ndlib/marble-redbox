#!/usr/bin/env node

const AWS = require('aws-sdk')

const appConfig = process.argv.slice(2)[0]
const possibleKeys = [
  'GRAPHQL_API_KEY',
  'GRAPHQL_API_URL',
  'AUTH_CLIENT_ID',
  'AUTH_CLIENT_URL',
  'AUTH_CLIENT_ISSUER',
]

const retrieveStageParameters = async () => {
  let env = {}
  if (appConfig === 'local') {
    env = {
      GRAPHQL_API_URL: 'https://search-marble-elasticsearch-test-e3urdt7kb667o7verxgn6bjoee.us-east-1.es.amazonaws.com',
      GRAPHQL_API_KEY: 'test_index',
      AUTH_CLIENT_URL: 'https://okta.nd.edu',
      AUTH_CLIENT_ID: '0oa1f3ut0aKpdwap5357',
      AUTH_CLIENT_ISSUER: 'https://okta.nd.edu/oauth2/ausxosq06SDdaFNMB356',
    }
  } else {
    const ssm = new AWS.SSM({ region: 'us-east-1' })
    const params = await ssm.getParametersByPath({
      Path: appConfig,
      Recursive: true,
      WithDecryption: true,
    }).promise().catch((err) => {
      console.error('Failed getting parameter: ' + appConfig)
      console.error(err)
    })
    params['Parameters'].forEach(node => {
      const paramName = node['Name']
      const envName = paramName.substring(paramName.lastIndexOf('/') + 1, paramName.length).toUpperCase().replace(/[-]/g, '_')
      env[envName] = node['Value']
    })
  }
  possibleKeys.forEach(key => {
    const envValue = process.env[key]
    // Override all keys with process env, if defined
    if (envValue !== undefined) {
      env[key] = envValue
    }
    if (env[key] !== undefined) {
      console.log(`${key}='${env[key]}'`)
    }
  })
}

new Promise(async (resolve, reject) => {
  retrieveStageParameters()
  resolve()
})

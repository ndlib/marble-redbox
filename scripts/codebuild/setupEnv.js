#!/usr/bin/env node
const { SSMClient, GetParametersByPathCommand } = require("@aws-sdk/client-ssm");

const appConfig = process.argv.slice(2)[0]

const possibleKeys = [
  'GRAPHQL_API_URL',
  'AUTH_CLIENT_ID',
  'AUTH_CLIENT_URL',
  'AUTH_CLIENT_ISSUER',
]

const retrieveStageParameters = async () => {
  const ssmClient = new SSMClient({region: 'us-east-1'});
  const command = new GetParametersByPathCommand({
    Path: appConfig,
    Recursive: true,
    WithDecryption: true,
  });

  const params = ssmClient.send(command)
    .catch((err) => {
      console.error('Failed getting parameter: ' + appConfig)
      console.error(err)
    })

    params.Parameters.forEach(node => {
    const paramName = node.Name
    const envName = paramName.substring(paramName.lastIndexOf('/') + 1, paramName.length).toUpperCase().replace(/[-]/g, '_')
    if (possibleKeys.includes(envName)) {
      console.log(`${envName}='${node.Value}'`)
    }
  })
}

return Promise(async (resolve) => {
  retrieveStageParameters()
  resolve()
})

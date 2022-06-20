import { env, envTLD } from 'dcl-ops-lib/domain'
import { buildStatic } from 'dcl-ops-lib/buildStatic'

async function main() {
  const account = buildStatic({
    domain: `account.decentraland.${env === 'prd' ? 'org' : envTLD}`,
    defaultPath: 'index.html',
    unprotect: true,
    destroy: true,
  })

  return {
    cloudfrontDistribution: account.cloudfrontDistribution,
    bucketName: account.contentBucket,
  }
}
export = main

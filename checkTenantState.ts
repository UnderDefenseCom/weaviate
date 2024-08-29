import weaviate, {WeaviateClient} from "weaviate-client";

async function run() {

  const client = await weaviate.connectToCustom({
    httpHost: 'localhost',
    httpPort: 80,
  })

  const multiCollection = client.collections.get('CollectionWithAutoTenantActivation')

  await multiCollection.tenants.update({name: 'tenant1', activityStatus: 'INACTIVE'})
  await multiCollection.tenants.update({name: 'tenant2', activityStatus: 'INACTIVE'})

  const tenants = await multiCollection.tenants.get()
  console.log(tenants)
  await client.close()
}


run()
  .then(() => {
    console.log('run')
  }).catch(e => {
  console.log('ERROR:', e)
})
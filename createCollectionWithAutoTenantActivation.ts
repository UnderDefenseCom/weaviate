import weaviate, {WeaviateClient} from "weaviate-client";

async function run() {

  const client = await weaviate.connectToCustom({
    httpHost: 'localhost',
    httpPort: 80,

  })

  const multiCollection = client.collections.get('CollectionWithAutoTenantActivation')

  if (await multiCollection.exists()) {
    console.log('CollectionWithAutoTenantActivation already exists')
    await client.collections.delete('CollectionWithAutoTenantActivation')
  }

  if (!await multiCollection.exists()){
    await client.collections.create({
      name: 'CollectionWithAutoTenantActivation',
      properties: [
        {name: 'title', dataType: 'text' as const},
      ],
      multiTenancy: weaviate.configure.multiTenancy({
        enabled: true,
        autoTenantActivation: true,
        autoTenantCreation: true
      }),
      vectorizers: [weaviate.configure.vectorizer.text2VecAWS({
        name: 'title_vector',
        sourceProperties: ['title'],
        region: 'us-east-1',
        service: 'bedrock',
        model: "amazon.titan-embed-text-v1"
      })],
    })
    console.log('CollectionWithAutoTenantActivation created')
    await multiCollection.tenants.create([{name: 'tenant1'}, {name: 'tenant2'}])
  }

  await multiCollection.withTenant('tenant1').generate.nearText(
    'risk',
    {groupedTask: 'tenant at high risk'}, {limit: 5})
  await multiCollection.withTenant('tenant2').generate.nearText(
    'risk',
    {groupedTask: 'tenant at low risk'}, {limit: 5})
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
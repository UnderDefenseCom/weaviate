import weaviate, {ApiKey} from "weaviate-ts-client";
import {WeaviateStore} from "@langchain/weaviate";
import {BedrockEmbeddings} from "@langchain/community/embeddings/bedrock";


export async function run() {
  // Something wrong with the weaviate-ts-client types, so we need to disable
  const client = weaviate.client({
    scheme: "http",
    host: "localhost:80",
    // apiKey: new ApiKey("default"),
  });

  // Create a store and fill it with some texts + metadata
  await WeaviateStore.fromTexts(
    ["tenant vulnerable"],
    [{foo: "bar"}, {foo: "baz"}, {foo: "qux"}, {foo: "bar"}],
    new BedrockEmbeddings(),
    {
      client,
      indexName: "Tenant1",
      textKey: "text",
      metadataKeys: ["foo"],
    }
  );

  await WeaviateStore.fromTexts(
    ["tenant defended"],
    [{foo: "bar"}, {foo: "baz"}, {foo: "qux"}, {foo: "bar"}],
    new BedrockEmbeddings(),
    {
      client,
      indexName: "Tenant2",
      textKey: "text",
      metadataKeys: ["foo"],
    }
  );

  const store1 = await WeaviateStore.fromExistingIndex(new BedrockEmbeddings(), {
    client,
    indexName: "Tenant1",
    metadataKeys: ["foo"],
  });
  const results1 = await store1.similaritySearch("tenant", 1);
  console.log('results1', results1);

  const store2 = await WeaviateStore.fromExistingIndex(new BedrockEmbeddings(), {
    client,
    indexName: "Tenant2",
    metadataKeys: ["foo"],
  });
  const results2 = await store2.similaritySearch("tenant", 1);
  console.log('results2', results2);
}

run()
  .then(() => {
    console.log('run')
  }).catch(e => {
  console.log('ERROR:', e)
})
import weaviate, {ApiKey} from "weaviate-ts-client";
import {WeaviateStore} from "@langchain/weaviate";
import {BedrockEmbeddings} from "@langchain/community/embeddings/bedrock";


export async function run() {
  // Something wrong with the weaviate-ts-client types, so we need to disable
  const client = weaviate.client({
    scheme: "http",
    host: "localhost:8080",
    // apiKey: new ApiKey("default"),
  });

  // Create a store and fill it with some texts + metadata
  await WeaviateStore.fromTexts(
    ["hello world", "hi there", "how are you", "bye now"],
    [{foo: "bar"}, {foo: "baz"}, {foo: "qux"}, {foo: "bar"}],
    new BedrockEmbeddings(),
    {
      client,
      indexName: "Test",
      textKey: "text",
      metadataKeys: ["foo"],
    }
  );
}

run()
  .then(() => {
  console.log('run')
}).catch(e => {
  console.log('ERROR:', e)
})
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-wXkCCVihkscERjA2g4QDQffI",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export default openai;
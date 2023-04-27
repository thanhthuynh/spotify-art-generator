import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-OqeRR3kxwDH1DmAdLyIrtLQT",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default openai;

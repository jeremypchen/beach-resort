import { createClient } from "contentful";

export default createClient({
  space: process.env.CONTENTFUL_API_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

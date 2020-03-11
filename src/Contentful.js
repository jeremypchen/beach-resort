import { createClient } from "contentful";

console.log("Got envs", process.env);
export default createClient({
  space: process.env.REACT_APP_CONTENTFUL_API_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
});

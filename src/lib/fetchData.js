import axios from "axios";
export async function getPosts() {
  let posts = await axios.get(
    "http://blogging-headless.local/wp-json/wp/v2/posts?order=asc&_fields=id,title,excerpt,modified"
  );
  console.log(posts);

  return posts.data;
}

export async function getPost(id) {
  let post = await axios.get(
    `http://blogging-headless.local/wp-json/wp/v2/posts/${id}?order=asc&_fields=id,title,content,excerpt,modified`
  );
  console.log(post.data);

  return post.data;
}

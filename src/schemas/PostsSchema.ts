import mongoose from "mongoose";
let Schema = mongoose.Schema;
let PostsSchema = new Schema({
  postDate: Date,
  lastUpdatedDate: Date,
  title: String,
  contents: String,
  authorId: String,
});
export let Posts = mongoose.model("posts", PostsSchema);

export type PostsType = {
  postDate: string;
  lastUpdatedDate: number;
  title: string;
  contents: string;
  authorId: string;
};

export async function createPosts(props: PostsType) {
  let newPosts = new Posts({
    postDate: props.postDate,
    lastUpdatedDate: props.lastUpdatedDate,
    title: props.title,
    contents: props.contents,
    authorId: props.authorId,
  });
  await newPosts.save();
}

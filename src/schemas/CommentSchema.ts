import mongoose from "mongoose";
let Schema = mongoose.Schema;
let CommentSchema = new Schema({
  postDate: Date,
  lastUpdatedDate: Date,
  contents: String,
  isReply: Boolean,
  authorId: String,
});

export type CommentType = {
  postDate: string;
  lastUpdatedDate: number;
  contents: string;
  isReply: boolean;
  authorId: string;
};
export let Comments = mongoose.model("comments", CommentSchema);

export async function createComments(props: CommentType) {
  let newComments = new Comments({
    postDate: props.postDate,
    lastUpdatedDate: props.lastUpdatedDate,
    contents: props.contents,
    isReply: props.isReply,
    authorId: props.isReply,
  });
  await newComments.save();
}

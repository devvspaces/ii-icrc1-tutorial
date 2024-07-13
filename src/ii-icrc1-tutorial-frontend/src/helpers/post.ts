import { Post } from "../../../declarations/ii-icrc1-tutorial-backend/ii-icrc1-tutorial-backend.did";
import { PostStatus } from "./types";


export function getPostStatus(post: Post) {
  if ((post.status as any).Draft === null) {
    return PostStatus.Draft;
  }
  if ((post.status as any).Published === null) {
    return PostStatus.Published;
  }
  if ((post.status as any).Archived === null) {
    return PostStatus.Archived;
  }
}
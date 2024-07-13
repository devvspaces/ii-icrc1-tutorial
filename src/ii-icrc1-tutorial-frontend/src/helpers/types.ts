import { Principal } from "@dfinity/principal";
import { Member } from "../../../declarations/ii-icrc1-tutorial-backend/ii-icrc1-tutorial-backend.did";

export interface Profile {
  principal: Principal;
  member: Member;
}

export enum Plan {
  Free = 'Free',
  Elite = 'Elite',
  Legendary = 'Legendary',
}

export enum PostStatus {
  Draft = 'Draft',
  Published = 'Published',
  Archived = 'Archived',
}

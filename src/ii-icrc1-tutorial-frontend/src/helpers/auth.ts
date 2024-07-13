import { Actor, AnonymousIdentity, Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import { Member } from "../../../declarations/ii-icrc1-tutorial-backend/ii-icrc1-tutorial-backend.did";
import { Plan } from "./types";
import { createActor } from "../../../declarations/ii-icrc1-tutorial-backend";

export async function createClient() {
  const authClient = await AuthClient.create({
    idleOptions: {
      idleTimeout: 1000 * 60 * 30,
    },
  });
  return authClient;
}

export async function createBackendActor(identity: Identity) {
  return createActor(process.env.CANISTER_ID_II_ICRC1_TUTORIAL_BACKEND, {
    agentOptions: {
      identity,
    },
  });
}

export const AnonymousPrincipal = new AnonymousIdentity()
  .getPrincipal()
  .toString();

export function refreshIdentity(
  identity: Identity,
  actor: Actor,
  setPrincipal: (principal: Principal) => void
) {
  setPrincipal(identity.getPrincipal());
  const agent = Actor.agentOf(actor);
  if (!agent || !agent.replaceIdentity) {
    throw new Error("Agent not found");
  }
  agent.replaceIdentity(identity);
}

export function getPlan(member: Member) {
  if ((member.plan as any).Free === null) {
    return Plan.Free;
  }
  if ((member.plan as any).Elite === null) {
    return Plan.Elite;
  }
  if ((member.plan as any).Legendary === null) {
    return Plan.Legendary;
  }
}

export function getPlanColor(plan: Plan) {
  switch (plan) {
    case Plan.Free:
      return "gray";
    case Plan.Elite:
      return "purple";
    case Plan.Legendary:
      return "orange";
  }
}

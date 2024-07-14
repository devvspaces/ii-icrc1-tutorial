import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import { createAgent } from "@dfinity/utils";
import { ii_icrc1_tutorial_backend } from "../../../declarations/ii-icrc1-tutorial-backend";
import { createClient } from "./auth";
import { Principal } from "@dfinity/principal";

export async function createLedgerCanister() {
  const client = await createClient();

  if (!client.isAuthenticated()) {
    throw new Error("User not authenticated");
  }

  const MY_LEDGER_CANISTER_ID =
    await ii_icrc1_tutorial_backend.get_icrc1_token_canister_id();
  
  const agent = await createAgent({
    identity: client.getIdentity(),
    host: `http://localhost:4943`,
    fetchRootKey: true,
  });

  return IcrcLedgerCanister.create({
    agent,
    canisterId: MY_LEDGER_CANISTER_ID,
  });
}

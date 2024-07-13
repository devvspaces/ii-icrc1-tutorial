import { LOGIN, useAuth } from "./AuthContext";
import { useEffect } from "react";
import { createClient, refreshIdentity } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import { Member } from "../../../declarations/ii-icrc1-tutorial-backend/ii-icrc1-tutorial-backend.did";
import { ii_icrc1_tutorial_backend } from "../../../declarations/ii-icrc1-tutorial-backend";

let actor = ii_icrc1_tutorial_backend;

function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const { state, dispatch } = useAuth();
    const navigation = useNavigate();

    useEffect(() => {
      async function checkAuthenticated() {
        const authClient = await createClient();
        if (await authClient.isAuthenticated()) {
          const identity = authClient.getIdentity();
          refreshIdentity(identity, actor, () => {});
          const response = (await actor.getMemberProfile(
            identity.getPrincipal()
          )) as any;
          const member = (response.ok as Member) ?? null;
          dispatch({
            type: LOGIN,
            payload: {
              principal: identity.getPrincipal(),
              member,
            },
          });
        } else {
          // logout
          localStorage.clear();
          sessionStorage.clear();
          indexedDB.deleteDatabase("icp");
          navigation("/");
        }
      }
      checkAuthenticated();
    }, [dispatch, navigation]);

    if (state.isAuthenticated) {
      return <Component {...props} />;
    } else {
      return <p>You are not logged in.</p>;
    }
  };
}

export default withAuth;

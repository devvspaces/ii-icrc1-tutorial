import { LOGIN, LOGOUT, useAuth } from "./AuthContext";
import { useEffect } from "react";
import {
  createBackendActor,
  createClient,
  refreshIdentity,
} from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import { Member } from "../../../declarations/ii-icrc1-tutorial-backend/ii-icrc1-tutorial-backend.did";
import {
  createActor,
  ii_icrc1_tutorial_backend,
} from "../../../declarations/ii-icrc1-tutorial-backend";
import { useToast } from "@chakra-ui/react";

let actor = ii_icrc1_tutorial_backend;

function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const { state, dispatch } = useAuth();
    const navigation = useNavigate();
    const toast = useToast();

    useEffect(() => {
      async function checkAuthenticated() {
        const authClient = await createClient();
        if (await authClient.isAuthenticated()) {
          const identity = authClient.getIdentity();
          actor = await createBackendActor(identity);
          const response = (await actor.getMemberProfile(
            identity.getPrincipal()
          )) as any;
          const member = (response.ok as Member) ?? null;
          if (!member) {
            // logout
            authClient.logout();
            dispatch({
              type: LOGOUT,
            });
            toast({
              title: "You don't have an account, kindly sign up",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          } else {
            dispatch({
              type: LOGIN,
              payload: {
                principal: identity.getPrincipal(),
                member,
              },
            });
          }
        } else {
          toast({
            title: "You are not logged in",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
      checkAuthenticated();
    }, [dispatch]);

    if (state.isAuthenticated) {
      return <Component {...props} />;
    } else {
      return <p>You are not logged in.</p>;
    }
  };
}

export default withAuth;

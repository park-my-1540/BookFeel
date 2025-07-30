import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export type MetaFunction = RouterMetaFunction;
  export type LoaderArgs = {
    request: Request;
  };
  export type ActionArgs = {
    request: Request;
  };
  export type ComponentProps = {
    loaderData: Record<string, string | null>;
    actionData: ActionData;
  };

  export interface ActionData {
    formErrors: {
      name: string | null;
      username: string | null;
      password: string | null;
      email: string | null;
    };
    fieldErrors: {
      name: string | null;
      username: string | null;
      password: string | null;
      email: string[] | null;
      otp: string[] | null;
    };
    signUpError: string | null;
    loginError: string | null;
    verifyError: string | null;
  }
}

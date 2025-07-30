import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export type MetaFunction = RouterMetaFunction;
  export type LoaderArgs = {
    request: Request;
    params: {
      provider: string;
    };
  };
  export type ComponentProps = {
    loaderData: {
      provider: string;
    };
  };
}

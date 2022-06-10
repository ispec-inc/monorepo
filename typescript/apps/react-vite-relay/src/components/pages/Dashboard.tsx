import React, { Suspense } from "react";
import { User } from "../atoms/User";
import { CurrentUser } from "../atoms/CurrentUser";
import { UserArticles } from "../atoms/UserArticles";

export const Dashboard: React.FC = (props) => {
  return (
    <>
      <Suspense fallback={"loading"}>
        <CurrentUser />
      </Suspense>
      <Suspense fallback={"loading"}>
        <UserArticles userId={"1"} />
      </Suspense>
      <Suspense fallback={"loading"}>
        <User userId={"1"} />
      </Suspense>
    </>
  );
};

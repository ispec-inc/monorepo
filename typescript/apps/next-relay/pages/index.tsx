import {RelayEnvironmentProvider} from "react-relay";
import {relayEnvironment} from "../relay";
import CurrentUser from "../src/CurrentUser";
import UserArticles from "../src/UserArticles";
import User from "../src/User";

export default function Home() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
        <CurrentUser />
        <UserArticles userId={"1"} />
        <User userId={"1"} />
    </RelayEnvironmentProvider>
  );
}


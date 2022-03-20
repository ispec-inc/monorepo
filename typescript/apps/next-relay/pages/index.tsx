import RelayEnvironment from "../src/RelayEnvironment";
import { RelayEnvironmentProvider } from "react-relay";
import RelayTest from "../src/RelayTest";
import RelayTestDynamic from "../src/RelayTestDynamic";

export default function Home() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      {/* <RelayTestDynamic /> */}
      <RelayTest />
    </RelayEnvironmentProvider>
  );
}


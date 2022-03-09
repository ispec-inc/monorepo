import dynamic from "next/dynamic";

const RelayTestDynamic = dynamic(() => import("./RelayTest"), {
  ssr: false,
});

export default RelayTestDynamic;

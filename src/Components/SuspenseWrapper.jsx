import { Suspense } from "react";
import Loader from "./Loader";

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<Loader />}>
    {children}
  </Suspense>
);

export default SuspenseWrapper;

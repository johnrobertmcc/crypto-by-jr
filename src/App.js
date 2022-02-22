import Wrapper from "./components/util/Wrapper/Wrapper";
import Layout from "./components/layout/Layout";
import { TransactionProvider } from "./context";

/**
 * Renders the dapp wrapped with white background.
 *
 * @returns {Element} The dapp itself.
 *
 */
export default function App() {
  return (
    <TransactionProvider>
      <Wrapper pt={false} pb={false}>
        <Layout />
      </Wrapper>
    </TransactionProvider>
  );
}

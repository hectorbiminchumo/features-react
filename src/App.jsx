import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ActionsDemo from './features/actions/ActionsDemo';
import UseHookDemo from './features/use-hook/UseHookDemo';
import OptimisticDemo from './features/optimistic/OptimisticDemo';
import MetadataDemo from './features/metadata/MetadataDemo';
import AssetsDemo from './features/assets/AssetsDemo';
import RefPropDemo from './features/ref-prop/RefPropDemo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="actions" element={<ActionsDemo />} />
        <Route path="use-hook" element={<UseHookDemo />} />
        <Route path="optimistic" element={<OptimisticDemo />} />
        <Route path="metadata" element={<MetadataDemo />} />
        <Route path="assets" element={<AssetsDemo />} />
        <Route path="ref-prop" element={<RefPropDemo />} />
      </Route>
    </Routes>
  );
}

export default App;
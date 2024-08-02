import { useDContext } from '@dynamic-framework/ui-react';
import { useEffect } from 'react';

import Payment from './components/Payment';
import PaymentResult from './components/PaymentResult';
import { CONTEXT_CONFIG } from './config/widgetConfig';
import useLoanAccountEffect from './services/hooks/useLoanAccountEffect';
import { useAppSelector } from './store/hooks';
import { getIsPaid } from './store/selectors';

export default function App() {
  const { setContext } = useDContext();

  useEffect(() => {
    setContext(CONTEXT_CONFIG);
  }, [setContext]);

  useLoanAccountEffect();
  const isPaid = useAppSelector(getIsPaid);

  return (
    <div className="row justify-content-center py-4">
      <div className="col-lg-8 col-xl-6">
        {!isPaid ? <Payment /> : <PaymentResult />}
      </div>
    </div>
  );
}

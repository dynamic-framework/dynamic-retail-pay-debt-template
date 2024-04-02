import { useDContext } from '@dynamic-framework/ui-react';
import { useEffect } from 'react';
import { useAppSelector } from './store/hooks';
import { getIsPaid } from './store/selectors';

import PaymentResult from './components/PaymentResult';
import Payment from './components/Payment';
import useLoanAccountEffect from './services/hooks/useLoanAccountEffect';
import { CONTEXT_CONFIG } from './config/widgetConfig';

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

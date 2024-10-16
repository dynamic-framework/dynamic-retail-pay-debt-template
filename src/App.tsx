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
  const isPaid = useAppSelector(getIsPaid);

  useEffect(() => {
    setContext(CONTEXT_CONFIG);
  }, [setContext]);

  useLoanAccountEffect();

  return (
    <div className="container py-4">
      {!isPaid ? <Payment /> : <PaymentResult />}
    </div>
  );
}

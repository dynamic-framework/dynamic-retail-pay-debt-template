import { useAppSelector } from './store/hooks';
import { getIsPaid } from './store/selectors';

import PaymentResult from './components/PaymentResult';
import Payment from './components/Payment';
import useLoanAccountEffect from './services/hooks/useLoanAccountEffect';

export default function App() {
  useLoanAccountEffect();
  const isPaid = useAppSelector(getIsPaid);

  return (
    <div className="row justify-content-center py-3">
      <div className="col-lg-8 col-xl-6">
        {!isPaid ? <Payment /> : <PaymentResult />}
      </div>
    </div>
  );
}

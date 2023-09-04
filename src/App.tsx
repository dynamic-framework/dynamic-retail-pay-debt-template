import { useTranslation } from 'react-i18next';
import { useAppSelector } from './store/hooks';
import { getIsPaid } from './store/selectors';

import PaymentResult from './components/PaymentResult';
import Payment from './components/Payment';
import useLoanInfo from './services/hooks/useLoanInfo';

export default function App() {
  useLoanInfo();
  const isPaid = useAppSelector(getIsPaid);
  const { t } = useTranslation();

  return (
    <div className="container py-3">
      <h1 className="fs-4 fw-bold mb-3 mb-md-5">
        {t('title')}
      </h1>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-xl-6">
          {!isPaid ? <Payment /> : <PaymentResult />}
        </div>
      </div>
    </div>
  );
}

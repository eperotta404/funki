import { useTranslation } from 'react-i18next';

export default function DetailsEvent() {
    const { t } = useTranslation();
  return (
    <>
      <h2>{t('events.details.details')}</h2>
    cards  
    </>
  )
}

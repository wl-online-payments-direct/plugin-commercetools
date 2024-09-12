import React, { useEffect, useState } from 'react';
import Modal from 'components/commercetools-ui/atoms/modal';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Button from 'components/commercetools-ui/atoms/button';
import { sdk } from 'sdk';
import { useAccount } from 'frontastic';
import toast from 'react-hot-toast';

interface Card {
  id: string;
  title?: string;
  token?: string;
  paymentProductId?: number;
  paymentMethod?: string;
  label?: string;
  logo?: string;
  defaultLogo?: string;
}

const Payments = () => {
  const { formatMessage: formatPaymentMessage } = useFormat({ name: 'payment' });
  const { formatMessage: formatCommonMessage } = useFormat({ name: 'common' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cardList, setCardList] = useState<Card[]>([]);
  const [cardId, setCardId] = useState('');
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const { account } = useAccount();
  const getSavedCards = async () => {
    const savedCards: any = await sdk.callAction({
      actionName: 'payment/savedCards',
      payload: {
        customerEmail: account?.email,
      },
    });
    const {
      data: { statusCode, result },
    } = savedCards;
    if (statusCode === 200) {
      setCardList(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSavedCards();
  }, [account]);

  const handleDeleteClick = async () => {
    const deleteSavedCardResponse: any = await sdk.callAction({
      actionName: 'payment/deleteSavedCard',
      payload: {
        customerPaymentTokenId: cardId,
        customerEmail: account?.email,
        customerId: account?.accountId,
      },
    });
    if (deleteSavedCardResponse?.data?.statusCode === 200) {
      setCardId('');
      getSavedCards();
    } else {
      toast(deleteSavedCardResponse?.data?.message);
      console.error(deleteSavedCardResponse?.data?.message);
    }
    setModalIsOpen(false);
  };

  return (
    <div className="px-16 md:mt-24 md:px-24 lg:mt-40 lg:px-44">
      <div className="hidden md:block">
        <Typography as="h2" className="text-18 text-primary-black md:text-22 lg:text-24">
          {formatPaymentMessage({
            id: 'payment.myPayments',
            defaultMessage: 'My Payments',
          })}
        </Typography>
      </div>
      <div className="mt-32 w-full lg:w-[90%]">
        {!loading && cardList.length === 0 && (
          <>{formatCommonMessage({ id: 'card.view', defaultMessage: 'No Saved Card Information !!!' })}</>
        )}
        {cardList.map((card: Card, key: number) => (
          <div
            key={`card-${key}`}
            className="mt-16 flex items-center justify-between rounded-md border px-16 py-12 lg:p-24"
          >
            <div className="flex items-center justify-between gap-x-24">
              <img className="h-fit w-[32px]" src={card.logo} />
              <div className="flex items-center">{card.title}</div>
            </div>
            <Button
              variant="ghost"
              size="fit"
              className="flex items-center px-0"
              onClick={() => {
                setModalIsOpen(true);
                setCardId(card.id);
              }}
            >
              <TrashIcon className="w-20 text-secondary-black" />
              <Typography as="h2" className="ml-8 text-center text-14 font-normal text-secondary-black">
                {formatPaymentMessage({
                  id: 'delete',
                  defaultMessage: 'Delete',
                })}
              </Typography>
            </Button>
          </div>
        ))}
      </div>
      <Modal
        shouldCloseOnOverlayClick
        preventScroll
        isOpen={modalIsOpen}
        style={{ content: { width: 400, height: 280, overflow: 'hidden' } }}
        contentLabel={formatCommonMessage({ id: 'quick.view', defaultMessage: 'Quick view' })}
        onRequestClose={closeModal}
        className="h-[280px] w-[400px] rounded-md border bg-neutral-100"
      >
        <div className="mx-auto p-24 md:ml-24 lg:ml-0">
          <div className="flex w-full cursor-pointer justify-end" onClick={closeModal}>
            <XMarkIcon className="w-24 text-secondary-black" />
          </div>
          <div className="mt-32 flex h-full flex-col items-center">
            <Typography as="h2" className="text-center text-20 font-medium text-primary-black">
              {formatPaymentMessage({
                id: 'delete.question',
                defaultMessage: 'Do you want to delete the saved card?',
              })}
            </Typography>
            <div className="mt-24 flex">
              <Button variant="secondary" className="w-[112px]" onClick={closeModal}>
                <Typography as="h2" className="text-center text-14 text-primary-black">
                  {formatPaymentMessage({
                    id: 'no',
                    defaultMessage: 'No',
                  })}
                </Typography>
              </Button>

              <Button variant="warning" className="ml-12 w-[112px]" onClick={handleDeleteClick}>
                <Typography as="h2" className="text-center text-14">
                  {formatPaymentMessage({
                    id: 'Yes',
                    defaultMessage: 'Yes',
                  })}
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Payments;

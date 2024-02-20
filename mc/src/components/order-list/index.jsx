import { useContext, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import DataTable from '@commercetools-uikit/data-table';
import { Pagination } from '@commercetools-uikit/pagination';
import SelectInput from '@commercetools-uikit/select-input';
import TextInput from '@commercetools-uikit/text-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import PageWrapper from '../page-wrapper'
import { getOrderList } from '../../ct-methods';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { areObjectsSame } from '../../helpers';
import './style.css';
import { PaymentContext } from '../../context/payment';
import messages from './messages';
import { OrderContext } from '../../context/order';

const OrderList = () => {
  const {formatMessage} = useIntl()

  const filterOptions = [
    { value: 'ALL', label: formatMessage(messages.filterOrders) },
    { value: 'WORLDLINE_CREDITCARD', label: formatMessage(messages.worldlineCreditCard) },
    { value: 'HOSTED_AND_APMS', label: formatMessage(messages.hostedApm) },
    { value: 'REDIRECT_WORLDLINE', label: formatMessage(messages.redirectWorldline) }
  ]

  const initialSearchState = {
    filterOption: filterOptions[0].value,
    orderId: ''
  }

  const [orderList, setOrderList] = useState([])
  const [totalOrders, setTotalOrders] = useState()
  const [loading, setLoading] = useState(false)
  const [searchData, setSearchData] = useState(initialSearchState)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPerPage, setCurrentPerPage] = useState(20)
  const history = useHistory()

  const columns = [
    { key: 'createdAt', label: formatMessage(messages.createdDate) },
    { key: 'paymentId', label: formatMessage(messages.paymentId) },
    { key: 'orderId', label: formatMessage(messages.orderId) },
    { key: 'paymentOption', label: formatMessage(messages.paymentOption) },
    { key: 'worldlinePaymentResponse', label: formatMessage(messages.worldlinePaymentResponse) },
    { key: 'status', label: formatMessage(messages.status) },
    { key: 'currency', label: formatMessage(messages.currency) },
    { key: 'total', label: formatMessage(messages.total) },
    { key: 'actions', label: formatMessage(messages.action) },
  ];
    

  
  const match = useRouteMatch()

  const projectKey = useApplicationContext((context) => context.project.key);
  const {apiHost} = useApplicationContext((context) => context.environment);
  const {activeStore} = useContext(PaymentContext);
  const {setOpenCapture, setOpenRefund} = useContext(OrderContext)
  const getOrders = async (options = {}) => {
    const {key: storeId} = activeStore
    const {page = '', orderId = '', limit = null, filterOption = 'ALL'} = options
    setLoading(true)
    const response = await getOrderList(apiHost, projectKey, storeId, page, orderId, limit, filterOption)
    if (response.statusCode === 200) {
      const {result: {data, meta : {totalCount}}} = response
      setOrderList(data)
      setTotalOrders(parseInt(totalCount))
    }
    setLoading(false)
  }
  useEffect(() => {
    if (!apiHost || !projectKey || !activeStore) return
    getOrders()
  }, [apiHost, projectKey, activeStore])

  const onPagination = async (page) => {
    setCurrentPage(page)
    getOrders({page})
  }

  const onPerPagePagination = async (perPage) => {
    setCurrentPerPage(perPage)
    setCurrentPage(1)
    getOrders({limit: perPage})
  }

  const itemRenderer = (item, column) => {
    const itemValue = item[column.key]
    if (column.key === 'createdAt') {
      const dateFormat = new Date(itemValue)
      return dateFormat.toLocaleDateString()
    }
    if (column.key === "paymentId") {
      const link = <Link to={`${match.url}/${itemValue}`}>{itemValue}</Link>
      return link
    }
    if (column.key === "orderId") {
      const link = <a href={`${projectKey}/orders`} target="_blank" rel="noopener noreferrer">{itemValue}</a>
      return link
    }
    if (column.key === "status") {
      const paymentBox = <div className="alert alert-yellow"> {itemValue} </div>
      return paymentBox
    }
    if (column.key === "actions") {
      if (item['status'] === 'INITIAL' || item['status'] === 'AUTHORIZED' || item['status'] === 'PENDING_CAPTURE') {
        return (
          <div className='action-wrapper'>
              <button>Cancel</button>
              <button onClick={() => {
                setOpenCapture(true)
                setOpenRefund(false)
                history.push(`${match.url}/${item['paymentId']}`)
              }}>Capture</button>
          </div>
        )
      } else if (item['status'] === 'CAPTURED') {
        return (
          <div className='action-wrapper'>
              <button onClick={() => {
                setOpenRefund(true)
                setOpenCapture(false)
                history.push(`${match.url}/${item['paymentId']}`)
              }}>Refund</button>
          </div>
        )
      } else {
        return <></>
      }      
    }
    return itemValue;
  };

  const handleOrderIdChange = (e) => {
    const {value} = e.target
    setSearchData({
      ...searchData,
      orderId: value
    })
  }

  const handleFilterChange = (e) => {
    const {value} = e.target
    setSearchData({
      ...searchData,
      filterOption: value
    })
  }

  const handleSearch = () => {
    getOrders(searchData)
  }

  const clearFilter = () => {
    if (areObjectsSame(initialSearchState, searchData)) return
    getOrders(initialSearchState)
    setSearchData(initialSearchState)
  }

  return (
    <PageWrapper title={'Order list'}>
      <div className='order-wrapper'>
        <form className='order-filters' onSubmit={handleSearch}>
          <div className='filter-order'>
            <SelectInput
              name="filterOption"
              value={searchData.filterOption}
              options={filterOptions}
              onChange={handleFilterChange}
            />
          </div>
          <div className='search-order'>
            <TextInput
              name="orderId"
              placeholder='Order ID'
              value={searchData.orderId}
              onChange={handleOrderIdChange}
            />
          </div>
          <div>
            <PrimaryButton
              label="Search"
              onClick={handleSearch}
              isDisabled={false}
            />
          </div>
        </form>
        <div className='clear-filter'>
          <button onClick={clearFilter}><FormattedMessage id="clearFilter" defaultMessage="Clear Filter" /></button>
        </div>
        {totalOrders > 20 && (
          <Pagination
            totalItems={totalOrders}
            page={currentPage}
            perPage={currentPerPage}
            onPageChange={(page) => {
              onPagination(page)
            }}
            onPerPageChange={(page) => {
              onPerPagePagination(page)
            }}
          />
        )}
        {loading && <LoadingSpinner size="s"></LoadingSpinner>}
        {orderList.length > 0 ? (
          <div className='order-list'>
            <DataTable
              columns={columns}
              rows={orderList}
              itemRenderer={(item, column) =>
                itemRenderer(item, column)
              }
            />
        </div>
        ) : (
          <div className='no-results'>
            <h4><FormattedMessage id="noResultsTitle" defaultMessage="There are no orders that match your search query." /></h4>
            <p><FormattedMessage id="noResultsSubtitle" defaultMessage="Suggestions:" /></p>
            <ul>
              <li><FormattedMessage id="noResultsList1" defaultMessage="Check the spelling." /></li>
              <li><FormattedMessage id="noResultsList2" defaultMessage="Make sure that the values are correct." /></li>
            </ul>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

export default OrderList
import PropTypes from "prop-types"

const TransactionList = ({transactionList}) => {
  return (
    <>
        {transactionList.map((transaction) => (
            <div key={transaction.id} className="transaction-list">
                <p>
                    <span>{transaction.amountOfMoney.amount}</span>
                </p>
                <p>
                    <span className="status-field">{transaction.status}</span>
                </p>
                <p></p>
            </div>
        ))}
    </>
  )
}

export default TransactionList

TransactionList.propTypes = {
    transactionList: PropTypes.array
};
import { createContext, useState } from "react"
import PropTypes from "prop-types"


export const OrderContext = createContext();

const OrderProvider = ({children}) => {
    const [openCapture, setOpenCapture] = useState(false);
    const [openRefund, setOpenRefund] = useState(false);
    const [transactionRequested, setTransactionRequested] = useState(false);
    return (
        <OrderContext.Provider 
            value={{
                openCapture,
                openRefund,
                setOpenCapture,
                setOpenRefund,
                transactionRequested,
                setTransactionRequested
            }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider

OrderProvider.propTypes = {
    children: PropTypes.node.isRequired
};

const getOrderNum = () => `
    SELECT (SELECT COUNT(*) + 1 
              FROM ORDERS 
             WHERE dateString = '${getTodayDateString()}' 
               AND id < O.id) AS orderNum
      FROM ORDERS O
     WHERE O.id = ?
`;

const insertOrders = () => `
    INSERT INTO ORDERS (
      paymentId
    , paymentAmount
    , totalAmount
    , dateString
    ) 
    VALUES 
    (
      ?
    , ?
    , ?
    , '${getTodayDateString()}'
    );
    `;

const insertOrdersHasMenu = () => `
   INSERT INTO ORDERS_HAS_MENU (
      ordersId
    , menuId
    , menuOptionId
    ) 
    VALUES 
    (
      ?
    , ?
    , ?
    )
    `;

export { getOrderNum, insertOrders, insertOrdersHasMenu };

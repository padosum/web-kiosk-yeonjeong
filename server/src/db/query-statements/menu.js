import { getTodayDateString } from 'src/util/date';

const getAllCategory = () => `
  SELECT id
       , title 
    FROM MENU_CATEGORY
`;

const getAllMenu = () => `
  SELECT M.title
       , M.categoryId
       , M.price
       , MHO.menuId
       , GROUP_CONCAT(MENU_OPTION_DETAIL.optionId order by MENU_OPTION_DETAIL.optionId) as optionId
       , GROUP_CONCAT(MENU_OPTION_DETAIL.id  order by MENU_OPTION_DETAIL.optionId, MENU_OPTION_DETAIL.id) as optionDetailId
       , GROUP_CONCAT(MENU_OPTION_DETAIL.title order by MENU_OPTION_DETAIL.optionId, MENU_OPTION_DETAIL.id) as optionTitle
       , GROUP_CONCAT(MENU_OPTION_DETAIL.surcharge order by MENU_OPTION_DETAIL.optionId, MENU_OPTION_DETAIL.id) as optionSurcharge
       , IFNULL((SELECT COUNT(*) as cnt
                   FROM ORDERS as O
                  INNER JOIN ORDERS_HAS_MENU as OHM
                     ON O.id = OHM.ordersId
                  WHERE O.dateString = '${getTodayDateString()}'
                    AND M.id = OHM.menuId
                  GROUP BY OHM.menuId), 0) as salesCnt
    FROM MENU as M
   INNER JOIN MENU_HAS_OPTION as MHO
      ON M.id = MHO.menuId
   INNER JOIN MENU_OPTION as MO
      ON MO.id = MHO.optionId
   INNER JOIN MENU_OPTION_DETAIL 
      ON MO.id = MENU_OPTION_DETAIL.optionId
     AND MHO.optionDetailId = MENU_OPTION_DETAIL.id 
     AND MHO.optionId = MENU_OPTION_DETAIL.optionId
   GROUP BY M.id
   ORDER BY salesCnt DESC;
    `;

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
export {
  getAllMenu,
  getAllCategory,
  getOrderNum,
  insertOrders,
  insertOrdersHasMenu,
};

import connection from '../config/db.js';

const getAllStockInfo = async () => {
    const[rows] = await connection.query('SELECT * FROM stockinfo');
    return rows;
};

const getStockNames = async () => {
    const[rows] = await connection.query('SELECT stockName FROM stockinfo GROUP BY stockname;');
    const res = rows.map((rows) => {
        return rows['stockName'];
    })
    const res1 = {'stockList': res};
    return res1;
};

const getStartDatePriceByName = async (stockName) => {
    const[rows] = await connection.query('SELECT purchasePrice FROM userstock WHERE stockName = ?;', [stockName]);
    return rows[0];
}

const getStockPriceByNameAndDate = async (stockName, startDate, endDate) => {
    const[rows] = await connection.query(
        'SELECT DISTINCT stockName, ' +
        'MIN(CASE WHEN infoDate = ? THEN ROUND(closePrice, 2) END) AS startDate, ' +
        'MIN(CASE WHEN infoDate = ? THEN ROUND(closePrice, 2) END) AS endDate ' +
        'FROM stockinfo ' + 
        'WHERE stockName = ? ' +
        'GROUP BY stockName;',
        [startDate, endDate, stockName]);
        return rows[0];
}

const updateUserStockSharesByName = async (stockName, shares) => {
    const[result] = await connection.query(
        'UPDATE userstock ' +
        'SET shares = shares + ? ' +
        'WHERE stockName = ?;',
        [shares, stockName]
    );
    return result.affectedRows > 0;
}

export {getAllStockInfo, getStockNames, getStartDatePriceByName, getStockPriceByNameAndDate, updateUserStockSharesByName}
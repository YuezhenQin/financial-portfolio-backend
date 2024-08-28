import * as financialService from '../services/financialService.js'

export const getAllStockInfo = async (req, res) => {
    try{
        const stocks = await financialService.getAllStockInfo();
        res.json(stocks);
    } catch(error){
        res.status(500).send(error.message)
    }
};

export const getStockNames = async (req, res) => {
    try{
        const stockNames = await financialService.getStockNames();
        res.json(stockNames);
    } catch(error){
        res.status(500).send(error.message)
    }
};

export const getStartDatePriceByName = async (req, res) => {
    try{
        const startDatePrice = await financialService.getStartDatePriceByName(req.query.stockName);
        if(startDatePrice){
            res.json(startDatePrice);
        } else{
            res.status(404).send('Stock not found');
        }
    } catch(error){
        res.status(500).send(error.message);
    }
};

export const getStockPriceByNameAndDate = async (req, res) => {
    try{
        console.log(req.params.stockName, req.params.startDate, req.params.endDate);
        const stockStartEndPrice = await financialService.getStockPriceByNameAndDate(req.query.stockName, req.query.startDate, req.query.endDate);
        if(stockStartEndPrice){
            res.json(stockStartEndPrice);
        } else{
            res.status(404).send('Stock not found');
        }
    } catch(error){
        res.status(500).send(error.message);
    }
};

export const getUserStockByUserName = async (req, res) => {
    try{
        const userStock = await financialService.getUserStockByUserName(req.query.userName);
        if(userStock){
            res.json(userStock);
        } else{
            res.status(404).send('Stock not found');
        }
    } catch(error){
        res.status(500).send(error.message);
    }  
};

export const updateUserStockSharesByName = async (req, res) => {
    try{
        const updateSharesRes = await financialService.updateUserStockSharesByName(req.query.stockName, req.query.userName, req.query.shares);
        if(updateSharesRes){
            res.status(201).send('Shares updated Successfully')
        } else{
            res.status(404).send('Stock not found or user not found. Please check your input!');
        }
    } catch(error){
        res.status(500).send(error.message);
    }
};

export const insertUserStock = async (req, res) => {
    try{
        const userStock = await financialService.insertUserStock(req.body);
        res.status(201).json(userStock);
    } catch(error){
        res.status(500).send(error.message);
    }  
};



export const getStocksByUser = async (req, res) => {
    try{
        const userStockList = await financialService.getStocksByUser(req.query.userName);
        if(userStockList){
            res.json(userStockList);
        } else{
            res.status(404).send('User not found');
        }
    } catch(error){
        res.status(500).send(error.message);
    }  
};

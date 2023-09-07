import * as React from 'react';
import * as S from '../style';

import { MdAdd, MdRemove } from 'react-icons/md';

import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Typography from '@mui/material/Typography';
import { usePortfolioStore } from 'store/portfolio/portfolio';

import { TickerSearch } from 'components/Search/Search';
import NoDataSkeleton from 'components/Skeletons/NoDataSkeleton';

import { deleteTable, insertTable } from 'endpoints/clients/database/postgres/general';
import { PostgresTablesEnum } from 'endpoints/schema/database/postgres/props';
import { ColorsEnum } from 'common/theme';
import PortfolioPopup from '../portfoliopopup';
import { PortfolioPopupOptionRow, PortfolioPopupTextRow } from '../portfoliopopup/portfoliopopup';
import {
    PortfolioTransactionEntry,
    checkValidPortfolioTransactionEntry,
    initPortfolioTransactionEntry,
} from 'endpoints/schema/database/postgres/portfolio';
import { Snackbar } from '@mui/material';
import CustomAlert from 'components/Alert/CustomAlert';
import { getPortfolioTransactions } from 'endpoints/clients/database/postgres/query';
import { StyledTableCell } from 'components/Tables/BaseTable/StyledTableCell';
import { StyledTableRow } from 'components/Tables/BaseTable/StyledTableRow';

function PortfolioTransactionPopup(props: { 
    show: boolean; 
    setShow: (show: boolean) => void 
    setTransactions: (transaction: PortfolioTransactionEntry) => void;
}) {

    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const [transaction, setTransaction] = React.useState<PortfolioTransactionEntry>(
        initPortfolioTransactionEntry()
    );
    const [selectedOption, setSelectedOption] = React.useState<{
        ticker: string;
        assetType: string;
    }>();
    const selectedPortfolio = usePortfolioStore(state => state.selectedPortfolio);

    const handleClick = () => {
        let transactionUpdated = {...transaction}
        transactionUpdated.portfolio_id = selectedPortfolio.uuid;
        transactionUpdated.asset_id = selectedOption!.ticker
        transactionUpdated.asset_type = selectedOption!.assetType
        if (checkValidPortfolioTransactionEntry(transactionUpdated)) {
            setError(false);
            insertTable({ tableName: 'portfolio_transactions', entry: transactionUpdated });
            setOpenSnackbar(true);
            // Reset the transaction entry
            setTransaction(initPortfolioTransactionEntry());
            props.setShow(false)
            props.setTransactions(transactionUpdated)
        } else setError(true);
    };

    const handleChange = (key: string, event: React.ChangeEvent<HTMLInputElement>): void => {
        let val: string | number | Date = event.target.value;
        if (key === "price_purchased" || key === "comission" || key === "quantity") val = +val
        if (key === "transaction_date") val = new Date(val)
        const updatedTransaction = { ...transaction, [key]: val };
        setTransaction(updatedTransaction);
    };

    return (
        <PortfolioPopup {...props} handleClick={handleClick}>
            <div style={{ backgroundColor: ColorsEnum.warmgray1, padding: 5 }}>
                <TickerSearch
                    setSelectedOption={(ticker: string, asset_type: string) => {
                        setSelectedOption({ ticker: ticker, assetType: asset_type });
                    }}
                />
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message="Transaction Added"
            />
            <div style={{ padding: 5, height: '100%' }}>
                {!selectedOption ? (
                    <NoDataSkeleton text="Select ticker" />
                ) : (
                    <>
                        <PortfolioPopupTextRow title="Ticker" selection={selectedOption.ticker} />
                        <PortfolioPopupTextRow
                            title="Asset Type"
                            selection={selectedOption.assetType}
                        />
                        <PortfolioPopupTextRow
                            title="Quantity"
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                handleChange('quantity', event)
                            }
                        />
                        <PortfolioPopupTextRow
                            title="Price Purchased"
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                handleChange('price_purchased', event)
                            }
                        />
                        <PortfolioPopupOptionRow
                            title="Currency"
                            selected={transaction.currency}
                            options={['SGD', 'USD']}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                handleChange('currency', event)
                            }
                        />
                        <PortfolioPopupOptionRow
                            title="Broker"
                            selected={transaction.broker}
                            options={['IBKR', 'TDAmeritrade']}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                handleChange('broker', event)
                            }
                        />
                        <PortfolioPopupOptionRow
                            title="Exchange"
                            selected={transaction.exchange}
                            options={['ARCA', 'NYSE']}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                handleChange('exchange', event)
                            }
                        />
                        <PortfolioPopupTextRow
                            title="Comission"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                handleChange('comission', event)
                            }
                        />
                        <PortfolioPopupTextRow
                            type="datetime-local"
                            title="Transaction Date"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                handleChange('transaction_date', event)
                            }
                        />
                    </>
                )}
            </div>
            {error ? (
                <CustomAlert text="Please ensure fields are not empty and filled up!" />
            ) : null}
        </PortfolioPopup>
    );
}

function PortfolioTransactionsTable(props: {
    transactions: PortfolioTransactionEntry[];
}) {

    const portfolioSelected = usePortfolioStore(state => state.selectedPortfolio)

    return (
        <div style={{ minHeight: 200 }}>
            {(portfolioSelected.uuid && props.transactions.length !== 0) ? (
                <Table style={{ minWidth: 150 }} aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: ColorsEnum.coolgray8 }}>
                        {Object.keys(props.transactions[0]).map((col: string, index: number) => {
                            if (col !== "portfolio_id" && col !== "uuid") {
                            return (
                                <StyledTableCell
                                    isHeader
                                    width={100/Object.keys(props.transactions[0]).length + '%'}
                                    key={`${col}_${index}`}
                                >
                                    {col}
                                </StyledTableCell>
                            );
                        }
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.transactions.map((entry, index) => {
                    return (
                        <StyledTableRow>
                            {
                                Object.keys(entry).map((col) => {
                                    if (col !== "portfolio_id" && col !== "uuid") {
                                        let value = entry[col as keyof PortfolioTransactionEntry]?.toString();
                                        if (col === "price_purchased" || col === "comission") value = `$${value}`
                                        return (
                                            <StyledTableCell
                                                key={`${entry.asset_id}_${col}_${index}`}
                                            >
                                                {value}
                                            </StyledTableCell>
                                        )
                                    }
                                })
                            }
                        </StyledTableRow>
                    ) 
                })}
                </TableBody>
            </Table>
            ) : <NoDataSkeleton text="No Portfolio Selected" />}
        </div>
    )
}

export default function PortfolioSidePanel() {

    const [show, setShow] = React.useState<boolean>(false);
    const [transactions, setTransactions] = React.useState<PortfolioTransactionEntry[]>([]);
    const [portfolioSelected, clearSelectedPortfolio, deletePortfolio] = usePortfolioStore(
        state => [state.selectedPortfolio, state.clearSelectedPortfolio, state.deletePortfolio]
    );

    const handleRemovePortfolio = () => {
        if ('uuid' in portfolioSelected) {
            deleteTable({
                id: portfolioSelected.uuid,
                tableName: PostgresTablesEnum.PORTFOLIO,
            });
            clearSelectedPortfolio();
        }
    };

    const handleRowRemove = (uuid: string) => {
        deleteTable({
            tableName: PostgresTablesEnum.PORTFOLIO_TRANSACTIONS,
            id: uuid,
        });
    };

    const setTransactionsHandler = (transaction: PortfolioTransactionEntry) => {
        setTransactions([...transactions, transaction])
    }

    React.useEffect(() => {
        if (portfolioSelected.uuid)
        getPortfolioTransactions({ id: portfolioSelected.uuid }).then((res) => {
            setTransactions(res.data)
        })
    }, [portfolioSelected])


    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <S.PortfolioSidePanelBody>
            </S.PortfolioSidePanelBody>
            <S.PortfolioSidePanelFooter>
                <div style={{ width: '40%', display: 'flex', gap: 5}}>
                    <S.ButtonWrapper onClick={() => setShow(true)}>
                        <MdAdd />
                        <Typography variant="subtitle2"> Add Portfolio </Typography>
                    </S.ButtonWrapper>
                    <S.ButtonWrapper
                        disabled={Object.keys(portfolioSelected).length === 0}
                        onClick={() => {
                            if ('uuid' in portfolioSelected) {
                                handleRemovePortfolio();
                                deletePortfolio(portfolioSelected.uuid);
                            }
                        }}
                    >
                        <MdRemove />
                        <Typography variant="subtitle2"> Remove Portfolio </Typography>
                    </S.ButtonWrapper>
                </div>
                <div style={{width: '60%', display: 'flex', justifyContent: 'flex-end'}}>
                    <S.ButtonWrapper
                        onClick={() => setShow(true)}
                        style={{ backgroundColor: ColorsEnum.darkGreen }}
                    >
                        <AddIcon fontSize="small" />
                        <Typography variant="subtitle2">Create Transaction</Typography>
                    </S.ButtonWrapper>
                    </div>
            </S.PortfolioSidePanelFooter>
            <PortfolioTransactionsTable transactions={transactions} />
            <PortfolioTransactionPopup show={show} setShow={setShow} setTransactions={setTransactionsHandler}/>
        </div>
    );
}

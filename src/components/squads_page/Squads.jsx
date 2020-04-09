import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Paper, Table, Snackbar, Typography, TableHead, InputBase, TableBody, TableCell, TableRow, TableContainer, TableFooter, TablePagination, IconButton, Container } from '@material-ui/core'
import SquadsStyles from '../../assets/jss/styles/Squads.styles.jsx'
import SearchIcon from '@material-ui/icons/Search'
import { useQuery } from '@apollo/react-hooks'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'
import Spinner from '../Spinner.jsx'
import { useSelector } from 'react-redux'
import { GET_SQUADS } from '../../requests'
import SendRequestIcon from './SendRequestIcon'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles(SquadsStyles);

function TablePaginationActions(props) {
  const classes = useStyles();

  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.paginationAction}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const commanderName = (squad) => {
  let commander = squad.members.find((m) => m.role === 'commander');
  return commander ? `${commander.user.lastName} ${commander.user.firstName}` : '';
}

export default function Squads() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [squads, setSquads] = useState([]);
  const user = useSelector(state => state.currentUser)

  const { loading, error, data } = useQuery(GET_SQUADS, {onCompleted: () => setSquads(data.squads)});
  const findSquad = ({ target: { value } }) => {
    if (value === '') return  setSquads(prevSquads => data.squads);
    setSquads(data.squads.filter((squad) => squad.squadNumber.includes(value)));
  }

  const deleteRequest = (squad, userRequest) => {
    const index = squads.indexOf(squad)
    squad.requests = squad.requests.filter((request => request !== userRequest))
    squads[index] = squad
    setSquads(squads)
  }

  const pushRequest = (squad, userRequest) => {
    squads.forEach(squad => {
      squad.requests = squad.requests.filter((request) => request.user.id !== userRequest.user.id)
    })

    const index = squads.indexOf(squad)
    squad.requests.push(userRequest)
    squads[index] = squad
    setSquads(squads)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, squads.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const labelDisplayedRows = ({from, to, count}) => {
    return `${from}-${to === -1 ? count : to} из ${count}`
  };

  const [alertState, setAlertState] = useState({open: false})

  if (loading) return <Spinner />;
  if (error) return(<div>{error}</div>)

  return (
    <Container>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertState.open} onClose={() => setAlertState({open: false, message: alertState.message})}>
        <Alert onClose={() => setAlertState({open: false, message: alertState.message})} severity="success">
          {alertState.message}
        </Alert>
      </Snackbar>
      { user.squad ?
      <Paper className="p-3 mt-4">
        <Typography variant='h4' component='h1'>
          Внимание!
        </Typography>
        <Typography variant='body1'>
          Вы уже состоите во взводе, поэтому возможность отправки заявок заблокирована.
        </Typography>
      </Paper>
      : '' } 
      <Paper className={'p-3 ' + (user.squad ? 'mt-5' : 'mt-4')}>
        <div className={classes.searchArea}>
          <SearchIcon className={classes.searchIcon}/>
          <InputBase
            placeholder='Поиск'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={findSquad}
          />
        </div>
        <TableContainer>
          <Table className={classes.table} aria-label='sticky table'>
            <TableHead >
              <TableRow>
                <TableCell className={classes.TableCell}>Номер взвода</TableCell>
                <TableCell className={classes.TableCell}>Командир</TableCell>
                { !user.squad ? <TableCell className={classes.TableCell}></TableCell> : null}
              </TableRow>
            </TableHead>
            <TableBody>
            {
              (rowsPerPage > 0
                ? squads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : squads
              ).map((squad, i) => (
                <TableRow key={i}>
                  <TableCell>{squad.squadNumber}</TableCell>
                  <TableCell>{commanderName(squad)}</TableCell>
                  {!user.squad ? 
                    <TableCell>
                      <SendRequestIcon setAlertState={setAlertState}
                                       deleteRequest={deleteRequest}
                                       pushRequest={pushRequest}
                                       squad={squad}
                                       user={user} />
                    </TableCell>
                    : null }
                </TableRow>
              ))
            }
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage={'Записей на странице'}
                  labelDisplayedRows={labelDisplayedRows}
                  rowsPerPageOptions={[10]}
                  count={squads.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
  </Container>
  );
}

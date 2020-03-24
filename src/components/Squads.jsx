import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Table, TableHead, InputBase, TableBody, TableCell, TableRow, TableContainer, TableFooter, TablePagination, IconButton, Container } from '@material-ui/core';
import SquadsStyles from '../assets/jss/styles/Squads.styles.jsx'
import SearchIcon from '@material-ui/icons/Search';
import { useQuery } from '@apollo/react-hooks';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import Spinner from './Spinner.jsx'
import gql from 'graphql-tag';


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

const GET_SQUADS = gql`
  {
    squads {
      squadNumber
      members {
        role
        user {
          lastName
          firstName
        }
      }
    }
  }
`;

const commanderName = (squad) => {
  let commander = squad.members.find((m) => m.role === 'commander');
  return commander ? `${commander.user.lastName} ${commander.user.firstName}` : '';
}

export default function Squads() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [squads, setSquads] = useState([]);

  const { loading, error, data } = useQuery(GET_SQUADS, {onCompleted: () => setSquads(data.squads)});
  const findSquad = ({ target: { value } }) => {
    if (value === '') return  setSquads(prevSquads => data.squads);
    setSquads(data.squads.filter((squad) => squad.squadNumber.includes(value)));
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

  if (loading) return <Spinner />;
  if (error) return(<div>{error}</div>)

  return (
    <Container>
      <Paper className={classes.paper}>
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

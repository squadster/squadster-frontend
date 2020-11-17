import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Table, Typography, TableHead, InputBase, TableBody, TableCell, TableRow, TableContainer, TableFooter, TablePagination, Container, Button } from '@material-ui/core';
import SquadsStyles from './Squads.styles'
import SearchIcon from '@material-ui/icons/Search'
import { useQuery } from '@apollo/react-hooks'
import Spinner from '../shared/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { setSquads } from 'actions/squads_actions'
import { GET_SQUADS } from 'requests'
import { Link } from 'react-router-dom';
import SquadRecord from './components/SquadRecord/SquadRecord'
import TablePaginationActions from './components/TablePaginationActions'
import UserWithoutSquadNote from './components/UserWithoutSquadNote'
import WelcomeModal from '../WelcomeModal/WelcomeModal'

const useStyles = makeStyles(SquadsStyles)
const labelDisplayedRows = ({from, to, count}) => `${from}-${to === -1 ? count : to} из ${count}`

export default function Squads() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const user = useSelector(state => state.currentUser)
  const squads = useSelector(state => state.squads)

  const [squadsState, setSquadsState] = useState(squads)

  useEffect(() => {
    setSquadsState(squads)
  }, [squads])

  const { loading, data } = useQuery(GET_SQUADS, { onCompleted: () => dispatch(setSquads(data.squads)) });
  const findSquad = ({ target: { value } }) => {
    if (value === '') return  setSquadsState(() => squads);
    setSquadsState(squads.filter((squad) => squad.squadNumber.includes(value)));
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, squads.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <Spinner />;

  return (
    <Container>
      { user.showInfo && <WelcomeModal />}
      { user.squad ?
      <Paper className="p-3 mt-4">
        <Typography variant='h4' component='h1'>
          Внимание!
        </Typography>
        <Typography variant='body1'>
          Вы уже состоите во взводе, поэтому возможность отправки заявок заблокирована.
        </Typography>
      </Paper>
      : <UserWithoutSquadNote /> }
      <Paper className={'p-3 ' + (user.squad ? 'mt-5' : 'mt-4')}>
        <div className={classes.searchArea}>
          <div className="col-auto mr-auto">
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
          {
            !user.squad && <div className="col-auto">
              <Link to='/new_squad'>
                <Button className={classes.button}>Создать взвод</Button>
              </Link>
            </div>
          }
        </div>
        <TableContainer>
          <Table className={classes.table} aria-label='sticky table'>
            <TableHead >
              <TableRow>
                <TableCell className={classes.TableCell}>Номер взвода</TableCell>
                <TableCell className={classes.TableCell}>Командир</TableCell>
                <TableCell className={classes.TableCell}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              (rowsPerPage > 0
                ? squadsState.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : squadsState
              ).map((squad, i) => {
                return <SquadRecord key={i} user={user} squad={squad} />
              })
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

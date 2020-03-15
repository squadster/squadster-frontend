import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SquadsStyles from '../assets/jss/styles/Squads.styles.jsx'
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import InputBase from '@material-ui/core/InputBase';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


const useStyles = makeStyles(SquadsStyles);

const GET_SQUADS = gql`
  {
    squads {
      id
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
  const { loading, error, data } = useQuery(GET_SQUADS);
  const squads = data ? data.squads : [];

  if (error) return(<div>{error}</div>)

  return (
    <div className='row rounded'>
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
          />
        </div>
        {!loading &&
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='sticky table'>
              <TableHead >
                <TableRow>
                  <TableCell className={classes.TableCell}>Номер взвода</TableCell>
                  <TableCell className={classes.TableCell}>Командир</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {squads.map(squad => (
                  <TableRow key={squad.id}>
                    <TableCell>{squad.squadNumber}</TableCell>
                    <TableCell>{commanderName(squad)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Paper>
    </div>
  );
}

import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Cats, Races, Colors } from '../api/cats.js';

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const Cat = (props) => {
  var race = Races.findOne({_id: props.cat.race});
  var color = Colors.findOne({_id: props.cat.color});
    return (
        <React.Fragment>
            <TableRow>
              <CustomTableCell component="th" scope="row">{props.cat.name}</CustomTableCell>
              <CustomTableCell align="right">{race.race}</CustomTableCell>
              <CustomTableCell align="right">{color.color}</CustomTableCell>
            </TableRow>
        </React.Fragment>
    )
}
export default Cat
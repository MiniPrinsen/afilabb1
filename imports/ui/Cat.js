import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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
    return (
        <React.Fragment>
            <TableRow>
              <CustomTableCell component="th" scope="row">{props.cat.cat_name}</CustomTableCell>
              <CustomTableCell align="right">{props.cat.cat_race}</CustomTableCell>
              <CustomTableCell align="right">{props.cat.cat_color}</CustomTableCell>
            </TableRow>
        </React.Fragment>
    )
}
export default Cat
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const CatTableHead = () => {
    const CustomTableCell = withStyles(theme => ({
        // head: {
        //     // backgroundColor: theme.palette.common.black,
        //     color: theme.palette.common.black,
        // },
        // // body: {
        // //     fontSize: 2em,
        // // },
        }))(TableCell);
    return (
        <React.Fragment>
            <TableHead>
                <TableRow>
                <CustomTableCell>Namn</CustomTableCell>
                <CustomTableCell>Ras</CustomTableCell>
                </TableRow>
            </TableHead> 
        </React.Fragment>
    );
}
export default CatTableHead
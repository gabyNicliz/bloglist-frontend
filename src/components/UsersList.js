import React from 'react';
import { Link } from 'react-router-dom';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

const UsersList = ({ users }) => {
  return (
    <>
      <div>
        <h2>Users</h2>
      </div>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><strong>blogs created</strong></TableCell>
            </TableRow>
            {users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell component={Link} to={`/users/${user.id}`}>{user.username}</TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersList;
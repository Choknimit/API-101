import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


export default function User() {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   // fetch("https://jsonplaceholder.typicode.com/todos/")
  //   // fetch("https://pokeapi.co/api/v2/pokemon")
  //   fetch("http://localhost:5000/user")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setUsers(res);

  //       // console.log(res);
  //     });
  // });
  
  const getUser = () => {
    axios.get('http://localhost:5000/user')
    .then(res => {
      setUsers(res.data.users)
      // console.log(res.data.users);
    })
    .catch(err => alert(err))
  }

  useEffect(() => {
    getUser()
  }, [])
  // console.log(users);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2, height: "100vh" }}>
        <Item>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 8">
              <Typography align="left" variant="h6" gutterBottom>
                Users
              </Typography>
            </Box>
            <Box gridColumn="span 4" align="right">
              <Link href="create">
                <Button variant="contained">Create</Button>
              </Link>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>_id</TableCell>
                  <TableCell align="right">name</TableCell>
                  <TableCell align="right">email</TableCell>
                  <TableCell align="right">role</TableCell>
                  <TableCell align="right">action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >

                    <TableCell component="th" scope="row">
                      {user._id}
                    </TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.role}</TableCell>
                    <TableCell align="right"><button align="right">delete</button> <button align="right">update</button></TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Item>
      </Container>
    </React.Fragment>
  );
}

import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Field, Form, Formik } from "formik";




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));


export default function Usercreate() {

    // const [message, setMessagemail] = useState(null);
    // const [errors, setErrors] = useState(null)
    // const [name, setName] = useState('')
    // const [email, setemail] = useState('')
    // const [password, setpassword] = useState('')
    // const MySwal = withReactContent(Swal)

    // const navigate = useNavigate()


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setErrors(null)

        


    // }



    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ p: 2 }}>
                {/* <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} /> */}
                <Item>
                    <Box sx={{ width: 1 }}>
                        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                            <Box gridColumn="span 8" align="left">
                                <Typography align="left" variant="h6" gutterBottom>
                                    Userscreate
                                </Typography>
                            </Box>
                            <Box gridColumn="span 4" align='right'>
                                <Link href="/">
                                    <Button variant="contained">Back</Button>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                    <Formik 
                        initialValues={{ name: '', email: '', password: ''}}
                        onSubmit={(values, actions) => {
                            console.log(values);
                            // var data = JSON.stringify({
                            //     "name": name,
                            //     "email": email,
                            //     "password": password
                            // });
                    
                            var config = {
                                method: 'post',
                                url: 'http://localhost:5000/user/register',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                // data: data
                            };
                    
                            axios(config)
                                .then(function (response) {
                                    console.log(JSON.stringify(response.data));
                                    // setMessage(JSON.stringify(response.data));
                                    
                                })
                                .catch(function (error) {
                                    // console.log(error);
                                    console.log(error.response.data.errors);
                                    error.response.data.errors.validation.forEach(o => (o.msg))
                    
                                })
                        }}
                            
                    >
                        {( errors  ) => {
                            <Form>
                                name: <Field type="input" name='name' />
                                <Field type="email" name='name' />
                                <Field type="password" name='name' />
                                <div>{ errors.name }</div>
                                <Button type="submit" variant="contained" fullWidth>Create</Button>
                            </Form>
                        }}
                        

                    </Formik>
                    
                    {/* <form className="Usercreate" onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ p: 1 }}>
                            <Grid xs={12}>
                                <TextField
                                    id="name"
                                    label="name"
                                    variant="outlined"
                                    fullWidth
                                    // required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    id="email"
                                    label="email"
                                    variant="outlined"
                                    fullWidth
                                    // required
                                    onChange={(e) => setemail(e.target.value)}

                                />

                            </Grid>
                            <Grid xs={12} >
                                <TextField
                                    id="password"
                                    label="password"
                                    variant="outlined"
                                    fullWidth
                                    // required
                                    onChange={(e) => setpassword(e.target.value)}
                                />

                            </Grid>
                            <Grid xs={12}>
                                <Button type="submit" variant="contained" fullWidth>Create</Button>
                            </Grid>
                        </Grid>
                    </form> */}
                </Item>
            </Container>
        </React.Fragment>
    );
}

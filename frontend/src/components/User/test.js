import React, { setState, useEffect } from 'react'
import { Container } from '@mui/material'
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Field, Form, Formik } from "formik";
import axios from "axios"


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

export default function test() {


    const SignupSchema = () => {

    }

    const Basic = () => {     
        const [name, setName] = setState('')
        const [email, setEmail] = setState('')
        const [password, setPassword] = setState('')
    }


  return (
    <div>
        test
        <Container maxWidth="lg" sx={{ p: 2, height: "100vh" }}>
        <Item>
          <Formik
            initialValues={{
                name: '',
                email: '',
                password: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
                
                console.log(values);
            }}
          >

            {({ errors }) => (
                <Form>
                    name: <Field type="input" name="name" />
                    <br/>
                    <br/>
                    email: <Field type="email" name="email" />
                    <br/>
                    <br/>
                    password: <Field type="password" name="password" />
                    <br/>
                    <br/>
                    <button> Submit</button>
                </Form>
            )}

          </Formik>
        </Item>
      </Container>
    </div>
  )
}

"use client";

import {
  Flex,
  Box,
  Field,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { signUp } from "../utils/js/apiCalls";

export default function SignupCard() {
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData.entries());

    signUp(entries);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="4" pt={6}>
        <Field.Root>
          <Field.Label>Full Name</Field.Label>
          <Input type="text" placeholder="full name" name="name" />
          <Field.ErrorText></Field.ErrorText>
        </Field.Root>

        <Field.Root>
          <Field.Label>Email Address</Field.Label>
          <Input type="email" placeholder="email address" name="email" />
          <Field.ErrorText></Field.ErrorText>
        </Field.Root>

        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input type="text" placeholder="password" name="password" />
          <Field.ErrorText></Field.ErrorText>
        </Field.Root>

        <Field.Root>
          <Field.Label>Confirm Password</Field.Label>
          <Input
            type="text"
            placeholder="confirm password"
            name="passwordConfirm"
          />
          <Field.ErrorText></Field.ErrorText>
        </Field.Root>

        <Button type="submit">Sign Up</Button>
        <Stack pt={6}>
          Already a user? <NavLink to="/login">Login</NavLink>
        </Stack>
      </Stack>
    </form>
  );
}

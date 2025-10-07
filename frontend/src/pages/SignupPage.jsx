"use client";

import { Field, Input, Stack, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { signup } from "../utils/js/apiCalls";

export default function SignupCard() {
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData.entries());

    signup(entries);

    //TODO: Only submit form when all fields are populated. Should I handle this on front end or back end?
    // Clear form fields upon submission
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

"use client";

import { Field, Input, Stack, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { login } from "../utils/js/authentication";

export default function SignupCard() {
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData.entries());

    login(entries);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="4">
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

        <Button type="submit">Log In</Button>
      </Stack>
    </form>
  );
}

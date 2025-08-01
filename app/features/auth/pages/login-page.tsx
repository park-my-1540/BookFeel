import { Button } from "~/components/ui/button";
import type { Route } from "./+types/join-page";
import { Link, redirect, useNavigation } from "react-router";
import { Form } from "react-router";

import AuthButtons from "../components/auth-buttons";
import { makeSSRClient } from "~/supa-client";
import { AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import InputPair from "~/components/ui/input-pair";
export const meta: Route.MetaFunction = () => [{ title: "로그인" }];

const formSchema = z.object({
  email: z
    .string({
      required_error: "이메일을 입력해주세요",
    })
    .email({
      message: "이메일 형식이 올바르지 않습니다",
    }),
  password: z
    .string({
      required_error: "비밀번호를 입력해주세요",
    })
    .min(8, {
      message: "비밀번호는 8자 이상이어야 합니다",
    }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return { loginError: null, formErrors: error.flatten().fieldErrors }; //form이 가질 수 있는 에러들을 배열로
  }
  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (loginError) {
    return {
      loginError: loginError.message,
      formErrors: null,
    };
  }

  // 헤더를 전달하는 이유는 사용자가 올바르게 로그인 했다면 클라이언트가 쿠키를 설정할 것이기 때문.
  return redirect("/", {
    headers,
  });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className='flex flex-col relative items-center justify-center h-full px-5'>
      <Button variant={"ghost"} asChild className='absolute right-8 top-8 '>
        <Link to='/auth/join'>Join</Link>
      </Button>
      <div className='flex items-center flex-col justify-center w-full max-w-md gap-10'>
        <h1 className='text-2xl font-semibold'>Log in to your account</h1>
        <Form className='w-full space-y-4' method='post'>
          <InputPair
            id='email'
            label='Email'
            description='이메일을 입력해주세요'
            name='email'
            type='email'
            placeholder='ex) wemake@gmail.com'
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData.formErrors?.email && (
              <p className='text-sm text-red'>{actionData.formErrors.email}</p>
            )}
          <InputPair
            id='password'
            label='Password'
            description='비밀번호를 입력해주세요'
            name='password'
            type='password'
            placeholder='비밀번호를 입력해주세요'
            required
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData.formErrors?.password && (
              <p className='text-sm text-red'>
                {actionData.formErrors.password}
              </p>
            )}
          <Button className='w-full' type='submit' disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              "로그인"
            )}
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}

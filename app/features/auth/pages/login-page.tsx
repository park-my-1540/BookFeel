import { Button } from "~/components/ui/button";
import type { Route } from "./+types/join-page";
import { redirect, useNavigation } from "react-router";
import { Form } from "react-router";

import AuthButtons from "../components/auth-buttons";
import { makeSSRClient } from "~/supa-client";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import InputPair from "~/components/ui/input-pair";
import { HeadingXL } from "~/components/ui/Typography";
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
    <div className='form-container'>
      <div className='flex items-center flex-col justify-center w-[50%] gap-10 p-lg'>
        <HeadingXL>Login</HeadingXL>
        <AuthButtons />
        <p className='text-sm text-muted-foreground font-medium'>
          Or use your account
        </p>
        <Form className='w-full' method='post'>
          <div className='space-y-4'>
            <InputPair
              className='bg-lightGray p-3'
              id='email'
              label='Email'
              name='email'
              type='email'
              placeholder='이메일을 입력해주세요'
            />
            {actionData &&
              "formErrors" in actionData &&
              actionData.formErrors?.email && (
                <p className='text-sm text-red'>
                  {actionData.formErrors.email}
                </p>
              )}
            <InputPair
              className='bg-lightGray p-3'
              id='password'
              label='Password'
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
          </div>
          <div className='text-center mt-20'>
            <Button
              variant={"sign"}
              size={"xl"}
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                "LOGIN"
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

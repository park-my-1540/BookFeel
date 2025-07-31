import { Button } from "~/components/ui/button";
import type { Route } from "./+types/join-page";
import { redirect, useNavigation } from "react-router";
import { Form } from "react-router";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { checkUsernameExists } from "../queries";
import AuthButtons from "../components/auth-buttons";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import InputPair from "~/components/ui/input-pair";

export const meta: Route.MetaFunction = () => [
  { title: "회원가입" },
  { name: "description", content: "새로운 계정을 만들어보세요" },
];
const formSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요" }),
  username: z.string().min(1, { message: "사용자 이름을 입력해주세요" }),
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다" }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다" }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }

  const { name, username, email, password } = data;
  const usernameExists = await checkUsernameExists(request, { username });
  if (usernameExists) {
    return {
      signUpError: null,
      formErrors: { username: "중복되는 이름입니다." },
    };
  }
  /**
   * 사용자가 로그인/로그아웃 시 쿠키가 설정되거나 삭제되므로
   * 클라이언트에서 생성한 헤더를 가져와야하고, 이 헤더를 사용자에게 전달해야 한다.
   */
  const { client, headers } = makeSSRClient(request);

  // await client를 사용, 클라이언트가 사용자를 로그인 상태로 만들거라 헤더도 가져와야함.
  // supabase는 계정 생성과 동시에 로그인 시키므로 signup
  const { error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      // custom data JSON형태로 보낼수있음. raw_user_meta_data에 저장. auth trigger 시 이용
      data: {
        name: data.name,
        username: data.username,
      },
    },
  });

  if (signUpError) {
    return {
      formErrors: null,
      signUpError: signUpError.message,
    };
  }
  return redirect("/", { headers });
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className='flex flex-col relative items-center justify-center h-full px-5'>
      <div className='flex items-center flex-col justify-center w-full max-w-md gap-10'>
        <h1 className='text-2xl font-semibold'>회원가입</h1>
        <Form className='w-full space-y-4' method='post'>
          <InputPair
            id='name'
            label='Name'
            description='이름을 입력해주세요'
            name='name'
            type='text'
            placeholder='이름을 입력해주세요'
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className='text-red-500 text-sm'>
              {actionData?.formErrors?.name}
            </p>
          )}
          <InputPair
            id='username'
            label='Username'
            description='사용자 이름을 입력해주세요'
            name='username'
            type='text'
            placeholder='ex) wemake'
            required
          />
          {actionData && "formErrors" in actionData && (
            <p className='text-red-500 text-sm'>
              {actionData?.formErrors?.username}
            </p>
          )}
          <InputPair
            id='email'
            label='Email'
            description='이메일을 입력해주세요'
            name='email'
            type='email'
            placeholder='ex) wemake@gmail.com'
          />
          {actionData && "formErrors" in actionData && (
            <p className='text-red-500 text-sm'>
              {actionData?.formErrors?.email}
            </p>
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
          {actionData && "formErrors" in actionData && (
            <p className='text-red-500 text-sm'>
              {actionData?.formErrors?.password}
            </p>
          )}
          <Button className='w-full' type='submit' disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              "계정 만들기"
            )}
          </Button>
          {actionData && "signUpError" in actionData && (
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>{actionData.formErrors.username}</AlertTitle>
            </Alert>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}

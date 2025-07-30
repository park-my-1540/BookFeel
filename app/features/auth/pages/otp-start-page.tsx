import { Button } from "~/components/ui/button";
import type { Route } from "./+types/otp-start-page";
import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import InputPair from "~/components/ui/input-pair";

export const meta: Route.MetaFunction = () => [{ title: "OTP 인증" }];

export const action = async ({ request }: Route.ActionArgs) => {
  // const formData = await request.formData();
  // const { data, success } = formSchema.safeParse(Object.fromEntries(formData));
  // if (!success) {
  //   return { error: "Invalid email address" };
  // }
  // const { email } = data;
  // const { client } = makeSSRClient(request);
  // const { error } = await client.auth.signInWithOtp({
  //   email,
  //   options: {
  //     shouldCreateUser: true,
  //     /*
  //       true :
  //        만약 사용자가 이메일을 입력했는데 우리 데이터베이스에 그 이메일을 가진 사용자가 없다면, Supabase가 자동 생성
  //        case : 만약 계정이 없으면 내가 계정 만들어줄게
  //       false :
  //       기존계정을 가진 사용자만 OTP로 로그인 가능. 사용자가 존재하지 않으면 에러, 프로세스 stop
  //       case : 계정 만들엇던 사용자가 이메일로 otp를 사용해서 로그인할수 잇음.
  //     */
  //   },
  // });
  // if (error) {
  //   return { error: "OTP 전송이 실패하였습니다." };
  // }
  // return redirect(`/auth/otp/complete?email=${email}`);
};

export default function OtpStartPage({ actionData }: Route.ComponentProps) {
  return (
    <div className='flex flex-col relative items-center justify-center h-full'>
      <div className='flex items-center flex-col justify-center w-full max-w-md gap-10'>
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='text-2xl font-semibold'>OTP 인증</h1>
          <p className='text-sm text-muted-foreground'>
            이메일을 입력하면 인증 코드를 발송합니다.
          </p>
        </div>
        <Form className='w-full space-y-4' method='post'>
          <InputPair
            id='email'
            label='Email'
            description='이메일을 입력해주세요'
            name='email'
            type='email'
            placeholder='ex) wemake@gmail.com'
          />
          {actionData && "error" in actionData && (
            <p className='text-red-500 text-sm'>{actionData.error}</p>
          )}
          <Button className='w-full' type='submit'>
            OTP 전송
          </Button>
        </Form>
      </div>
    </div>
  );
}

import { LoaderCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/join-page";
import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import InputPair from "~/components/ui/input-pair";

export const meta: Route.MetaFunction = () => [{ title: "OTP 인증" }];

export const action = async ({ request }: Route.ActionArgs) => {
  // const formData = await request.formData();
  // const { data, success, error } = formSchema.safeParse(
  //   Object.fromEntries(formData)
  // );
  // if (!success) {
  //   return {
  //     fieldErrors: error.flatten().fieldErrors,
  //   };
  // }
  // const { email, otp } = data;
  // const { client, headers } = makeSSRClient(request);
  // const { error: verifyError } = await client.auth.verifyOtp({
  //   email,
  //   token: otp,
  //   type: "email",
  // });
  // if (verifyError) {
  //   return {
  //     verifyError: verifyError.message,
  //   };
  // }
  // return redirect("/", { headers });
};

export default function OtpCompletePage({ actionData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className='flex flex-col relative items-center justify-center h-full'>
      <div className='flex items-center flex-col justify-center w-full max-w-md gap-10'>
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='text-2xl font-semibold'>OTP 확인하기</h1>
          <p className='text-sm text-muted-foreground'>
            인증 코드를 입력해주세요.
          </p>
        </div>
        <Form className='w-full space-y-4' method='post'>
          <InputPair
            id='email'
            label='Email'
            description='이메일을 입력해주세요'
            name='email'
            defaultValue={email || ""}
            type='email'
            placeholder='ex) wemake@gmail.com'
          />
          {actionData && actionData.fieldErrors && (
            <p className='text-red-500 text-sm'>
              {actionData.fieldErrors?.email?.join(",")}
            </p>
          )}
          <InputPair
            id='otp'
            label='OTP'
            description='OTP 코드를 입력해주세요'
            name='otp'
            type='text'
            placeholder='ex) 123456'
          />
          {actionData && "fieldErrors" in actionData && (
            <p className='text-red-500 text-sm'>
              {actionData.fieldErrors?.otp?.join(",")}
            </p>
          )}

          {actionData && "verifyError" in actionData && (
            <p className='text-sm text-red-500'>{actionData.verifyError}</p>
          )}
          <Button className='w-full' type='submit' disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className='animate-spin' />
            ) : (
              "Verify OTP"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}

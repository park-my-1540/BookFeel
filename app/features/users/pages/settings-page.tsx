import { useState } from "react";
import type { Route } from "./+types/settings-page";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import InputPair from "~/components/ui/input-pair";
import { Small, Heading1 } from "~/components/ui/Typography";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserProfileById } from "../queries";
import { updateUser, updateUserAvatar } from "../mutations";

export const meta: Route.MetaFunction = () => [{ title: "Settings" }];

const formSchema = z.object({
  username: z.string().min(1),
  bio: z.string().optional().default(""),
});

type ProcessBase = {
  client: SupabaseClient;
  userId: string;
};

type ProcessResult = {
  ok: boolean;
  formErrors?: Record<string, string[]>;
};

const processImage = async ({
  client,
  userId,
  avatar,
}: ProcessBase & { avatar: File }): Promise<ProcessResult> => {
  const { data, error } = await client.storage
    .from("avatars")
    .upload(`${userId}/${Date.now()}`, avatar, {
      contentType: avatar.type,
      upsert: false,
    });
  if (error)
    return { ok: false, formErrors: { avatar: ["Failed to upload avatar"] } };

  const {
    data: { publicUrl },
  } = await client.storage.from("avatars").getPublicUrl(data.path);
  await updateUserAvatar(client, {
    id: userId,
    avatarUrl: publicUrl,
  });
  return { ok: true };
};
const processInfo = async ({
  client,
  userId,
  formData,
}: ProcessBase & { formData: FormData }): Promise<ProcessResult> => {
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { ok: false, formErrors: error.flatten().fieldErrors };
  }
  const { username, bio } = data;
  await updateUser(client, {
    id: userId,
    username,
    bio,
  });
  return {
    ok: true,
  };
};
export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const avatar = formData.get("avatar");

  try {
    if (avatar && avatar instanceof File) {
      if (avatar.size > 2097152 || !avatar.type.startsWith("image/"))
        return { formErrors: { avatar: ["Invalid file size or type"] } };
      return await processImage({ client, userId, avatar });
    } else {
      return await processInfo({ client, userId, formData });
    }
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      formErrors: { general: ["서버 처리 중 오류가 발생했습니다."] },
    };
  }
};
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserProfileById(client, { id: userId });

  return { user };
};
export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <div className='container mx-auto py-lg'>
      <div className='grid grid-cols-6 gap-5 lg:gap-40'>
        <div className='col-span-4 flex flex-col gap-10'>
          <Heading1>Edit profile</Heading1>
          <Form className='flex flex-col w-2/3 gap-5' method='post'>
            {actionData?.ok ? (
              <Alert>
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  프로필이 업데이트 되었습니다.
                </AlertDescription>
              </Alert>
            ) : null}
            <InputPair
              label='Display Name'
              required
              id='username'
              name='username'
              placeholder='사용하실 이름을 입력해주세요'
              defaultValue={loaderData.user.username ?? ""}
            />
            <InputPair
              label='Bio'
              description='공개 소개글 - 프로플 페이지에 표시됩니다.'
              required
              id='bio'
              name='bio'
              placeholder='John Doe'
              defaultValue={loaderData.user.bio ?? ""}
              textArea
            />
            <Button className='w-full'>프로필 수정하기</Button>
          </Form>
        </div>
        <Form
          className='col-span-2 p-6 rounded-lg border border-borderGray'
          method='post'
          encType='multipart/form-data'
        >
          <label className='flex flex-col gap-1 mb-4'>프로필 이미지</label>
          <div className='space-y-5'>
            <div className='size-40 rounded-full shadow-xl overflow-hidden '>
              {avatar ? (
                <img src={avatar} className='object-cover w-full h-full' />
              ) : null}
            </div>
            <input
              type='file'
              className='w-full'
              onChange={onChange}
              required
              name='avatar'
            />
            {actionData?.formErrors && "avatar" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors.avatar.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <div className='flex flex-col text-xs'>
              <Small>Recommended size: 128x128px</Small>
              <Small>Allowed formats: PNG, JPEG</Small>
              <Small>Max file size: 1MB</Small>
            </div>
            <Button className='w-full'>프로필 이미지 수정하기</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

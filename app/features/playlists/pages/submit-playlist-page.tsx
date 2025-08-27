import { Loader2 } from "lucide-react";
import { Form, redirect, useNavigation } from "react-router";
import { z } from "zod";
import BreadComp from "~/components/common/BreadComp";
import { Button } from "~/components/ui/button";
import InputPair from "~/components/ui/input-pair";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { createPlaylist } from "../queries";
import type { Route } from "./+types/submit-playlist-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | WeMake" },
    { name: "description", content: "Submit your product to WeMake" },
  ];
};

const formSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  url: z
    .string()
    .min(1)
    .regex(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//, {
      message: "유효한 YouTube 링크를 입력해주세요.",
    }),
  description: z.string().min(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
    };
  }
  await createPlaylist(client, {
    userId,
    title: data.title,
    author: data.author,
    url: data.url,
    reason: data.description,
  });
  return redirect(`/playlists`);
};

export default function SubmitPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="w-full px-lg pt-sm pb-lg">
      <BreadComp
        link={[
          { to: "/playlists", name: "Playlists" },
          { to: "/playlists/submit", name: "플레이리스트 등록하기" },
        ]}
      />
      <Form
        className="mt-5 mx-auto  w-[600px]"
        encType="multipart/form-data"
        method="post"
      >
        <div className="space-y-5">
          <InputPair
            label="도서명"
            description="도서명을 입력해주세요."
            name="title"
            type="text"
            id="title"
            required
            placeholder="ex) 적산가옥의 유령"
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData.formErrors.title && (
              <p className="text-red">{actionData.formErrors.title}</p>
            )}
          <InputPair
            label="저자명"
            description="저자를 입력해주세요."
            name="author"
            type="text"
            id="author"
            required
            placeholder="ex) 조예은"
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.author && (
              <p className="text-red">{actionData.formErrors.author}</p>
            )}

          <img className="w-1/2" src="/img/desc.png" />
          <InputPair
            label="URL"
            description="공유 옵션 목록에서 동영상 퍼가기에 src를 붙여넣어주세요."
            name="url"
            type="text"
            id="url"
            required
            placeholder="ex) https://example.com"
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.url && (
              <p className="text-red">{actionData.formErrors.url}</p>
            )}
          <InputPair
            textArea
            label="상세설명"
            description="플레이리스트를 선택한 이유를 적어주세요."
            name="description"
            type="text"
            id="description"
            required
            placeholder="ex) 500자 이내에 입력해주세요.."
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.description && (
              <p className="text-red">{actionData.formErrors.description}</p>
            )}
        </div>
        <div className="w-full flex justify-center mt-12">
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "등록하기"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}

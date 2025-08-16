import { Loader2 } from "lucide-react";
import { Form, redirect, useNavigation } from "react-router";
import { z } from "zod";
import SelectPair from "~/components/common/SelectPair";
import { Button } from "~/components/ui/button";
import InputPair from "~/components/ui/input-pair";
import { Heading1 } from "~/components/ui/Typography";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { createPost } from "../mutations";
import { getTopics } from "../queries";
import type { Route } from "./+types/post-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | WeMake" },
    { name: "description", content: "Submit your product to WeMake" },
  ];
};

const formSchema = z.object({
  title: z.string().min(1).max(40),
  topic: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const topics = await getTopics(client);
  return {
    topics,
  };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
    };
  }
  const { title, content, topic } = data;
  const { post_id } = await createPost(client, {
    title,
    content,
    topic,
    profile_id: userId,
  });

  return redirect(`/community/${post_id}`);
};

export default function SubmitPage({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="container">
      <Form
        className="mt-16 mx-auto w-[600px]"
        encType="multipart/form-data"
        method="post"
      >
        <Heading1 className="mb-10">게시글 작성</Heading1>
        <div className="space-y-5">
          <SelectPair
            label="카테고리"
            name="topic"
            placeholder="토픽을 선택하세요"
            options={loaderData.topics.map((topic) => ({
              label: topic.name,
              value: topic.slug,
            }))}
          />
          <InputPair
            label="제목"
            placeholder="제목을 입력해주세요."
            name="title"
            type="text"
            id="title"
            required
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData.formErrors.title && (
              <p className="text-red">{actionData.formErrors.title}</p>
            )}
          <InputPair
            label="본문"
            placeholder="내용을 입력해주세요."
            name="content"
            type="text"
            id="content"
            required
            textArea={true}
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.author && (
              <p className="text-red">{actionData.formErrors.author}</p>
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

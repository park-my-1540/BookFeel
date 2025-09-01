import { Loader2 } from "lucide-react";
import { Form, redirect, useNavigation } from "react-router";
import { z } from "zod";
import BreadComp from "~/components/common/BreadComp";
import SelectPair from "~/components/common/SelectPair";
import { Button } from "~/components/ui/button";
import InputPair from "~/components/ui/input-pair";
import { Heading1 } from "~/components/ui/Typography";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { updatePost } from "../mutations";
import { getPostById, getTopics } from "../queries";
import type { Route } from "./+types/update-post-page";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Update Post | BookFeel" },
    { name: "description", content: "Update your post to BookFeel" },
  ];
};

const formSchema = z.object({
  title: z.string().min(1).max(40),
  topic: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const postId = params.postId;
  if (!postId) {
    throw new Error("Invalid postId");
  }
  const post = await getPostById(client, { postId: Number(postId) });
  const topics = await getTopics(client);
  return { post, topics };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
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
  const { title, content, topic } = data;
  const { post_id } = await updatePost(client, {
    title,
    content,
    topic,
    profile_id: userId,
    post_id: Number(params.postId),
  });

  return redirect(`/community/${post_id}`);
};
type topicsProps = {
  name: string;
  slug: string;
};
export default function UpdatePostPage({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="w-full px-lg py-sm pb-lg">
      <BreadComp
        link={[
          { to: "/community", name: "Community" },
          {
            to: `/community?topic=${loaderData?.post?.topic_slug}`,
            name: loaderData?.post?.topic_name,
          },
          {
            to: `/community/${loaderData?.post?.post_id}/update`,
            name: loaderData?.post?.title,
          },
        ]}
      />
      <Form
        className="mt-16 mx-auto w-[600px]"
        encType="multipart/form-data"
        method="post"
      >
        <Heading1 className="mb-10">게시글 수정</Heading1>
        <div className="space-y-5">
          <SelectPair
            label="카테고리"
            name="topic"
            placeholder="토픽을 선택하세요"
            options={loaderData?.topics.map((topic: topicsProps) => ({
              label: topic.name,
              value: topic.slug,
            }))}
            defaultValue={loaderData?.post?.topic_slug}
          />
          <InputPair
            label="제목"
            placeholder="제목을 입력해주세요."
            name="title"
            type="text"
            id="title"
            defaultValue={loaderData?.post.title}
            required
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData.formErrors?.title && (
              <p className="text-red">{actionData.formErrors.title}</p>
            )}
          <InputPair
            label="본문"
            placeholder="내용을 입력해주세요."
            name="content"
            type="text"
            id="content"
            defaultValue={loaderData?.post.content}
            required
            textArea={true}
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.content && (
              <p className="text-red">{actionData.formErrors.content}</p>
            )}
        </div>
        <div className="w-full flex justify-center mt-12">
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "수정하기"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}

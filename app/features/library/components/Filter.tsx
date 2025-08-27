import { startOfMonth, startOfWeek, startOfYear } from "date-fns";
import { useState } from "react";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { DatePickerField } from "~/components/ui/date-picker";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Body3 } from "~/components/ui/Typography";
import { OPTION_CODES } from "~/features/contants";

export default function Filter() {
  const today = new Date();
  const [startDate, setStartDate] = useState<Date | undefined>(
    startOfWeek(today, { weekStartsOn: 1 })
  );
  const [endDate, setEndDate] = useState<Date | undefined>(today);

  function handleQuickRange(range: "year" | "month" | "week") {
    if (range === "year") {
      setStartDate(startOfYear(today));
      setEndDate(today);
    } else if (range === "month") {
      setStartDate(startOfMonth(today));
      setEndDate(today);
    } else if (range === "week") {
      setStartDate(startOfWeek(today, { weekStartsOn: 1 })); // 월요일 시작
      setEndDate(today);
    }
  }

  return (
    <Form
      method="post"
      action="/library/top-borrowed"
      className="w-5/6 space-y-6"
    >
      {/* 성별 */}
      <div className="flex gap-3 mb-4 relative pl-20">
        <Body3 className="absolute left-0">성별</Body3>
        <RadioGroup
          defaultValue={OPTION_CODES.gender[0].value}
          name="gender"
          className="flex gap-2"
        >
          {OPTION_CODES.gender.map((opt) => (
            <div key={opt.value} className="flex items-center">
              <RadioGroupItem value={opt.value} id={opt.value} />
              <Label htmlFor={opt.value}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      {/* 연령대 */}
      <div className="flex gap-3 mb-4 relative pl-20">
        <Body3 className="absolute left-0">연령대</Body3>
        <RadioGroup
          name="age"
          defaultValue={OPTION_CODES.age[0].value}
          className="flex gap-2 flex-wrap"
        >
          {OPTION_CODES.age.map((opt) => (
            <div key={opt.value} className="flex items-center">
              <RadioGroupItem value={opt.value} id={opt.value} />
              <Label htmlFor={opt.value}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      {/* 주제 */}
      <div className="flex gap-3 mb-4 relative pl-20">
        <Body3 className="absolute left-0">주제</Body3>
        <RadioGroup
          name="subject"
          defaultValue={OPTION_CODES.subject[0].value}
          className="flex gap-2 flex-wrap"
        >
          {OPTION_CODES.subject.map((opt) => (
            <div key={opt.value} className="flex items-center">
              <RadioGroupItem value={opt.value} id={opt.value} />
              <Label htmlFor={opt.value}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      {/* 지역 */}
      <div className="flex gap-3 mb-4 relative pl-20">
        <Body3 className="absolute left-0">지역</Body3>
        <RadioGroup
          name="region"
          defaultValue={OPTION_CODES.region[0].value}
          className="flex gap-2 flex-wrap"
        >
          {OPTION_CODES.region.map((opt) => (
            <div key={opt.value} className="flex items-center">
              <RadioGroupItem value={opt.value} id={opt.value} />
              <Label htmlFor={opt.value}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      {/* 대출기간 */}
      <div className="relative pl-20 w-full">
        <Body3 className="absolute left-0">대출기간</Body3>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="">
            <DatePickerField
              name="startDate"
              value={startDate}
              onChange={setStartDate}
            />{" "}
            ~{" "}
            <DatePickerField
              name="endDate"
              value={endDate}
              onChange={setEndDate}
            />
          </div>
          <RadioGroup
            name="quickRange"
            defaultValue={"week"}
            className="flex gap-2 flex-wrap"
            onValueChange={(val: "year" | "month" | "week") =>
              handleQuickRange(val)
            }
          >
            {[
              { label: "금년", value: "year" },
              { label: "금월", value: "month" },
              { label: "금주", value: "week" },
            ].map((opt) => (
              <div key={opt.value} className="flex items-center">
                <RadioGroupItem value={opt.value} id={opt.value} />
                <Label htmlFor={opt.value}>{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="text-center">
        <Button size="lg" className="px-12 py-6 text-lg mt-5">
          검색
        </Button>
      </div>
    </Form>
  );
}

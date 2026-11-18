import { useState } from "react";
import { DTL_REGION_MAP, REGION_CODES } from "~/features/contants";

export default function RegionSelect({
  initialRegion,
  initialDistrict,
}: {
  initialRegion: string;
  initialDistrict: string;
}) {
  const [region, setRegion] = useState(initialRegion || "11");
  const [district, setDistrict] = useState(initialDistrict || "전체");
  const districts = DTL_REGION_MAP[region] ?? [];
  const fieldClass =
    "block h-11 w-full min-w-0 rounded-lg border border-borderGray bg-white px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-main";

  return (
    <div className="grid min-w-0 grid-cols-2 gap-3">
      <label className="grid min-w-0 gap-1.5 text-sm font-medium">
        시·도
        <select
          name="region"
          value={region}
          className={fieldClass}
          onChange={(event) => {
            setRegion(event.currentTarget.value);
            setDistrict("전체");
          }}
        >
          {REGION_CODES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label className="grid min-w-0 gap-1.5 text-sm font-medium">
        시·군·구
        <select
          name="dtl_region"
          value={district}
          className={fieldClass}
          onChange={(event) => setDistrict(event.currentTarget.value)}
        >
          <option value="전체">전체</option>
          {districts.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

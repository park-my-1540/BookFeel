import { useCallback, useEffect, useMemo, useState } from "react";
import SelectBox from "~/components/common/SelectBox";
import { DTL_REGION_MAP, REGION_CODES } from "~/features/contants";

export default function RegionSelect({ isbn }: { isbn?: string }) {
  const [region, setRegion] = useState("11");
  const [dtlRegion, setDtlRegion] = useState("전체");
  const dtlOptions = useMemo(() => {
    const list = DTL_REGION_MAP[region] ?? [];
    return [
      { key: "전체", value: "전체", label: "전체" },
      ...list.map((d) => ({ key: d.value, value: d.value, label: d.label })),
    ];
  }, [region]);

  useEffect(() => {
    setDtlRegion("전체");
  }, [region]);

  const handleRegion = useCallback((value: string) => {
    setRegion(value);
  }, []);

  const handleDtlRegion = useCallback((value: string) => {
    setDtlRegion(value);
  }, []);

  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:min-w-72">
      <SelectBox
        className="w-full min-w-0 bg-white"
        name="region"
        value={region}
        options={REGION_CODES.map((o) => ({ key: o.value, ...o }))}
        onChange={handleRegion}
      />
      <SelectBox
        name="dtl_region"
        className="w-full min-w-0 bg-white"
        value={dtlRegion}
        options={dtlOptions}
        onChange={handleDtlRegion}
      />
      <input type="hidden" name="isbn" value={isbn ?? ""} />
    </div>
  );
}

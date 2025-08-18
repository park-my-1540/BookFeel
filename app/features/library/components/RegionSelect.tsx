import { useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import SelectBox from "~/components/common/SelectBox";
import { DTL_REGION_MAP, REGION_CODES } from "~/features/contants";
import bookState from "~/jotai/bookAtom";

export default function RegionSelect() {
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

  const book = useAtomValue(bookState);
  return (
    <div className="flex gap-2 w-full md:w-1/3 border">
      <SelectBox
        className="w-1/3"
        name="region"
        value={region}
        options={REGION_CODES.map((o) => ({ key: o.value, ...o }))}
        onChange={handleRegion}
      />
      <SelectBox
        name="dtl_region"
        className="w-2/3"
        value={dtlRegion}
        options={dtlOptions}
        onChange={handleDtlRegion}
      />
      <input type="hidden" name="isbn" value={book.isbn} />
    </div>
  );
}

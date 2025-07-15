import { Title1 } from "@components/ui/Typography";
import Tab from "@/components/common/Tabs";

export default function Header() {
  return (
    <header className='flex justify-center items-center py-6'>
      <Title1 className='absolute left-0 md:left-40' onClick={() => {}}>
        CERTICOS BOOKS
      </Title1>
      <Tab />
    </header>
  );
}

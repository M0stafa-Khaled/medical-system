import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { PiReadCvLogoFill } from "react-icons/pi";
import Modal from "../../shared/Modal";

const ClinicList = () => {
  const { resolvedTheme } = useTheme();
  const {
    isOpen: isOpenDeleteModal,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();

  return (
    <>
      <TableContainer className="text-black dark:text-white rounded-lg bg-foreground dark:bg-foreground border border-muted/30">
        <Table
          variant="simple"
          colorScheme={resolvedTheme === "dark" ? "whiteAlpha" : "blackAlpha"}
        >
          <TableCaption className="text-black dark:text-white/70 !font-sans">
            العيادات المتاحة
          </TableCaption>
          <Thead>
            <Tr>
              <Th className="!py-4 text-black dark:text-white/70 !text-base !font-sans">
                اسم العيادة
              </Th>
              <Th className="!py-4 text-black dark:text-white/70 !text-base !text-center !font-sans">
                الإجراءات
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Tr key={idx}>
                <Td>عظام</Td>
                <Td className="!text-center flex justify-center gap-4">
                  <Button className="!bg-primary !text-white gap-2">
                    عرض
                    <PiReadCvLogoFill size={18} />
                  </Button>
                  <Button className="!bg-secondary !text-white gap-2">
                    تعديل
                    <FaPencil size={18} />
                  </Button>
                  <Button
                    onClick={onOpenDeleteModal}
                    className="!bg-danger !text-white gap-2"
                  >
                    حذف
                    <MdDelete size={18} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th className="text-black dark:text-white/70 !font-sans">
                اسم العيادة
              </Th>
              <Th className="text-black dark:text-white/70 !text-center !font-sans">
                الإجراءات
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <Modal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        onOpen={onOpenDeleteModal}
        title="حذف العيادة"
        description={
          <>
            هل انت متاكد من حذف عيادة{" "}
            <span className="font-bold text-black dark:text-white">
              {"عظام"}
            </span>
            ؟
          </>
        }
      >
        <Button
          onClick={onCloseDeleteModal}
          className="!bg-primary !text-white"
        >
          إلغاء
        </Button>
        <Button className="!bg-danger !text-white" mr={3}>
          حذف
        </Button>
      </Modal>
    </>
  );
};

export default ClinicList;

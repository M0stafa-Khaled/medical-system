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
      <TableContainer className="text-black dark:text-white rounded-lg dark:bg-foreground border border-muted/30">
        <Table
          variant="simple"
          colorScheme={resolvedTheme === "dark" ? "whiteAlpha" : "blackAlpha"}
        >
          <TableCaption className="text-black dark:text-white/70 !font-sans">
            العيادات المتاحة
          </TableCaption>
          <Thead>
            <Tr>
              <Th className="!py-4 text-black dark:text-white/70 !text-sm !font-sans !text-center">
                اسم العيادة
              </Th>
              <Th className="!py-4 text-black dark:text-white/70 !text-sm !text-center !font-sans">
                الإجراءات
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Tr
                key={idx}
                className="hover:bg-gray-300 transition-all duration-300"
              >
                <Td className="text-sm !text-center">عظام</Td>
                <Td className="!text-center flex justify-center gap-4">
                  <Button
                    size={"sm"}
                    className="!bg-primary !text-white gap-2 !text-sm"
                  >
                    تعديل
                    <FaPencil size={18} />
                  </Button>
                  <Button
                    size={"sm"}
                    onClick={onOpenDeleteModal}
                    className="!bg-danger !text-white gap-2 !text-sm"
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
              <Th className="text-black dark:text-white/70 !font-sans !text-center">
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
          className="!bg-primary !text-white !text-sm"
        >
          إلغاء
        </Button>
        <Button className="!bg-danger !text-white !text-sm" mr={3}>
          حذف
        </Button>
      </Modal>
    </>
  );
};

export default ClinicList;

import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageModalProps {
  src: string;
  alt: string;
  className?: string;
  trigger?: React.ReactNode;
  showThumbnail?: boolean;
}

const ImageModal = ({
  src,
  alt,
  className = "",
  trigger,
  showThumbnail = true,
}: ImageModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      {trigger ? (
        <div onClick={() => setShowModal(true)}>{trigger}</div>
      ) : (
        showThumbnail && (
          <img
            src={src}
            alt={alt}
            onClick={() => setShowModal(true)}
            className={`w-full h-full max-w-[300px] rounded-md cursor-pointer hover:opacity-90 transition-all duration-300 object-contain bg-white/60 border border-muted ${className}`}
          />
        )
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-50"
            onClick={() => setShowModal(false)}
          >
            <div className="flex justify-center items-center h-full md:p-4 cursor-pointer">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-md w-full p-4"
              >
                <motion.div
                  layoutId={`image-${src}`}
                  className="border border-muted dark:border-white/30 rounded-md overflow-hidden relative"
                >
                  <Button
                    variant={"ghost"}
                    className="absolute top-2 right-2 bg-white/40 hover:bg-white/70 dark:bg-black/40 dark:hover:bg-black/70 w-9 h-9 flex justify-center items-center"
                    onClick={() => setShowModal(false)}
                  >
                    <IoCloseOutline size={24} className="!w-6 !h-6" />
                  </Button>

                  <motion.img
                    src={src}
                    alt=""
                    className="object-contain w-full h-full"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageModal;
